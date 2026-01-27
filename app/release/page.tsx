'use client'

import { Header } from '@/components/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  Coins,
  Target,
  Building2,
} from 'lucide-react'
import Link from 'next/link'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ReleasesPage() {
  const waves = [
    {
      id: 'wave-5',
      title: 'Wave 5: Production Launch',
      subtitle: 'Current Version',
      status: 'Live on Testnet',
      badge: 'Latest',
      badgeColor: 'bg-primary/10 border-primary/20 text-primary',
      description: 'Institutional-grade DeFi infrastructure with full production readiness',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      highlights: [
        'AI Engine v4 (Production-ready)',
        'Institutional Analytics Suite',
        'Multi-Vault System (4 types)',
        'Full DAO Governance',
        'Production Security Audit',
        'Testnet on Polygon Amoy (80002)',
      ],
      features: [
        { icon: Brain, name: 'AI Engine v4', desc: 'Production-grade with continuous validation' },
        { icon: BarChart3, name: 'Analytics Suite', desc: 'Institutional-grade metrics' },
        { icon: Layers, name: 'Multi-Vault', desc: '4 specialized vault strategies' },
        { icon: Vote, name: 'Full DAO', desc: 'On-chain governance complete' },
        { icon: Shield, name: 'Security', desc: 'Professional audits & monitoring' },
        { icon: Network, name: 'Testnet', desc: 'Safe testing environment' },
      ],
      cta: 'Access Testnet',
      ctaLink: '/dashboard',
    },
    {
      id: 'wave-4',
      title: 'Wave 4: Global Scaling',
      subtitle: 'Foundation Release',
      status: 'Completed',
      badge: 'Integrated',
      badgeColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      description: 'Enhanced autonomy and cross-chain optimization capabilities',
      gradient: 'from-purple-500/10 to-pink-500/10',
      highlights: [
        'AI Engine v4.0 Release',
        'Multi-Vault Implementation',
        'Cross-Chain Expansion',
        'Institutional Analytics',
        'Global DAO Framework',
        '5+ Chain Support',
      ],
      features: [
        { icon: Brain, name: 'AI v4.0', desc: 'Advanced ensemble models' },
        { icon: Globe, name: '5+ Chains', desc: 'Multi-chain deployment' },
        { icon: Coins, name: 'Multi-Vault', desc: 'Diverse strategies' },
        { icon: BarChart3, name: 'Analytics', desc: 'Institutional metrics' },
        { icon: Vote, name: 'DAO', desc: 'Governance framework' },
        { icon: Zap, name: 'Optimization', desc: 'Enhanced efficiency' },
      ],
    },
    {
      id: 'wave-3',
      title: 'Wave 3: Infrastructure',
      subtitle: 'Core Platform',
      status: 'Completed',
      badge: 'Archived',
      badgeColor: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
      description: 'DAO governance, institutional analytics, and multi-protocol foundation',
      gradient: 'from-cyan-500/10 to-teal-500/10',
      highlights: [
        'AI Engine v3.0',
        'Multi-Asset Vaults',
        'Cross-Chain Support',
        'Autonomous Mode',
        'Risk Scoring',
        '7-Day Forecasting',
      ],
      features: [
        { icon: Brain, name: 'AI v3.0', desc: 'Advanced predictions' },
        { icon: Layers, name: 'Multi-Asset', desc: '3+ asset support' },
        { icon: Network, name: 'Cross-Chain', desc: 'Protocol expansion' },
        { icon: Workflow, name: 'Autonomous', desc: 'Auto rebalancing' },
        { icon: Target, name: 'Risk Scoring', desc: '0-100 rating system' },
        { icon: LineChart, name: 'Forecasting', desc: '7-day predictions' },
      ],
    },
    {
      id: 'wave-2',
      title: 'Wave 2: ML Integration',
      subtitle: 'Enhancement Release',
      status: 'Completed',
      badge: 'Legacy',
      badgeColor: 'bg-green-500/10 border-green-500/20 text-green-400',
      description: 'Machine learning recommendations and advanced yield strategies',
      gradient: 'from-green-500/10 to-emerald-500/10',
      highlights: [
        'AI Engine v2.0',
        'ML Recommendations',
        'Polygon zkEVM',
        '40% Gas Savings',
        'Automated Rebalancer',
        'Smart Contracts v2',
      ],
      features: [
        { icon: Brain, name: 'AI v2.0', desc: 'ML recommendations' },
        { icon: Zap, name: '40% Gas Savings', desc: 'Optimized costs' },
        { icon: Workflow, name: 'Auto Rebalancer', desc: 'Automated strategy' },
        { icon: Shield, name: 'Security', desc: 'Enhanced contracts' },
        { icon: TrendingUp, name: 'Smart Yield', desc: 'Advanced strategies' },
        { icon: Activity, name: 'Monitoring', desc: 'Real-time tracking' },
      ],
    },
    {
      id: 'wave-1',
      title: 'Wave 1: Foundation',
      subtitle: 'Initial Launch',
      status: 'Completed',
      badge: 'Genesis',
      badgeColor: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
      description: 'Initial YieldMind launch with basic vault and single-strategy optimization',
      gradient: 'from-slate-500/10 to-gray-500/10',
      highlights: [
        'Core Infrastructure',
        'Basic Vaults',
        'Single Strategy',
        'Polygon Integration',
        'User Dashboard',
        'Smart Contracts v1',
      ],
      features: [
        { icon: Database, name: 'Core Stack', desc: 'Foundation setup' },
        { icon: Layers, name: 'Vaults', desc: 'Basic vault system' },
        { icon: Target, name: 'Strategy', desc: 'Initial strategies' },
        { icon: Network, name: 'Polygon', desc: 'Main integration' },
        { icon: Activity, name: 'Dashboard', desc: 'User interface' },
        { icon: Lock, name: 'Security', desc: 'Basic contracts' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Rocket className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Release History</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              YieldMind Evolution
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From foundation to institutional-grade infrastructure. Explore every milestone in YieldMind's journey to revolutionize DeFi.
            </p>
          </div>
        </div>
      </section>

      {/* Testnet Alert */}
      <section className="py-8 bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4">
          <Alert className="bg-blue-100 border-blue-300">
            <AlertCircle className="h-4 w-4 text-blue-800" />
            <AlertDescription className="text-blue-800">
              <strong>Wave 5 Now Live on Testnet:</strong> Experience the latest production-ready features on Polygon Amoy (80002). Get test MATIC from our testnet faucet.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Wave Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="wave-5" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="wave-5">Wave 5</TabsTrigger>
              <TabsTrigger value="wave-4">Wave 4</TabsTrigger>
              <TabsTrigger value="wave-3">Wave 3</TabsTrigger>
              <TabsTrigger value="wave-2">Wave 2</TabsTrigger>
              <TabsTrigger value="wave-1">Wave 1</TabsTrigger>
            </TabsList>

            {waves.map((wave) => (
              <TabsContent key={wave.id} value={wave.id} className="space-y-8">
                {/* Wave Header Card */}
                <Card className={`border-2 bg-gradient-to-br ${wave.gradient}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h2 className="text-3xl font-bold">{wave.title}</h2>
                          <Badge className={wave.badgeColor}>
                            {wave.badge}
                          </Badge>
                        </div>
                        <p className="text-lg text-muted-foreground">{wave.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-semibold">{wave.status}</p>
                      </div>
                    </div>

                    {wave.cta && (
                      <div className="pt-4">
                        <Link href={wave.ctaLink}>
                          <Button className="gap-2">
                            {wave.cta}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Key Highlights */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {wave.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features Grid */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Core Features</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {wave.features.map((feature, idx) => {
                      const Icon = feature.icon
                      return (
                        <Card key={idx}>
                          <CardContent className="p-6">
                            <Icon className="w-8 h-8 text-primary mb-3" />
                            <h4 className="font-semibold mb-2">{feature.name}</h4>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Release Timeline</h2>
          <div className="space-y-6">
            {waves.map((wave, idx) => (
              <div key={wave.id} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  {idx !== waves.length - 1 && (
                    <div className="w-0.5 h-24 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{wave.title}</h3>
                    <Badge variant="outline">{wave.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">{wave.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Experience Wave 5 production features on testnet today, or review the documentation to understand YieldMind's evolution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Launch App <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="bg-transparent">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
