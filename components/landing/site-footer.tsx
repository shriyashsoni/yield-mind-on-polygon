import Link from "next/link"
import { PoweredByPolygon } from "./powered-by-polygon"

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Governance", href: "/governance" },
      { label: "Whitepaper", href: "/whitepaper" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Protocol",
    links: [
      { label: "YieldVault V4", href: "/docs/vault" },
      { label: "AI Agent", href: "/docs/ai-agent" },
      { label: "RiskGuard", href: "/docs/risk-guard" },
      { label: "Contract Addresses", href: "/docs/contracts" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Quickstart", href: "/docs/quickstart" },
      { label: "Architecture", href: "/docs/architecture" },
      { label: "API Reference", href: "/docs/api-reference" },
      { label: "Integrate", href: "/docs/integrate" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/shriyashsoni/yelid-mind-smart-contract" },
      { label: "Polygon", href: "https://polygon.technology" },
      { label: "Polygonscan", href: "https://amoy.polygonscan.com" },
      { label: "Polygon Amoy Faucet", href: "https://faucet.polygon.technology" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <DiamondMark />
              <span className="text-xl font-bold tracking-tight text-white">YieldMind</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              AI-powered DeFi portfolio optimization on Polygon. Higher returns. Lower risk.
              Fully transparent.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/40">© 2025 YieldMind. All rights reserved.</p>
          <PoweredByPolygon variant="pill" />
        </div>
      </div>
    </footer>
  )
}

function DiamondMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2 L22 12 L12 22 L2 12 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 6 L18 12 L12 18 L6 12 Z" fill="white" />
    </svg>
  )
}
