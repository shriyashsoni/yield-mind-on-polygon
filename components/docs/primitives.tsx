"use client"

import { useState, type ReactNode } from "react"
import { Check, Copy } from "lucide-react"

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="group scroll-mt-28 pt-8 text-2xl font-semibold tracking-tight text-white md:text-3xl"
    >
      <a href={`#${id}`} className="relative inline-flex items-center gap-2">
        {children}
        <span
          aria-hidden
          className="font-mono text-xs text-white/30 opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </span>
      </a>
    </h2>
  )
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-28 pt-4 text-lg font-semibold text-white md:text-xl">
      {children}
    </h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-white/70">{children}</p>
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="border border-white/15 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[12px] text-white">
      {children}
    </code>
  )
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5 text-[15px] text-white/70 marker:text-white/40">{children}</ul>
}

export function Ol({ children }: { children: ReactNode }) {
  return <ol className="list-decimal space-y-1.5 pl-5 text-[15px] text-white/70 marker:text-white/40">{children}</ol>
}

export function Hr() {
  return <hr className="my-10 border-white/10" />
}

export function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <div className="not-prose my-5 border border-white/10 bg-black">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{language}</span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  )
}

type AdmonitionKind = "note" | "tip" | "warning" | "danger"

const ADMON: Record<AdmonitionKind, { label: string; bar: string }> = {
  note: { label: "Note", bar: "bg-white/40" },
  tip: { label: "Tip", bar: "bg-white" },
  warning: { label: "Warning", bar: "bg-white/70" },
  danger: { label: "Danger", bar: "bg-white" },
}

export function Admonition({
  kind = "note",
  title,
  children,
}: {
  kind?: AdmonitionKind
  title?: string
  children: ReactNode
}) {
  const cfg = ADMON[kind]
  return (
    <aside
      className="not-prose relative my-5 border border-white/10 bg-white/[0.02] p-4 pl-5"
      aria-label={cfg.label}
    >
      <span className={`absolute inset-y-0 left-0 w-[3px] ${cfg.bar}`} aria-hidden />
      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
        {title ?? cfg.label}
      </div>
      <div className="text-[14px] leading-relaxed text-white/75">{children}</div>
    </aside>
  )
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose my-5 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">{children}</div>
}

export function Stat({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="bg-black/40 p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{title}</div>
      <div className="mt-1 text-base font-semibold text-white">{value}</div>
      {sub && <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">{sub}</div>}
    </div>
  )
}
