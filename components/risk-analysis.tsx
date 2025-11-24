"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, TrendingDown, Activity } from "lucide-react"
import { useEffect, useState } from "react"

export function RiskAnalysis() {
  const [riskScore, setRiskScore] = useState(0)
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("low")

  useEffect(() => {
    // Simulate risk calculation
    const score = 32 // Out of 100
    setRiskScore(score)

    if (score < 30) setRiskLevel("low")
    else if (score < 60) setRiskLevel("medium")
    else setRiskLevel("high")
  }, [])

  const getRiskColor = () => {
    if (riskLevel === "low") return "text-success"
    if (riskLevel === "medium") return "text-warning"
    return "text-destructive"
  }

  const getRiskBadgeColor = () => {
    if (riskLevel === "low") return "bg-success/10 text-success border-success/30"
    if (riskLevel === "medium") return "bg-warning/10 text-warning border-warning/30"
    return "bg-destructive/10 text-destructive border-destructive/30"
  }

  return (
    <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <CardTitle>Risk Analysis</CardTitle>
          </div>
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            Wave 3
          </Badge>
        </div>
        <CardDescription>Real-time portfolio risk assessment powered by AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Risk Score</span>
            <Badge variant="outline" className={getRiskBadgeColor()}>
              {riskLevel.toUpperCase()}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-3xl font-bold ${getRiskColor()}`}>{riskScore}/100</span>
              <span className="text-xs text-muted-foreground">Lower is better</span>
            </div>
            <Progress value={riskScore} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Max Drawdown</span>
            </div>
            <p className="text-sm font-semibold text-foreground">-8.2%</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Volatility</span>
            </div>
            <p className="text-sm font-semibold text-foreground">12.3%</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Risk Factors</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2 rounded-lg bg-success/5 border border-success/20">
              <Shield className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">Diversified Portfolio</p>
                <p className="text-xs text-muted-foreground">4 strategies across multiple protocols</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-lg bg-warning/5 border border-warning/20">
              <AlertTriangle className="w-3.5 h-3.5 text-warning mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">Market Volatility</p>
                <p className="text-xs text-muted-foreground">Increased activity in DeFi markets</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-background border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold">Protection Active</h4>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Circuit breaker at 15% loss</li>
            <li>• Slippage protection enabled</li>
            <li>• Smart liquidation thresholds</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
