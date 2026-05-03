"use client"

import { SiteNav } from "@/components/landing/site-nav"
import { SiteFooter } from "@/components/landing/site-footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProtocolStats } from "@/components/dashboard/protocol-stats"
import { AiInsightPanel } from "@/components/dashboard/ai-insight-panel"
import { RebalanceStream } from "@/components/dashboard/rebalance-stream"
import { AllocationChart } from "@/components/dashboard/allocation-chart"
import { RiskFeed } from "@/components/dashboard/risk-feed"
import { OraclePanel } from "@/components/dashboard/oracle-panel"
import { RecentEvents } from "@/components/dashboard/recent-events"
import { StrategyList } from "@/components/dashboard/strategy-list"
import { InvestPanel } from "@/components/dashboard/invest-panel"
import { OpenSourceCard } from "@/components/dashboard/open-source-card"
import { WalletGate } from "@/components/dashboard/wallet-gate"
import { AiReviewButton } from "@/components/dashboard/ai-review-button"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="pt-16">
        <DashboardHeader />

        <WalletGate>
          <div className="mx-auto max-w-[1400px] space-y-6 px-4 py-8 md:px-8">
            {/* Tier 1: TVL / share price / APY / last rebalance */}
            <ProtocolStats />

            {/* Tier 2: AI insight (Groq) — full width */}
            <AiInsightPanel />

            {/* Tier 3: Centerpiece — interactive invest/withdraw/stake/claim/rebalance */}
            <InvestPanel />

            {/* Tier 4: Allocation + Risk + Oracle */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AllocationChart />
              </div>
              <RiskFeed />
            </div>

            {/* Tier 5: Streaming reasoning + Oracle feeds */}
            <div className="grid gap-6 lg:grid-cols-2">
              <RebalanceStream />
              <OraclePanel />
            </div>

            {/* Tier 6: Strategy list */}
            <StrategyList />

            {/* Tier 7: Open source — GitHub link instead of raw addresses */}
            <OpenSourceCard />

            {/* Tier 8: Events */}
            <RecentEvents />
          </div>

          {/* Floating AI Review orb — runs full review on click */}
          <AiReviewButton />
        </WalletGate>
      </main>

      <SiteFooter />
    </div>
  )
}
