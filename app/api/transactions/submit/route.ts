import { NextRequest, NextResponse } from 'next/server'

interface TransactionRequest {
  address: string
  amount: string
  chainId: number
  type: 'deposit' | 'withdraw'
}

export async function POST(request: NextRequest) {
  try {
    const body: TransactionRequest = await request.json()
    const { address, amount, chainId, type } = body

    // Validate inputs
    if (!address || !amount || !chainId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Only allow Polygon Amoy testnet (80002) for now
    if (chainId !== 80002) {
      return NextResponse.json(
        { error: 'Only Polygon Amoy testnet (80002) is supported for testing' },
        { status: 400 }
      )
    }

    // Simulate transaction creation with mock data
    const txHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    const timestamp = new Date().toISOString()

    // Return transaction data
    return NextResponse.json(
      {
        success: true,
        txHash,
        address,
        amount,
        type,
        chainId,
        timestamp,
        status: 'pending',
        explorerUrl: `https://amoy.polygonscan.com/tx/${txHash}`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Transaction error:', error)
    return NextResponse.json(
      { error: 'Failed to process transaction' },
      { status: 500 }
    )
  }
}
