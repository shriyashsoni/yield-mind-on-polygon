"use client"

import { useWeb3 } from "@/lib/web3-context"
import { useVaultData } from "@/hooks/use-vault-data"
import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { Panel } from "./panel"
import { fmtNum, fmtUsd, shortAddr } from "./format"

export function UserPortfolio() {
  const { address, isConnected, connect } = useWeb3()
  const { userShares, userBalance, usdcBalance, assetSymbol } = useVaultData()
  const { data } = useProtocolSnapshot()
  const sharePrice = data?.protocol?.sharePriceUsd ?? 1
  const totalShares = data?.protocol?.totalShares ?? 0

  if (!isConnected) {
    return (
      <Panel eyebrow="Wallet" title="Connect to view portfolio">
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm text-white/60">
            Connect a wallet on Polygon Amoy to see your live vault shares, deposit history, and AI-driven yield.
          </p>
          <button
            type="button"
            onClick={connect}
            className="group relative inline-flex items-center gap-2 border border-white bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white"
          >
            Connect Wallet
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </Panel>
    )
  }

  const shares = Number(userShares ?? 0)
  const wallet = Number(usdcBalance ?? 0)
  const positionValue = Number(userBalance ?? 0) * sharePrice

  return (
    <Panel
      eyebrow={`Wallet · ${shortAddr(address)}`}
      title="Your Position"
      action={
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Live</span>
      }
    >
      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
        <Tile label={`${assetSymbol ?? "Asset"} balance`} value={fmtNum(wallet, 2)} sub={assetSymbol ?? ""} />
        <Tile label="Vault shares" value={fmtNum(shares, 4)} sub="ymUSDC" />
        <Tile label="Position value" value={fmtUsd(positionValue, 2)} sub={`@ $${sharePrice.toFixed(4)}/share`} />
        <Tile
          label="Share of vault"
          value={
            totalShares > 0 ? `${((shares / totalShares) * 100).toFixed(2)}%` : "—"
          }
          sub="of TVL"
        />
      </div>
    </Panel>
  )
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-black/40 p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums text-white">{value}</div>
      {sub && <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">{sub}</div>}
    </div>
  )
}
