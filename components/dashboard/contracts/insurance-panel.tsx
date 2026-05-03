"use client"

import useSWR from "swr"
import { ethers } from "ethers"
import { useWeb3 } from "@/lib/web3-context"
import { CONTRACT_ADDRESSES, INSURANCE_RESERVE_ABI } from "@/lib/contract-abis"
import { fmtNum, fmtUsd } from "../format"
import { ContractHeader, MetricRow } from "./contract-header"

const RESERVE = CONTRACT_ADDRESSES.AMOY.InsuranceReserve

export function InsurancePanel() {
  const { provider } = useWeb3()

  const { data } = useSWR(
    provider ? ["insurance-reserve", RESERVE] : null,
    async () => {
      const c = new ethers.Contract(RESERVE, INSURANCE_RESERVE_ABI, provider!)
      const [bal, ratio] = await Promise.all([
        c.getReserveBalance().catch(() => 0n),
        c.getReserveRatio().catch(() => 0n),
      ])
      return {
        balance: Number(ethers.formatUnits(bal, 18)),
        ratio: Number(ratio) / 100,
      }
    },
    { refreshInterval: 30_000 },
  )

  return (
    <div className="space-y-5">
      <ContractHeader
        name="Insurance Reserve"
        address={RESERVE}
        description="Protocol-owned capital that backstops strategy losses. Funded by a portion of performance fees and governed by the DAO."
      />

      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-3">
        <MetricRow
          label="Reserve balance"
          value={fmtUsd(data?.balance ?? 0, 0)}
          sub="getReserveBalance()"
        />
        <MetricRow
          label="Reserve ratio"
          value={`${fmtNum(data?.ratio ?? 0, 2)}%`}
          sub="of TVL"
        />
        <MetricRow label="Backstop status" value="Live" sub="Auto-replenishing" />
      </div>

      <div className="border border-white/10 bg-black/40 p-5 text-sm leading-relaxed text-white/70">
        Each successful rebalance routes 10% of realized profit into the Insurance Reserve until the
        target ratio is met. Drawdowns on any whitelisted strategy can be socialized from this reserve via a
        timelocked governance action — strategies are never silently de-allocated without explicit DAO
        consent.
      </div>
    </div>
  )
}
