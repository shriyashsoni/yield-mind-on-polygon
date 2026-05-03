"use client"

import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"
import { fmtNum, fmtPct, shortAddr } from "../format"
import { ContractHeader, MetricRow } from "./contract-header"

const SM = CONTRACT_ADDRESSES.AMOY.StrategyManager

export function StrategyManagerPanel() {
  const { data } = useProtocolSnapshot()
  const strategies = data?.strategies ?? []
  const totalWeight = strategies.reduce((acc, s) => acc + (s.weight ?? 0), 0)

  return (
    <div className="space-y-5">
      <ContractHeader
        name="Strategy Manager"
        address={SM}
        description="Registry of approved DeFi strategies. The vault allocates by weight; new strategies require a Governor proposal."
      />

      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
        <MetricRow label="Active strategies" value={String(strategies.length)} sub="On-chain" />
        <MetricRow
          label="Avg APY"
          value={fmtPct(strategies.reduce((a, s) => a + s.apy, 0) / Math.max(1, strategies.length), 2)}
          sub="Weighted unset"
        />
        <MetricRow label="Total weight" value={`${(totalWeight * 100).toFixed(0)}%`} sub="Sum of allocation" />
        <MetricRow
          label="Avg risk"
          value={fmtNum(strategies.reduce((a, s) => a + s.riskScore, 0) / Math.max(1, strategies.length), 1)}
          sub="0-100"
        />
      </div>

      <div className="border border-white/10 bg-black/40">
        <div className="grid grid-cols-12 border-b border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <div className="col-span-4">Strategy</div>
          <div className="col-span-3">Address</div>
          <div className="col-span-2 text-right">Weight</div>
          <div className="col-span-2 text-right">APY</div>
          <div className="col-span-1 text-right">Risk</div>
        </div>
        {strategies.length === 0 ? (
          <div className="px-5 py-6 text-sm text-white/50">
            No strategies indexed yet. Once governance whitelists adapters, they will appear here in real time.
          </div>
        ) : (
          <ul>
            {strategies.map((s) => (
              <li
                key={s.id}
                className="grid grid-cols-12 items-center border-b border-white/5 px-5 py-3 last:border-b-0"
              >
                <div className="col-span-4 min-w-0">
                  <div className="truncate text-sm font-medium text-white">{s.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                    {s.protocol} · {s.asset}
                  </div>
                </div>
                <div className="col-span-3">
                  <a
                    href={`https://amoy.polygonscan.com/address/${s.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-white/60 hover:text-white"
                  >
                    {shortAddr(s.address, 5)}
                  </a>
                </div>
                <div className="col-span-2 text-right">
                  <div className="font-mono text-sm tabular-nums text-white">{(s.weight * 100).toFixed(1)}%</div>
                  <div className="mt-1 h-1 bg-white/10">
                    <div
                      className="h-full bg-white"
                      style={{ width: `${Math.min(100, s.weight * 100)}%` }}
                      aria-hidden
                    />
                  </div>
                </div>
                <div className="col-span-2 text-right font-mono text-sm tabular-nums text-white">
                  {s.apy.toFixed(2)}%
                </div>
                <div className="col-span-1 text-right font-mono text-sm tabular-nums text-white/70">
                  {s.riskScore.toFixed(0)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
