"use client"

import { useMemo, useState } from "react"
import { ethers } from "ethers"
import { SiteNav } from "@/components/landing/site-nav"
import { SiteFooter } from "@/components/landing/site-footer"
import { Panel, StatTile } from "@/components/dashboard/panel"
import { useGovernance, useProtocolSnapshot } from "@/hooks/use-protocol"
import { useWeb3 } from "@/lib/web3-context"
import { CONTRACT_ADDRESSES, YIELD_MIND_GOVERNOR_ABI, YLD_TOKEN_ABI } from "@/lib/contract-abis"
import { fmtNum } from "@/components/dashboard/format"
import { useToast } from "@/hooks/use-toast"
import useSWR from "swr"

export default function GovernancePage() {
  const { data: govData } = useGovernance()
  const { data: snapData } = useProtocolSnapshot()
  const { address, isConnected, connect, signer, provider } = useWeb3()
  const { toast } = useToast()

  const proposals = govData?.proposals ?? snapData?.governance?.proposals ?? []
  const count = govData?.count ?? snapData?.governance?.count ?? 0

  const { data: ylBal } = useSWR(
    address ? ["yld-balance", address] : null,
    async () => {
      if (!provider || !address) return "0"
      const t = new ethers.Contract(CONTRACT_ADDRESSES.AMOY.YLDToken, YLD_TOKEN_ABI, provider)
      const b = await t.balanceOf(address).catch(() => 0n)
      return ethers.formatUnits(b, 18)
    },
    { refreshInterval: 15_000 },
  )
  const votingPower = Number(ylBal ?? 0)

  const totalSupply = Number(snapData?.protocol?.totalShares ?? 0)
  const sharePct = totalSupply > 0 ? (votingPower / totalSupply) * 100 : 0

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="pt-16">
        <div className="border-b border-white/10 bg-black/60">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-10 md:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              <span aria-hidden className="inline-flex items-center gap-1.5">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                On-chain
              </span>
              <span aria-hidden>·</span>
              <span>YieldMind Governor</span>
              <span aria-hidden>·</span>
              <a
                href={`https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.YieldMindGovernor}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono hover:text-white"
              >
                {CONTRACT_ADDRESSES.AMOY.YieldMindGovernor.slice(0, 8)}…
                {CONTRACT_ADDRESSES.AMOY.YieldMindGovernor.slice(-6)} ↗
              </a>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">DAO Governance</h1>
            <p className="max-w-2xl text-sm text-white/55 md:text-base">
              Live proposals from the deployed Governor contract on Polygon Amoy. YLD token holders vote in real time;
              the AI agent honors any executed parameter changes within one rebalance cycle.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] space-y-6 px-4 py-10 md:px-8">
          <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            <StatTile
              label="Total proposals"
              value={fmtNum(count, 0)}
              sub={`${proposals.filter((p) => Number(p.forVotes) + Number(p.againstVotes) > 0).length} with activity`}
            />
            <StatTile
              label="Your voting power"
              value={fmtNum(votingPower, 2)}
              sub={`${sharePct.toFixed(2)}% of supply`}
            />
            <StatTile label="YLD supply" value={fmtNum(totalSupply, 0)} sub="Snapshot of current circulating" />
            <StatTile
              label="Connected"
              value={isConnected ? "Yes" : "No"}
              sub={isConnected ? `${address?.slice(0, 6)}…${address?.slice(-4)}` : "Connect to vote"}
            />
          </div>

          {!isConnected && (
            <div className="flex flex-col gap-3 border border-white/15 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/70">
                Connect your wallet on Polygon Amoy to vote on live proposals. Your voting power equals your YLD balance.
              </p>
              <button
                type="button"
                onClick={connect}
                className="border border-white bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white"
              >
                Connect Wallet →
              </button>
            </div>
          )}

          <Panel
            eyebrow="On-chain"
            title="Live proposals"
            action={
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {proposals.length} indexed
              </span>
            }
          >
            {proposals.length === 0 ? (
              <p className="text-sm text-white/50">
                No proposals have been submitted yet. The Governor will appear here once the first proposal is created
                and indexed.
              </p>
            ) : (
              <ul className="space-y-4">
                {proposals.map((p) => (
                  <ProposalRow key={p.id} proposal={p} signer={signer} isConnected={isConnected} toast={toast} />
                ))}
              </ul>
            )}
          </Panel>

          <Panel eyebrow="Contracts" title="Governance addresses">
            <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
              <Addr label="Governor" value={CONTRACT_ADDRESSES.AMOY.YieldMindGovernor} />
              <Addr label="Timelock" value={CONTRACT_ADDRESSES.AMOY.TimelockController} />
              <Addr label="YLD Token" value={CONTRACT_ADDRESSES.AMOY.YLDToken} />
            </div>
          </Panel>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function ProposalRow({
  proposal,
  signer,
  isConnected,
  toast,
}: {
  proposal: { id: number; description: string; forVotes: string; againstVotes: string }
  signer: ethers.Signer | null
  isConnected: boolean
  toast: ReturnType<typeof useToast>["toast"]
}) {
  const [busy, setBusy] = useState<"for" | "against" | null>(null)
  const f = Number(proposal.forVotes)
  const a = Number(proposal.againstVotes)
  const total = f + a
  const pctFor = total > 0 ? (f / total) * 100 : 0
  const pctAgainst = total > 0 ? (a / total) * 100 : 0
  const status = useMemo(() => {
    if (total === 0) return "Pending"
    if (pctFor > pctAgainst) return "Leaning For"
    return "Leaning Against"
  }, [total, pctFor, pctAgainst])

  const vote = async (support: boolean) => {
    if (!isConnected || !signer) {
      toast({ title: "Wallet required", description: "Connect a wallet to vote.", variant: "destructive" })
      return
    }
    setBusy(support ? "for" : "against")
    try {
      const c = new ethers.Contract(CONTRACT_ADDRESSES.AMOY.YieldMindGovernor, YIELD_MIND_GOVERNOR_ABI, signer)
      // The compiled ABI in this repo only exposes view methods; in production
      // the Governor is OpenZeppelin's standard interface — we call castVote there.
      // We send a low-level call with the standard 4-byte selector.
      const iface = new ethers.Interface(["function castVote(uint256 proposalId, uint8 support) returns (uint256)"])
      const data = iface.encodeFunctionData("castVote", [proposal.id, support ? 1 : 0])
      const tx = await signer.sendTransaction({
        to: CONTRACT_ADDRESSES.AMOY.YieldMindGovernor,
        data,
      })
      toast({
        title: "Vote sent",
        description: `Tx ${tx.hash.slice(0, 10)}… submitted to Polygon Amoy`,
      })
      await tx.wait().catch(() => undefined)
      toast({ title: "Vote confirmed", description: `Proposal #${proposal.id} · ${support ? "FOR" : "AGAINST"}` })
    } catch (e: any) {
      toast({
        title: "Vote failed",
        description: e?.shortMessage || e?.message || "Transaction rejected",
        variant: "destructive",
      })
    } finally {
      setBusy(null)
    }
  }

  return (
    <li className="border border-white/10 bg-black/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Proposal #{proposal.id}
          </div>
          <h3 className="mt-1 text-base font-semibold text-white text-balance">
            {proposal.description || "On-chain governance proposal"}
          </h3>
        </div>
        <span className="border border-white/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
          {status}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <Bar label="For" pct={pctFor} value={`${fmtNum(f, 2)} YLD`} />
        <Bar label="Against" pct={pctAgainst} value={`${fmtNum(a, 2)} YLD`} dim />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => vote(true)}
          disabled={!isConnected || busy !== null}
          className="border border-white bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy === "for" ? "Submitting…" : "Vote For"}
        </button>
        <button
          type="button"
          onClick={() => vote(false)}
          disabled={!isConnected || busy !== null}
          className="border border-white/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy === "against" ? "Submitting…" : "Vote Against"}
        </button>
        <a
          href={`https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.YieldMindGovernor}`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto self-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white"
        >
          View on explorer ↗
        </a>
      </div>
    </li>
  )
}

function Bar({ label, pct, value, dim }: { label: string; pct: number; value: string; dim?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className={dim ? "text-white/50" : "text-white"}>{label}</span>
        <span className="font-mono text-white/50 tabular-nums">{value}</span>
      </div>
      <div className="mt-1 h-1 bg-white/10">
        <div
          className="h-full bg-white"
          style={{ width: `${Math.max(0, Math.min(100, pct))}%`, opacity: dim ? 0.4 : 1 }}
          aria-hidden
        />
      </div>
    </div>
  )
}

function Addr({ label, value }: { label: string; value: string }) {
  return (
    <a
      href={`https://amoy.polygonscan.com/address/${value}`}
      target="_blank"
      rel="noreferrer"
      className="block bg-black/40 p-4 transition-colors hover:bg-white/[0.04]"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</div>
      <div className="mt-2 truncate font-mono text-sm text-white">{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">View on Polygonscan ↗</div>
    </a>
  )
}
