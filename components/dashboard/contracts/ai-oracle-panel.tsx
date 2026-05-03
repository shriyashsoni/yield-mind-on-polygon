"use client"

import useSWR from "swr"
import { ethers } from "ethers"
import { useWeb3 } from "@/lib/web3-context"
import { useContractAction } from "@/hooks/use-contract-action"
import { CONTRACT_ADDRESSES, AI_ORACLE_ABI } from "@/lib/contract-abis"
import { AI_ORACLE_WRITE_ABI } from "@/lib/contract-write-abis"
import { fmtNum } from "../format"
import {
  ContractHeader,
  MetricRow,
  PrimaryAction,
  SecondaryAction,
  StatusPill,
} from "./contract-header"

const ORACLE = CONTRACT_ADDRESSES.AMOY.AIOracle

export function AiOraclePanel() {
  const { provider, isConnected, connect } = useWeb3()
  const action = useContractAction()

  const { data, mutate } = useSWR(
    provider ? ["ai-oracle", ORACLE] : null,
    async () => {
      const c = new ethers.Contract(ORACLE, AI_ORACLE_ABI, provider!)
      const [apy, conf] = await c.getLatestForecast().catch(() => [0n, 0n])
      // APY and confidence are typically returned as basis points (1e4)
      return {
        apy: Number(apy) / 1e2,
        confidence: Number(conf) / 1e2,
      }
    },
    { refreshInterval: 30_000 },
  )

  const refreshOracle = async () => {
    if (!isConnected) return connect()
    const r = await action.run({
      address: ORACLE,
      abi: AI_ORACLE_WRITE_ABI,
      label: "Update on-chain forecast",
      runner: async (c) => c.updateForecast(),
      successMessage: "Forecast updated on-chain",
    })
    if (r) mutate()
  }

  const callAgent = async () => {
    try {
      await fetch("/api/ai/insights?force=1", { cache: "no-store" })
      mutate()
    } catch {
      /* noop */
    }
  }

  return (
    <div className="space-y-5">
      <ContractHeader
        name="AI Oracle"
        address={ORACLE}
        description="On-chain mailbox for the off-chain Groq agent — predicted APY and confidence are written here, then read by the vault."
      />

      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-3">
        <MetricRow
          label="Predicted APY"
          value={`${fmtNum(data?.apy ?? 0, 2)}%`}
          sub="Last on-chain forecast"
        />
        <MetricRow
          label="Model confidence"
          value={`${fmtNum(data?.confidence ?? 0, 1)}%`}
          sub="0-100"
        />
        <MetricRow label="Source" value="Groq · Llama 3.3" sub="Off-chain agent" />
      </div>

      <div className="space-y-4 border border-white/10 bg-black/40 p-5">
        <p className="text-sm text-white/60">
          The AI agent runs continuously off-chain and pushes its allocation+confidence here via{" "}
          <code className="border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-white">
            updateForecast()
          </code>
          . Anyone can trigger a refresh; the vault will only consume forecasts that pass the on-chain freshness check.
        </p>
        <div className="flex flex-wrap gap-3">
          <PrimaryAction
            onClick={refreshOracle}
            disabled={action.state === "pending" || action.state === "preparing"}
          >
            {!isConnected ? "Connect Wallet" : "Push fresh forecast"}
          </PrimaryAction>
          <SecondaryAction onClick={callAgent}>Re-query Groq agent</SecondaryAction>
          <a
            href={`https://amoy.polygonscan.com/address/${ORACLE}#readContract`}
            target="_blank"
            rel="noreferrer"
            className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white"
          >
            Read on Polygonscan ↗
          </a>
        </div>
        <StatusPill state={action.state} hash={action.hash} />
      </div>
    </div>
  )
}
