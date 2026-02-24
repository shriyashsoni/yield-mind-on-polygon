'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function AIReasoningPanel() {
  const [expandedSection, setExpandedSection] = useState<string | null>('strategy');

  const reasoning = {
    strategy: {
      icon: TrendingUp,
      title: 'Strategy Selection',
      color: 'text-green-600',
      items: [
        'Aave USDC Pool shows 11.5% APY vs Compound 10.8%',
        'Aave liquidity depth is 2.3B+ (lower slippage)',
        'Risk score: 78/100 (within mandate limits)',
        'Expected yield increase: +0.7% vs current allocation',
      ],
    },
    risk: {
      icon: AlertCircle,
      title: 'Risk Assessment',
      color: 'text-amber-600',
      items: [
        'Protocol risk: LOW (audited, established)',
        'Liquidity risk: LOW (deep pools)',
        'Volatility: 15% (below mandate cap of 18%)',
        'Insurance coverage: 85% protection ratio',
      ],
    },
    rejected: {
      icon: AlertCircle,
      title: 'Alternatives Rejected',
      color: 'text-red-600',
      items: [
        'Curve Finance: 10.2% APY (lower yield)',
        'Lido staking: 3.8% (protocol risk > threshold)',
        'Uniswap LP: High IL risk (9.2% estimated)',
        'Balancer: Liquidity insufficient for position',
      ],
    },
  };

  return (
    <Card className="border-2 border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-violet-600" />
          AI Reasoning Engine
        </CardTitle>
        <CardDescription>Transparent decision-making explained</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(reasoning).map(([key, section]) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === key;

          return (
            <div key={key} className="border rounded-lg bg-muted/50 overflow-hidden">
              <button
                onClick={() => setExpandedSection(isExpanded ? null : key)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center gap-3 text-left">
                  <Icon className={`w-4 h-4 ${section.color}`} />
                  <span className="font-semibold text-sm">{section.title}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 border-t">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pt-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex-shrink-0 mt-2" />
                      <p className="text-xs text-muted-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg space-y-2 mt-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-violet-500/20 text-violet-700 text-xs">
              <Brain className="w-3 h-3 mr-1" />
              ML Model v4.2
            </Badge>
            <span className="text-xs text-muted-foreground">Updated 5 minutes ago</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All decisions are backed by the AIOracle smart contract and verified on-chain. This reasoning is auditable.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
