"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Lock,
  Zap,
  BarChart3,
  Vote,
  CheckCircle2,
  Shield,
  Activity,
  TrendingUp,
  Users,
  Sparkles,
  FileText,
  Code,
  Rocket,
  Network,
  GitBranch,
  Layers,
  AlertTriangle,
  LineChart,
  Target,
  Gauge,
  Globe,
  Server,
  Workflow,
} from "lucide-react"

export default function Wave3ReleasePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-background to-background" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30">
              <Rocket className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span className="text-sm font-medium text-cyan-400">Wave 3 Release - Production Ready</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              YieldMind Wave 3:{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Next-Generation DeFi AI
              </span>
            </h1>

            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              AI Engine v3 • Multi-Asset Vaults • Cross-Chain • Autonomous Mode • Risk Scoring • 7-Day Forecasting
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                asChild
              >
                <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Rocket className="w-5 h-5" />
                  Launch Wave 3
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                <FileText className="w-5 h-5" />
                Technical Docs
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">v3.0</div>
                <div className="text-xs text-muted-foreground">AI Engine</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">3+</div>
                <div className="text-xs text-muted-foreground">Asset Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">7-Day</div>
                <div className="text-xs text-muted-foreground">Forecasting</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">0-100</div>
                <div className="text-xs text-muted-foreground">Risk Scoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Wave 3: Production-Ready Excellence</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wave 3 transforms YieldMind into a production-ready, enterprise-grade DeFi platform with advanced AI
                forecasting, multi-asset support, cross-chain capabilities, autonomous rebalancing, and comprehensive
                risk management. This release includes 8 major system upgrades designed for institutional and retail
                users alike.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-2 border-cyan-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                    8
                  </div>
                  <div className="text-sm text-muted-foreground">Major Upgrades</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-teal-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Automated</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-emerald-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Blockchains</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">v3.0</div>
                  <div className="text-sm text-muted-foreground">Contract Version</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Major Features */}
      <section className="py-16 border-b border-border bg-gradient-to-br from-cyan-500/5 to-teal-500/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">🚀 Wave 3 Features</h2>
              <p className="text-lg text-muted-foreground">8 groundbreaking upgrades for the future of DeFi</p>
            </div>

            {/* AI Engine v3 */}
            <Card className="border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">1. AI Prediction Engine v3</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold">
                        <Sparkles className="w-3 h-3" />
                        REVOLUTIONARY
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Advanced AI system with real-time forecasting, risk scoring, sentiment analysis, and explainable
                      recommendations.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Real-Time Data Integration</div>
                        <div className="text-xs text-muted-foreground">
                          Live APYs, liquidity depth, slippage, volatility from 20+ protocols
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Sentiment Analysis</div>
                        <div className="text-xs text-muted-foreground">
                          X/Twitter DeFi sentiment, BTC/ETH volatility correlation
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">LSTM/TFT Models</div>
                        <div className="text-xs text-muted-foreground">
                          Temporal Fusion Transformer for time-series forecasting
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Risk Scoring (0-100)</div>
                        <div className="text-xs text-muted-foreground">
                          Per-protocol and portfolio-wide risk assessment
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Explainability Layer</div>
                        <div className="text-xs text-muted-foreground">
                          "Why" behind each recommendation with reasoning
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">7-Day Yield Forecast</div>
                        <div className="text-xs text-muted-foreground">
                          Forward-looking projections with confidence intervals
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* YieldVault v3 */}
            <Card className="border-2 border-teal-500/40 bg-gradient-to-br from-teal-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500/30 to-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-8 h-8 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">2. YieldVault v3 Smart Contract</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold">
                        UPGRADED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Multi-asset vault with time-weighted rebalancing, dynamic fees, and insurance buffer.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Multi-Asset Support</div>
                      <div className="text-xs text-muted-foreground">USDC, DAI, ETH, WBTC</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Time-Weighted Rebalancing</div>
                      <div className="text-xs text-muted-foreground">Reduces slippage costs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Dynamic Fee Model</div>
                      <div className="text-xs text-muted-foreground">Performance-based fees</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Automation */}
            <Card className="border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Workflow className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">3. Autonomous Mode & Automation</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold">
                        NEW
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Fully automated rebalancing with Chainlink Automation and intelligent fail-safes.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Volatility Triggers:</span> Auto-rebalance when market
                        volatility exceeds thresholds
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">APY Deviation:</span> Trigger when yields drift from optimal
                        allocations
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Emergency Pause:</span> Auto-pause on &gt;15% price divergence
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Liquidity Monitoring:</span> Detect and respond to drain events
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard */}
            <Card className="border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">4. Advanced Dashboard & UX</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold">
                        ENHANCED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Complete redesign with portfolio health scores, AI reasoning, risk monitoring, and historical
                      simulator.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="flex items-start gap-2">
                    <Gauge className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Portfolio Health Score</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">AI Reasoning Panel</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Risk Monitor</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <LineChart className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">7-Day Forecast Chart</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Multi-Chain Switcher</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Historical Simulator</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governance */}
            <Card className="border-2 border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Vote className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">5. Advanced DAO Governance</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold">
                        EXPANDED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      On-chain execution, Snapshot integration, performance multipliers, and treasury analytics.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">On-chain proposal execution</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Performance-based voting power</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BarChart3 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Treasury analytics dashboard</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Advanced Snapshot templates</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cross-Chain */}
            <Card className="border-2 border-pink-500/40 bg-gradient-to-br from-pink-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/30 to-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <Network className="w-8 h-8 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">6. Cross-Chain Integration</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold">
                        NEW
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      LayerZero-powered cross-chain vaults with support for Base, Arbitrum, and Polygon.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                    <div className="font-semibold text-sm mb-1">Polygon zkEVM</div>
                    <div className="text-xs text-muted-foreground">QuickSwap, Balancer</div>
                  </div>
                  <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                    <div className="font-semibold text-sm mb-1">Base</div>
                    <div className="text-xs text-muted-foreground">Aave, Uniswap</div>
                  </div>
                  <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                    <div className="font-semibold text-sm mb-1">Arbitrum</div>
                    <div className="text-xs text-muted-foreground">Balancer, GMX</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-2 border-red-500/40 bg-gradient-to-br from-red-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/30 to-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">7. Security & DevOps</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold">
                        FORTIFIED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Comprehensive testing, monitoring, logging, and bug bounty program.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Fuzz & invariant testing</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Tenderly monitoring</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Comprehensive logging</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Immunefi bug bounty</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentation */}
            <Card className="border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-teal-500/10">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">8. Complete Documentation</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold">
                        COMPREHENSIVE
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Full technical documentation with architecture diagrams, API specs, and developer guides.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <GitBranch className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Architecture diagrams</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Code className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Smart contract docs</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Server className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">API documentation</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">AI model specs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Development Timeline</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="w-0.5 h-full bg-border" />
                </div>
                <div className="flex-1 pb-8">
                  <div className="font-semibold text-lg">Week 1-2: AI Engine v3 & Smart Contracts</div>
                  <div className="text-sm text-muted-foreground">
                    Implement LSTM/TFT models, risk scoring, YieldVault v3, multi-asset support
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="w-0.5 h-full bg-border" />
                </div>
                <div className="flex-1 pb-8">
                  <div className="font-semibold text-lg">Week 3: Automation & Oracles</div>
                  <div className="text-sm text-muted-foreground">
                    Chainlink Automation integration, multi-oracle system, autonomous mode
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="w-0.5 h-full bg-border" />
                </div>
                <div className="flex-1 pb-8">
                  <div className="font-semibold text-lg">Week 4: Frontend & Dashboard</div>
                  <div className="text-sm text-muted-foreground">
                    UI/UX redesign, health scores, AI reasoning panel, historical simulator
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                    <Network className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="w-0.5 h-full bg-border" />
                </div>
                <div className="flex-1 pb-8">
                  <div className="font-semibold text-lg">Week 5: Cross-Chain & Governance</div>
                  <div className="text-sm text-muted-foreground">
                    LayerZero integration, Base/Arbitrum support, DAO upgrades
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">Week 6: Testing & Deployment</div>
                  <div className="text-sm text-muted-foreground">
                    Security audits, fuzz testing, testnet deployment, mainnet launch
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Experience Wave 3</h2>
            <p className="text-lg text-muted-foreground">
              Try the most advanced AI-powered DeFi platform with Wave 3 features
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-cyan-500 to-teal-500" asChild>
                <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Rocket className="w-5 h-5" />
                  Launch Application
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <FileText className="w-5 h-5" />
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
