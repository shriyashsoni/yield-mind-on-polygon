'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  Layers,
  Database,
  AlertCircle,
  Code,
  Gauge,
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Wave5Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Rocket className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Wave 5: Production Launch</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              YieldMind Goes <span className="text-primary">Production</span>
            </h1>

            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              The complete transformation of YieldMind into an institutional-grade, AI-powered DeFi infrastructure layer. Full mainnet rollout across Polygon zkEVM with enhanced security, institutional analytics, and global adoption features.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 gap-2">
                  Start Using Wave 5 <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                  Read Documentation
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="p-4 rounded-lg bg-white/50 border border-gray-200">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Main Vaults</div>
              </div>
              <div className="p-4 rounded-lg bg-white/50 border border-gray-200">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">On-Chain</div>
              </div>
              <div className="p-4 rounded-lg bg-white/50 border border-gray-200">
                <div className="text-2xl font-bold text-primary">v4</div>
                <div className="text-sm text-muted-foreground">AI Engine</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testnet Notice */}
      <section className="py-8 bg-yellow-50 border-b border-yellow-200">
        <div className="container mx-auto px-4">
          <Alert className="bg-yellow-100 border-yellow-300">
            <AlertCircle className="h-4 w-4 text-yellow-800" />
            <AlertDescription className="text-yellow-800">
              <strong>Testnet Available:</strong> Test all Wave 5 features on Polygon Amoy Testnet. Use our testnet faucet to get test MATIC tokens. Production mainnet deployment coming soon.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Wave 5 Features</h2>
            <p className="text-lg text-muted-foreground">Production-ready capabilities for institutional adoption</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Engine v4 Final */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-6 h-6 text-primary" />
                  <CardTitle>AI Engine v4 (Final)</CardTitle>
                </div>
                <Badge>Production Ready</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Next-generation intelligence layer with live protocol metrics, volatility indicators, and macro signals.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Continuous model validation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Confidence levels & risk reasoning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Strategy explainability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Real-time optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Institutional Analytics Suite */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <CardTitle>Institutional Analytics</CardTitle>
                </div>
                <Badge>Enterprise Grade</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Advanced portfolio intelligence for professional asset managers.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Yield curves & volatility metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Sharpe/Sortino ratios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Risk decomposition dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>API exports & reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Multi-Vault System */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="w-6 h-6 text-primary" />
                  <CardTitle>Multi-Vault Strategy</CardTitle>
                </div>
                <Badge>4 Production Vaults</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Multiple vaults tailored for different investor profiles.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Stable Yield Vault</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>ETH Momentum Vault</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Polygon Ecosystem Vault</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Adaptive High-APY Vault</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* DAO Governance */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Vote className="w-6 h-6 text-primary" />
                  <CardTitle>Full DAO Governance</CardTitle>
                </div>
                <Badge>Community Driven</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Complete decentralization with on-chain proposal execution.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>On-chain proposal execution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Treasury allocation control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Staking-based voting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Community-driven upgrades</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Enhanced Security */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <CardTitle>Production Security</CardTitle>
                </div>
                <Badge>Audit Ready</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Comprehensive security hardening and monitoring infrastructure.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Professional security audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Tenderly alert monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Oracle divergence checks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Extreme market fail-safes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Liquidity Partners */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Network className="w-6 h-6 text-primary" />
                  <CardTitle>Liquidity Integration</CardTitle>
                </div>
                <Badge>Deep Partnerships</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Expanded liquidity partner integrations for better execution.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Optimized routing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Execution efficiency</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Vault liquidity depth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Ecosystem collaborations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Transition Features */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Transition & Testing Features</h2>
            <p className="text-lg text-muted-foreground">Smooth migration from Wave 4 to Wave 5</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg">Testnet Environment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Complete testnet replica of production with Amoy faucet access.</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Switch to Testnet
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Gauge className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg">Live Testing Mode</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Test strategies with simulated capital before committing real funds.</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Enable Test Mode
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Code className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg">API Testing Suite</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Full API access with sandbox endpoints for development.</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  API Documentation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Database className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg">Data Migration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Automatic migration of Wave 4 vault positions to Wave 5.</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Start Migration
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Wallet Integration */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enhanced Wallet Integration</h2>
            <p className="text-lg text-muted-foreground">Seamless multi-chain wallet support</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Polygon Mainnet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Production environment for real DeFi operations.</p>
                <Badge>137</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Polygon Amoy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Testnet for safe testing and experimentation.</p>
                <Badge variant="outline">80002</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Auto-Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Smart chain detection with easy network switching.</p>
                <Badge variant="secondary">Enabled</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deployment Status */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-primary" />
                  Wave 5 Launch Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="w-1 h-12 bg-green-500 mt-2" />
                    </div>
                    <div className="pb-8">
                      <p className="font-semibold">Testnet Phase</p>
                      <p className="text-sm text-muted-foreground">Testing on Polygon Amoy - Now Live</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="w-1 h-12 bg-gray-300 mt-2" />
                    </div>
                    <div className="pb-8">
                      <p className="font-semibold">Mainnet Launch</p>
                      <p className="text-sm text-muted-foreground">Production deployment - Coming Soon</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">Global Adoption</p>
                      <p className="text-sm text-muted-foreground">Institutional partnerships & scaling</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">Ready for Wave 5?</h2>
            <p className="text-xl text-muted-foreground">
              Start testing on Polygon Amoy testnet or join the community to stay updated on mainnet launch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  <Zap className="w-5 h-5" />
                  Launch Dashboard
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  <BookOpen className="w-5 h-5" />
                  Developer Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function BookOpen(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
    </svg>
  )
}
