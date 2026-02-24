'use client';

import { useState, useEffect } from 'react';
import { useWeb3 } from '@/lib/web3-context';
import { Header } from '@/components/header';
import { Navigation } from '@/components/navigation';
import { useVaultData } from '@/hooks/use-vault-data';
import { useStrategyData } from '@/hooks/use-strategy-data';
import { useUserActivity } from '@/hooks/use-user-activity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DeploymentDashboard } from '@/components/deployment-dashboard';
import { DashboardStats } from '@/components/dashboard-stats';
import { VaultOverview } from '@/components/vault-overview';
import { DEPLOYED_CONTRACTS, getDeployedContracts } from '@/lib/contract-utils';
import { getVaultProductAddress, isDeployedAddress } from '@/lib/contracts';
import {
  Wallet,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Network,
} from 'lucide-react';

export default function DashboardPage() {
  const { address, isConnected, chainId } = useWeb3();
  const { totalValueLocked, usdcBalance, assetSymbol, userBalance } = useVaultData();
  const { strategies } = useStrategyData();
  const { activities } = useUserActivity();
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    totalVolumeDeployed: '$0',
    protocolHealth: '100%',
    activeStrategies: 0,
    insuranceReserve: '$0',
  });

  useEffect(() => {
    if (isConnected) {
      setMetrics({
        totalVolumeDeployed: `$${Number(totalValueLocked || 0).toLocaleString()}`,
        protocolHealth: '100%',
        activeStrategies: strategies.length,
        insuranceReserve: 'On-chain',
      });
    }
  }, [isConnected, address, strategies.length, totalValueLocked]);

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
  const explorerBaseUrl = chainId === 137 ? 'https://polygonscan.com/tx/' : 'https://amoy.polygonscan.com/tx/';
  const vaultGroups = [
    { key: 'low', label: 'Conservative Vault' },
    { key: 'medium', label: 'Balanced Vault' },
    { key: 'high', label: 'Aggressive Vault' },
  ] as const;

  const toAmount = (value: string) => Number.parseFloat(value) || 0;

  const vaultMetrics = vaultGroups.map((group) => {
    const vaultAddress = getVaultProductAddress(chainId, group.key);
    const byAddress = activities.filter((item) => item.vaultAddress?.toLowerCase() === vaultAddress.toLowerCase());
    const byName = activities.filter((item) => item.vaultName === group.label);
    const merged = byName.length > byAddress.length ? byName : byAddress;

    const deposited = merged
      .filter((item) => item.type === 'deposit')
      .reduce((sum, item) => sum + toAmount(item.amount), 0);
    const withdrawn = merged
      .filter((item) => item.type === 'withdraw')
      .reduce((sum, item) => sum + toAmount(item.amount), 0);

    return {
      ...group,
      vaultAddress,
      txCount: merged.length,
      deposited,
      withdrawn,
      netFlow: deposited - withdrawn,
      recent: merged.slice(0, 3),
    };
  });

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
                <p className="text-xs text-muted-foreground mt-1">
                  Asset Balance: {Number(usdcBalance).toLocaleString(undefined, { maximumFractionDigits: 4 })} {assetSymbol}
                </p>
                <p className="text-xs text-muted-foreground">
                  In Vault: {Number(userBalance).toLocaleString(undefined, { maximumFractionDigits: 4 })} {assetSymbol}
                </p>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <VaultOverview />
            <Card>
              <CardHeader>
                <CardTitle>Vault Product Breakdown</CardTitle>
                <CardDescription>Per-vault activity and flow metrics for Low, Medium, and High risk vaults</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {vaultMetrics.map((vault) => (
                    <div key={vault.key} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold">{vault.label}</p>
                        <Badge variant={isDeployedAddress(vault.vaultAddress) ? 'default' : 'secondary'}>
                          {isDeployedAddress(vault.vaultAddress) ? 'Active' : 'Not Deployed'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono break-all">{vault.vaultAddress}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Transactions</p>
                          <p className="font-bold">{vault.txCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Net Flow</p>
                          <p className={`font-bold ${vault.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {vault.netFlow >= 0 ? '+' : ''}
                            {vault.netFlow.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Deposited</p>
                          <p className="font-medium">{vault.deposited.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Withdrawn</p>
                          <p className="font-medium">{vault.withdrawn.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest deposits and withdrawals from this wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {activities.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No activity yet. Deposit from Products or Vault Overview.</p>
                ) : (
                  <div className="space-y-4">
                    {vaultMetrics.map((vault) => (
                      <div key={vault.key} className="space-y-2">
                        <p className="text-sm font-semibold">{vault.label}</p>
                        {vault.recent.length === 0 ? (
                          <p className="text-xs text-muted-foreground">No activity</p>
                        ) : (
                          vault.recent.map((activity) => (
                            <div key={activity.id} className="p-3 border rounded-lg flex items-center justify-between gap-3">
                              <div>
                                <p className="font-medium">
                                  {activity.type === 'deposit' ? 'Deposit' : 'Withdrawal'} {activity.amount} {activity.assetSymbol}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(activity.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <a
                                href={`${explorerBaseUrl}${activity.txHash}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-primary hover:underline"
                              >
                                {activity.txHash.slice(0, 6)}...{activity.txHash.slice(-4)}
                              </a>
                            </div>
                          ))
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wave 6 Protocol Overview</CardTitle>
                <CardDescription>
                  Enterprise-grade DeFi infrastructure with AI optimization, risk insurance, and autonomous execution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Deployed Contracts
                    </h4>
                    <p className="text-2xl font-bold">{getDeployedContracts().length}</p>
                    <p className="text-xs text-muted-foreground">of {DEPLOYED_CONTRACTS.length} total</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      Pending Deployment
                    </h4>
                    <p className="text-2xl font-bold">{DEPLOYED_CONTRACTS.length - getDeployedContracts().length}</p>
                    <p className="text-xs text-muted-foreground">awaiting deployment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <DeploymentDashboard />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Protocol Analytics
                </CardTitle>
                <CardDescription>Performance metrics and contract statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold mb-2">AI Forecasting Engine</h4>
                    <p className="text-sm text-muted-foreground">Real-time predictive accuracy and confidence metrics</p>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold mb-2">Risk Metrics</h4>
                    <p className="text-sm text-muted-foreground">Risk scoring, insurance reserve, and protection status</p>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold mb-2">Strategy Performance</h4>
                    <p className="text-sm text-muted-foreground">Individual strategy ROI, APY, and efficiency metrics</p>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold mb-2">Cross-Chain Activity</h4>
                    <p className="text-sm text-muted-foreground">Multi-chain routing and liquidity optimization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <DashboardStats />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
