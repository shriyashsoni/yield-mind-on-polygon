import { SectionLabel } from "./section-label"

const SUB_ITEMS = [
  {
    title: "Polygon zkEVM",
    description: "Zero-knowledge rollup execution with full Ethereum equivalence.",
  },
  {
    title: "Enterprise Security",
    description: "Inherits Ethereum security, audited contracts, transparent on-chain logs.",
  },
  {
    title: "Scalable Infrastructure",
    description: "High-throughput, sub-cent gas costs, sub-second settlement.",
  },
]

const PROTOCOLS = ["AAVE", "BALANCER", "CURVE", "CHAINLINK", "PYTH"]

export function PolygonSection() {
  return (
    <section id="infrastructure" className="relative z-10 border-b border-white/10 bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="ym-reveal flex flex-col items-center gap-5 text-center" data-reveal>
          <SectionLabel>Infrastructure</SectionLabel>
          <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Powered by Polygon Technology
          </h2>
        </div>

        <div
          className="ym-reveal mt-16 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]"
          data-reveal
        >
          <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-8">
              <p className="max-w-md text-pretty text-base leading-relaxed text-white/65">
                Leveraging Polygon&apos;s zkEVM for enterprise performance and security. Every
                rebalance, every signal, fully verifiable on-chain.
              </p>
              <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
                {SUB_ITEMS.map((it) => (
                  <li key={it.title} className="grid grid-cols-[auto_1fr] items-start gap-5 py-5">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-[10px] font-bold text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                        {it.title}
                      </span>
                      <span className="text-sm leading-relaxed text-white/55">
                        {it.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="currentColor" />
                </svg>
                Polygon Ecosystem Partner
              </div>
            </div>

            {/* Orbit diagram */}
            <div className="relative mx-auto aspect-square w-full max-w-[480px]">
              <OrbitDiagram protocols={PROTOCOLS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OrbitDiagram({ protocols }: { protocols: string[] }) {
  // Static positions on outer ring (computed evenly).
  const radius = 44 // percent
  const positions = protocols.map((p, i) => {
    const angle = (i / protocols.length) * Math.PI * 2 - Math.PI / 2
    return {
      label: p,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    }
  })

  return (
    <div className="relative h-full w-full">
      {/* Rotating dotted rings (decorative, no labels) */}
      <div className="absolute inset-0 ym-spin-slow" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.5"
            strokeDasharray="1 4"
          />
          <circle cx="100" cy="22" r="2.5" fill="rgba(255,255,255,0.9)" />
          <circle cx="178" cy="100" r="2.5" fill="rgba(255,255,255,0.6)" />
          <circle cx="100" cy="178" r="2.5" fill="rgba(255,255,255,0.4)" />
          <circle cx="22" cy="100" r="2.5" fill="rgba(255,255,255,0.6)" />
        </svg>
      </div>
      <div className="absolute inset-6 ym-spin-slow-reverse" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
            strokeDasharray="2 6"
          />
        </svg>
      </div>

      {/* Static outer ring with labels */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Center diamond labeled YieldMind */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <path
              d="M50 6 L94 50 L50 94 L6 50 Z"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
            />
            <path
              d="M50 22 L78 50 L50 78 L22 50 Z"
              fill="white"
            />
          </svg>
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-black">
            YieldMind
          </span>
        </div>
      </div>

      {/* Protocol labels around the outer ring */}
      {positions.map((p) => (
        <div
          key={p.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
              {p.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
