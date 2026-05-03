import { NextResponse } from "next/server"
import { readProtocolSnapshot, readUserPosition } from "@/lib/onchain-reader"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const account = searchParams.get("account") || undefined
    const snapshot = await readProtocolSnapshot()
    const user = account ? await readUserPosition(account) : null
    return NextResponse.json({ ok: true, snapshot, user })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "rpc_error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
