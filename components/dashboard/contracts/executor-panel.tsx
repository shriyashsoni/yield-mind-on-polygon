"use client"

import useSWR from "swr"
import { ethers } from "ethers"
import { useWeb3 } from "@/lib/web3-context"
import { useContractAction } from "@/hooks/use-contract-action"
import { CONTRACT_ADDRESSES, AUTONOMOUS_EXECUTOR_ABI } from "@/lib/contract-abis"
import { AUTONOMOUS_EXECUTOR_WRITE_ABI } from "@/lib/contract-write-abis"
import { fmtNum, timeAgo } from "../format"
import {
  ContractHeader,
  MetricRow,
  PrimaryAction,
  StatusPill,
} from "./contract-header"

const EXEC = CONTRACT_ADDRESSES.AMOY.AutonomousExecutor

type HistoryRow = { timestamp: number; action: string; success: boolean }

export function ExecutorPanel() {
  const { provider, isConnected, connect } = useWeb3()
  const action = useContractAction()

  const { data, mutate } = useSWR(
    provider ? ["executor", EXEC] : null,
    async () => {
      const c = new ethers.Contract(EXEC, AUTONOMOUS_EXECUTOR_ABI, provider!)
      const [queued, hist] = await Promise.all([
        c.getQueuedExecutions().catch(() => 0n),
        c.getExecutionHistory().catch(() => [] as HistoryRow[]),
      ])
      return {
        queued: Number(queued),
        history: (hist as HistoryRow[]).map((row: HistoryRow) => ({
          timestamp: Number(row.timestamp),
          action: row.action,
          success: row.success,
        })),
      }
    },
    { refreshInterval: 20_000 },
  )

  const queued = data?.queued ?? 0
  const history = data?.history ?? []
  const successCount = history.filter((h) => h.success).length

  const executeNext = async () => {
    if (!isConnected) return connect()
    const r = await action.run({
      address: EXEC,
      abi: AUTONOMOUS_EXECUTOR_WRITE_ABI,
      label: "Execute next queued action",
      runner: async (c) => c.executeNext(),
      successMessage: "Executed next action",
    })
    if (r) mutate()
  }

  return (
    <div className="space-y-5">
      <ContractHeader
        name="Autonomous Executor"
        address={EXEC}
        description="Cron-style executor that drains the rebalance queue without user intervention. Anyone can crank it; the contract enforces all guards."
      />

      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
        <MetricRow label="Queued" value={String(queued)} sub="Pending actions" />
        <MetricRow label="History" value={String(history.length)} sub="On-chain records" />
        <MetricRow
          label="Success rate"
          value={`${history.length ? Math.round((successCount / history.length) * 100) : 100}%`}
          sub={`${successCount}/${history.length}`}
        />
        <MetricRow
          label="Last action"
          value={history.length ? timeAgo(history[history.length - 1].timestamp) : "—"}
          sub={history.length ? history[history.length - 1].action : "No history"}
        />
      </div>

      <div className="space-y-3 border border-white/10 bg-black/40 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Recent execution history
            </div>
            <div className="mt-1 text-sm text-white/60">Most recent {Math.min(8, history.length)} actions</div>
          </div>
          <PrimaryAction
            onClick={executeNext}
            disabled={action.state === "pending" || action.state === "preparing" || queued === 0}
          >
            {!isConnected ? "Connect Wallet" : queued > 0 ? `Execute next (${queued})` : "Queue empty"}
          </PrimaryAction>
        </div>

        {history.length === 0 ? (
          <p className="py-3 text-sm text-white/50">No executions on chain yet.</p>
        ) : (
          <ul className="divide-y divide-white/5">
            {history
              .slice(-8)
              .reverse()
              .map((h, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      aria-hidden
                      className={`size-1.5 rounded-full ${h.success ? "bg-white" : "bg-white/40"}`}
                    />
                    <span className="truncate text-sm text-white">{h.action || "Rebalance"}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {timeAgo(h.timestamp)}
                  </span>
                </li>
              ))}
          </ul>
        )}
        <StatusPill state={action.state} hash={action.hash} />
      </div>
    </div>
  )
}
