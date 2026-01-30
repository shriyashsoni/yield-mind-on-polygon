import { NextRequest, NextResponse } from 'next/server'

interface StatusRequest {
  txHash: string
  chainId: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const txHash = searchParams.get('txHash')
    const chainId = searchParams.get('chainId')

    if (!txHash || !chainId) {
      return NextResponse.json(
        { error: 'Missing txHash or chainId' },
        { status: 400 }
      )
    }

    // Simulate transaction status lookup
    const statuses = ['pending', 'confirmed', 'failed']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    const confirmations = randomStatus === 'pending' ? Math.floor(Math.random() * 5) : 12

    return NextResponse.json(
      {
        txHash,
        chainId: Number(chainId),
        status: randomStatus,
        confirmations,
        blockNumber: randomStatus === 'pending' ? null : Math.floor(Math.random() * 50000000),
        timestamp: new Date().toISOString(),
        gasUsed: randomStatus === 'pending' ? null : Math.floor(Math.random() * 500000),
        explorerUrl: `https://amoy.polygonscan.com/tx/${txHash}`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Status error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transaction status' },
      { status: 500 }
    )
  }
}
