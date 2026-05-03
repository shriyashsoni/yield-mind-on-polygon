"use client"

import { useAiInsight } from "@/hooks/use-protocol"
import { Panel } from "./panel"
import { fmtPct } from "./format"
import { useState } from "react"

export function AiInsightPanel() {
  const { data, error, isLoading, mutate, isValidating } = useAiInsight()
  const [busy, setBusy] = useState(false)

  const refresh = async () => {
    setBusy(true)
    try {
      await mutate(undefined, { revalidate: true })
    } finally {
      setBusy(false)
    }
  }

  const insight = data?.insight
  const source = data?.source ?? "groq:llama-3.3-70b-versatile"
  const reservedRiskBand = insight?.riskBand ?? "MODERATE"

  return (
    <Panel
      eyebrow={`AI Agent · ${source}`}
      title="Live Strategy Reasoning"
      action={
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {isValidating ? "Refreshing" : "Live"}
          </span>
          <button
            type="button"
            onClick={refresh}
            disabled={busy || isValidating}
            className="border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white hover:text-white disabled:opacity-50"
          >
            {busy || isValidating ? "Thinking…" : "Re-analyze"}
          </button>
        </div>
      }
    >
      {error && (
        <div className="mb-4 border border-white/20 bg-white/5 px-3 py-2 text-xs text-white/70">
          AI insight error: {String(error.message ?? error)}.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Headline</div>
          <p className="mt-2 text-lg font-medium leading-snug text-white text-pretty">
            {isLoading ? "Reading on-chain state…" : insight?.headline ?? "No headline available"}
          </p>

          <div className="mt-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Recommendation · {insight?.recommendation?.action ?? "—"}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {isLoading
                ? "Aggregating vault, oracle and risk data…"
                : insight?.recommendation?.reasoning ?? "No reasoning produced."}
            </p>
          </div>

          {insight?.signals?.length ? (
            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Live signals
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">
                {insight.signals.map((sig, i) => (
                  <li key={i} className="bg-black/40 p-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {sig.label}
                    </div>
                    <div
                      className={[
                        "mt-1 text-sm font-semibold tabular-nums",
                        sig.tone === "positive"
                          ? "text-white"
                          : sig.tone === "negative"
                          ? "text-white/50"
                          : "text-white/80",
                      ].join(" ")}
                    >
                      {sig.value}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="border border-white/10 bg-white/[0.03] p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Risk band</div>
          <div className="mt-2 text-2xl font-semibold uppercase tracking-tight text-white">
            {reservedRiskBand}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <ScoreBlock label="Confidence" value={insight?.confidence ?? 0} />
            <ScoreBlock label="Risk index" value={mapRiskBandToScore(reservedRiskBand)} invert />
          </div>

          {insight?.allocation?.length ? (
            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Suggested mix
              </div>
              <div className="mt-3 space-y-2">
                {insight.allocation.slice(0, 5).map((s, i) => (
                  <AllocationBar key={`${s.protocol}-${i}`} label={s.protocol} pct={s.pct} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Panel>
  )
}

function mapRiskBandToScore(band: string) {
  switch (band) {
    case "LOW":
      return 15
    case "MODERATE":
      return 40
    case "ELEVATED":
      return 65
    case "HIGH":
      return 90
    default:
      return 40
  }
}

function ScoreBlock({ label, value, invert }: { label: string; value: number; invert?: boolean }) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  const tone = invert ? 100 - v : v
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-xl font-semibold tabular-nums text-white">{v}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">/100</span>
      </div>
      <div className="mt-2 h-1 bg-white/10">
        <div className="h-full bg-white transition-all" style={{ width: `${tone}%` }} aria-hidden />
      </div>
    </div>
  )
}

function AllocationBar({ label, pct }: { label: string; pct: number }) {
  const v = Math.max(0, Math.min(100, Math.round(pct)))
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/70">{label}</span>
        <span className="font-mono text-white/50">{fmtPct(v, 0)}</span>
      </div>
      <div className="mt-1 h-1 bg-white/10">
        <div className="h-full bg-white" style={{ width: `${v}%` }} aria-hidden />
      </div>
    </div>
  )
}
