"use client"

import useSWR from "swr"
import type { ProtocolSnapshot } from "@/lib/onchain-reader"
import type { AIInsight } from "@/app/api/ai/insights/route"

type SnapshotResponse = {
  ok: boolean
  snapshot: ProtocolSnapshot
  user: { yld: string; staked: string; rewards: string } | null
  error?: string
}

type InsightResponse = {
  ok: boolean
  source: string
  snapshot: ProtocolSnapshot
  user: { yld: string; staked: string; rewards: string } | null
  insight: AIInsight
  error?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useProtocolSnapshot(account?: string | null) {
  const url = account ? `/api/onchain/snapshot?account=${account}` : "/api/onchain/snapshot"
  const { data, error, isLoading, mutate } = useSWR<SnapshotResponse>(url, fetcher, {
    refreshInterval: 15_000,
    revalidateOnFocus: false,
  })
  return { data, error, isLoading, refresh: mutate }
}

export function useAIInsight(account?: string | null) {
  const url = account ? `/api/ai/insights?account=${account}` : "/api/ai/insights"
  const { data, error, isLoading, mutate } = useSWR<InsightResponse>(url, fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  })
  return { data, error, isLoading, refresh: mutate }
}

export function useForecast() {
  const { data, error, isLoading } = useSWR("/api/forecast", fetcher, {
    refreshInterval: 30_000,
  })
  return { data, error, isLoading }
}

export function useGovernance() {
  const { data, error, isLoading, mutate } = useSWR("/api/governance/proposals", fetcher, {
    refreshInterval: 30_000,
  })
  return { data, error, isLoading, refresh: mutate }
}
