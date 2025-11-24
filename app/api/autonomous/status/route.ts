import { NextResponse } from "next/server"

export async function GET() {
  // Simulated autonomous mode status for Wave 3
  const status = {
    enabled: true,
    lastCheck: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    nextCheck: new Date(Date.now() + 1000 * 60 * 55).toISOString(), // in 55 minutes
    triggers: {
      volatilityThreshold: {
        enabled: true,
        threshold: 15,
        current: 8.2,
        status: "SAFE",
      },
      apyDeviation: {
        enabled: true,
        threshold: 5,
        current: 2.1,
        status: "SAFE",
      },
      riskScore: {
        enabled: true,
        maxSafe: 50,
        current: 32,
        status: "SAFE",
      },
      liquidityDrain: {
        enabled: true,
        threshold: 20,
        current: 3.5,
        status: "SAFE",
      },
    },
    recentActions: [
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        action: "REBALANCE",
        trigger: "APY_DEVIATION",
        success: true,
      },
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        action: "PAUSE",
        trigger: "VOLATILITY_HIGH",
        success: true,
      },
    ],
    chainlinkAutomation: {
      upkeepId: "0x123...abc",
      balance: "5.2 LINK",
      lastPerformed: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  }

  return NextResponse.json(status)
}
