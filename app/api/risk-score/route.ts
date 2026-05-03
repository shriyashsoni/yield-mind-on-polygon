import { NextResponse } from "next/server"
import { readRisk, readVault, readForecast } from "@/lib/onchain-reader"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address") || null
    const [risk, vault, forecast] = await Promise.all([
      readRisk(),
      readVault(),
      readForecast(),
    ])

    const riskLevel: "LOW" | "MODERATE" | "ELEVATED" | "HIGH" =
      risk.riskScore < 25
        ? "LOW"
        : risk.riskScore < 50
          ? "MODERATE"
          : risk.riskScore < 75
            ? "ELEVATED"
            : "HIGH"

    return NextResponse.json({
      ok: true,
      address,
      riskGuard: CONTRACT_ADDRESSES.AMOY.RiskGuard,
      insuranceReserve: CONTRACT_ADDRESSES.AMOY.InsuranceReserve,
      overallRiskScore: risk.riskScore,
      riskLevel,
      protectionActive: risk.protectionActive,
      reserveRatioPct: risk.reserveRatioPct,
      insuranceReserveBalance: risk.insuranceReserve,
      vaultApy: vault.yieldRateApy,
      forecastApy: forecast.predictedAPY,
      forecastConfidence: forecast.confidence,
      block: vault.blockNumber,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "rpc_error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
