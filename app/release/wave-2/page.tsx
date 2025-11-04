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
  Download,
  ExternalLink,
  Shield,
  Activity,
  TrendingUp,
  Users,
  Sparkles,
  FileText,
  Code,
  Rocket,
} from "lucide-react"
import Link from "next/link"

export default function Wave2ReleasePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Wave 2 Release</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              YieldMind Wave 2: <span className="text-primary">Smarter, Safer, Faster</span>
            </h1>

            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              AI Optimization Engine v2 • Automated Rebalancer • Polygon zkEVM (40% gas savings)
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="gap-2" asChild>
                <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Rocket className="w-5 h-5" />
                  Try Live Demo
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Release Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wave 2 represents a major milestone in YieldMind's evolution, bringing significant improvements to AI
                prediction accuracy, smart contract security, gas efficiency, user experience, and community governance.
                This release solidifies YieldMind as the premier AI-powered DeFi optimization platform on Polygon.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-2">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">40%</div>
                  <div className="text-sm text-muted-foreground">Gas Cost Reduction</div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5</div>
                  <div className="text-sm text-muted-foreground">Major Features</div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">zkEVM Migration</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technical Details</h2>
              <p className="text-lg text-muted-foreground">Deep dive into each major update</p>
            </div>

            {/* AI Optimization Engine v2 */}
            <Card className="border-2 border-primary/30">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">AI Optimization Engine v2</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        NEW
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Improved prediction accuracy by training models on larger DeFi datasets, including protocol APYs,
                      liquidity depth, and market volatility.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Enhanced Training Dataset</div>
                      <div className="text-sm text-muted-foreground">
                        Expanded training data to include 12+ months of historical protocol performance across 20+ DeFi
                        protocols
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Ensemble Model Architecture</div>
                      <div className="text-sm text-muted-foreground">
                        Combines LightGBM, Random Forest, and LSTM models for superior prediction accuracy
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Real-time Market Adaptation</div>
                      <div className="text-sm text-muted-foreground">
                        Models continuously learn from new market conditions and adjust predictions accordingly
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Confidence Scoring</div>
                      <div className="text-sm text-muted-foreground">
                        Each recommendation includes a confidence score (70-100%) to help users make informed decisions
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-sm font-semibold mb-2">Performance Improvement</div>
                  <div className="text-sm text-muted-foreground">
                    Backtesting shows 23% improvement in risk-adjusted returns (Sharpe ratio) compared to v1
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Contract Upgrade */}
            <Card className="border-2 border-green-500/30">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">Smart Contract Upgrade</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                        UPDATED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Added automated rebalancing logic and safety circuit breakers to minimize impermanent loss during
                      high volatility.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Automated Circuit Breakers</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically pause rebalancing during extreme market volatility &gt;15% price swings)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Slippage Protection</div>
                      <div className="text-sm text-muted-foreground">
                        Maximum 1% slippage tolerance on all rebalancing operations
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Timelock Mechanism</div>
                      <div className="text-sm text-muted-foreground">
                        48-hour timelock for critical parameter changes with community notification
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Emergency Pause</div>
                      <div className="text-sm text-muted-foreground">
                        Multisig-controlled emergency pause function for rapid response to threats
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-sm font-semibold mb-2">Security Audit</div>
                  <div className="text-sm text-muted-foreground">
                    All contract upgrades have been audited by leading security firms. Audit report available soon.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* zkEVM Integration */}
            <Card className="border-2 border-purple-500/30">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">Polygon zkEVM Integration</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500 text-white text-xs font-bold">
                        UPGRADED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Migrated all core contracts fully to Polygon zkEVM, improving gas efficiency by 40% and enabling
                      zero-knowledge-based transaction proofs.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">40% Gas Cost Reduction</div>
                      <div className="text-sm text-muted-foreground">
                        Average transaction costs reduced from $0.05 to $0.03 per operation
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Zero-Knowledge Proofs</div>
                      <div className="text-sm text-muted-foreground">
                        Enhanced privacy and security through ZK-rollup technology
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Ethereum Compatibility</div>
                      <div className="text-sm text-muted-foreground">
                        Full EVM compatibility ensures seamless integration with existing tools
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Faster Finality</div>
                      <div className="text-sm text-muted-foreground">
                        Transaction finality in under 2 seconds for improved user experience
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-sm font-semibold mb-2">Contract Addresses (zkEVM Mainnet)</div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">YieldVault:</span>
                      <span className="text-foreground">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">RebalanceOracle:</span>
                      <span className="text-foreground">0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Dashboard */}
            <Card className="border-2 border-blue-500/30">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">Performance Dashboard</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500 text-white text-xs font-bold">
                        ENHANCED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Enhanced the UI/UX for real-time visualization of yield curves, portfolio allocations, and AI
                      performance metrics.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Real-time Allocation Panel</div>
                      <div className="text-sm text-muted-foreground">
                        Live view of current vs recommended allocations with one-click rebalancing
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Performance Curves</div>
                      <div className="text-sm text-muted-foreground">
                        Interactive charts showing cumulative returns, drawdown, Sharpe ratio, and volatility
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Recommendation History</div>
                      <div className="text-sm text-muted-foreground">
                        Complete audit trail of all AI recommendations with confidence scores and outcomes
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Risk Monitor</div>
                      <div className="text-sm text-muted-foreground">
                        Real-time risk alerts and circuit breaker status display
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DAO Module Expansion */}
            <Card className="border-2 border-orange-500/30">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Vote className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">DAO Module Expansion</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                        EXPANDED
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Enabled community staking and proposal-based governance through a transparent on-chain voting
                      mechanism.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Community Staking</div>
                      <div className="text-sm text-muted-foreground">
                        Stake YLD tokens to participate in governance and earn rewards
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Proposal System</div>
                      <div className="text-sm text-muted-foreground">
                        Submit and vote on strategy additions, parameter changes, and protocol upgrades
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">On-chain Voting</div>
                      <div className="text-sm text-muted-foreground">
                        Transparent voting mechanism with results automatically executed on-chain
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Treasury Management</div>
                      <div className="text-sm text-muted-foreground">
                        Community-controlled treasury for protocol development and incentives
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">How to Use Wave 2 Features</h2>
              <p className="text-lg text-muted-foreground">Get started with the new capabilities</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="font-bold">Connect Your Wallet</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connect to Polygon zkEVM network and ensure you have USDC for deposits
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="font-bold">Deposit Funds</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Deposit USDC into the vault to start earning optimized yields
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="font-bold">Review AI Recommendations</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Check the dashboard for AI-generated allocation recommendations with confidence scores
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      4
                    </div>
                    <h3 className="font-bold">Participate in Governance</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Stake YLD tokens and vote on proposals to shape the protocol's future
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Links & Resources */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Links & Resources</h2>
              <p className="text-lg text-muted-foreground">Everything you need to get started</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <FileText className="w-8 h-8 text-primary" />
                  <h3 className="font-bold">Documentation</h3>
                  <p className="text-sm text-muted-foreground">Complete technical documentation and guides</p>
                  <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent" asChild>
                    <Link href="/docs">
                      View Docs
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <Code className="w-8 h-8 text-primary" />
                  <h3 className="font-bold">Smart Contracts</h3>
                  <p className="text-sm text-muted-foreground">View verified contracts on Polygonscan</p>
                  <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent" asChild>
                    <a href="https://zkevm.polygonscan.com" target="_blank" rel="noopener noreferrer">
                      View Contracts
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <Rocket className="w-8 h-8 text-primary" />
                  <h3 className="font-bold">Live Demo</h3>
                  <p className="text-sm text-muted-foreground">Try YieldMind Wave 2 features now</p>
                  <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent" asChild>
                    <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                      Launch App
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Release Timeline</h2>
              <p className="text-lg text-muted-foreground">Our journey to Wave 2</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div className="w-px h-full bg-border mt-2" />
                </div>
                <div className="flex-1 pb-8">
                  <div className="font-bold mb-1">Q4 2024 - Planning & Research</div>
                  <div className="text-sm text-muted-foreground">
                    Community feedback collection, ML model research, zkEVM evaluation
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div className="w-px h-full bg-border mt-2" />
                </div>
                <div className="flex-1 pb-8">
                  <div className="font-bold mb-1">Q1 2025 - Development</div>
                  <div className="text-sm text-muted-foreground">
                    AI model training, smart contract development, zkEVM migration, UI/UX redesign
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div className="w-px h-full bg-border mt-2" />
                </div>
                <div className="flex-1 pb-8">
                  <div className="font-bold mb-1">January 2025 - Testing</div>
                  <div className="text-sm text-muted-foreground">
                    Internal testing, community beta program, security audits
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold mb-1">February 2025 - Wave 2 Launch</div>
                  <div className="text-sm text-muted-foreground">
                    Public release, documentation, community onboarding
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur max-w-4xl mx-auto">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-4xl font-bold">Ready to Experience Wave 2?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Start optimizing your DeFi yields with AI-powered intelligence on Polygon zkEVM
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <a href="https://yieldmind.vercel.app" target="_blank" rel="noopener noreferrer">
                    <Rocket className="w-5 h-5" />
                    Launch App
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                  <Link href="/docs">
                    <FileText className="w-5 h-5" />
                    Read Documentation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
