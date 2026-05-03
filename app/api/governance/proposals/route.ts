import { NextResponse } from "next/server"
import { readGovernance } from "@/lib/onchain-reader"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await readGovernance()
    return NextResponse.json({
      ok: true,
      governor: data.governor,
      totalProposals: data.count,
      proposals: data.proposals.map((p) => ({
        id: `YIP-${String(p.id).padStart(3, "0")}`,
        proposalId: p.id,
        description: p.description || "(no description on-chain)",
        forVotes: p.forVotes,
        againstVotes: p.againstVotes,
      })),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "rpc_error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
