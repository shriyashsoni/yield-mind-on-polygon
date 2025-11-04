import { NextResponse } from "next/server"

export async function GET() {
  try {
    const proposals = [
      {
        id: "YIP-001",
        title: "Add GMX Strategy to Portfolio",
        description: "Proposal to integrate GMX perpetual trading strategy with 10% allocation cap",
        status: "Active",
        votesFor: 1250000,
        votesAgainst: 340000,
        quorum: 1000000,
        startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        proposer: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      },
      {
        id: "YIP-002",
        title: "Reduce Performance Fee to 8%",
        description: "Lower performance fee from 10% to 8% to remain competitive",
        status: "Passed",
        votesFor: 2100000,
        votesAgainst: 450000,
        quorum: 1000000,
        startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        proposer: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
      },
      {
        id: "YIP-003",
        title: "Increase ML Model Update Frequency",
        description: "Update ML models every 6 hours instead of 12 hours for better responsiveness",
        status: "Active",
        votesFor: 890000,
        votesAgainst: 120000,
        quorum: 1000000,
        startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        proposer: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
      },
    ]

    return NextResponse.json({ proposals, totalProposals: proposals.length })
  } catch (error) {
    console.error("[v0] Governance API error:", error)
    return NextResponse.json({ error: "Failed to fetch proposals" }, { status: 500 })
  }
}
