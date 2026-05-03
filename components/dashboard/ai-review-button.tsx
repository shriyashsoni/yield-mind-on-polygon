"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, X, RefreshCw, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useWeb3 } from "@/lib/web3-context"
import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { fmtUsd } from "./format"

type AIInsight = {
  headline: string
  riskBand: "LOW" | "MODERATE" | "ELEVATED" | "HIGH"
  confidence: number
  recommendation: { action: string; reasoning: string }
  allocation: { protocol: string; pct: number; rationale: string }[]
  signals: { label: string; value: string; tone: "positive" | "neutral" | "negative" }[]
}

type Phase = "idle" | "scanning" | "ready" | "error"

export function AiReviewButton() {
  const { address } = useWeb3()
  const { data: snap } = useProtocolSnapshot()
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>("idle")
  const [insight, setInsight] = useState<AIInsight | null>(null)
  const [source, setSource] = useState<string | null>(null)
  const [reasoning, setReasoning] = useState("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const runReview = async () => {
    setPhase("scanning")
    setInsight(null)
    setReasoning("")
    setErrorMsg(null)
    setSource(null)

    const ctrl = new AbortController()
    abortRef.current = ctrl

    const insightUrl = address
      ? `/api/ai/insights?account=${address}`
      : "/api/ai/insights"

    try {
      // Fire structured insight + streamed reasoning in parallel
      const [insightRes] = await Promise.all([
        fetch(insightUrl, { signal: ctrl.signal }).then((r) => r.json()),
        streamReasoning(ctrl.signal),
      ])

      if (!insightRes?.ok) throw new Error(insightRes?.error || "ai_failed")
      setInsight(insightRes.insight)
      setSource(insightRes.source ?? null)
      setPhase("ready")
    } catch (e: any) {
      if (e?.name === "AbortError") {
        setPhase("idle")
        return
      }
      setErrorMsg(String(e?.message ?? e))
      setPhase("error")
    } finally {
      abortRef.current = null
    }
  }

  const streamReasoning = async (signal: AbortSignal) => {
    const res = await fetch("/api/ai/rebalance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account: address ?? null }),
      signal,
    })
    if (!res.ok || !res.body) return
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      setReasoning((t) => t + decoder.decode(value, { stream: true }))
    }
  }

  // Auto-run on first open
  useEffect(() => {
    if (open && phase === "idle") void runReview()
    if (!open) abortRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Run AI Review"
        className="group fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black text-white shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] transition-all hover:scale-105 hover:border-white hover:shadow-[0_0_45px_-3px_rgba(255,255,255,0.7)] md:bottom-10 md:right-10 md:h-16 md:w-16"
      >
        {/* Pulse rings */}
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-white/30" />
        <span aria-hidden className="absolute -inset-1 rounded-full border border-white/10" />
        {/* Sweep ring */}
        <span
          aria-hidden
          className="absolute inset-0 animate-spin rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 65%, rgba(255,255,255,0.5) 78%, transparent 92%)",
            animationDuration: "4s",
            mask: "radial-gradient(circle, transparent 50%, black 53%)",
            WebkitMask: "radial-gradient(circle, transparent 50%, black 53%)",
          }}
        />
        <Sparkles className="relative h-6 w-6 transition-transform group-hover:rotate-12 md:h-7 md:w-7" />
        <span className="sr-only">AI Review</span>

        {/* Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border border-white/20 bg-black px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/85 group-hover:block">
          AI Review →
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl overflow-hidden border border-white/15 bg-black p-0 text-white sm:rounded-none">
          <DialogTitle className="sr-only">AI Review</DialogTitle>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-black p-6">
            <div className="flex items-start gap-3">
              <div className="relative grid h-10 w-10 place-items-center rounded-full border border-white/30">
                <Sparkles className="h-5 w-5" />
                {phase === "scanning" && (
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-white/40" />
                )}
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  YieldMind Agent
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">Full Portfolio Review</h2>
                <p className="mt-1 text-xs text-white/55">
                  Vault state · risk model · oracle forecast · strategies{address ? " · your position" : ""}.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={runReview}
                disabled={phase === "scanning"}
                className="inline-flex items-center gap-2 border border-white/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-white disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 ${phase === "scanning" ? "animate-spin" : ""}`} />
                Re-run
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center border border-white/15 text-white/60 transition-colors hover:border-white hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto bg-black p-6">
            {/* Snapshot chips — what was reviewed */}
            <SnapshotChips snap={snap} />

            {phase === "scanning" && !insight && <ScanningSkeleton />}

            {phase === "error" && (
              <div className="border border-white/15 bg-white/[0.02] p-5 text-sm text-white/70">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Error</div>
                <div className="mt-2">{errorMsg}</div>
              </div>
            )}

            {insight && (
              <>
                <ResultHeadline insight={insight} source={source} />
                <Recommendation insight={insight} />
                <SignalsGrid insight={insight} />
                <AllocationList insight={insight} />
              </>
            )}

            {/* Streaming reasoning */}
            <Reasoning text={reasoning} active={phase === "scanning"} />

            {phase === "scanning" && (
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                <Loader2 className="h-3 w-3 animate-spin" />
                Analyzing on-chain state…
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function SnapshotChips({ snap }: { snap: ReturnType<typeof useProtocolSnapshot>["data"] }) {
  if (!snap) return null
  const chips = [
    { k: "TVL", v: fmtUsd(snap.protocol?.tvlUsd ?? 0, 0) },
    { k: "APY", v: `${(snap.vault?.yieldRateApy ?? 0).toFixed(2)}%` },
    { k: "Risk", v: `${snap.risk?.riskScore ?? 0}/100` },
    { k: "Forecast", v: `${(snap.forecast?.predictedAPY ?? 0).toFixed(2)}%` },
    { k: "Block", v: `#${snap.network?.blockNumber ?? 0}` },
  ]
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {chips.map((c) => (
        <span
          key={c.k}
          className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] tabular-nums text-white/85"
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">{c.k}</span>
          <span>{c.v}</span>
        </span>
      ))}
    </div>
  )
}

function ScanningSkeleton() {
  return (
    <div className="space-y-3 border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        <Loader2 className="h-3 w-3 animate-spin" />
        Scanning protocol…
      </div>
      <div className="h-3 w-3/4 animate-pulse bg-white/10" />
      <div className="h-3 w-2/3 animate-pulse bg-white/10" />
      <div className="h-3 w-4/5 animate-pulse bg-white/10" />
    </div>
  )
}

function ResultHeadline({ insight, source }: { insight: AIInsight; source: string | null }) {
  const bandColor =
    insight.riskBand === "LOW"
      ? "text-white"
      : insight.riskBand === "MODERATE"
        ? "text-white/85"
        : insight.riskBand === "ELEVATED"
          ? "text-white/75"
          : "text-white/65"

  return (
    <div className="border border-white/12 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        <span>Verdict</span>
        <span>{source === "deterministic" ? "Deterministic (no GROQ_API_KEY)" : source}</span>
      </div>
      <p className="mt-3 text-balance text-base font-medium leading-snug text-white">
        {insight.headline}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className={`font-mono uppercase tracking-[0.2em] ${bandColor}`}>
          Risk · {insight.riskBand}
        </span>
        <span className="font-mono text-white/55">
          Confidence · <span className="text-white">{insight.confidence}%</span>
        </span>
      </div>
    </div>
  )
}

function Recommendation({ insight }: { insight: AIInsight }) {
  return (
    <div className="mt-4 border border-white/12 bg-white/[0.02] p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        Recommended Action
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="border border-white bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-black">
          {insight.recommendation.action}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">
        {insight.recommendation.reasoning}
      </p>
    </div>
  )
}

function SignalsGrid({ insight }: { insight: AIInsight }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-3">
      {insight.signals.map((s) => (
        <div key={s.label} className="bg-black p-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">{s.label}</div>
          <div
            className={`mt-1.5 font-mono text-sm tabular-nums ${
              s.tone === "negative" ? "text-white/60" : "text-white"
            }`}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  )
}

function AllocationList({ insight }: { insight: AIInsight }) {
  return (
    <div className="mt-4 border border-white/12 bg-white/[0.02] p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        Target Allocation
      </div>
      <ul className="mt-3 space-y-3">
        {insight.allocation.map((a) => (
          <li key={a.protocol} className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-white">{a.protocol}</span>
              <span className="font-mono text-sm tabular-nums text-white/85">{a.pct}%</span>
            </div>
            <div className="h-px w-full bg-white/8">
              <div
                className="h-full bg-white"
                style={{ width: `${Math.min(100, Math.max(0, a.pct))}%` }}
              />
            </div>
            <p className="text-xs text-white/55">{a.rationale}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Reasoning({ text, active }: { text: string; active: boolean }) {
  if (!text && !active) return null
  return (
    <div className="mt-4">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        Chain-of-thought
      </div>
      <pre className="max-h-[280px] overflow-auto whitespace-pre-wrap break-words border border-white/10 bg-black p-4 font-mono text-[12px] leading-relaxed text-white/80">
{text || "Connecting to Groq…"}
{active && <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-white align-middle" />}
      </pre>
    </div>
  )
}
