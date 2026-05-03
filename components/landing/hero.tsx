"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { ScrambleText } from "./scramble-text"
import { PoweredByPolygon } from "./powered-by-polygon"

export function Hero() {
  const shapeRef = useRef<HTMLDivElement>(null)

  // Mouse parallax for the geometric backdrop shape
  useEffect(() => {
    const el = shapeRef.current
    if (!el) return
    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      // parallax factor 0.02 — opposite direction
      tx = -x * 30
      ty = -y * 30
    }

    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Geometric backdrop shape (mouse parallax) */}
      <div
        ref={shapeRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          width="900"
          height="900"
          viewBox="0 0 900 900"
          className="opacity-[0.28]"
        >
          <g
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
          >
            <circle cx="450" cy="450" r="220" />
            <circle cx="450" cy="450" r="320" strokeDasharray="2 6" />
            <circle cx="450" cy="450" r="420" strokeOpacity="0.4" />
            <path d="M450 70 L830 450 L450 830 L70 450 Z" />
            <path d="M450 170 L730 450 L450 730 L170 450 Z" strokeOpacity="0.5" />
          </g>
          <g fill="rgba(255,255,255,0.85)">
            <circle cx="450" cy="230" r="2.5" />
            <circle cx="670" cy="450" r="2.5" />
            <circle cx="450" cy="670" r="2.5" />
            <circle cx="230" cy="450" r="2.5" />
          </g>
        </svg>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-black"
      />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Top badge */}
          <div className="ym-reveal" data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur">
              <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="currentColor" />
              </svg>
              Wave 6 — Institutional Enterprise
            </span>
          </div>

          {/* Headline */}
          <h1 className="ym-reveal max-w-5xl text-balance text-5xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[112px]" data-reveal>
            <ScrambleText
              as="span"
              text="MAXIMIZE YOUR"
              delay={120}
              duration={650}
              className="block"
            />
            <ScrambleText
              as="span"
              text="DEFI YIELDS"
              delay={420}
              duration={750}
              className="block"
            />
            <ScrambleText
              as="span"
              text="WITH AI"
              delay={780}
              duration={700}
              className="ym-text-stroke block"
            />
          </h1>

          {/* Subheadline */}
          <p
            className="ym-reveal max-w-2xl text-pretty text-base leading-relaxed text-white/55 md:text-lg"
            data-reveal
          >
            YieldMind automatically optimizes your portfolio across Polygon protocols using
            machine learning. Higher returns. Lower risk. Fully transparent.
          </p>

          {/* CTAs with rotating conic glow */}
          <div className="ym-reveal flex flex-col items-center gap-3 sm:flex-row" data-reveal>
            <div className="relative">
              <div className="ym-conic-glow rounded-full" aria-hidden="true" />
              <Link
                href="/dashboard"
                className="ym-shimmer relative z-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                <span className="relative">Launch App</span>
                <span aria-hidden="true" className="relative">→</span>
              </Link>
            </div>
            <Link
              href="/whitepaper"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.02] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/[0.06]"
            >
              Read Whitepaper
            </Link>
          </div>

          {/* Powered by Polygon pill */}
          <div className="ym-reveal pt-2" data-reveal>
            <PoweredByPolygon variant="pill" />
          </div>

          {/* Trust badges */}
          <div
            className="ym-reveal flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2 text-xs text-white/55"
            data-reveal
          >
            <TrustItem>Audited Smart Contracts</TrustItem>
            <TrustItem>DAO Governed</TrustItem>
            <TrustItem>Polygon zkEVM</TrustItem>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 font-medium uppercase tracking-[0.18em]">
      <Check className="h-3.5 w-3.5 text-white" />
      {children}
    </span>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M20 6 L9 17 L4 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
