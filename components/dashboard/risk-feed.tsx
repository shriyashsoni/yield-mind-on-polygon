"use client"

import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { Panel } from "./panel"
import { fmtPct } from "./format"

export function RiskFeed() {
  const { data } = useProtocolSnapshot()
  const risk = data?.risk
  const oracle = data?.oracle

  const score = risk?.systemScore ?? 0
  const v = Math.max(0, Math.min(100, Math.round(score)))

  const tier =
    v >= 75 ? "Critical" : v >= 55 ? "Elevated" : v >= 35 ? "Moderate" : v >= 15 ? "Low" : "Stable"

  return (
    <Panel eyebrow="On-chain Risk" title="System Risk Feed">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            Composite score
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-white">{v}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">/100</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Tier</div>
          <div className="mt-1 text-base font-semibold uppercase tracking-tight text-white">{tier}</div>
        </div>
      </div>

      <div className="mt-4 h-1 bg-white/10">
        <div className="h-full bg-white" style={{ width: `${v}%` }} aria-hidden />
      </div>

      <ul className="mt-6 space-y-3">
        <RiskRow label="Volatility (24h)" value={fmtPct(risk?.volatility24h ?? 0, 1)} />
        <RiskRow label="Max drawdown" value={fmtPct(risk?.maxDrawdown ?? 0, 1)} />
        <RiskRow label="Liquidity" value={risk?.liquidityTier ?? "—"} />
        <RiskRow
          label="Pyth feed latency"
          value={oracle?.lastUpdate ? `${Math.max(0, Math.floor(Date.now() / 1000 - oracle.lastUpdate))}s` : "—"}
        />
        <RiskRow
          label="Active strategies"
          value={data?.strategies?.length != null ? String(data.strategies.length) : "—"}
        />
      </ul>
    </Panel>
  )
}

function RiskRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-white/70">{label}</span>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-white tabular-nums">
        {value}
      </span>
    </li>
  )
}
