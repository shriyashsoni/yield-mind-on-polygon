import { NextResponse } from "next/server"
import { readAutonomous, readRisk } from "@/lib/onchain-reader"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const [autonomous, risk] = await Promise.all([readAutonomous(), readRisk()])
    return NextResponse.json({
      ok: true,
      executor: CONTRACT_ADDRESSES.AMOY.AutonomousExecutor,
      enabled: risk.protectionActive,
      queued: autonomous.queued,
      triggers: {
        riskScore: {
          current: risk.riskScore,
          maxSafe: 50,
          status: risk.riskScore <= 50 ? "SAFE" : "ELEVATED",
        },
        reserveRatio: {
          current: risk.reserveRatioPct,
          minSafe: 5,
          status: risk.reserveRatioPct >= 5 ? "SAFE" : "ELEVATED",
        },
        protection: {
          active: risk.protectionActive,
          status: risk.protectionActive ? "ARMED" : "STANDBY",
        },
      },
      recentActions: autonomous.recent.map((r) => ({
        timestamp: new Date(r.timestamp).toISOString(),
        action: r.action,
        success: r.success,
      })),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "rpc_error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
