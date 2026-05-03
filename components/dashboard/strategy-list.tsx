"use client"

import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { Panel } from "./panel"
import { fmtPct, shortAddr } from "./format"

export function StrategyList() {
  const { data } = useProtocolSnapshot()
  const strategies = data?.strategies ?? []

  return (
    <Panel
      eyebrow="On-chain"
      title="Registered Strategies"
      action={
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {strategies.length} active
        </span>
      }
    >
      {strategies.length === 0 ? (
        <p className="text-sm text-white/50">
          The vault has no strategies yet. Run the strategy registration script or vote in via governance.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <Th>#</Th>
                <Th>Strategy</Th>
                <Th>Protocol</Th>
                <Th className="text-right">Weight</Th>
                <Th className="text-right">APY</Th>
                <Th className="text-right">Risk</Th>
                <Th className="text-right">Address</Th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((s, i) => (
                <tr key={s.id} className="border-t border-white/10 hover:bg-white/[0.03]">
                  <Td className="font-mono text-[11px] tracking-wider text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </Td>
                  <Td>
                    <div className="font-medium text-white">{s.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {s.asset ?? "USDC"}
                    </div>
                  </Td>
                  <Td className="text-white/70">{s.protocol}</Td>
                  <Td className="text-right tabular-nums">{fmtPct(s.weight, 1)}</Td>
                  <Td className="text-right tabular-nums">{fmtPct(s.apy, 2)}</Td>
                  <Td className="text-right">
                    <RiskPill score={s.riskScore} />
                  </Td>
                  <Td className="text-right font-mono text-[11px] text-white/50">
                    {s.address ? shortAddr(s.address) : "—"}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  )
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`pb-3 pr-3 font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-white/40 ${className}`}
    >
      {children}
    </th>
  )
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-3 pr-3 align-top text-white/85 ${className}`}>{children}</td>
}

function RiskPill({ score }: { score: number }) {
  const v = Math.max(0, Math.min(100, Math.round(score)))
  const tier = v >= 70 ? "HIGH" : v >= 40 ? "MED" : "LOW"
  return (
    <span className="inline-flex items-center gap-2 border border-white/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
      <span aria-hidden className="inline-block h-1 w-1 bg-white" />
      {tier} · {v}
    </span>
  )
}
