"use client"

import { useEffect, useState } from "react"
import { VaultPanel } from "./contracts/vault-panel"
import { TokenPanel } from "./contracts/token-panel"
import { StakingPanel } from "./contracts/staking-panel"
import { AiOraclePanel } from "./contracts/ai-oracle-panel"
import { RiskGuardPanel } from "./contracts/risk-guard-panel"
import { StrategyManagerPanel } from "./contracts/strategy-manager-panel"
import { InsurancePanel } from "./contracts/insurance-panel"
import { ExecutorPanel } from "./contracts/executor-panel"
import { RewardsPanel } from "./contracts/rewards-panel"
import { EmergencyPanel } from "./contracts/emergency-panel"
import { GovernancePanel } from "./contracts/governance-panel"

const SECTIONS: ReadonlyArray<{ id: string; index: string; name: string }> = [
  { id: "vault", index: "01", name: "YieldVault V4" },
  { id: "token", index: "02", name: "YLD Token" },
  { id: "staking", index: "03", name: "Staking" },
  { id: "ai-oracle", index: "04", name: "AI Oracle" },
  { id: "risk-guard", index: "05", name: "Risk Guard" },
  { id: "strategies", index: "06", name: "Strategies" },
  { id: "insurance", index: "07", name: "Insurance" },
  { id: "executor", index: "08", name: "Autonomous Executor" },
  { id: "rewards", index: "09", name: "Rewards" },
  { id: "emergency", index: "10", name: "Emergency" },
  { id: "governance", index: "11", name: "Governance" },
]

export function ContractsHub() {
  const [active, setActive] = useState<string>("vault")

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <section className="ym-reveal" aria-labelledby="contracts-hub-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/45">
            ▲▲ ON-CHAIN MODULES
          </p>
          <h2
            id="contracts-hub-heading"
            className="mt-2 text-balance font-serif text-3xl font-light tracking-tight text-white md:text-4xl"
          >
            Smart contract control center
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
            Every YieldMind contract surfaced as a live, interactive panel. All reads come from Polygon Amoy via
            multicall; every write is signed by your connected wallet — no relayers, no off-chain custody.
          </p>
        </div>
        <div className="hidden gap-2 lg:flex">
          <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            11 contracts
          </span>
          <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100">
            Live · Amoy
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sticky module index */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
              Modules
            </p>
            {SECTIONS.map((s) => {
              const isActive = active === s.id
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-all ${
                    isActive
                      ? "border-white/20 bg-white/[0.06] text-white"
                      : "border-transparent text-white/45 hover:border-white/10 hover:bg-white/[0.03] hover:text-white/80"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                    }`}
                  >
                    {s.index}
                  </span>
                  <span className="truncate font-semibold">{s.name}</span>
                  {isActive && <span className="ml-auto h-1 w-1 rounded-full bg-white" />}
                </a>
              )
            })}
          </div>
        </aside>

        <div className="flex flex-col gap-8">
          <VaultPanel />
          <TokenPanel />
          <StakingPanel />
          <AiOraclePanel />
          <RiskGuardPanel />
          <StrategyManagerPanel />
          <InsurancePanel />
          <ExecutorPanel />
          <RewardsPanel />
          <EmergencyPanel />
          <GovernancePanel />
        </div>
      </div>
    </section>
  )
}
