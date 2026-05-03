"use client"

import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { fmtUsd } from "./format"

export function DashboardHeader() {
  const { data } = useProtocolSnapshot()
  const network = data?.network ?? { name: "Polygon Amoy", chainId: 80002 }

  return (
    <div className="border-b border-white/10 bg-black/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-6 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            <span aria-hidden className="inline-flex items-center gap-1.5">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Live
            </span>
            <span aria-hidden>·</span>
            <span>{network.name}</span>
            <span aria-hidden>·</span>
            <span>chain {network.chainId}</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            YieldMind Console
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-white/55">
            Real-time on-chain state, AI agent reasoning, and vault telemetry. All numbers below are read directly
            from your deployed contracts on Polygon Amoy.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            TVL
          </div>
          <div className="text-2xl font-semibold tabular-nums text-white">
            {fmtUsd(data?.protocol?.tvlUsd ?? 0, 0)}
          </div>
          <WalletConnectButton />
        </div>
      </div>
    </div>
  )
}
