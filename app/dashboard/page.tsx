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
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

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
        <HeroSection />
        <NetworkSwitcher />
        <DashboardStats />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <VaultOverview />
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
