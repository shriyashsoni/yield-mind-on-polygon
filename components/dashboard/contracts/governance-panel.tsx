"use client"

import { useMemo } from "react"
import { ethers } from "ethers"
import useSWR from "swr"
import Link from "next/link"
import { ContractHeader, MetricRow, FieldLabel, ActionButton, TxStatus } from "./contract-header"
import { useContractAction } from "@/hooks/use-contract-action"
import { useWeb3 } from "@/lib/web3-context"
import { CONTRACT_ADDRESSES } from "@/lib/deployment-config"
import { GOVERNANCE_WRITE_ABI } from "@/lib/contract-write-abis"
import { fetcher } from "@/hooks/use-protocol"

type Proposal = {
  id: number
  title: string
  state: string
  forVotes: number
  againstVotes: number
  abstainVotes: number
  endsAt: number
}
type Resp = { ok: boolean; proposals: Proposal[]; total: number }

export function GovernancePanel() {
  const address = CONTRACT_ADDRESSES.AMOY.YieldMindGovernor as `0x${string}`
  const { signer, address: account } = useWeb3()
  const { state, exec, reset } = useContractAction()
  const { data } = useSWR<Resp>("/api/governance/proposals", fetcher, { refreshInterval: 30000 })
  const proposals = data?.proposals ?? []
  const active = proposals.filter((p) => p.state === "Active").slice(0, 3)

  const stats = useMemo(() => {
    const total = data?.total ?? 0
    const passed = proposals.filter((p) => p.state === "Succeeded" || p.state === "Executed").length
    const open = proposals.filter((p) => p.state === "Active" || p.state === "Pending").length
    return { total, passed, open }
  }, [data, proposals])

  const vote = async (id: number, support: 0 | 1 | 2) => {
    await exec(async () => {
      if (!signer) throw new Error("Wallet not connected")
      const c = new ethers.Contract(address, GOVERNANCE_WRITE_ABI, signer)
      const tx = await c.castVote(id, support)
      return tx
    })
  }

  return (
    <article id="governance" className="ym-glass overflow-hidden rounded-2xl">
      <ContractHeader
        index="09"
        name="Governance"
        address={address}
        description="On-chain DAO. Stakers vote on strategy whitelist, fee schedule, treasury allocation, and AI Oracle upgrades."
      />
      <div className="grid gap-6 p-6 md:grid-cols-3">
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Total proposals</p>
          <p className="text-3xl font-light text-white">{stats.total}</p>
        </div>
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Open</p>
          <p className="text-3xl font-light text-white">{stats.open}</p>
        </div>
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Passed</p>
          <p className="text-3xl font-light text-white">{stats.passed}</p>
        </div>
      </div>

      <div className="border-t border-white/10 p-6">
        <FieldLabel>Active proposals</FieldLabel>
        {active.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.01] p-6 text-center text-[12px] text-white/45">
            No active proposals on-chain. Visit{" "}
            <Link href="/governance" className="underline underline-offset-2 hover:text-white">
              /governance
            </Link>{" "}
            for the full archive.
          </div>
        ) : (
          <ul className="mt-3 space-y-3">
            {active.map((p) => {
              const totalVotes = p.forVotes + p.againstVotes + p.abstainVotes
              const forPct = totalVotes > 0 ? (p.forVotes / totalVotes) * 100 : 0
              const ends = new Date(p.endsAt * 1000)
              return (
                <li
                  key={p.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
                        Proposal #{p.id}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white">{p.title}</p>
                      <p className="mt-1 text-[11px] text-white/45">
                        Ends {ends.toLocaleDateString()} {ends.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-emerald-100">
                      Active
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full bg-white" style={{ width: `${forPct}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-white/55">
                    <span>For {p.forVotes.toLocaleString()}</span>
                    <span>Against {p.againstVotes.toLocaleString()}</span>
                    <span>Abstain {p.abstainVotes.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <ActionButton onClick={() => vote(p.id, 1)} disabled={!account || state.status === "pending"} loading={state.status === "pending"}>
                      Vote for
                    </ActionButton>
                    <button
                      onClick={() => vote(p.id, 0)}
                      disabled={!account || state.status === "pending"}
                      className="rounded-lg border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-all hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Vote against
                    </button>
                    <button
                      onClick={() => vote(p.id, 2)}
                      disabled={!account || state.status === "pending"}
                      className="rounded-lg border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-all hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Abstain
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        <TxStatus state={state} onDismiss={reset} />
        <MetricRow
          label="Full proposal archive"
          value={
            <Link href="/governance" className="underline underline-offset-2 hover:text-white">
              Open governance →
            </Link>
          }
        />
      </div>
    </article>
  )
}
