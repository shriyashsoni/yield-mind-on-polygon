"use client"

import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { StatTile } from "./panel"
import { fmtNum, fmtPct, fmtUsd, timeAgo } from "./format"

export function ProtocolStats() {
  const { data, isLoading, error } = useProtocolSnapshot()

  if (error) {
    return (
      <div className="border border-white/10 bg-black/30 p-5 text-sm text-white/60">
        Failed to load protocol stats. Retrying…
      </div>
    )
  }

  const tvl = data?.protocol?.tvlUsd ?? 0
  const sharePrice = data?.protocol?.sharePriceUsd ?? 1
  const apy = data?.protocol?.estimatedApy ?? 0
  const totalShares = data?.protocol?.totalShares ?? 0
  const lastRebalance = data?.protocol?.lastRebalance

  return (
    <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
      <StatTile
        label="Total Value Locked"
        value={isLoading ? "—" : fmtUsd(tvl, 0)}
        sub="Denominated in MATIC · Polygon"
        trend="up"
      />
      <StatTile
        label="Share Price"
        value={isLoading ? "—" : `${sharePrice.toFixed(4)} MATIC`}
        sub={`Total shares: ${fmtNum(totalShares, 2)} ymMATIC`}
      />
      <StatTile
        label="Estimated APY"
        value={isLoading ? "—" : fmtPct(apy)}
        sub="Live, AI-optimized"
        trend="up"
      />
      <StatTile
        label="Last Rebalance"
        value={isLoading ? "—" : timeAgo(lastRebalance)}
        sub={data?.protocol?.totalRebalances != null ? `${data.protocol.totalRebalances} total events` : "—"}
      />
    </div>
  )
}
