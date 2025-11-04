import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Address required" }, { status: 400 })
    }

    const portfolioData = {
      address,
      totalValue: 25420.5,
      totalDeposited: 20000,
      totalProfit: 5420.5,
      profitPercentage: 27.1,
      strategies: [
        {
          name: "Balancer Weighted Pool",
          protocol: "Balancer",
          allocation: 45,
          value: 11439.23,
          apy: 22.5,
          risk: "Medium",
          status: "Active",
        },
        {
          name: "Aave V3 Lending",
          protocol: "Aave",
          allocation: 28,
          value: 7117.74,
          apy: 18.2,
          risk: "Low",
          status: "Active",
        },
        {
          name: "QuickSwap LP",
          protocol: "QuickSwap",
          allocation: 20,
          value: 5084.1,
          apy: 15.8,
          risk: "Medium-High",
          status: "Active",
        },
        {
          name: "Curve Stable Pool",
          protocol: "Curve",
          allocation: 7,
          value: 1779.43,
          apy: 12.3,
          risk: "Low",
          status: "Active",
        },
      ],
      performance: {
        daily: 1.2,
        weekly: 3.8,
        monthly: 12.4,
        yearly: 27.1,
      },
      lastRebalance: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      nextRebalance: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    }

    return NextResponse.json(portfolioData)
  } catch (error) {
    console.error("[v0] Portfolio API error:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
