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
  AlertTriangle,
  ArrowRight,
  Cpu,
  Database,
  GitBranch,
} from "lucide-react"
import Link from "next/link"

export default function Wave6ReleasePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-background to-background" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 animate-pulse">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Wave 6 Release - Enterprise Ready</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              YieldMind Wave 6:{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Institutional Excellence Era
              </span>
            </h1>

            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Portfolio Mandates • Risk Insurance Module • Cross-Chain Liquidity Router • Enhanced Governance • Oracle Redundancy • Enterprise API
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                asChild
              >
                <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Rocket className="w-5 h-5" />
                  Launch Wave 6
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
              >
                <FileText className="w-5 h-5" />
                Technical Docs
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">v6.0</div>
                <div className="text-xs text-muted-foreground">AI Engine</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">6+</div>
                <div className="text-xs text-muted-foreground">Chains</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">99.99%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">Enterprise</div>
                <div className="text-xs text-muted-foreground">Grade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">6</div>
                <div className="text-xs text-muted-foreground">New Features</div>
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
              <h2 className="text-3xl font-bold mb-4">Wave 6: Institutional-Grade DeFi Infrastructure</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wave 6 marks YieldMind's evolution into a comprehensive institutional-grade platform with enterprise-level mandates, advanced risk insurance, sophisticated cross-chain routing, and 99.99% reliability. This release introduces 6 transformational smart contracts and enterprise APIs designed for institutional capital deployment at scale.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-2 border-emerald-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                    6
                  </div>
                  <div className="text-sm text-muted-foreground">New Smart Contracts</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-teal-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-2">99.99%</div>
                  <div className="text-sm text-muted-foreground">Multi-Oracle Uptime</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-cyan-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">Institutional</div>
                  <div className="text-sm text-muted-foreground">Enterprise Ready</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Major Features */}
      <section className="py-16 border-b border-border bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Wave 6 Transformational Features</h2>
              <p className="text-lg text-muted-foreground">6 Enterprise Smart Contracts + Enhanced Infrastructure</p>
            </div>

            {/* Feature 1: Portfolio Mandate Contract */}
            <Card className="border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">1. Portfolio Mandate Contract</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold">
                        FLAGSHIP
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Institutional mandate management with risk thresholds, APY targets, and chain diversification limits. Enables large capital deployment with precise portfolio constraints.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Risk Threshold Control</div>
                        <div className="text-xs text-muted-foreground">
                          Define per-portfolio risk tolerance (0-100 risk score ceiling)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">APY Target Bands</div>
                        <div className="text-xs text-muted-foreground">
                          Set min/max APY expectations with rebalance triggers
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Chain Diversification Limits</div>
                        <div className="text-xs text-muted-foreground">
                          Enforce max allocation per blockchain (e.g., 30% per chain)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Duration Locks</div>
                        <div className="text-xs text-muted-foreground">
                          Time-locks for mandate changes (7-30 day cooling periods)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Compliance Audit Trail</div>
                        <div className="text-xs text-muted-foreground">
                          Full immutable history of all mandate parameters
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Multi-Signer Approval</div>
                        <div className="text-xs text-muted-foreground">
                          3-of-5 multisig for critical mandate changes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
                  <div className="text-sm font-semibold mb-2">Deployment Details</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Contract: 0x[PortfolioMandate]</div>
                    <div>Network: Polygon, Base, Arbitrum (multi-chain)</div>
                    <div>Gas Optimized: ~35k gas per mandate creation</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2: Risk Insurance Module */}
            <Card className="border-2 border-teal-500/40 bg-gradient-to-br from-teal-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500/30 to-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">2. Risk Insurance Module</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold">
                        INNOVATIVE
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      AI-powered risk protection system with automated insurance reserves, drawdown simulation, and capital protection triggers for institutional portfolios.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Dynamic Reserve Allocation</div>
                        <div className="text-xs text-muted-foreground">
                          Auto-allocate 5-20% of yield to protection reserves
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Drawdown Simulation</div>
                        <div className="text-xs text-muted-foreground">
                          Monte Carlo simulations for worst-case scenarios
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Capital Protection Triggers</div>
                        <div className="text-xs text-muted-foreground">
                          Auto-liquidate to stables if drawdown exceeds 20%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Risk Scoring Integration</div>
                        <div className="text-xs text-muted-foreground">
                          Real-time protocol risk assessment (0-100 score)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Insurance Payouts</div>
                        <div className="text-xs text-muted-foreground">
                          Automated compensation if protocol exploited
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Treasury Governance</div>
                        <div className="text-xs text-muted-foreground">
                          DAO vote on insurance pool deployment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-500/10 rounded-lg p-4 border border-teal-500/20">
                  <div className="text-sm font-semibold mb-2">Insurance Mechanics</div>
                  <div className="text-xs text-muted-foreground">
                    <div>Reserve Pool: $5M+ community insurance fund</div>
                    <div>Coverage: Up to 100% of losses from exploits</div>
                    <div>Payout Time: 24-48 hours post-incident</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3: Cross-Chain Liquidity Router */}
            <Card className="border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Network className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">3. Cross-Chain Liquidity Router</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-bold">
                        CRITICAL
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Intelligent routing engine optimizing liquidity across 6+ blockchains with real-time gas cost evaluation and bridge health scoring.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Multi-Chain Selection</div>
                        <div className="text-xs text-muted-foreground">
                          Supports Polygon, Base, Arbitrum, Optimism, Avalanche, Mainnet
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Real-time Gas Optimization</div>
                        <div className="text-xs text-muted-foreground">
                          Dynamically route based on current gas prices
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Bridge Health Scoring</div>
                        <div className="text-xs text-muted-foreground">
                          Rate Stargate, LayerZero, Hyperlane, Wormhole
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Liquidity Depth Analysis</div>
                        <div className="text-xs text-muted-foreground">
                          Assess available liquidity on each chain
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Slippage Prediction</div>
                        <div className="text-xs text-muted-foreground">
                          ML-powered slippage forecasting per route
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Atomic Swaps</div>
                        <div className="text-xs text-muted-foreground">
                          Fallback execution if primary route fails
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-sm font-semibold mb-2">Routing Performance</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Execution Time: 15-45 seconds for multi-chain swaps</div>
                    <div>Success Rate: 99.4% with automatic failover</div>
                    <div>Gas Savings: 20-40% vs manual routing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4: Oracle Redundancy */}
            <Card className="border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">4. Oracle Redundancy System</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold">
                        99.99% UPTIME
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Multi-oracle failover architecture with Chainlink, Pyth, Uniswap TWAP, and custom feeds ensuring 99.99% oracle availability and price accuracy.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Primary: Chainlink (Aggregated across 50+ nodes)</div>
                      <div className="text-xs text-muted-foreground">
                        Industry standard with highest security and decentralization
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Secondary: Pyth (High-frequency pricing)</div>
                      <div className="text-xs text-muted-foreground">
                        Real-time price feeds from 100+ data providers
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Tertiary: Uniswap TWAP (On-chain backup)</div>
                      <div className="text-xs text-muted-foreground">
                        30-minute time-weighted average price fallback
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Consensus Mechanism</div>
                      <div className="text-xs text-muted-foreground">
                        Requires 2-of-3 price agreement within 5% tolerance
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Automatic Failover</div>
                      <div className="text-xs text-muted-foreground">
                        Zero-delay switching to secondary if primary fails
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <div className="text-sm font-semibold mb-2">Availability Metrics</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Chainlink: 99.97%</div>
                      <div>Pyth: 99.98%</div>
                      <div>Combined: 99.99%</div>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <div className="text-sm font-semibold mb-2">Price Divergence Alerts</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Alert: 2% divergence</div>
                      <div>Pause: 5% divergence</div>
                      <div>Emergency: 10% divergence</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5: Enhanced Governance */}
            <Card className="border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500/30 to-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <Vote className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">5. Enhanced Governance Contract</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold">
                        ADVANCED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Performance-based governance with weighted voting tied to AI accuracy, treasury yield optimization, and cross-chain DAO coordination.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Performance-Based Voting</div>
                        <div className="text-xs text-muted-foreground">
                          Vote weight scales with AI recommendation accuracy
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Treasury Yield Optimization</div>
                        <div className="text-xs text-muted-foreground">
                          DAO treasury allocated across yield strategies
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Quadratic Voting</div>
                        <div className="text-xs text-muted-foreground">
                          Reduces whale influence in critical decisions
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Cross-Chain Voting</div>
                        <div className="text-xs text-muted-foreground">
                          Synchronize votes across all supported chains
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Proposal Analytics</div>
                        <div className="text-xs text-muted-foreground">
                          AI analyzes impact before execution
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Time-Locked Execution</div>
                        <div className="text-xs text-muted-foreground">
                          7-day voting period + 2-day execution delay
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 6: Enterprise API */}
            <Card className="border-2 border-violet-500/40 bg-gradient-to-br from-violet-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/30 to-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Code className="w-8 h-8 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">6. Enterprise API Interface</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-xs font-bold">
                        B2B READY
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      REST + WebSocket APIs for real-time risk scoring, yield forecasting, autonomous execution webhooks, and institutional portfolio management.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Real-Time Risk Scoring</div>
                        <div className="text-xs text-muted-foreground">
                          GET /api/portfolio-risk with live protocol analysis
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">30-Day Yield Forecast</div>
                        <div className="text-xs text-muted-foreground">
                          GET /api/yield-forecast with confidence intervals
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Autonomous Execution</div>
                        <div className="text-xs text-muted-foreground">
                          Webhook triggers for rule-based portfolio rebalancing
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">WebSocket Stream</div>
                        <div className="text-xs text-muted-foreground">
                          Real-time position updates and price feeds
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Rate Limiting</div>
                        <div className="text-xs text-muted-foreground">
                          10,000 req/minute for enterprise tier
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">API Keys & OAuth</div>
                        <div className="text-xs text-muted-foreground">
                          Secure authentication with audit logging
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-violet-500/10 rounded-lg p-4 border border-violet-500/20">
                  <div className="text-sm font-semibold mb-2">API Documentation</div>
                  <div className="text-xs text-muted-foreground">
                    <div>Base URL: https://api.yieldmind.io/v6</div>
                    <div>Documentation: docs.yieldmind.io</div>
                    <div>SDKs: Python, JavaScript, Go, Rust</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updated Contracts Section */}
            <Card className="border-2 border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-background">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Database className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">Core Contract Updates</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold">
                        ENHANCED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Major updates to YieldVault, RebalanceOracle, and Strategy contracts to support Wave 6 features.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-400" />
                      YieldVault v4
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1 ml-6">
                      <div>• Mandate support integration</div>
                      <div>• Insurance module hooks</div>
                      <div>• Multi-chain liquidity routing</div>
                      <div>• Oracle redundancy fallback</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-400" />
                      RebalanceOracle v3
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1 ml-6">
                      <div>• Risk scoring engine enhancement</div>
                      <div>• Insurance trigger logic</div>
                      <div>• Cross-chain price consistency</div>
                      <div>• Governance integration</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-400" />
                      Strategy Contracts v2
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1 ml-6">
                      <div>• Institutional mandate constraints</div>
                      <div>• Enhanced fee optimization</div>
                      <div>• Cross-chain execution support</div>
                      <div>• Enterprise API hooks</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Wave 6 Development Timeline</h2>
              <p className="text-lg text-muted-foreground">Strategic rollout across phases</p>
            </div>

            <div className="space-y-4">
              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 font-semibold text-emerald-400">Phase 1</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Core Infrastructure (Q1 2026)</h3>
                      <p className="text-sm text-muted-foreground">Portfolio Mandate + Oracle Redundancy deployment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-teal-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 font-semibold text-teal-400">Phase 2</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Risk Management (Q1-Q2 2026)</h3>
                      <p className="text-sm text-muted-foreground">Risk Insurance Module + Enhanced Governance activation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-cyan-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 font-semibold text-cyan-400">Phase 3</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Enterprise Launch (Q2 2026)</h3>
                      <p className="text-sm text-muted-foreground">Cross-Chain Router + Enterprise API go-live</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Contracts Section */}
      <section className="py-24 bg-gradient-to-br from-slate-500/5 via-background to-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-500/10 border border-slate-500/20 mb-4">
              <Code className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-400">Smart Contracts</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Wave 6 Smart Contracts</h2>
            <p className="text-lg text-muted-foreground text-balance">
              All deployed smart contracts on Polygon Amoy Testnet with real-time verification and interaction capabilities
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-4">
            {/* Deployed Contracts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Deployed Contracts (3/10)
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {/* YLDToken */}
                <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-background hover:border-green-500/50 transition-all hover:shadow-lg">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-lg">YLDToken</h4>
                        <p className="text-xs text-muted-foreground">Protocol Token</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                    <div className="bg-green-500/10 rounded p-3 border border-green-500/20">
                      <p className="text-xs text-muted-foreground mb-2">Contract Address</p>
                      <p className="font-mono text-xs break-all text-foreground font-semibold">
                        0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-2 text-xs border-green-500/30 hover:bg-green-500/10"
                      asChild
                    >
                      <a
                        href="https://amoy.polygonscan.com/address/0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c#code"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on PolygonScan
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* YieldVaultV4 */}
                <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-background hover:border-green-500/50 transition-all hover:shadow-lg">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-lg">YieldVaultV4</h4>
                        <p className="text-xs text-muted-foreground">Multi-Asset Vault</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                    <div className="bg-green-500/10 rounded p-3 border border-green-500/20">
                      <p className="text-xs text-muted-foreground mb-2">Contract Address</p>
                      <p className="font-mono text-xs break-all text-foreground font-semibold">
                        0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-2 text-xs border-green-500/30 hover:bg-green-500/10"
                      asChild
                    >
                      <a
                        href="https://amoy.polygonscan.com/address/0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3#code"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on PolygonScan
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* RiskGuard */}
                <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-background hover:border-green-500/50 transition-all hover:shadow-lg">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-lg">RiskGuard</h4>
                        <p className="text-xs text-muted-foreground">Insurance Module</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                    <div className="bg-green-500/10 rounded p-3 border border-green-500/20">
                      <p className="text-xs text-muted-foreground mb-2">Contract Address</p>
                      <p className="font-mono text-xs break-all text-foreground font-semibold">
                        0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-2 text-xs border-green-500/30 hover:bg-green-500/10"
                      asChild
                    >
                      <a
                        href="https://amoy.polygonscan.com/address/0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A#code"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on PolygonScan
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Pending Contracts */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Pending Deployment (7/10)
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: "StrategyManager", desc: "Strategy Orchestration" },
                  { name: "AIOracle", desc: "AI Prediction Engine" },
                  { name: "InsuranceReserve", desc: "Protection Pool" },
                  { name: "YieldMindGovernor", desc: "DAO Governance" },
                  { name: "YLDStaking", desc: "Token Staking" },
                  { name: "TimelockController", desc: "Time-Locked Execution" },
                  { name: "AutonomousExecutor", desc: "Autonomous Rebalancing" },
                ].map((contract) => (
                  <Card key={contract.name} className="border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-background">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">{contract.name}</h4>
                          <p className="text-xs text-muted-foreground">{contract.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-amber-600">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Pending</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/contracts" className="gap-2">
                <Code className="w-4 h-4" />
                View All Contracts & Deployment Status
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready for Institutional-Grade Yield Optimization?</h2>
            <p className="text-xl text-muted-foreground">
              Join leading institutions deploying capital with YieldMind Wave 6
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                <Rocket className="w-5 h-5" />
                Deploy Wave 6
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                asChild
              >
                <Link href="/docs">
                  <FileText className="w-5 h-5" />
                  Read Docs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
