"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Target, Users, Shield, TrendingUp, Zap } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">About YieldMind</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Revolutionizing DeFi portfolio management with AI-powered optimization on Polygon
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                YieldMind is on a mission to democratize access to sophisticated DeFi portfolio management. By combining
                cutting-edge machine learning algorithms with battle-tested DeFi protocols on Polygon, we enable users
                to maximize their yields while minimizing risk through transparent, DAO-governed strategies.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the leading AI-powered DeFi optimization platform, making advanced yield strategies
                  accessible to everyone through transparent, automated portfolio management.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built by the community, for the community. Our DAO governance ensures that all major decisions are
                  made collectively, keeping the platform aligned with user interests.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold">Why Polygon?</h2>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30">
                <Image src="/polygon-logo.png" alt="Polygon" width={140} height={35} className="h-8 w-auto" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We chose Polygon zkEVM as our foundation because it offers the perfect combination of Ethereum security,
                ultra-low transaction costs, and lightning-fast execution. This enables us to perform frequent
                rebalancing operations without eating into user profits through high gas fees.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-card border">
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Ethereum Security</h4>
                  <p className="text-sm text-muted-foreground">Inherits Ethereum's battle-tested security model</p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Low Gas Fees</h4>
                  <p className="text-sm text-muted-foreground">Transactions cost pennies, not dollars</p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">High Performance</h4>
                  <p className="text-sm text-muted-foreground">Fast finality for optimal user experience</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold">Our Technology</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Machine Learning Engine</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our ML models are trained on historical yield data, gas fees, and volatility patterns to predict
                      optimal portfolio allocations. The models continuously learn and adapt to changing market
                      conditions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Smart Contract Architecture</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our vault system uses a modular strategy pattern, allowing for flexible protocol integrations
                      while maintaining security through audited, battle-tested code.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">DAO Governance</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All major strategy changes and parameter adjustments go through our DAO voting process, ensuring
                      transparency and community alignment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
