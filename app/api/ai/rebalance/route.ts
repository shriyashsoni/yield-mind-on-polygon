import { streamText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { readProtocolSnapshot, readUserPosition } from "@/lib/onchain-reader"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const { account, question } = (await req.json().catch(() => ({}))) as {
    account?: string
    question?: string
  }

  const [snapshot, user] = await Promise.all([
    readProtocolSnapshot(),
    account ? readUserPosition(account) : Promise.resolve(null),
  ])

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return new Response(
      "GROQ_API_KEY is not configured. Add it in project settings to enable streaming AI reasoning.",
      { status: 200, headers: { "Content-Type": "text/plain" } },
    )
  }

  const groq = createGroq({ apiKey })

  const context = JSON.stringify(
    {
      block: snapshot.network.blockNumber,
      vault: snapshot.vault,
      risk: snapshot.risk,
      forecast: snapshot.forecast,
      strategies: snapshot.strategies,
      governance: { count: snapshot.governance.count },
      user,
    },
    null,
    2,
  )

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: `You are YieldMind's autonomous AI agent. You produce step-by-step rebalance reasoning grounded in the live on-chain snapshot. 
Be specific and reference actual numbers. Use short paragraphs and bullet markers. Never invent values.
Format: "STEP 1 — <title>", followed by analysis. End with "DECISION:" and a one-line action.`,
    prompt: `On-chain snapshot (Polygon Amoy):
${context}

User question: ${question || "Walk me through the optimal rebalance for this portfolio right now."}`,
    temperature: 0.4,
  })

  return result.toTextStreamResponse()
}
