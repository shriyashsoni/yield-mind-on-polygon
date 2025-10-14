"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useStrategyData } from "@/hooks/use-strategy-data"
import { Skeleton } from "@/components/ui/skeleton"

export function StrategyAllocation() {
  const { strategies, weightedAPY, isLoading } = useStrategyData()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Strategy Allocation</CardTitle>
          <CardDescription>Current portfolio distribution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Allocation</CardTitle>
        <CardDescription>Current portfolio distribution</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {strategies.map((strategy) => (
          <div key={strategy.address} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{strategy.name}</span>
              <span className="text-muted-foreground">{strategy.allocation}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={strategy.allocation} className="flex-1" />
              <span className="text-xs font-mono text-success">{strategy.apy.toFixed(1)}% APY</span>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Weighted Average APY</span>
            <span className="text-lg font-bold text-success">{weightedAPY.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
