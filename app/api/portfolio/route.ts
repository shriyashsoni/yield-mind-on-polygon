import { NextResponse } from "next/server"
import { readProtocolSnapshot, readUserPosition } from "@/lib/onchain-reader"
import { ethers } from "ethers"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")
    if (!address || !ethers.isAddress(address)) {
      return NextResponse.json({ error: "Valid address required" }, { status: 400 })
    }

    const [snapshot, user] = await Promise.all([
      readProtocolSnapshot(),
      readUserPosition(address),
    ])

    const totalDeposited = Number(user.staked) + Number(user.yld)
    const apy = snapshot.vault.yieldRateApy
    const totalValue = totalDeposited * (1 + apy / 100)
    const totalProfit = totalValue - totalDeposited
    const profitPercentage = totalDeposited > 0 ? (totalProfit / totalDeposited) * 100 : 0

    return NextResponse.json({
      address,
      network: snapshot.network,
      totalValue,
      totalDeposited,
      totalProfit,
      profitPercentage,
      vault: snapshot.vault,
      risk: snapshot.risk,
      forecast: snapshot.forecast,
      strategies: snapshot.strategies,
      user,
      block: snapshot.network.blockNumber,
      fetchedAt: snapshot.fetchedAt,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "rpc_error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
