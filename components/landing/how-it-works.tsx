import { SectionLabel } from "./section-label"

const STEPS = [
  {
    num: "01",
    title: "Connect",
    description:
      "Link your wallet. YieldMind reads your portfolio in seconds.",
    icon: <WalletIcon />,
  },
  {
    num: "02",
    title: "Optimize",
    description:
      "Our AI engine analyzes 50+ signals to find the highest risk-adjusted yield.",
    icon: <CpuIcon />,
  },
  {
    num: "03",
    title: "Earn",
    description:
      "Sit back. Automated rebalancing compounds your returns 24/7.",
    icon: <CoinIcon />,
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative z-10 border-b border-white/10 bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="ym-reveal flex flex-col items-center gap-5 text-center" data-reveal>
          <SectionLabel>Process</SectionLabel>
          <h2 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Three steps to optimized yield
          </h2>
        </div>

        <div className="ym-reveal mt-20 grid gap-12 md:grid-cols-3" data-reveal>
          {/* Connector line (md+ only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px md:block"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.25) 50%, transparent 50%)",
              backgroundSize: "10px 1px",
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 6rem",
            }}
          />

          {STEPS.map((s) => (
            <article
              key={s.num}
              className="relative flex flex-col items-center gap-5 text-center"
            >
              <div className="relative">
                <span
                  className="font-black uppercase leading-none tracking-tight ym-text-stroke"
                  style={{ fontSize: "84px" }}
                >
                  {s.num}
                </span>
                <span className="absolute -bottom-2 -right-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black text-white">
                  {s.icon}
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-white/55">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
}

function WalletIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      <path d="M16 12h2" />
      <path d="M3 9h14" />
    </svg>
  )
}
function CpuIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  )
}
function CoinIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />
    </svg>
  )
}
