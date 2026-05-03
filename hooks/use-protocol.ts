"use client"

import useSWR from "swr"
import type { AIInsight } from "@/app/api/ai/insights/route"

/* ------------------------------------------------------------------ */
/*                  Public types matching API shapes                  */
/* ------------------------------------------------------------------ */

export type ProtocolStrategy = {
  id: string
  address: string
  name: string
  protocol: string
  asset: string
  weight: number
  apy: number
  riskScore: number
}

export type ProtocolEvent = {
  kind: string
  actor?: string
  detail?: string
  timestamp: number
  txHash: string
  explorerUrl: string
}

export type OracleFeed = {
  symbol: string
  price: number
  change24h: number
  confidence: number
  publishTime: number
}

export type SnapshotResponse = {
  ok: boolean
  network: { chainId: number; name: string; explorer: string }
  protocol: {
    tvlUsd: number
    sharePriceUsd: number
    estimatedApy: number
    totalShares: number
    assetSymbol: string
    lastRebalance: number | null
    totalRebalances: number
    blockNumber: number
  }
  strategies: ProtocolStrategy[]
  risk: {
    systemScore: number
    volatility24h: number
    maxDrawdown: number
    liquidityTier: string
    insuranceReserve: string
    protectionActive: boolean
  }
  forecast: { predictedAPY: number; confidence: number; oracle: string }
  governance: {
    count: number
    proposals: { id: number; description: string; forVotes: string; againstVotes: string }[]
    governor: string
  }
  oracle: { lastUpdate: number; feeds: OracleFeed[] }
  events: ProtocolEvent[]
  contracts: Record<string, string>
  user: { yld: string; staked: string; rewards: string } | null
  fetchedAt: number
  error?: string
}

export type InsightResponse = {
  ok: boolean
  source: string
  user: { yld: string; staked: string; rewards: string } | null
  insight: AIInsight
  error?: string
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const json = await res.json()
  if (!res.ok || json?.ok === false) {
    throw new Error(json?.error || `HTTP ${res.status}`)
  }
  return json
}

/* ------------------------------------------------------------------ */
/*                              Hooks                                 */
/* ------------------------------------------------------------------ */

export function useProtocolSnapshot(account?: string | null) {
  const url = account ? `/api/onchain/snapshot?account=${account}` : "/api/onchain/snapshot"
  const { data, error, isLoading, isValidating, mutate } = useSWR<SnapshotResponse>(url, fetcher, {
    refreshInterval: 15_000,
    revalidateOnFocus: false,
  })
  return { data, error, isLoading, isValidating, mutate, refresh: mutate }
}

export function useAiInsight(account?: string | null) {
  const url = account ? `/api/ai/insights?account=${account}` : "/api/ai/insights"
  const { data, error, isLoading, isValidating, mutate } = useSWR<InsightResponse>(url, fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  })
  return { data, error, isLoading, isValidating, mutate, refresh: mutate }
}

// keep the old PascalCase export so existing imports don't break
export const useAIInsight = useAiInsight

export function useForecast() {
  const { data, error, isLoading } = useSWR("/api/forecast", fetcher, {
    refreshInterval: 30_000,
    revalidateOnFocus: false,
  })
  return { data, error, isLoading }
}

export function useGovernance() {
  const { data, error, isLoading, mutate } = useSWR("/api/governance/proposals", fetcher, {
    refreshInterval: 30_000,
    revalidateOnFocus: false,
  })
  return { data, error, isLoading, refresh: mutate }
}
