import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { strategyAddresses, allocations, timeframe } = body

    // In production, call ML service for backtesting
    // const response = await fetch('http://ml-service:8000/api/backtest', {
    //   method: 'POST',
    //   body: JSON.stringify({ strategyAddresses, allocations, timeframe })
    // })

    // Mock backtest results
    const backtestResults = {
      historicalAPY: 18.4,
      projectedAPY: 20.7,
      volatility: 0.12,
      sharpeRatio: 1.85,
      maxDrawdown: 0.08,
      confidence: 87,
      performanceData: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
        value: 10000 + i * 100 + Math.random() * 200,
        apy: 15 + i * 0.2 + Math.random() * 2,
      })),
    }

    return NextResponse.json(backtestResults)
  } catch (error) {
    console.error("[v0] Backtest API error:", error)
    return NextResponse.json({ error: "Failed to run backtest" }, { status: 500 })
  }
}
