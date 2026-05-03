"use client"

import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { Panel } from "./panel"
import { fmtPct, fmtUsd } from "./format"

export function AllocationChart() {
  const { data, isLoading } = useProtocolSnapshot()
  const strategies = data?.strategies ?? []
  const tvl = data?.protocol?.tvlUsd ?? 0

  const totalWeight = strategies.reduce((acc, s) => acc + (s.weight ?? 0), 0) || 1

  // Build SVG donut segments
  const radius = 80
  const stroke = 14
  const circumference = 2 * Math.PI * radius
  let offset = 0
  const segments = strategies.map((s, i) => {
    const fraction = (s.weight ?? 0) / totalWeight
    const length = circumference * fraction
    const dasharray = `${length} ${circumference - length}`
    const opacity = 1 - i * 0.13
    const seg = {
      id: s.id,
      name: s.name,
      weight: s.weight,
      tvl: tvl * fraction,
      apy: s.apy,
      dasharray,
      dashoffset: offset,
      opacity: Math.max(0.25, opacity),
    }
    offset -= length
    return seg
  })

  return (
    <Panel eyebrow="Vault" title="Strategy Allocation">
      <div className="grid items-center gap-6 md:grid-cols-[200px_1fr]">
        <div className="flex justify-center">
          <svg viewBox="-100 -100 200 200" width="200" height="200" aria-label="Allocation donut" role="img">
            <circle r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
            {segments.map((s) => (
              <circle
                key={s.id}
                r={radius}
                fill="none"
                stroke="white"
                strokeOpacity={s.opacity}
                strokeWidth={stroke}
                strokeDasharray={s.dasharray}
                strokeDashoffset={s.dashoffset}
                transform="rotate(-90)"
              />
            ))}
            <text
              textAnchor="middle"
              dy="-0.1em"
              className="fill-white font-mono"
              style={{ fontSize: 10, letterSpacing: "0.2em", opacity: 0.4 }}
            >
              TVL
            </text>
            <text
              textAnchor="middle"
              dy="1em"
              className="fill-white font-semibold"
              style={{ fontSize: 18 }}
            >
              {isLoading ? "—" : fmtUsd(tvl, 0)}
            </text>
          </svg>
        </div>

        <ul className="space-y-2">
          {segments.length === 0 && (
            <li className="text-sm text-white/50">No active strategies registered on-chain.</li>
          )}
          {segments.map((s, i) => (
            <li
              key={s.id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/10 py-2 last:border-0"
            >
              <span
                aria-hidden
                className="inline-block h-2 w-2 bg-white"
                style={{ opacity: s.opacity }}
              />
              <div>
                <div className="text-sm font-medium text-white">{s.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Strat #{String(i + 1).padStart(2, "0")} · APY {fmtPct(s.apy ?? 0)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-white tabular-nums">{fmtPct(s.weight, 1)}</div>
                <div className="font-mono text-[10px] text-white/40 tabular-nums">{fmtUsd(s.tvl, 0)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}
