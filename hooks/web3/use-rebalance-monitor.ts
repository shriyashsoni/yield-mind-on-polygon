"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useWatchContractEvent } from "wagmi"
import { CONTRACTS_ZKEVM, EVENT_ABI } from "@/lib/web3/zkevm"

export function useRebalanceMonitor() {
  const [lastRebalanceEventAt, setLastRebalanceEventAt] = useState<number | null>(null)

  const status = useQuery({
    queryKey: ["rebalance", "status"],
    queryFn: async () => {
      const [statusResponse, historyResponse] = await Promise.all([
        fetch("/api/autonomous/status", { cache: "no-store" }),
        fetch("/api/rebalance-history", { cache: "no-store" }),
      ])

      return {
        status: statusResponse.ok ? await statusResponse.json() : null,
        history: historyResponse.ok ? await historyResponse.json() : null,
      }
    },
    refetchInterval: 30_000,
  })

  useWatchContractEvent({
    address: CONTRACTS_ZKEVM.vault,
    abi: EVENT_ABI,
    eventName: "Rebalance",
    onLogs: () => {
      setLastRebalanceEventAt(Date.now())
      status.refetch()
    },
  })

  return {
    ...status,
    lastRebalanceEventAt,
  }
}
