import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In production, this would call your Python FastAPI ML service
    // const response = await fetch('http://ml-service:8000/api/recommendations')
    // const data = await response.json()

    // Mock response for demo
    const recommendation = {
      strategyAddresses: [
        "0x1234567890123456789012345678901234567890",
        "0x2345678901234567890123456789012345678901",
        "0x3456789012345678901234567890123456789012",
        "0x4567890123456789012345678901234567890123",
      ],
      newAllocations: [45, 28, 20, 7],
      confidence: 87,
      projectedAPY: 20.7,
      gasCost: "$0.12",
      reasoning: [
        {
          type: "increase",
          strategy: "Balancer Weighted Pool",
          change: 5,
          reason: "Optimal yield based on recent gas trends and liquidity depth",
        },
        {
          type: "decrease",
          strategy: "Curve Stable Pool",
          change: -3,
          reason: "Predicted volatility increase in stablecoin pools",
        },
        {
          type: "decrease",
          strategy: "Aave Lending",
          change: -2,
          reason: "Lower utilization rates detected",
        },
      ],
      timestamp: Date.now(),
    }

    return NextResponse.json(recommendation)
  } catch (error) {
    console.error("[v0] ML API error:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
