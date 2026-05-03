"use client"

import { useState } from "react"
import { SectionLabel } from "./section-label"

interface Wave6Tab {
  id: string
  num: string
  name: string
  description: string
  icon: React.ReactNode
  wireframe: React.ReactNode
}

const TABS: Wave6Tab[] = [
  {
    id: "mandate",
    num: "01",
    name: "Portfolio Mandate",
    description:
      "Institutional-grade mandate management with customizable risk thresholds, APY targets, and chain diversification limits. Set once, optimize forever.",
    icon: <BrainIcon />,
    wireframe: <WireMandate />,
  },
  {
    id: "insurance",
    num: "02",
    name: "Risk Insurance Module",
    description:
      "AI-powered protection with automated reserves, drawdown simulation, and capital protection triggers. Sleep while your assets stay safe.",
    icon: <ShieldIcon />,
    wireframe: <WireInsurance />,
  },
  {
    id: "router",
    num: "03",
    name: "Cross-Chain Router",
    description:
      "Intelligent liquidity routing across 6+ chains with gas optimization and bridge health scoring. One click, any chain.",
    icon: <ChainIcon />,
    wireframe: <WireRouter />,
  },
  {
    id: "oracle",
    num: "04",
    name: "Oracle Redundancy",
    description:
      "99.99% uptime with Chainlink, Pyth, and Uniswap TWAP multi-oracle failover system. Data you can trust.",
    icon: <BoltIcon />,
    wireframe: <WireOracle />,
  },
  {
    id: "governance",
    num: "05",
    name: "Enhanced Governance",
    description:
      "Performance-based voting weights and treasury yield optimization through decentralized DAO control. Your vote, your yield.",
    icon: <VoteIcon />,
    wireframe: <WireGov />,
  },
  {
    id: "api",
    num: "06",
    name: "Enterprise API",
    description:
      "REST/WebSocket APIs for real-time risk scoring, AI forecasting, and autonomous webhook execution. Build on top of intelligence.",
    icon: <CodeIcon />,
    wireframe: <WireApi />,
  },
]

export function Wave6Section() {
  const [active, setActive] = useState(TABS[0].id)
  const tab = TABS.find((t) => t.id === active) ?? TABS[0]

  return (
    <section id="wave6" className="relative z-10 border-b border-white/10 bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="ym-reveal flex flex-col items-center gap-5 text-center" data-reveal>
          <SectionLabel>Wave 6 — Latest</SectionLabel>
          <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Enterprise-Grade DeFi Infrastructure
          </h2>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/55">
            Portfolio mandates, risk insurance, cross-chain routing, oracle redundancy, and
            autonomous governance.
          </p>
        </div>

        <div className="ym-reveal mt-16 grid gap-8 lg:grid-cols-[280px_1fr]" data-reveal>
          {/* Vertical tab list */}
          <ul className="flex flex-col gap-1 lg:gap-2" role="tablist" aria-label="Wave 6 features">
            {TABS.map((t) => {
              const isActive = t.id === active
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActive(t.id)}
                    className={[
                      "group flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all",
                      isActive
                        ? "border-white/25 bg-white/[0.05] text-white"
                        : "border-white/10 bg-transparent text-white/55 hover:border-white/20 hover:text-white",
                    ].join(" ")}
                  >
                    <span className="font-mono text-xs font-bold tracking-widest text-white/40 group-hover:text-white/70">
                      {t.num}
                    </span>
                    <span className="flex-1 text-sm font-semibold uppercase tracking-wider">
                      {t.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={[
                        "h-px flex-1 bg-white/30 transition-all",
                        isActive ? "max-w-8 opacity-100" : "max-w-0 opacity-0",
                      ].join(" ")}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Content panel */}
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            className="ym-glass relative overflow-hidden rounded-3xl p-8 md:p-12"
            style={{ animation: "ym-fade-up 0.5s cubic-bezier(0.4,0,0.2,1)" }}
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div className="flex flex-col gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-white">
                  {tab.icon}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                    {tab.num}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Live
                  </span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                  {tab.name}
                </h3>
                <p className="max-w-md text-pretty leading-relaxed text-white/55">
                  {tab.description}
                </p>
              </div>
              <div className="relative aspect-square w-full max-w-md self-center justify-self-end rounded-2xl border border-white/10 bg-black/40 p-6">
                {tab.wireframe}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ====== Icons ====== */

function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3a3 3 0 0 0-3 3v.5A3 3 0 0 0 4 9.5 3 3 0 0 0 5 14a3 3 0 0 0 1 5.5A3 3 0 0 0 9 21h.5a2.5 2.5 0 0 0 2.5-2.5V5.5A2.5 2.5 0 0 0 9.5 3H9z" />
      <path d="M15 3a3 3 0 0 1 3 3v.5a3 3 0 0 1 2 3 3 3 0 0 1-1 4.5 3 3 0 0 1-1 5.5A3 3 0 0 1 15 21h-.5a2.5 2.5 0 0 1-2.5-2.5V5.5A2.5 2.5 0 0 1 14.5 3H15z" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
function ChainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  )
}
function BoltIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  )
}
function VoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11h18l-2 9H5l-2-9z" />
      <path d="m9 7 3 3 5-5" />
    </svg>
  )
}
function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
      <path d="m13 4-2 16" />
    </svg>
  )
}

/* ====== Wireframe panel illustrations (white-line only) ====== */

const WIRE_PROPS = {
  fill: "none",
  stroke: "rgba(255,255,255,0.85)",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function WireMandate() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <g {...WIRE_PROPS}>
        <rect x="20" y="24" width="280" height="40" rx="8" />
        <text x="36" y="50" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="11" fontFamily="ui-monospace">PORTFOLIO MANDATE / RISK 0.4</text>
        <rect x="20" y="80" width="180" height="14" rx="4" />
        <rect x="20" y="80" width="120" height="14" rx="4" fill="rgba(255,255,255,0.85)" />
        <rect x="20" y="104" width="180" height="14" rx="4" />
        <rect x="20" y="104" width="80" height="14" rx="4" fill="rgba(255,255,255,0.6)" />
        <rect x="20" y="128" width="180" height="14" rx="4" />
        <rect x="20" y="128" width="150" height="14" rx="4" fill="rgba(255,255,255,0.4)" />
        <rect x="20" y="170" width="280" height="120" rx="10" />
        <polyline points="32,260 70,220 110,240 150,200 200,220 250,180 290,205" strokeWidth="1.5" />
        <line x1="32" y1="200" x2="290" y2="200" strokeOpacity="0.25" />
        <line x1="32" y1="240" x2="290" y2="240" strokeOpacity="0.25" />
        <line x1="32" y1="280" x2="290" y2="280" strokeOpacity="0.25" />
      </g>
    </svg>
  )
}

function WireInsurance() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <g {...WIRE_PROPS}>
        <path d="M160 30 L260 70 V160 c0 50 -45 100 -100 110 c-55 -10 -100 -60 -100 -110 V70 z" strokeWidth="1.5" />
        <path d="M125 150 l25 25 l50 -50" strokeWidth="2" />
        <text x="160" y="240" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="10" fontFamily="ui-monospace" textAnchor="middle">RESERVE 12.4% / DRAWDOWN -3.1%</text>
        <rect x="40" y="265" width="240" height="30" rx="6" />
        <rect x="40" y="265" width="170" height="30" rx="6" fill="rgba(255,255,255,0.2)" />
      </g>
    </svg>
  )
}

function WireRouter() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <g {...WIRE_PROPS}>
        <circle cx="160" cy="160" r="20" fill="rgba(255,255,255,0.12)" />
        <text x="160" y="164" fill="rgba(255,255,255,0.9)" stroke="none" fontSize="9" fontFamily="ui-monospace" textAnchor="middle">YM</text>
        {[
          [60, 70], [260, 70], [40, 160], [280, 160], [60, 250], [260, 250],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1="160" y1="160" x2={x} y2={y} strokeDasharray="3 4" strokeOpacity="0.5" />
            <circle cx={x} cy={y} r="14" />
            <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.85)" />
          </g>
        ))}
      </g>
    </svg>
  )
}

function WireOracle() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <g {...WIRE_PROPS}>
        {[40, 80, 120, 160, 200, 240, 280].map((y) => (
          <line key={y} x1="20" y1={y} x2="300" y2={y} strokeOpacity="0.18" />
        ))}
        <polyline points="20,200 60,180 100,210 140,150 180,170 220,120 260,140 300,90" strokeWidth="1.5" />
        <polyline points="20,220 60,210 100,230 140,180 180,200 220,160 260,180 300,130" strokeOpacity="0.6" />
        <polyline points="20,240 60,235 100,250 140,210 180,225 220,200 260,210 300,170" strokeOpacity="0.35" />
        <text x="20" y="50" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="10" fontFamily="ui-monospace">CHAINLINK · PYTH · UNI TWAP</text>
        <text x="280" y="50" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="10" fontFamily="ui-monospace" textAnchor="end">99.99%</text>
      </g>
    </svg>
  )
}

function WireGov() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <g {...WIRE_PROPS}>
        <rect x="20" y="30" width="280" height="50" rx="8" />
        <text x="36" y="60" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="11" fontFamily="ui-monospace">PROPOSAL #042 — TREASURY YIELD</text>
        <rect x="20" y="100" width="280" height="36" rx="6" />
        <rect x="20" y="100" width="200" height="36" rx="6" fill="rgba(255,255,255,0.85)" />
        <text x="30" y="123" fill="rgba(0,0,0,0.85)" stroke="none" fontSize="11" fontFamily="ui-monospace">FOR · 71%</text>
        <rect x="20" y="150" width="280" height="36" rx="6" />
        <rect x="20" y="150" width="80" height="36" rx="6" fill="rgba(255,255,255,0.4)" />
        <text x="30" y="173" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="11" fontFamily="ui-monospace">AGAINST · 29%</text>
        <rect x="20" y="210" width="130" height="80" rx="8" />
        <text x="36" y="240" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="10" fontFamily="ui-monospace">QUORUM</text>
        <text x="36" y="270" fill="rgba(255,255,255,0.95)" stroke="none" fontSize="22" fontFamily="ui-monospace" fontWeight="700">94%</text>
        <rect x="170" y="210" width="130" height="80" rx="8" />
        <text x="186" y="240" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="10" fontFamily="ui-monospace">VOTERS</text>
        <text x="186" y="270" fill="rgba(255,255,255,0.95)" stroke="none" fontSize="22" fontFamily="ui-monospace" fontWeight="700">2,418</text>
      </g>
    </svg>
  )
}

function WireApi() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <g {...WIRE_PROPS}>
        <rect x="20" y="24" width="280" height="280" rx="10" />
        <line x1="20" y1="56" x2="300" y2="56" />
        <circle cx="40" cy="40" r="3" fill="rgba(255,255,255,0.85)" />
        <circle cx="54" cy="40" r="3" fill="rgba(255,255,255,0.55)" />
        <circle cx="68" cy="40" r="3" fill="rgba(255,255,255,0.3)" />
        <text x="34" y="80" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="10" fontFamily="ui-monospace">POST /v1/risk-score</text>
        <text x="34" y="104" fill="rgba(255,255,255,0.55)" stroke="none" fontSize="10" fontFamily="ui-monospace">{`{`}</text>
        <text x="50" y="124" fill="rgba(255,255,255,0.55)" stroke="none" fontSize="10" fontFamily="ui-monospace">"wallet": "0xA1b2…",</text>
        <text x="50" y="144" fill="rgba(255,255,255,0.55)" stroke="none" fontSize="10" fontFamily="ui-monospace">"chain": "polygon-zkevm",</text>
        <text x="50" y="164" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="10" fontFamily="ui-monospace">"score": 0.82,</text>
        <text x="50" y="184" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="10" fontFamily="ui-monospace">"forecast_apy": 12.4</text>
        <text x="34" y="204" fill="rgba(255,255,255,0.55)" stroke="none" fontSize="10" fontFamily="ui-monospace">{`}`}</text>
        <line x1="34" y1="234" x2="286" y2="234" strokeDasharray="2 4" strokeOpacity="0.4" />
        <text x="34" y="258" fill="rgba(255,255,255,0.85)" stroke="none" fontSize="10" fontFamily="ui-monospace">200 OK · 14ms</text>
        <text x="286" y="258" fill="rgba(255,255,255,0.55)" stroke="none" fontSize="10" fontFamily="ui-monospace" textAnchor="end">webhook ✓</text>
      </g>
    </svg>
  )
}
