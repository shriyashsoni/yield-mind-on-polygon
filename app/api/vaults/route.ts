import { NextResponse } from "next/server"

export async function GET() {
  // Demo data for Wave 4 multi-vault system
  const vaults = [
    {
      id: "stable-yield-vault",
      name: "Stable Yield Vault",
      description: "Low-risk stablecoin strategies focused on consistent returns",
      assets: ["USDC", "DAI", "USDT"],
      tvl: 28500000,
      apy: 12.4,
      risk: "Low",
      riskScore: 25,
      allocation: {
        "Aave USDC": 45,
        "Curve 3pool": 35,
        "Balancer Stable": 20,
      },
      performance: {
        daily: 0.034,
        weekly: 0.24,
        monthly: 1.03,
        yearly: 12.4,
      },
      users: 2340,
      minDeposit: 100,
      autoCompound: true,
    },
    {
      id: "eth-momentum-vault",
      name: "ETH Momentum Vault",
      description: "Growth-focused ETH liquid staking and DeFi strategies",
      assets: ["WETH", "stETH", "wstETH"],
      tvl: 15200000,
      apy: 18.7,
      risk: "Medium",
      riskScore: 45,
      allocation: {
        "Lido stETH": 50,
        "Balancer wstETH-WETH": 30,
        "Aave WETH": 20,
      },
      performance: {
        daily: 0.051,
        weekly: 0.36,
        monthly: 1.56,
        yearly: 18.7,
      },
      users: 1870,
      minDeposit: 0.1,
      autoCompound: true,
    },
    {
      id: "polygon-ecosystem-vault",
      name: "Polygon Ecosystem Vault",
      description: "Native MATIC strategies and Polygon DeFi protocols",
      assets: ["MATIC", "stMATIC", "wMATIC"],
      tvl: 8900000,
      apy: 22.3,
      risk: "Medium",
      riskScore: 52,
      allocation: {
        "Lido stMATIC": 40,
        "QuickSwap MATIC-USDC": 35,
        "Balancer MATIC-stMATIC": 25,
      },
      performance: {
        daily: 0.061,
        weekly: 0.43,
        monthly: 1.86,
        yearly: 22.3,
      },
      users: 1420,
      minDeposit: 10,
      autoCompound: true,
    },
    {
      id: "high-apy-experimental-vault",
      name: "High-APY Experimental Vault",
      description: "AI-driven algorithmic strategies targeting maximum yields",
      assets: ["Multi-Asset"],
      tvl: 4500000,
      apy: 34.8,
      risk: "High",
      riskScore: 72,
      allocation: {
        "GMX GLP": 30,
        "Balancer 80/20": 25,
        "Curve Exotic Pairs": 25,
        "Yield Aggregators": 20,
      },
      performance: {
        daily: 0.095,
        weekly: 0.67,
        monthly: 2.9,
        yearly: 34.8,
      },
      users: 680,
      minDeposit: 1000,
      autoCompound: true,
    },
  ]

  return NextResponse.json({
    vaults,
    totalVaults: vaults.length,
    totalTVL: vaults.reduce((sum, v) => sum + v.tvl, 0),
    totalUsers: vaults.reduce((sum, v) => sum + v.users, 0),
    averageAPY: vaults.reduce((sum, v) => sum + v.apy, 0) / vaults.length,
    timestamp: Date.now(),
  })
}
