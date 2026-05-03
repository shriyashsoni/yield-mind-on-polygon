"use client"

import { useState } from "react"
import useSWR from "swr"
import { ethers } from "ethers"
import { useWeb3 } from "@/lib/web3-context"
import { useContractAction } from "@/hooks/use-contract-action"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"
import { YLD_STAKING_WRITE_ABI, YLD_TOKEN_WRITE_ABI } from "@/lib/contract-write-abis"
import { fmtNum } from "../format"
import {
  ContractHeader,
  MetricRow,
  NumberInput,
  PrimaryAction,
  SecondaryAction,
  StatusPill,
} from "./contract-header"

const STAKING = CONTRACT_ADDRESSES.AMOY.YLDStaking
const TOKEN = CONTRACT_ADDRESSES.AMOY.YLDToken

export function StakingPanel() {
  const { provider, address, isConnected, connect } = useWeb3()
  const action = useContractAction()
  const [tab, setTab] = useState<"stake" | "unstake">("stake")
  const [amount, setAmount] = useState("")

  const { data, mutate } = useSWR(
    provider && address ? ["staking-data", address] : null,
    async () => {
      const s = new ethers.Contract(STAKING, YLD_STAKING_WRITE_ABI, provider!)
      const t = new ethers.Contract(TOKEN, YLD_TOKEN_WRITE_ABI, provider!)
      const [staked, rewards, walletBal] = await Promise.all([
        s.getStakedAmount(address!).catch(() => 0n),
        s.getRewards(address!).catch(() => 0n),
        t.balanceOf(address!).catch(() => 0n),
      ])
      return {
        staked: ethers.formatUnits(staked, 18),
        rewards: ethers.formatUnits(rewards, 18),
        walletBal: ethers.formatUnits(walletBal, 18),
      }
    },
    { refreshInterval: 15_000 },
  )

  const staked = Number(data?.staked ?? 0)
  const rewards = Number(data?.rewards ?? 0)
  const walletBal = Number(data?.walletBal ?? 0)

  const stake = async () => {
    if (!isConnected) return connect()
    if (!amount || Number(amount) <= 0) return
    const wei = ethers.parseUnits(amount, 18)
    await action.run({
      address: TOKEN,
      abi: YLD_TOKEN_WRITE_ABI,
      label: `Approve YLD`,
      runner: async (c) => c.approve(STAKING, wei),
    })
    const r = await action.run({
      address: STAKING,
      abi: YLD_STAKING_WRITE_ABI,
      label: `Stake ${amount} YLD`,
      runner: async (c) => c.stake(wei),
      successMessage: `Staked ${amount} YLD`,
    })
    if (r) {
      setAmount("")
      mutate()
    }
  }

  const unstake = async () => {
    if (!isConnected) return connect()
    if (!amount || Number(amount) <= 0) return
    const wei = ethers.parseUnits(amount, 18)
    const r = await action.run({
      address: STAKING,
      abi: YLD_STAKING_WRITE_ABI,
      label: `Unstake ${amount} YLD`,
      runner: async (c) => c.unstake(wei),
      successMessage: `Unstaked ${amount} YLD`,
    })
    if (r) {
      setAmount("")
      mutate()
    }
  }

  const claim = async () => {
    if (!isConnected) return connect()
    const r = await action.run({
      address: STAKING,
      abi: YLD_STAKING_WRITE_ABI,
      label: "Claim staking rewards",
      runner: async (c) => {
        // Try claimRewards first, fall back to claim
        try {
          return await c.claimRewards()
        } catch {
          return await c.claim()
        }
      },
      successMessage: "Rewards claimed",
    })
    if (r) mutate()
  }

  return (
    <div className="space-y-5">
      <ContractHeader
        name="YLD Staking"
        address={STAKING}
        description="Stake YLD to earn a share of vault performance fees and amplify your governance voting weight."
      />

      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
        <MetricRow label="Wallet YLD" value={fmtNum(walletBal, 4)} sub="Spendable" />
        <MetricRow label="Your stake" value={fmtNum(staked, 4)} sub="Earning" />
        <MetricRow label="Pending rewards" value={fmtNum(rewards, 6)} sub="Claimable YLD" />
        <MetricRow
          label="Voting weight"
          value={fmtNum(walletBal + staked, 2)}
          sub="Wallet + staked"
        />
      </div>

      <div className="border border-white/10 bg-black/40">
        <div className="flex border-b border-white/10">
          <TabButton active={tab === "stake"} onClick={() => setTab("stake")}>
            Stake
          </TabButton>
          <TabButton active={tab === "unstake"} onClick={() => setTab("unstake")}>
            Unstake
          </TabButton>
        </div>
        <div className="space-y-4 p-5">
          <NumberInput
            label="Amount"
            value={amount}
            onChange={setAmount}
            suffix="YLD"
            max={tab === "stake" ? walletBal.toString() : staked.toString()}
          />
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryAction
              onClick={tab === "stake" ? stake : unstake}
              disabled={action.state === "pending" || action.state === "preparing" || !amount || Number(amount) <= 0}
            >
              {!isConnected ? "Connect Wallet" : tab === "stake" ? "Stake YLD" : "Unstake YLD"}
            </PrimaryAction>
            <SecondaryAction
              onClick={claim}
              disabled={action.state === "pending" || action.state === "preparing" || rewards <= 0}
            >
              Claim {fmtNum(rewards, 4)}
            </SecondaryAction>
          </div>
          <StatusPill state={action.state} hash={action.hash} />
        </div>
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
        active ? "bg-white text-black" : "text-white/55 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      {children}
    </button>
  )
}
