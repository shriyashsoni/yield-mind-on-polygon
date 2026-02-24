"use client"

import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

type ChainBalance = {
  chainId: number
  chainName: string
  wallet: string
  usdc: string
  yld: string
  native: string
  updatedAt: string
}

export function useCrossChainBalances() {
  const { address } = useAccount()

  return useQuery<ChainBalance[]>({
    queryKey: ["cross-chain", "balances", address],
    enabled: Boolean(address),
    queryFn: async () => {
      const response = await fetch(`/api/portfolio?wallet=${address}`, { cache: "no-store" })
      if (!response.ok) throw new Error("Unable to fetch cross-chain balances")
      const payload = await response.json()
      return payload.crossChainBalances || []
    },
    staleTime: 20_000,
    refetchInterval: 30_000,
  })
}
