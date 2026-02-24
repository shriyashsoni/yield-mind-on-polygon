'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Zap,
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  BarChart3,
} from 'lucide-react';

export function AutonomousExecutionMonitor() {
  const [nextCheckIn, setNextCheckIn] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setNextCheckIn((prev) => (prev <= 1 ? 300 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const executionLog = [
    {
      id: 1,
      type: 'rebalance',
      status: 'completed',
      time: '2 hours ago',
      gasUsed: '$12.45',
      action: 'Increased Aave position by 15%',
      txHash: '0x1234...5678',
    },
    {
      id: 2,
      type: 'harvest',
      status: 'completed',
      time: '5 hours ago',
      gasUsed: '$8.32',
      action: 'Harvested yield rewards',
      txHash: '0x2345...6789',
    },
    {
      id: 3,
      type: 'protection',
      status: 'triggered',
      time: '1 day ago',
      gasUsed: '$45.23',
      action: 'Insurance protection activated',
      txHash: '0x3456...7890',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'completed')
      return <Badge className="bg-green-500/20 text-green-700">Completed</Badge>;
    if (status === 'triggered')
      return <Badge className="bg-blue-500/20 text-blue-700">Triggered</Badge>;
    return <Badge className="bg-yellow-500/20 text-yellow-700">Pending</Badge>;
  };

  return (
    <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              Autonomous Execution Monitor
            </CardTitle>
            <CardDescription>Real-time execution status and history</CardDescription>
          </div>
          <Badge className="bg-orange-500/20 text-orange-700">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Next Check Status */}
        <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-500/5 to-transparent">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Next Execution Check
            </h4>
            <span className="text-lg font-bold text-blue-600">{nextCheckIn}s</span>
          </div>
          <Progress value={(nextCheckIn / 300) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Chainlink Automation will trigger the next check. Real-time monitoring active.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="p-3 border rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Last Execution</p>
            <p className="text-sm font-semibold">2 hours ago</p>
            <p className="text-xs text-green-600 mt-1">Success</p>
          </div>
          <div className="p-3 border rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Total Gas Spent</p>
            <p className="text-sm font-semibold">$66.00</p>
            <p className="text-xs text-muted-foreground mt-1">Last 24h</p>
          </div>
          <div className="p-3 border rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Executions Today</p>
            <p className="text-sm font-semibold">4 of 6</p>
            <p className="text-xs text-orange-600 mt-1">67%</p>
          </div>
        </div>

        {/* Execution Log */}
        <div>
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Recent Executions
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {executionLog.map((log) => (
              <div key={log.id} className="p-3 border rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{log.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                  </div>
                  {getStatusColor(log.status)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <a
                    href={`https://polygonscan.com/tx/${log.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {log.txHash}
                  </a>
                  <span className="font-mono">{log.gasUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Control */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2">
            <AlertCircle className="w-4 h-4" />
            Manual Trigger
          </Button>
          <Button className="flex-1 gap-2 bg-orange-600 hover:bg-orange-700">
            <CheckCircle2 className="w-4 h-4" />
            View Full History
          </Button>
        </div>

        <div className="p-3 border border-orange-500/30 rounded-lg bg-orange-500/5 flex gap-2">
          <Zap className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Autonomous execution powered by Chainlink Automation and AutonomousExecutor contract.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
