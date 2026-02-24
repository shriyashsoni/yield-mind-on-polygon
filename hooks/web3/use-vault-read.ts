"use client"

import { useMemo } from "react"
import { useAccount, usePublicClient, useWatchContractEvent } from "wagmi"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { formatUnits } from "viem"
import { CONTRACTS_ZKEVM, EVENT_ABI, VAULT_READ_ABI } from "@/lib/web3/zkevm"

export function useVaultRead() {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ["vault", "overview", address],
    enabled: Boolean(publicClient),
    queryFn: async () => {
      if (!publicClient) throw new Error("Public client unavailable")

      const [totalAssets, yieldRate] = await Promise.all([
        publicClient.readContract({
          address: CONTRACTS_ZKEVM.vault,
          abi: VAULT_READ_ABI,
          functionName: "totalAssets",
        }),
        publicClient.readContract({
          address: CONTRACTS_ZKEVM.vault,
          abi: VAULT_READ_ABI,
          functionName: "getYieldRate",
        }),
      ])

      const userShares = address
        ? await publicClient.readContract({
            address: CONTRACTS_ZKEVM.vault,
            abi: VAULT_READ_ABI,
            functionName: "balanceOf",
            args: [address],
          })
        : 0n

      const backendPortfolio = await fetch("/api/portfolio", { cache: "no-store" }).then((r) => {
        if (!r.ok) return null
        return r.json()
      })

      return {
        totalAssets,
        userShares,
        apyBps: Number(yieldRate),
        backendPortfolio,
      }
    },
    staleTime: 15_000,
    refetchInterval: 20_000,
  })

  useWatchContractEvent({
    address: CONTRACTS_ZKEVM.vault,
    abi: EVENT_ABI,
    eventName: "Deposit",
    onLogs: () => queryClient.invalidateQueries({ queryKey: ["vault", "overview", address] }),
  })

  useWatchContractEvent({
    address: CONTRACTS_ZKEVM.vault,
    abi: EVENT_ABI,
    eventName: "Withdraw",
    onLogs: () => queryClient.invalidateQueries({ queryKey: ["vault", "overview", address] }),
  })

  const normalized = useMemo(() => {
    if (!query.data) return null
    return {
      tvl: formatUnits(query.data.totalAssets, 18),
      userShares: formatUnits(query.data.userShares, 18),
      apy: (query.data.apyBps / 100).toFixed(2),
      backendPortfolio: query.data.backendPortfolio,
    }
  }, [query.data])

  return {
    ...query,
    data: normalized,
  }
}
