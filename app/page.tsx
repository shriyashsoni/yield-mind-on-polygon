"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, TrendingUp, Shield, Zap, BarChart3, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border-2 border-gray-200 shadow-lg">
                <span className="text-sm font-medium text-gray-700">Powered by</span>
                <Image src="/polygon-logo.png" alt="Polygon" width={120} height={30} className="h-7 w-auto" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered DeFi Optimization</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              Maximize Your DeFi Yields with <span className="text-primary">AI Intelligence</span>
            </h1>

            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              YieldMind automatically optimizes your portfolio across Polygon protocols using machine learning. Get
              higher returns with lower risk through transparent, DAO-governed strategies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 gap-2">
                  Launch App <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Audited Smart Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>DAO Governed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Polygon zkEVM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose YieldMind?</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Advanced AI algorithms combined with battle-tested DeFi protocols to deliver superior risk-adjusted
              returns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Optimization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Machine learning models trained on historical yield data, gas fees, and volatility to predict optimal
                  allocations
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Risk Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Automated diversification across multiple protocols with real-time risk monitoring and circuit
                  breakers
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Gas Optimized</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built on Polygon zkEVM for ultra-low transaction costs and lightning-fast execution
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multi-Protocol Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seamlessly allocate across Aave, Balancer, Curve, QuickSwap, and more top DeFi protocols
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Transparent Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time performance tracking with detailed breakdowns of yields, fees, and strategy performance
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">DAO Governance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Community-driven strategy approval and parameter adjustments through decentralized voting
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Polygon Technology Section */}
      <section className="py-24 border-y border-border bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-4 mb-6 px-8 py-4 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-xl">
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Built on</span>
                <Image src="/polygon-logo.png" alt="Polygon" width={160} height={40} className="h-10 w-auto" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Powered by Polygon Technology</h2>
              <p className="text-lg text-muted-foreground text-balance">
                Leveraging Polygon's cutting-edge zkEVM technology for optimal performance and security
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 bg-white dark:bg-card shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30">
                    <Image src="/polygon-logo.png" alt="Polygon zkEVM" width={100} height={25} className="h-6 w-auto" />
                  </div>
                  <h3 className="text-xl font-bold">Polygon zkEVM</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ultra-low gas fees and lightning-fast transactions powered by zero-knowledge rollup technology
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 bg-white dark:bg-card shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-center p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Enterprise Security</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ethereum-level security with transparent optimization logs verified on-chain
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 bg-white dark:bg-card shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-center p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Scalable Infrastructure</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Handle thousands of rebalancing operations with minimal costs on Polygon's high-performance network
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30">
                    <Image src="/polygon-logo.png" alt="Polygon" width={140} height={35} className="h-8 w-auto" />
                  </div>
                  <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />
                  <div>
                    <div className="font-bold text-lg text-gray-900 dark:text-gray-100">Polygon Ecosystem Partner</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Building the future of DeFi optimization
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="lg" className="border-2 bg-white dark:bg-gray-900" asChild>
                  <a href="https://polygon.technology" target="_blank" rel="noopener noreferrer">
                    Learn More About Polygon
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-4xl font-bold">Ready to Optimize Your Yields?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Join thousands of users already earning higher returns with AI-powered portfolio management
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 gap-2">
                  Get Started Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <span className="font-bold">YieldMind</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered DeFi portfolio optimization on Polygon</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/dashboard" className="block hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link href="/products" className="block hover:text-foreground transition-colors">
                  Products
                </Link>
                <Link href="/strategies" className="block hover:text-foreground transition-colors">
                  Strategies
                </Link>
                <Link href="/analytics" className="block hover:text-foreground transition-colors">
                  Analytics
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/about" className="block hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="/docs" className="block hover:text-foreground transition-colors">
                  Documentation
                </Link>
                <Link href="/whitepaper" className="block hover:text-foreground transition-colors">
                  Whitepaper
                </Link>
                <Link href="/governance" className="block hover:text-foreground transition-colors">
                  Governance
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-foreground transition-colors"
                >
                  Discord
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://polygon.technology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-foreground transition-colors"
                >
                  Polygon
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">© 2025 YieldMind. All rights reserved.</div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">Powered by</span>
              <Image src="/polygon-logo.png" alt="Polygon" width={90} height={22} className="h-5 w-auto" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
