"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Brain,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  Lock,
  Activity,
  Vote,
  LineChart,
  Workflow,
  Network,
  Globe,
} from "lucide-react"
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

      {/* Latest Updates Section - Wave 2 */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Wave 2 Updates</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">What's New in YieldMind</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Major upgrades and new features to enhance your DeFi experience
            </p>
            <div className="mt-6">
              <a
                href="https://yieldmind.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <Rocket className="w-4 h-4" />
                Try Live Demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* AI Optimization Engine v2 */}
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  <Sparkles className="w-3 h-3" />
                  NEW
                </span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Optimization Engine v2</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Improved prediction accuracy by training models on larger DeFi datasets, including protocol APYs,
                  liquidity depth, and market volatility
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <Activity className="w-3 h-3" />
                  <span>Enhanced ML Models</span>
                </div>
              </CardContent>
            </Card>

            {/* Smart Contract Upgrade */}
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  UPDATED
                </span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Smart Contract Upgrade</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Added automated rebalancing logic and safety circuit breakers to minimize impermanent loss during high
                  volatility
                </p>
                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium">
                  <Shield className="w-3 h-3" />
                  <span>Enhanced Security</span>
                </div>
              </CardContent>
            </Card>

            {/* zkEVM Integration */}
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500 text-white text-xs font-bold">
                  <Zap className="w-3 h-3" />
                  UPGRADED
                </span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">zkEVM Integration</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Migrated all core contracts fully to Polygon zkEVM, improving gas efficiency by 40% and enabling
                  zero-knowledge-based transaction proofs
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>40% Gas Savings</span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Dashboard */}
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500 text-white text-xs font-bold">
                  <BarChart3 className="w-3 h-3" />
                  ENHANCED
                </span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Performance Dashboard</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Enhanced the UI/UX for real-time visualization of yield curves, portfolio allocations, and AI
                  performance metrics
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                  <Activity className="w-3 h-3" />
                  <span>Real-time Analytics</span>
                </div>
              </CardContent>
            </Card>

            {/* DAO Module Expansion */}
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                  <Users className="w-3 h-3" />
                  EXPANDED
                </span>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/10 flex items-center justify-center">
                  <Vote className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold">DAO Module Expansion</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Enabled community staking and proposal-based governance through a transparent on-chain voting
                  mechanism
                </p>
                <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
                  <Users className="w-3 h-3" />
                  <span>Community Governed</span>
                </div>
              </CardContent>
            </Card>

            {/* Live Preview CTA */}
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5 hover:border-primary hover:shadow-xl transition-all">
              <CardContent className="p-6 space-y-4 flex flex-col justify-center h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Experience Wave 2</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Try all the new features live on our demo platform
                </p>
                <Button asChild className="w-full gap-2">
                  <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                    Launch Demo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Updates Section - Wave 3 */}
      <section className="py-24 bg-gradient-to-br from-cyan-500/5 via-teal-500/5 to-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 mb-4">
              <Rocket className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Wave 3 - Production Ready
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-4">🚀 Next-Generation Features</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Advanced AI forecasting, multi-asset vaults, cross-chain support, and autonomous rebalancing
            </p>
            <div className="mt-6">
              <Link
                href="/release/wave-3"
                className="inline-flex items-center gap-2 text-cyan-400 hover:underline font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Explore Wave 3 Features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            {/* AI Engine v3 */}
            <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-background hover:border-cyan-500/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold">AI Engine v3</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  7-day forecasting, risk scoring (0-100), sentiment analysis, and explainable AI recommendations
                </p>
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <LineChart className="w-3 h-3" />
                  <span>Predictive Analytics</span>
                </div>
              </CardContent>
            </Card>

            {/* YieldVault v3 */}
            <Card className="border-2 border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-background hover:border-teal-500/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-500/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold">YieldVault v3</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Multi-asset support (USDC, DAI, ETH), time-weighted rebalancing, dynamic fees, insurance buffer
                </p>
                <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
                  <Shield className="w-3 h-3" />
                  <span>Multi-Asset</span>
                </div>
              </CardContent>
            </Card>

            {/* Autonomous Mode */}
            <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-background hover:border-emerald-500/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 flex items-center justify-center">
                  <Workflow className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Autonomous Mode</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Fully automated rebalancing with Chainlink Automation, volatility triggers, and emergency fail-safes
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <Zap className="w-3 h-3" />
                  <span>Automated</span>
                </div>
              </CardContent>
            </Card>

            {/* Cross-Chain */}
            <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-background hover:border-blue-500/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
                  <Network className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Cross-Chain</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  LayerZero integration for Polygon, Base, and Arbitrum with seamless cross-chain vaults
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                  <Globe className="w-3 h-3" />
                  <span>3 Chains</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
              asChild
            >
              <Link href="/release/wave-3">
                View All Wave 3 Features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
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
