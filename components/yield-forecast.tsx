"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, Calendar } from "lucide-react"

const forecastData = [
  { day: "Today", value: 25000, forecast: 25000 },
  { day: "Day 7", value: 25890, forecast: 25890 },
  { day: "Day 14", value: 26820, forecast: 26820 },
  { day: "Day 21", value: 27790, forecast: 27790 },
  { day: "Day 30", value: 28810, forecast: 28810 },
]

export function YieldForecast() {
  const projectedGain = (((28810 - 25000) / 25000) * 100).toFixed(2)

  return (
    <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <CardTitle>30-Day Yield Forecast</CardTitle>
          </div>
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            AI Powered
          </Badge>
        </div>
        <CardDescription>ML-based prediction using historical data and market trends</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Current Value</p>
            <p className="text-lg font-bold text-foreground">$25,000</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Projected (30d)</p>
            <p className="text-lg font-bold text-cyan-400">$28,810</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Expected Gain</p>
            <p className="text-lg font-bold text-success">+{projectedGain}%</p>
          </div>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#ffffff" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#ffffff"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Projected Value"]}
              />
              <Area type="monotone" dataKey="forecast" stroke="#06b6d4" strokeWidth={2} fill="url(#forecastGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Model Confidence</p>
            <p className="text-sm font-semibold text-foreground">87.3% accuracy</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
