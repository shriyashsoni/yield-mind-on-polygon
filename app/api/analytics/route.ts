import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "30d"

    const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90

    const analyticsData = {
      timeframe,
      summary: {
        totalReturn: 27.1,
        sharpeRatio: 2.14,
        maxDrawdown: -8.2,
        winRate: 73,
        avgAPY: 18.4,
        volatility: 12.3,
      },
      historicalPerformance: Array.from({ length: days }, (_, i) => {
        const date = new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000)
        const baseValue = 20000
        const growth = (i / days) * 5420.5
        const noise = Math.sin(i * 0.5) * 200 + Math.random() * 100
        return {
          date: date.toISOString().split("T")[0],
          portfolioValue: baseValue + growth + noise,
          apy: 15 + (i / days) * 3.4 + Math.random() * 2,
          benchmark: baseValue + (i / days) * 2800 + noise * 0.5,
        }
      }),
      strategyBreakdown: [
        { strategy: "Balancer", value: 11439.23, percentage: 45, apy: 22.5 },
        { strategy: "Aave", value: 7117.74, percentage: 28, apy: 18.2 },
        { strategy: "QuickSwap", value: 5084.1, percentage: 20, apy: 15.8 },
        { strategy: "Curve", value: 1779.43, percentage: 7, apy: 12.3 },
      ],
      rebalanceHistory: Array.from({ length: 10 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 75 + Math.random() * 20,
        gasCost: 0.02 + Math.random() * 0.03,
        apyImprovement: 0.5 + Math.random() * 1.5,
      })),
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("[v0] Analytics API error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
