import { NextResponse } from "next/server"
import { readStrategies, readVault, readForecast } from "@/lib/onchain-reader"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const [strategies, vault, forecast] = await Promise.all([
      readStrategies(),
      readVault(),
      readForecast(),
    ])
    return NextResponse.json({
      ok: true,
      vaultApy: vault.yieldRateApy,
      forecastApy: forecast.predictedAPY,
      forecastConfidence: forecast.confidence,
      strategyManager: CONTRACT_ADDRESSES.AMOY.StrategyManager,
      strategies,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "rpc_error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
