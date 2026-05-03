"use client"

import useSWR from "swr"
import { ContractHeader, MetricRow, FieldLabel } from "./contract-header"
import { CONTRACT_ADDRESSES } from "@/lib/deployment-config"
import { fetcher } from "@/hooks/use-protocol"

type Snapshot = {
  emergency?: { paused: boolean; circuitBreakerActive: boolean; lastCheck: number }
  risk?: { paused: boolean }
}

export function EmergencyPanel() {
  const address = CONTRACT_ADDRESSES.AMOY.EmergencyControl as `0x${string}`
  const { data } = useSWR<Snapshot>("/api/onchain/snapshot", fetcher, { refreshInterval: 10000 })
  const e = data?.emergency
  const paused = !!e?.paused || !!data?.risk?.paused
  const breaker = !!e?.circuitBreakerActive
  const lastCheck = e?.lastCheck ? new Date(e.lastCheck * 1000) : null

  const stateLabel = paused ? "PAUSED" : breaker ? "CIRCUIT BREAKER" : "OPERATIONAL"
  const stateClass = paused
    ? "border-red-300/40 bg-red-300/10 text-red-200"
    : breaker
      ? "border-amber-300/40 bg-amber-300/10 text-amber-100"
      : "border-emerald-300/40 bg-emerald-300/10 text-emerald-100"

  return (
    <article id="emergency" className="ym-glass overflow-hidden rounded-2xl">
      <ContractHeader
        index="08"
        name="EmergencyControl"
        address={address}
        description="Multi-sig pause switch and circuit breaker. Triggers automatic withdrawal halts if RiskGuard reports a critical event."
      />
      <div className="grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <FieldLabel>System status</FieldLabel>
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${stateClass}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {stateLabel}
          </span>
          <MetricRow label="Vault paused" value={paused ? "Yes" : "No"} highlight={paused} />
          <MetricRow label="Circuit breaker" value={breaker ? "Active" : "Idle"} highlight={breaker} />
          <MetricRow
            label="Last health check"
            value={lastCheck ? lastCheck.toLocaleString() : "—"}
            mono
          />
        </div>
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <FieldLabel>Triggers</FieldLabel>
          <ul className="space-y-2 text-[12px] text-white/70">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-white/60" />
              <span>RiskGuard score &gt; 85 sustained for 3 epochs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-white/60" />
              <span>Pyth oracle staleness &gt; 60s on any underlying</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-white/60" />
              <span>NAV deviation from peer protocols &gt; 5%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-white/60" />
              <span>Multi-sig manual pause (3 of 5 signers)</span>
            </li>
          </ul>
        </div>
      </div>
    </article>
  )
}
