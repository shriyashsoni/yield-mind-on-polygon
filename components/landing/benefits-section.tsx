import { SectionLabel } from "./section-label"

interface Benefit {
  num: string
  title: string
  description: string
  icon: React.ReactNode
}

const BENEFITS: Benefit[] = [
  {
    num: "01",
    title: "AI-Powered Optimization",
    description:
      "ML models predict optimal allocations from historical yield data and volatility.",
    icon: <BrainSvg />,
  },
  {
    num: "02",
    title: "Risk Management",
    description:
      "Automated diversification with real-time circuit breakers and rebalancing.",
    icon: <ShieldSvg />,
  },
  {
    num: "03",
    title: "Gas Optimized",
    description:
      "Built on Polygon zkEVM — ultra-low fees, lightning-fast execution.",
    icon: <BoltSvg />,
  },
  {
    num: "04",
    title: "Multi-Protocol",
    description:
      "Allocate seamlessly across Aave, Balancer, Curve, QuickSwap, and more.",
    icon: <ChainSvg />,
  },
  {
    num: "05",
    title: "Transparent Analytics",
    description:
      "Real-time dashboards with yield breakdowns, fees, and strategy tracking.",
    icon: <BarSvg />,
  },
  {
    num: "06",
    title: "DAO Governance",
    description:
      "Community-driven strategies through decentralized on-chain voting.",
    icon: <VoteSvg />,
  },
]

export function BenefitsSection() {
  return (
    <section id="features" className="relative z-10 border-b border-white/10 bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="ym-reveal flex flex-col items-center gap-5 text-center" data-reveal>
          <SectionLabel>Benefits</SectionLabel>
          <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Purpose-built to scale your yields
          </h2>
        </div>

        <div className="ym-reveal mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal>
          {BENEFITS.map((b) => (
            <article key={b.num} className="ym-glass relative flex flex-col gap-5 rounded-2xl p-7">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-white/30">
                  {b.num}
                </span>
                <span className="text-white">{b.icon}</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">{b.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{b.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
}

function BrainSvg() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9 3a3 3 0 0 0-3 3v.5A3 3 0 0 0 4 9.5 3 3 0 0 0 5 14a3 3 0 0 0 1 5.5A3 3 0 0 0 9 21h.5a2.5 2.5 0 0 0 2.5-2.5V5.5A2.5 2.5 0 0 0 9.5 3H9z" />
      <path d="M15 3a3 3 0 0 1 3 3v.5a3 3 0 0 1 2 3 3 3 0 0 1-1 4.5 3 3 0 0 1-1 5.5A3 3 0 0 1 15 21h-.5a2.5 2.5 0 0 1-2.5-2.5V5.5A2.5 2.5 0 0 1 14.5 3H15z" />
    </svg>
  )
}
function ShieldSvg() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
function BoltSvg() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  )
}
function ChainSvg() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  )
}
function BarSvg() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 3v18h18" />
      <path d="M7 14v4" />
      <path d="M12 9v9" />
      <path d="M17 5v13" />
    </svg>
  )
}
function VoteSvg() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 11h18l-2 9H5l-2-9z" />
      <path d="m9 7 3 3 5-5" />
    </svg>
  )
}
