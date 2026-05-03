"use client"

import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { Panel } from "./panel"
import { shortAddr, timeAgo } from "./format"

export function RecentEvents() {
  const { data } = useProtocolSnapshot()
  const events = data?.events ?? []

  return (
    <Panel
      eyebrow="On-chain"
      title="Recent Activity"
      action={
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {events.length} events
        </span>
      }
    >
      {events.length === 0 ? (
        <p className="text-sm text-white/50">
          No recent activity. As soon as the AI agent rebalances or users deposit, events will stream in here.
        </p>
      ) : (
        <ul className="divide-y divide-white/10">
          {events.slice(0, 10).map((e, i) => (
            <li key={`${e.txHash}-${i}`} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 shrink-0 bg-white"
                  style={{ opacity: e.kind === "rebalance" ? 1 : 0.55 }}
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium uppercase tracking-tight text-white">
                    {labelFor(e.kind)}
                  </div>
                  <div className="truncate font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                    {e.actor ? shortAddr(e.actor) : "system"}
                    {e.detail ? ` · ${e.detail}` : ""}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-[11px] text-white/70 tabular-nums">{timeAgo(e.timestamp)}</div>
                <a
                  href={e.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white"
                >
                  {shortAddr(e.txHash, 3)} ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}

function labelFor(kind: string) {
  switch (kind) {
    case "rebalance":
      return "AI Rebalance"
    case "deposit":
      return "Deposit"
    case "withdraw":
      return "Withdraw"
    case "strategy_added":
      return "Strategy added"
    case "strategy_updated":
      return "Strategy updated"
    case "vote":
      return "Governance vote"
    default:
      return kind.replace(/_/g, " ")
  }
}
