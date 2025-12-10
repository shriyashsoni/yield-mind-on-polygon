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
  Rocket,
  Network,
  Globe,
  Server,
  Workflow,
  Layers,
  Building2,
  LineChart,
  Target,
  Coins,
  Github,
  Scale,
} from "lucide-react"

export default function Wave4ReleasePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-background to-background" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 animate-pulse">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Wave 4 Release - Global Scaling Ready</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              YieldMind Wave 4:{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                Global Scaling Era
              </span>
            </h1>

            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              AI Engine v4.0 • Multi-Vault System • Cross-Chain Expansion • Institutional Analytics • Global DAO
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                asChild
              >
                <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Rocket className="w-5 h-5" />
                  Launch Wave 4
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                <FileText className="w-5 h-5" />
                Technical Docs
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">v4.0</div>
                <div className="text-xs text-muted-foreground">AI Engine</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">5+</div>
                <div className="text-xs text-muted-foreground">Chains</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-400">Multi</div>
                <div className="text-xs text-muted-foreground">Vaults</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-fuchsia-400">Global</div>
                <div className="text-xs text-muted-foreground">DAO</div>
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
              <h2 className="text-3xl font-bold mb-4">
                Wave 4: Global Scaling, Cross-Chain Expansion & Autonomous Intelligence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wave 4 marks the transformational step for YieldMind into a global, multi-chain autonomous yield
                platform. After establishing high-accuracy AI (Wave 3), Wave 4 focuses on scalability, cross-chain
                operability, institutional readiness, and advanced intelligence. YieldMind now manages diversified
                portfolios across leading DeFi ecosystems.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-2 border-purple-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    8
                  </div>
                  <div className="text-sm text-muted-foreground">Major Upgrades</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-pink-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Blockchains</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-violet-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-violet-400 mb-2">99.7%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-fuchsia-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-fuchsia-400 mb-2">v4.0</div>
                  <div className="text-sm text-muted-foreground">Meta-Ensemble AI</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Major Features */}
      <section className="py-16 border-b border-border bg-gradient-to-br from-purple-500/5 to-pink-500/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Wave 4 Features</h2>
              <p className="text-lg text-muted-foreground">8 transformational upgrades for global DeFi</p>
            </div>

            {/* AI Engine v4.0 */}
            <Card className="border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">1. AI Engine v4.0 - Next-Generation Intelligence</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold">
                        <Sparkles className="w-3 h-3" />
                        META-ENSEMBLE
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Meta-Ensemble Architecture combining LSTM, TFT, XGBoost, and Transformer models for deeper
                      prediction reliability and broader market understanding.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Meta-Ensemble Architecture</div>
                        <div className="text-xs text-muted-foreground">
                          LSTM, TFT, XGBoost, Transformer specialized for APY prediction, volatility, liquidity,
                          sentiment
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Cross-Chain Data Layer</div>
                        <div className="text-xs text-muted-foreground">
                          Live data from Polygon, Base, Arbitrum, Optimism, and major liquidity hubs
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Risk Vector Expansion</div>
                        <div className="text-xs text-muted-foreground">
                          MEV probability, exploit risk, bridge risk, liquidity fragmentation, depeg indicators
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Sentiment Engine v2</div>
                        <div className="text-xs text-muted-foreground">
                          Real-time event weighting for governance, hacks, rug pulls, protocol upgrades
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Adaptive Learning</div>
                        <div className="text-xs text-muted-foreground">
                          Nightly retraining with new yield data and protocol health metrics
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">95%+ Accuracy</div>
                        <div className="text-xs text-muted-foreground">
                          Maintained stable accuracy during market regime changes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Autonomous v2 */}
            <Card className="border-2 border-pink-500/40 bg-gradient-to-br from-pink-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/30 to-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <Workflow className="w-8 h-8 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">2. Global Autonomous Execution - Multi-Chain Rebalancing</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold">
                        UPGRADED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Autonomous Mode v2 enables cross-chain rebalancing via LayerZero V2 with multi-hop execution and
                      99.1% success rate.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Cross-Chain Rebalancing:</span> LayerZero V2 with cryptographic
                        message proofs
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Multi-Hop Execution:</span> Polygon → Base → Arbitrum → back to
                        Polygon
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Latency-Optimized:</span> 45-60 second cross-chain rebalance
                        time
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Gas Protection:</span> Auto-pause if gas spikes &gt;35%
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Oracle Safety:</span> Pause on cross-chain oracle mismatch
                        &gt;10%
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">99.1% Success Rate:</span> 70+ automated rebalances during
                        testing
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multi-Vault System */}
            <Card className="border-2 border-violet-500/40 bg-gradient-to-br from-violet-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/30 to-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-8 h-8 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">3. Multi-Vault Strategy System</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-xs font-bold">
                        NEW
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Diversify across thematic yield strategies with separate AI sub-models and risk profiles for each
                      vault.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-violet-400" />
                      <div className="font-semibold text-sm">Stable Yield Vault</div>
                    </div>
                    <div className="text-xs text-muted-foreground">USDC/DAI/USDT - Low risk, stable returns</div>
                  </div>
                  <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-violet-400" />
                      <div className="font-semibold text-sm">ETH Momentum Vault</div>
                    </div>
                    <div className="text-xs text-muted-foreground">WETH, stETH, wstETH - Growth focused</div>
                  </div>
                  <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Network className="w-4 h-4 text-violet-400" />
                      <div className="font-semibold text-sm">Polygon Ecosystem Vault</div>
                    </div>
                    <div className="text-xs text-muted-foreground">MATIC, stMATIC, liquidity pools</div>
                  </div>
                  <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Rocket className="w-4 h-4 text-violet-400" />
                      <div className="font-semibold text-sm">High-APY Experimental</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Risk-adjusted algorithmic allocation</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard v4 */}
            <Card className="border-2 border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-fuchsia-500/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-8 h-8 text-fuchsia-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">4. Dashboard v4 - Institutional-Grade Analytics</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white text-xs font-bold">
                        ENHANCED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Redesigned with deeper insights, cross-chain portfolio view, AI reasoning panel, and event
                      monitoring.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Cross-Chain Portfolio View</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <LineChart className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Drawdown & Sharpe Ratios</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">AI Reasoning Panel</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Multi-Vault Performance</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Event Monitor</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Server className="w-4 h-4 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Liquidity Depth Charts</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governance & DAO */}
            <Card className="border-2 border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Vote className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">5. Governance & DAO Evolution</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold">
                        EXPANDED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Fully-participatory DAO system with on-chain execution, treasury dashboard, and community
                      bounties.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Scale className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">On-Chain Proposal Execution</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Coins className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Treasury Dashboard</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Governance Staking v2</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Community Bounties</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced APIs */}
            <Card className="border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Server className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">6. Enhanced API & Developer Tooling</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold">
                        NEW
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Nine production-grade APIs with rate-limiting, webhooks, and TypeScript SDK for builders.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-2">
                  <div className="text-xs p-2 rounded bg-cyan-500/10 border border-cyan-500/20 font-mono">/vaults</div>
                  <div className="text-xs p-2 rounded bg-cyan-500/10 border border-cyan-500/20 font-mono">/chains</div>
                  <div className="text-xs p-2 rounded bg-cyan-500/10 border border-cyan-500/20 font-mono">
                    /ai/reasoning
                  </div>
                  <div className="text-xs p-2 rounded bg-cyan-500/10 border border-cyan-500/20 font-mono">
                    /forecast/7d
                  </div>
                  <div className="text-xs p-2 rounded bg-cyan-500/10 border border-cyan-500/20 font-mono">
                    /governance/metrics
                  </div>
                  <div className="text-xs p-2 rounded bg-cyan-500/10 border border-cyan-500/20 font-mono">
                    TypeScript SDK
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
                      <h3 className="text-2xl font-bold">7. Security, Audits & Reliability</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold">
                        FORTIFIED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Trail of Bits audit passed, 10k+ fuzz tests, Tenderly monitoring, and 99.97% uptime.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Trail of Bits audit - no high-severity issues</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">10k+ fuzz tests (multi-vault, cross-chain)</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">Tenderly Alerts (TVL, oracle, MEV)</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">99.97% uptime with failover RPCs</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ecosystem */}
            <Card className="border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">8. Ecosystem Partnerships & Integrations</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold">
                        EXPANDED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Integrated with leading DeFi protocols and oracle providers across multiple chains.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-2 text-sm">
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">Aave V3</div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">Balancer</div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">Curve</div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">QuickSwap</div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">Aerodrome</div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">Moonwell</div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">GMX</div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">LayerZero V2</div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">Pyth + API3</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Wave 4 Summary</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wave 4 makes YieldMind a global, cross-chain autonomous yield platform, offering institutional-grade
                analytics, AI reasoning, multi-vault strategies, advanced automation, and top-tier security. YieldMind
                is now ready for large-scale DeFi users, partners, and enterprise adoption.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-purple-500/30 text-center">
                <CardContent className="p-6">
                  <Globe className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Global Scaling</h3>
                  <p className="text-sm text-muted-foreground">
                    Multi-chain, multi-vault architecture ready for worldwide adoption
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-pink-500/30 text-center">
                <CardContent className="p-6">
                  <Building2 className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Institutional Ready</h3>
                  <p className="text-sm text-muted-foreground">Enterprise-grade analytics, security, and compliance</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-violet-500/30 text-center">
                <CardContent className="p-6">
                  <Sparkles className="w-12 h-12 text-violet-400 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Advanced AI</h3>
                  <p className="text-sm text-muted-foreground">Meta-ensemble models with 95%+ prediction accuracy</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Experience Wave 4</h2>
            <p className="text-lg text-muted-foreground">
              Launch the most advanced multi-chain AI-powered DeFi platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500" asChild>
                <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Rocket className="w-5 h-5" />
                  Launch Application
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <FileText className="w-5 h-5" />
                Read Documentation
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
