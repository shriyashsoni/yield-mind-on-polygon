"use client"

import { useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
import useSWR from "swr"
import { ContractHeader, MetricRow, FieldLabel, ActionInput, ActionButton, TxStatus } from "./contract-header"
import { useContractAction } from "@/hooks/use-contract-action"
import { useWeb3 } from "@/lib/web3-context"
import { CONTRACT_ADDRESSES } from "@/lib/deployment-config"
import { REWARDS_DISTRIBUTOR_ABI } from "@/lib/contract-write-abis"
import { fetcher } from "@/hooks/use-protocol"
import { fmtNum } from "@/components/dashboard/format"

type Snapshot = {
  ok: boolean
  rewards?: { totalDistributed: string; pendingRewards: string; userRewards: string }
}

export function RewardsPanel() {
  // Rewards are distributed through YLDStaking in the Wave 6 deployment.
  // The RewardsDistributor ABI surface is compatible enough for read calls
  // (pendingRewards / totalRewardsClaimed), and they degrade to 0 if missing.
  const address = CONTRACT_ADDRESSES.AMOY.YLDStaking as `0x${string}`
  const { signer, address: account } = useWeb3()
  const { state, exec, reset } = useContractAction()
  const { data } = useSWR<Snapshot>("/api/onchain/snapshot", fetcher, { refreshInterval: 15000 })
  const r = data?.rewards

  const [pending, setPending] = useState("0")
  const [total, setTotal] = useState("0")

  // Live read of pending rewards for the connected wallet
  useEffect(() => {
    let cancel = false
    async function load() {
      if (!signer || !account) return
      try {
        const c = new ethers.Contract(address, REWARDS_DISTRIBUTOR_ABI, signer)
        const [p, t] = await Promise.all([
          c.pendingRewards(account).catch(() => 0n),
          c.totalRewardsClaimed?.(account).catch(() => 0n) ?? Promise.resolve(0n),
        ])
        if (cancel) return
        setPending(ethers.formatUnits(p, 18))
        setTotal(ethers.formatUnits(t, 18))
      } catch {
        /* empty wallet state */
      }
    }
    load()
    const id = setInterval(load, 15000)
    return () => {
      cancel = true
      clearInterval(id)
    }
  }, [signer, account, address])

  const claim = async () => {
    await exec(async () => {
      if (!signer) throw new Error("Wallet not connected")
      const c = new ethers.Contract(address, REWARDS_DISTRIBUTOR_ABI, signer)
      const tx = await c.claimRewards()
      return tx
    })
  }

  const status = useMemo<"idle" | "pending" | "success" | "error">(() => state.status, [state.status])

  return (
    <article id="rewards" className="ym-glass overflow-hidden rounded-2xl">
      <ContractHeader
        index="07"
        name="RewardsDistributor"
        address={address}
        description="Streams YLD emissions to vault depositors and stakers based on their share of TVL and lock duration."
      />
      <div className="grid gap-6 p-6 md:grid-cols-3">
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Total distributed</p>
          <p className="text-3xl font-light tracking-tight text-white">
            {fmtNum(Number(r?.totalDistributed ?? 0))}
          </p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">YLD all-time</p>
        </div>
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Pending pool</p>
          <p className="text-3xl font-light tracking-tight text-white">
            {fmtNum(Number(r?.pendingRewards ?? 0))}
          </p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">YLD unclaimed</p>
        </div>
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Your rewards</p>
          <p className="text-3xl font-light tracking-tight text-white">
            {account ? fmtNum(Number(pending)) : "—"}
          </p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">YLD claimable</p>
        </div>
      </div>

      <div className="border-t border-white/10 p-6">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <FieldLabel>Claim accumulated rewards</FieldLabel>
          <MetricRow label="Pending" value={`${fmtNum(Number(pending))} YLD`} />
          <MetricRow label="Lifetime claimed" value={`${fmtNum(Number(total))} YLD`} />
          <ActionInput type="text" value="" onChange={() => undefined} placeholder="" disabled />
          <ActionButton
            onClick={claim}
            disabled={!account || Number(pending) <= 0 || status === "pending"}
            loading={status === "pending"}
          >
            Claim rewards
          </ActionButton>
          <TxStatus state={state} onDismiss={reset} />
        </div>
      </div>
    </article>
  )
}
