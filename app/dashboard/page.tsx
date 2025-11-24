"use client"

import { useWeb3 } from "@/lib/web3-context"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { VaultOverview } from "@/components/vault-overview"
import { StrategyAllocation } from "@/components/strategy-allocation"
import { MLRecommendations } from "@/components/ml-recommendations"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { NetworkSwitcher } from "@/components/network-switcher"
import { TransactionHistory } from "@/components/transaction-history"
import { DashboardStats } from "@/components/dashboard-stats"
import { AutonomousMode } from "@/components/autonomous-mode"
import { RiskAnalysis } from "@/components/risk-analysis"
import { YieldForecast } from "@/components/yield-forecast"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Sparkles } from "lucide-react"

export default function DashboardPage() {
  const { isConnected } = useWeb3()
  const router = useRouter()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
                <p className="text-muted-foreground">
                  Please connect your wallet to access the dashboard and start optimizing your yields
                </p>
              </div>
              <Button onClick={() => router.push("/")} variant="outline">
                Go Back
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="rounded-lg bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 border border-cyan-500/20 p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-foreground">Wave 3 Features Now Live</h3>
                <p className="text-sm text-muted-foreground">Autonomous mode, AI v3, advanced risk analysis & more</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
              NEW
            </Badge>
          </div>
        </div>

        <HeroSection />
        <NetworkSwitcher />
        <DashboardStats />

        <div className="grid gap-6 lg:grid-cols-2">
          <AutonomousMode />
          <RiskAnalysis />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <VaultOverview />
            <YieldForecast />
            <PerformanceMetrics />
            <TransactionHistory />
          </div>
          <div className="space-y-6">
            <MLRecommendations />
            <StrategyAllocation />
          </div>
        </div>
      </main>
    </div>
  )
}
