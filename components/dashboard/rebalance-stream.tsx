"use client"

import { useRef, useState } from "react"
import { Panel } from "./panel"

export function RebalanceStream() {
  const [text, setText] = useState("")
  const [status, setStatus] = useState<"idle" | "streaming" | "done" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const start = async () => {
    setText("")
    setErrorMsg(null)
    setStatus("streaming")

    const ctrl = new AbortController()
    abortRef.current = ctrl

    try {
      const res = await fetch("/api/ai/rebalance", {
        method: "POST",
        signal: ctrl.signal,
      })
      if (!res.ok || !res.body) {
        const err = await res.text().catch(() => "")
        throw new Error(err || `HTTP ${res.status}`)
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setText((t) => t + decoder.decode(value, { stream: true }))
      }
      setStatus("done")
    } catch (e: any) {
      if (e.name === "AbortError") {
        setStatus("idle")
        return
      }
      setErrorMsg(String(e.message ?? e))
      setStatus("error")
    } finally {
      abortRef.current = null
    }
  }

  const stop = () => {
    abortRef.current?.abort()
    setStatus("idle")
  }

  return (
    <Panel
      eyebrow="AI Rebalance Engine · Groq"
      title="Chain-of-thought reasoning"
      action={
        status === "streaming" ? (
          <button
            type="button"
            onClick={stop}
            className="border border-white/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:border-white"
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            className="group relative inline-flex items-center gap-2 border border-white bg-white px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white"
          >
            Run Analysis
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        )
      }
    >
      <div className="relative">
        <pre className="max-h-[420px] min-h-[180px] overflow-auto whitespace-pre-wrap break-words border border-white/10 bg-black/60 p-5 font-mono text-[12.5px] leading-relaxed text-white/85">
{text || (status === "streaming" ? "Connecting to Groq…" : "Click Run Analysis to stream live reasoning over current vault, oracle, and risk state.")}
{status === "streaming" && <span className="ml-0.5 inline-block h-3.5 w-2 animate-pulse bg-white align-middle" />}
        </pre>

        <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
          <span className="font-mono uppercase tracking-[0.2em]">
            {status === "streaming" ? "Streaming…" : status === "done" ? "Complete" : status === "error" ? "Error" : "Ready"}
          </span>
          {errorMsg && (
            <span className="text-white/60">
              {errorMsg.includes("GROQ_API_KEY") ? "Set GROQ_API_KEY in env vars" : errorMsg}
            </span>
          )}
        </div>
      </div>
    </Panel>
  )
}
