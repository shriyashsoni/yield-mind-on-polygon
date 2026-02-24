'use client';

import { useState, useEffect } from 'react';
import { useWeb3 } from '@/lib/web3-context';
import { Header } from '@/components/header';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { VaultOverview } from '@/components/vault-overview';
import { MLRecommendations } from '@/components/ml-recommendations';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { PortfolioMandatePanel } from '@/components/portfolio-mandate-panel';
import { RiskInsuranceModule } from '@/components/risk-insurance-module';
import { CrossChainMonitor } from '@/components/cross-chain-monitor';
import { AutonomousExecutionMonitor } from '@/components/autonomous-execution-monitor';
import { AIReasoningPanel } from '@/components/ai-reasoning-panel';
import { DashboardStats } from '@/components/dashboard-stats';
import { DEPLOYED_CONTRACTS, getDeployedContracts } from '@/lib/contract-utils';
import {
  Wallet,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Network,
  Lock,
  Globe,
  Brain,
} from 'lucide-react';

export default function DashboardPage() {
  const { address, isConnected, chainId } = useWeb3();
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    totalVolumeDeployed: '$0',
    protocolHealth: '100%',
    activeStrategies: 0,
    insuranceReserve: '$0',
  });

  useEffect(() => {
    // Fetch real metrics from contracts
    if (isConnected) {
      console.log('[v0] Fetching contract metrics for address:', address);
      // This will be connected to actual contract reads
    }
  }, [isConnected, address]);

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
                  Connect to Polygon Amoy Testnet to access YieldMind Wave 6 Dashboard
                </p>
              </div>
              <Button disabled>Connect Wallet</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const isValidChain = chainId === 80002; // Polygon Amoy

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Network Warning */}
        {!isValidChain && (
          <Card className="border-amber-500/50 bg-amber-500/10">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-semibold">Wrong Network</p>
                <p className="text-sm text-muted-foreground">
                  Please switch to Polygon Amoy Testnet (Chain ID: 80002) to interact with YieldMind contracts
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Connected Status */}
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Dashboard Connected
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Wallet Address</p>
                <p className="font-mono text-sm font-semibold">{address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Network</p>
                <Badge className="bg-green-500/20 text-green-700">
                  <Network className="w-3 h-3 mr-1" />
                  Polygon Amoy
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Deployed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.totalVolumeDeployed}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all contracts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Protocol Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{metrics.protocolHealth}</div>
              <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Active Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.activeStrategies}</div>
              <p className="text-xs text-muted-foreground mt-1">Running strategies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Insurance Reserve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.insuranceReserve}</div>
              <p className="text-xs text-muted-foreground mt-1">Protection pool</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            <TabsTrigger value="monitor">Monitor</TabsTrigger>
          </TabsList>

          {/* Portfolio Tab - Vault & Recommendations */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <VaultOverview />
                <PerformanceMetrics />
              </div>
              <div className="space-y-6">
                <MLRecommendations />
                <AIReasoningPanel />
              </div>
            </div>
          </TabsContent>

          {/* Enterprise Tab - Mandate, Risk, Cross-Chain */}
          <TabsContent value="enterprise" className="space-y-6">
            <PortfolioMandatePanel />
            <div className="grid lg:grid-cols-2 gap-6">
              <RiskInsuranceModule />
              <CrossChainMonitor />
            </div>
          </TabsContent>

          {/* Monitor Tab - Autonomous Execution & Stats */}
          <TabsContent value="monitor" className="space-y-6">
            <AutonomousExecutionMonitor />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Smart Contract Status
                </CardTitle>
                <CardDescription>Deployed and ready for interaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Deployed Contracts
                    </h4>
                    <p className="text-2xl font-bold">{getDeployedContracts().length}/10</p>
                    <p className="text-xs text-muted-foreground">Active on Polygon Amoy</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      Pending Deployment
                    </h4>
                    <p className="text-2xl font-bold">{DEPLOYED_CONTRACTS.length - getDeployedContracts().length}</p>
                    <p className="text-xs text-muted-foreground">Ready to deploy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
