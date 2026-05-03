import { NextResponse } from "next/server"
import { readForecast, readVault, readRisk } from "@/lib/onchain-reader"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * 7-day forward path derived from on-chain AIOracle.getLatestForecast()
 * and current vault state. Confidence/risk degrade over horizon as a
 * monotonically dampened series so the UI can render a real chart.
 */
export async function GET() {
  try {
    const [forecast, vault, risk] = await Promise.all([
      readForecast(),
      readVault(),
      readRisk(),
    ])

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const start = vault.yieldRateApy || 0
    const end = forecast.predictedAPY || start
    const points = 7

    const predictions = Array.from({ length: points }, (_, i) => {
      const t = (i + 1) / points
      const apy = start + (end - start) * t
      const date = new Date(today.getTime() + (i + 1) * 86_400_000)
      return {
        date: date.toISOString().slice(0, 10),
        apy: Math.max(0, +apy.toFixed(3)),
        confidence: Math.max(0, +Math.min(100, forecast.confidence - i * 1.2).toFixed(1)),
        riskScore: Math.max(0, Math.min(100, Math.round(risk.riskScore + i * 0.6))),
      }
    })

    return NextResponse.json({
      ok: true,
      timeframe: "7d",
      generated: new Date().toISOString(),
      oracle: CONTRACT_ADDRESSES.AMOY.AIOracle,
      currentApy: vault.yieldRateApy,
      predictedApy: forecast.predictedAPY,
      confidence: forecast.confidence,
      currentRisk: risk.riskScore,
      predictions,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "rpc_error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
