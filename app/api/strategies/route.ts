import { NextResponse } from "next/server"

export async function GET() {
  try {
    const strategies = [
      {
        id: "balancer-weighted",
        name: "Balancer Weighted Pool",
        protocol: "Balancer V2",
        description: "Optimized liquidity provision in Balancer weighted pools with automated rebalancing",
        apy: 22.5,
        tvl: 5620000,
        risk: "Medium",
        minDeposit: 100,
        fees: {
          performance: 10,
          management: 2,
        },
        assets: ["USDC", "WETH", "WMATIC"],
        status: "Active",
        allocation: 45,
      },
      {
        id: "aave-lending",
        name: "Aave V3 Lending",
        protocol: "Aave V3",
        description: "Supply assets to Aave V3 lending pools for stable yield generation",
        apy: 18.2,
        tvl: 3480000,
        risk: "Low",
        minDeposit: 50,
        fees: {
          performance: 8,
          management: 1.5,
        },
        assets: ["USDC", "DAI", "USDT"],
        status: "Active",
        allocation: 28,
      },
      {
        id: "quickswap-lp",
        name: "QuickSwap LP",
        protocol: "QuickSwap",
        description: "Provide liquidity to QuickSwap DEX pools with concentrated liquidity management",
        apy: 15.8,
        tvl: 2490000,
        risk: "Medium-High",
        minDeposit: 100,
        fees: {
          performance: 12,
          management: 2,
        },
        assets: ["USDC", "WMATIC"],
        status: "Active",
        allocation: 20,
      },
      {
        id: "curve-stable",
        name: "Curve Stable Pool",
        protocol: "Curve Finance",
        description: "Low-risk stablecoin liquidity provision with minimal impermanent loss",
        apy: 12.3,
        tvl: 870000,
        risk: "Low",
        minDeposit: 50,
        fees: {
          performance: 7,
          management: 1,
        },
        assets: ["USDC", "DAI", "USDT"],
        status: "Active",
        allocation: 7,
      },
    ]

    return NextResponse.json({ strategies, totalStrategies: strategies.length })
  } catch (error) {
    console.error("[v0] Strategies API error:", error)
    return NextResponse.json({ error: "Failed to fetch strategies" }, { status: 500 })
  }
}
