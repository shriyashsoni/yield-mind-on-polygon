'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Globe,
  ArrowRight,
  Activity,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Zap,
} from 'lucide-react';

export function CrossChainMonitor() {
  const chains = [
    {
      name: 'Polygon',
      chain: 'polygon',
      balance: 1250000,
      apy: 12.5,
      tvl: 45000000,
      health: 99.8,
      status: 'healthy',
    },
    {
      name: 'Base',
      chain: 'base',
      balance: 650000,
      apy: 11.2,
      tvl: 28000000,
      health: 98.5,
      status: 'healthy',
    },
    {
      name: 'Arbitrum',
      chain: 'arbitrum',
      balance: 500000,
      apy: 10.8,
      tvl: 22000000,
      health: 97.2,
      status: 'healthy',
    },
  ];

  const [selectedFrom, setSelectedFrom] = useState('polygon');
  const [selectedTo, setSelectedTo] = useState('base');

  const getHealthColor = (health: number) => {
    if (health > 98) return 'text-green-600';
    if (health > 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'healthy')
      return (
        <Badge className="bg-green-500/20 text-green-700">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Healthy
        </Badge>
      );
    if (status === 'warning')
      return (
        <Badge className="bg-yellow-500/20 text-yellow-700">
          <AlertCircle className="w-3 h-3 mr-1" />
          Warning
        </Badge>
      );
    return (
      <Badge className="bg-red-500/20 text-red-700">
        <AlertCircle className="w-3 h-3 mr-1" />
        Critical
      </Badge>
    );
  };

  return (
    <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-600" />
              Cross-Chain Monitor
            </CardTitle>
            <CardDescription>Multi-chain liquidity and performance tracking</CardDescription>
          </div>
          <Badge className="bg-cyan-500/20 text-cyan-700">3 Chains Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chain Overview */}
        <div className="space-y-4">
          {chains.map((chain) => (
            <div key={chain.chain} className="p-4 border rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{chain.name}</p>
                    <p className="text-xs text-muted-foreground">
                      TVL: ${(chain.tvl / 1000000).toFixed(0)}M
                    </p>
                  </div>
                </div>
                {getStatusBadge(chain.status)}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="text-sm font-semibold">${(chain.balance / 1000000).toFixed(2)}M</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">APY</p>
                  <p className="text-sm font-semibold text-green-600">{chain.apy}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Chain Health</p>
                  <p className={`text-sm font-semibold ${getHealthColor(chain.health)}`}>{chain.health}%</p>
                </div>
              </div>

              <Progress value={chain.health} className="h-1" />
            </div>
          ))}
        </div>

        {/* Bridge Route */}
        <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-500/5 to-transparent space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Bridge Route Optimizer
          </h4>
          <div className="flex items-center justify-between">
            <select
              value={selectedFrom}
              onChange={(e) => setSelectedFrom(e.target.value)}
              className="text-sm border rounded px-2 py-1 bg-background text-foreground"
            >
              {chains.map((c) => (
                <option key={c.chain} value={c.chain}>
                  {c.name}
                </option>
              ))}
            </select>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedTo}
              onChange={(e) => setSelectedTo(e.target.value)}
              className="text-sm border rounded px-2 py-1 bg-background text-foreground"
            >
              {chains.map((c) => (
                <option key={c.chain} value={c.chain}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-muted rounded">
              <p className="text-muted-foreground mb-1">Gas Cost</p>
              <p className="font-semibold">~$45</p>
            </div>
            <div className="p-2 bg-muted rounded">
              <p className="text-muted-foreground mb-1">Time</p>
              <p className="font-semibold">~2 min</p>
            </div>
            <div className="p-2 bg-muted rounded">
              <p className="text-muted-foreground mb-1">Yield Gain</p>
              <p className="font-semibold text-green-600">+0.3%</p>
            </div>
          </div>
        </div>

        {/* Total Stats */}
        <div className="grid md:grid-cols-3 gap-2 pt-2 border-t">
          <div className="text-center py-2">
            <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
            <p className="text-xl font-bold">$2.4M</p>
          </div>
          <div className="text-center py-2">
            <p className="text-xs text-muted-foreground mb-1">Avg APY</p>
            <p className="text-xl font-bold text-green-600">11.5%</p>
          </div>
          <div className="text-center py-2">
            <p className="text-xs text-muted-foreground mb-1">Avg Health</p>
            <p className="text-xl font-bold text-blue-600">98.5%</p>
          </div>
        </div>

        <div className="p-3 border border-cyan-500/30 rounded-lg bg-cyan-500/5 flex gap-2">
          <Globe className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Powered by CrossChainRouter contract with LayerZero integration for seamless routing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
