"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertCircle, Loader2 } from "lucide-react"
import { useMLRecommendations } from "@/hooks/use-ml-recommendations"
import { useRebalance } from "@/hooks/use-rebalance"
import { Skeleton } from "@/components/ui/skeleton"
import { useWeb3 } from "@/lib/web3-context"

export function MLRecommendations() {
  const { recommendation, isLoading } = useMLRecommendations()
  const { executeRebalance, isPending } = useRebalance()
  const { isConnected } = useWeb3()

  if (isLoading) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader className="space-y-2 pb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
            <CardTitle className="text-base sm:text-lg md:text-xl">AI Recommendation</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm">
            Analyzing market conditions and optimizing strategy allocation...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 sm:h-6 w-24 sm:w-32" />
            <Skeleton className="h-4 w-16 sm:w-20" />
          </div>
          <Skeleton className="h-16 sm:h-20 w-full" />
          <Skeleton className="h-16 sm:h-20 w-full" />
          <div className="pt-2 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-9 sm:h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!recommendation) {
    return null
  }

  const handleRebalance = () => {
    if (!isConnected) {
      return
    }
    executeRebalance(recommendation)
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <CardTitle className="text-base sm:text-lg md:text-xl">AI Recommendation</CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-sm">Latest optimization from ML model v2.1</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs sm:text-sm w-fit">
            High Confidence: {recommendation.confidence}%
          </Badge>
          <span className="text-xs text-muted-foreground">
            Updated {Math.floor((Date.now() - recommendation.timestamp) / 60000)}m ago
          </span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {recommendation.reasoning.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
            >
              {item.type === "increase" ? (
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-warning mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                  {item.type === "increase" ? "Increase" : "Reduce"} {item.strategy}
                </p>
                <p className="text-xs text-muted-foreground break-words leading-relaxed">
                  {item.change > 0 ? "+" : ""}
                  {item.change}% - {item.reason}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 sm:pt-4 space-y-2 border-t border-border/50">
          <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
            <span className="text-muted-foreground">Projected APY Increase</span>
            <span className="text-success font-semibold text-sm sm:text-base">
              +{(recommendation.projectedAPY - 18.4).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
            <span className="text-muted-foreground">Estimated Gas Cost</span>
            <span className="text-foreground font-mono text-sm sm:text-base">{recommendation.gasCost}</span>
          </div>
        </div>

        <Button
          className="w-full gap-2 text-xs sm:text-sm md:text-base h-9 sm:h-10"
          onClick={handleRebalance}
          disabled={!isConnected || isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Execute Rebalance</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
