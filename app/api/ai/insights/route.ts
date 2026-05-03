import { NextResponse } from "next/server"
import { generateObject } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { z } from "zod"
import { readProtocolSnapshot, readUserPosition } from "@/lib/onchain-reader"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

const InsightSchema = z.object({
  headline: z.string().describe("One-line summary of current portfolio health, max 90 chars."),
  riskBand: z.enum(["LOW", "MODERATE", "ELEVATED", "HIGH"]),
  confidence: z.number().min(0).max(100).describe("Confidence in this analysis, 0-100."),
  recommendation: z.object({
    action: z.enum(["HOLD", "REBALANCE", "DEPOSIT", "WITHDRAW", "STAKE", "DEFEND"]),
    reasoning: z.string().describe("Plain-language reasoning, 2-3 sentences."),
  }),
  allocation: z
    .array(
      z.object({
        protocol: z.string(),
        pct: z.number().min(0).max(100),
        rationale: z.string(),
      }),
    )
    .min(3)
    .max(5),
  signals: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        tone: z.enum(["positive", "neutral", "negative"]),
      }),
    )
    .min(3)
    .max(6),
})

export type AIInsight = z.infer<typeof InsightSchema>

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const account = searchParams.get("account") || undefined

    const [snapshot, user] = await Promise.all([
      readProtocolSnapshot(),
      account ? readUserPosition(account) : Promise.resolve(null),
    ])

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      // Provide deterministic insight derived from on-chain data when key is absent.
      return NextResponse.json({
        ok: true,
        source: "deterministic",
        snapshot,
        user,
        insight: deriveDeterministicInsight(snapshot, user),
      })
    }

    const groq = createGroq({ apiKey })

    const systemPrompt = `You are YieldMind's autonomous AI yield agent operating on Polygon Amoy.
You analyse a live on-chain snapshot of the YieldMind protocol (vault, risk guard, AI oracle, strategy manager, governance) and produce structured insights.
Be precise, conservative, and grounded in the numbers provided. Never invent values that aren't in the snapshot.
The protocol pays in YLD tokens and accepts deposits via YieldVaultV4. Allocations should reference real DeFi venues on Polygon: Aave, Balancer, Curve, QuickSwap.`

    const userPrompt = `Live snapshot at block ${snapshot.network.blockNumber} on ${snapshot.network.name}:

VAULT
- TVL (raw 18d): ${snapshot.vault.totalAssets}
- Yield rate: ${snapshot.vault.yieldRateApy}% APY (${snapshot.vault.yieldRateBps} bps)

TOKEN (YLD)
- Total supply: ${snapshot.token.totalSupply}

RISK GUARD
- Risk score: ${snapshot.risk.riskScore}/100
- Insurance reserve: ${snapshot.risk.insuranceReserve}
- Reserve ratio: ${snapshot.risk.reserveRatioPct}%
- Protection active: ${snapshot.risk.protectionActive}

AI ORACLE FORECAST
- Predicted APY: ${snapshot.forecast.predictedAPY}%
- Forecast confidence: ${snapshot.forecast.confidence}%

ACTIVE STRATEGIES (${snapshot.strategies.length})
${snapshot.strategies.map((s, i) => `  ${i + 1}. ${s.address} — ${s.performancePct}%`).join("\n") || "  (none active yet — protocol freshly deployed)"}

AUTONOMOUS EXECUTOR
- Queued executions: ${snapshot.autonomous.queued}
- Recent actions: ${snapshot.autonomous.recent.length}

GOVERNANCE
- Proposals: ${snapshot.governance.count}

USER POSITION
${user ? `- YLD balance: ${user.yld}\n- Staked: ${user.staked}\n- Pending rewards: ${user.rewards}` : "- (no wallet connected)"}

Produce a structured insight: headline, risk band, confidence, recommendation, target allocation (3-5 venues, must sum to 100), and 3-6 numerical signals.`

    const { object } = await generateObject({
      model: groq("llama-3.3-70b-versatile"),
      schema: InsightSchema,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3,
    })

    return NextResponse.json({
      ok: true,
      source: "groq:llama-3.3-70b-versatile",
      snapshot,
      user,
      insight: object,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "ai_error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}

/* ----------------------- deterministic fallback ----------------------- */

function deriveDeterministicInsight(
  s: Awaited<ReturnType<typeof readProtocolSnapshot>>,
  u: Awaited<ReturnType<typeof readUserPosition>> | null,
): AIInsight {
  const score = s.risk.riskScore
  const riskBand: AIInsight["riskBand"] =
    score < 25 ? "LOW" : score < 50 ? "MODERATE" : score < 75 ? "ELEVATED" : "HIGH"
  const action: AIInsight["recommendation"]["action"] =
    s.vault.yieldRateApy === 0
      ? "DEPOSIT"
      : score > 70
        ? "DEFEND"
        : Math.abs(s.forecast.predictedAPY - s.vault.yieldRateApy) > 3
          ? "REBALANCE"
          : "HOLD"
  return {
    headline: `Vault ${s.vault.yieldRateApy.toFixed(2)}% APY · risk ${score}/100 · forecast ${s.forecast.predictedAPY.toFixed(2)}%`,
    riskBand,
    confidence: Math.max(40, Math.min(95, 100 - score)),
    recommendation: {
      action,
      reasoning:
        action === "DEPOSIT"
          ? "Vault has not begun deploying capital. Initial deposits will seed the strategy router."
          : action === "DEFEND"
            ? "Risk score is elevated. Tilt towards Aave + Curve stable pools and raise insurance reserve."
            : action === "REBALANCE"
              ? "Oracle forecast diverges from realised APY. Rebalance toward higher-yield venues."
              : "Current allocation aligns with forecast. Hold and continue accruing.",
    },
    allocation: [
      { protocol: "Aave V3", pct: 40, rationale: "Senior lending, lowest variance." },
      { protocol: "Curve Stable", pct: 25, rationale: "Stable LP, low impermanent loss." },
      { protocol: "Balancer Weighted", pct: 20, rationale: "Yield boost from BAL emissions." },
      { protocol: "QuickSwap LP", pct: 15, rationale: "DEX fees on Polygon volume." },
    ],
    signals: [
      { label: "Vault APY", value: `${s.vault.yieldRateApy.toFixed(2)}%`, tone: "neutral" },
      { label: "Forecast APY", value: `${s.forecast.predictedAPY.toFixed(2)}%`, tone: "positive" },
      { label: "Risk Score", value: `${score}/100`, tone: score > 60 ? "negative" : "positive" },
      {
        label: "Reserve Ratio",
        value: `${s.risk.reserveRatioPct.toFixed(2)}%`,
        tone: s.risk.reserveRatioPct >= 5 ? "positive" : "neutral",
      },
      {
        label: "Block",
        value: `#${s.network.blockNumber}`,
        tone: s.network.blockNumber > 0 ? "positive" : "negative",
      },
      ...(u ? [{ label: "Your YLD", value: u.yld, tone: "neutral" as const }] : []),
    ],
  }
}
