"use client"

import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { Panel } from "./panel"
import { fmtPct, timeAgo } from "./format"

export function OraclePanel() {
  const { data } = useProtocolSnapshot()
  const feeds = data?.oracle?.feeds ?? []

  return (
    <Panel
      eyebrow="Pyth"
      title="Oracle Feeds"
      action={
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {feeds.length} feeds
        </span>
      }
    >
      {feeds.length === 0 ? (
        <p className="text-sm text-white/50">No oracle feeds wired. Configure Pyth IDs in deployment-config to enable price streaming.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
          {feeds.map((f) => (
            <li key={f.symbol} className="bg-black/40 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  {f.symbol}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                  {timeAgo(f.publishTime)}
                </span>
              </div>
              <div className="mt-2 text-xl font-semibold tabular-nums text-white">
                {f.price?.toLocaleString("en-US", { maximumFractionDigits: 4 })}
              </div>
              <div className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                <span className={f.change24h >= 0 ? "text-white" : "text-white/40"}>
                  {f.change24h >= 0 ? "▲" : "▼"} {fmtPct(Math.abs(f.change24h ?? 0), 2)}
                </span>
                <span className="text-white/40">conf ±{f.confidence?.toFixed(4) ?? "0"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
