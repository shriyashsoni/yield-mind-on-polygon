"use client"

import { useState } from "react"
import useSWR from "swr"
import { ethers } from "ethers"
import { useWeb3 } from "@/lib/web3-context"
import { useContractAction } from "@/hooks/use-contract-action"
import { CONTRACT_ADDRESSES, RISK_GUARD_ABI } from "@/lib/contract-abis"
import { RISK_GUARD_WRITE_ABI } from "@/lib/contract-write-abis"
import { fmtNum } from "../format"
import {
  ContractHeader,
  MetricRow,
  NumberInput,
  PrimaryAction,
  SecondaryAction,
  StatusPill,
} from "./contract-header"

const GUARD = CONTRACT_ADDRESSES.AMOY.RiskGuard

export function RiskGuardPanel() {
  const { provider, isConnected, connect } = useWeb3()
  const action = useContractAction()
  const [threshold, setThreshold] = useState("")

  const { data, mutate } = useSWR(
    provider ? ["risk-guard", GUARD] : null,
    async () => {
      const c = new ethers.Contract(GUARD, RISK_GUARD_ABI, provider!)
      const [score, paused] = await Promise.all([
        c.getRiskScore().catch(() => 0n),
        c.isProtectionActive().catch(() => false),
      ])
      return { score: Number(score) / 100, paused: Boolean(paused) }
    },
    { refreshInterval: 15_000 },
  )

  const setRiskThreshold = async () => {
    if (!isConnected) return connect()
    const t = Math.floor(Number(threshold) * 100)
    if (!Number.isFinite(t) || t < 0 || t > 10000) return
    const r = await action.run({
      address: GUARD,
      abi: RISK_GUARD_WRITE_ABI,
      label: `Set risk threshold to ${threshold}`,
      runner: async (c) => c.setRiskThreshold(t),
      successMessage: `Threshold set to ${threshold}`,
    })
    if (r) {
      setThreshold("")
      mutate()
    }
  }

  const togglePause = async () => {
    if (!isConnected) return connect()
    const r = await action.run({
      address: GUARD,
      abi: RISK_GUARD_WRITE_ABI,
      label: data?.paused ? "Unpause circuit breaker" : "Pause circuit breaker",
      runner: async (c) => (data?.paused ? c.unpauseCircuitBreaker() : c.pauseCircuitBreaker()),
      successMessage: "Circuit breaker toggled",
    })
    if (r) mutate()
  }

  const score = data?.score ?? 0
  const band = score < 30 ? "Low" : score < 65 ? "Moderate" : "High"

  return (
    <div className="space-y-5">
      <ContractHeader
        name="RiskGuard"
        address={GUARD}
        description="System-wide risk score and circuit breaker. Vault rebalances are gated through canRebalance() before any execution."
      />

      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
        <MetricRow label="System risk" value={fmtNum(score, 1)} sub={`/ 100 — ${band}`} />
        <MetricRow
          label="Circuit breaker"
          value={data?.paused ? "TRIPPED" : "Armed"}
          sub={data?.paused ? "Vault paused" : "Rebalance allowed"}
        />
        <MetricRow label="Threshold" value="Configurable" sub="Governance only" />
        <MetricRow label="Backstop" value="InsuranceReserve" sub="Linked module" />
      </div>

      <div className="space-y-4 border border-white/10 bg-black/40 p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          Governance / guardian controls
        </div>
        <NumberInput
          label="New risk threshold (0-100)"
          value={threshold}
          onChange={setThreshold}
          placeholder="65"
        />
        <div className="flex flex-wrap gap-3">
          <PrimaryAction
            onClick={setRiskThreshold}
            disabled={
              action.state === "pending" ||
              action.state === "preparing" ||
              !threshold ||
              Number(threshold) < 0 ||
              Number(threshold) > 100
            }
          >
            {!isConnected ? "Connect Wallet" : "Update threshold"}
          </PrimaryAction>
          <SecondaryAction
            onClick={togglePause}
            disabled={action.state === "pending" || action.state === "preparing"}
          >
            {data?.paused ? "Unpause" : "Trip breaker"}
          </SecondaryAction>
          <a
            href={`https://amoy.polygonscan.com/address/${GUARD}#code`}
            target="_blank"
            rel="noreferrer"
            className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white"
          >
            Source on Polygonscan ↗
          </a>
        </div>
        <StatusPill state={action.state} hash={action.hash} />
        <p className="text-xs text-white/40">
          Note: these calls require the guardian or governance role. Read-only roles will see a wallet-side
          revert rather than an on-chain failure.
        </p>
      </div>
    </div>
  )
}
