'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Shield,
  AlertTriangle,
  TrendingDown,
  Lock,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export function RiskInsuranceModule() {
  const insuranceData = {
    totalReserve: 2500000,
    protectionRatio: 0.85,
    maxDrawdown: -18.5,
    currentDrawdown: -5.2,
    stressTestScore: 92,
    protectedAmount: 2125000,
    isActive: true,
  };

  const getProtectionColor = (ratio: number) => {
    if (ratio > 0.8) return 'text-green-600';
    if (ratio > 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Risk Insurance Module
            </CardTitle>
            <CardDescription>AI-powered protection with automated reserves</CardDescription>
          </div>
          {insuranceData.isActive && (
            <Badge className="bg-green-500/20 text-green-700">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Protected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Protection Status */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm">Insurance Reserve</Label>
              <span className="text-lg font-bold text-emerald-600">
                ${(insuranceData.totalReserve / 1000000).toFixed(1)}M
              </span>
            </div>
            <Progress value={insuranceData.protectionRatio * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {(insuranceData.protectionRatio * 100).toFixed(0)}% protection ratio
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm">Protected Amount</Label>
              <span className="text-lg font-bold text-emerald-600">
                ${(insuranceData.protectedAmount / 1000000).toFixed(1)}M
              </span>
            </div>
            <Progress value={80} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Of your deposited capital</p>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="space-y-3 p-4 border rounded-lg bg-gradient-to-br from-slate-500/5 to-transparent">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Drawdown Analysis
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Current Drawdown</p>
              <p className={`text-lg font-bold ${insuranceData.currentDrawdown < -10 ? 'text-red-600' : 'text-yellow-600'}`}>
                {insuranceData.currentDrawdown.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Max Drawdown Limit</p>
              <p className="text-lg font-bold text-red-600">{insuranceData.maxDrawdown.toFixed(1)}%</p>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/30"
              style={{
                width: `${Math.abs(insuranceData.currentDrawdown / insuranceData.maxDrawdown) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Stress Test Results */}
        <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-500/5 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">Stress Test Score</h4>
            <span className="text-2xl font-bold text-blue-600">{insuranceData.stressTestScore}/100</span>
          </div>
          <Progress value={insuranceData.stressTestScore} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Portfolio resilience in extreme market conditions
          </p>
        </div>

        {/* Insurance Actions */}
        <div className="grid md:grid-cols-2 gap-2">
          <Button variant="outline" className="gap-2">
            <TrendingDown className="w-4 h-4" />
            Simulation
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Lock className="w-4 h-4" />
            Top-Up Reserve
          </Button>
        </div>

        <div className="p-3 border border-emerald-500/30 rounded-lg bg-emerald-500/5 flex gap-2">
          <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Insurance funded by RiskGuard contract. Auto-triggers protection when drawdown exceeds threshold.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm font-medium ${className}`}>{children}</p>;
}
