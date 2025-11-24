"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Zap, Settings, TrendingUp, Shield, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { useWeb3 } from "@/lib/web3-context"

export function AutonomousMode() {
  const { isConnected } = useWeb3()
  const [isEnabled, setIsEnabled] = useState(false)
  const [stats, setStats] = useState({
    lastRebalance: "2 hours ago",
    nextScheduled: "4 hours",
    executionCount: 12,
    gasSaved: "$145.20",
  })

  useEffect(() => {
    if (isEnabled) {
      const interval = setInterval(() => {
        setStats((prev) => ({
          ...prev,
          lastRebalance: "Just now",
          executionCount: prev.executionCount + 1,
        }))
      }, 300000) // 5 minutes for demo
      return () => clearInterval(interval)
    }
  }, [isEnabled])

  return (
    <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <CardTitle>Autonomous Mode</CardTitle>
          </div>
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            Wave 3
          </Badge>
        </div>
        <CardDescription>Let AI automatically rebalance your portfolio based on market conditions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
          <div className="space-y-0.5">
            <Label htmlFor="autonomous-mode" className="text-base font-semibold">
              Enable Auto-Rebalancing
            </Label>
            <p className="text-xs text-muted-foreground">Automatic execution when confidence {">"}85%</p>
          </div>
          <Switch id="autonomous-mode" checked={isEnabled} onCheckedChange={setIsEnabled} disabled={!isConnected} />
        </div>

        {isEnabled && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs text-muted-foreground">Last Rebalance</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{stats.lastRebalance}</p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs text-muted-foreground">Executions</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{stats.executionCount}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-background border border-border">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold mb-1">Smart Execution</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Gas optimization during low network activity</li>
                    <li>• Confidence threshold validation</li>
                    <li>• Emergency pause on high volatility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button variant="outline" className="w-full gap-2 bg-transparent" disabled={!isConnected}>
          <Settings className="w-4 h-4" />
          Configure Settings
        </Button>
      </CardContent>
    </Card>
  )
}
