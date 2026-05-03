import { Counter } from "./counter"
import { SectionLabel } from "./section-label"

const STATS = [
  { value: 2.4, decimals: 1, prefix: "$", suffix: "B+", label: "Total Value Optimized" },
  { value: 12.4, decimals: 1, suffix: "%", label: "Average APY Boost" },
  { value: 99.99, decimals: 2, suffix: "%", label: "Smart Contract Uptime" },
  { value: 6, suffix: "+", label: "Supported Chains" },
  { value: 50, suffix: "K+", label: "Active Wallets" },
  { value: 0.002, decimals: 3, prefix: "$", label: "Avg Transaction Cost" },
  { value: 15, suffix: "ms", label: "AI Decision Speed" },
  { value: 8, label: "DeFi Protocols" },
]

export function StatsSection() {
  return (
    <section id="stats" className="relative z-10 border-b border-white/10 bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="ym-reveal flex flex-col items-center gap-5 text-center" data-reveal>
          <SectionLabel>Platform Metrics</SectionLabel>
          <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Numbers that speak for themselves
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-white/55">
            Real-time platform performance — verified on-chain, transparent, audited.
          </p>
        </div>

        <div className="ym-reveal mt-14" data-reveal>
          {/* Horizontal snap rail (matches Polygon stat strip); becomes grid on lg+ */}
          <div className="ym-no-scrollbar ym-snap-x flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {STATS.map((s, i) => (
              <article
                key={i}
                className="ym-glass ym-snap-item flex min-w-[260px] shrink-0 flex-col gap-3 rounded-2xl p-6 lg:min-w-0"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="text-4xl font-black tracking-tight text-white md:text-[44px]">
                  <Counter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals}
                  />
                </div>
                <p className="text-sm font-medium text-white/55">{s.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
