"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { useWeb3 } from "@/lib/web3-context"
import { useVaultData } from "@/hooks/use-vault-data"
import { useProtocolSnapshot } from "@/hooks/use-protocol"
import { useContractAction } from "@/hooks/use-contract-action"
import { CONTRACTS } from "@/lib/contracts"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"
import { YIELD_VAULT_WRITE_ABI, YLD_TOKEN_WRITE_ABI } from "@/lib/contract-write-abis"
import { fmtNum, fmtUsd } from "../format"
import {
  ContractHeader,
  MetricRow,
  NumberInput,
  PrimaryAction,
  SecondaryAction,
  StatusPill,
} from "./contract-header"

const VAULT = CONTRACT_ADDRESSES.AMOY.YieldVaultV4

export function VaultPanel() {
  const { address, chainId, isConnected, connect } = useWeb3()
  const networkKey = chainId === 137 ? "polygon" : "polygonAmoy"
  const assetAddr = CONTRACTS[networkKey].token
  const vaultData = useVaultData()
  const { data: snap, refresh } = useProtocolSnapshot(address ?? null)
  const action = useContractAction()

  const [tab, setTab] = useState<"deposit" | "withdraw">("deposit")
  const [amount, setAmount] = useState("")

  const decimals = vaultData.assetDecimals ?? 18
  const symbol = vaultData.assetSymbol ?? "YLD"
  const walletBal = Number(vaultData.usdcBalance ?? 0)
  const sharesBal = Number(vaultData.userShares ?? 0)
  const positionUsd = Number(vaultData.userBalance ?? 0) * (snap?.protocol?.sharePriceUsd ?? 1)

  const submit = async () => {
    if (!isConnected) return connect()
    if (!amount || Number(amount) <= 0) return
    if (tab === "deposit") {
      const wei = ethers.parseUnits(amount, decimals)
      // Approve
      await action.run({
        address: assetAddr,
        abi: YLD_TOKEN_WRITE_ABI,
        label: `Approve ${symbol}`,
        runner: async (c) => c.approve(VAULT, wei),
      })
      // Deposit
      const r = await action.run({
        address: VAULT,
        abi: YIELD_VAULT_WRITE_ABI,
        label: `Deposit ${amount} ${symbol}`,
        runner: async (c, acct) => c.deposit(wei, acct),
        successMessage: `Deposited ${amount} ${symbol}`,
      })
      if (r) {
        setAmount("")
        refresh()
      }
    } else {
      const wei = ethers.parseUnits(amount, decimals)
      const r = await action.run({
        address: VAULT,
        abi: YIELD_VAULT_WRITE_ABI,
        label: `Withdraw ${amount} ${symbol}`,
        runner: async (c, acct) => c.withdraw(wei, acct, acct),
        successMessage: `Withdrew ${amount} ${symbol}`,
      })
      if (r) {
        setAmount("")
        refresh()
      }
    }
  }

  const triggerRebalance = async () => {
    if (!isConnected) return connect()
    const r = await action.run({
      address: VAULT,
      abi: YIELD_VAULT_WRITE_ABI,
      label: "Trigger rebalance",
      // ERC-4626 vaults often expose a no-arg rebalance() and a (twap, spot) overload;
      // try the simpler form first.
      runner: async (c) => c["rebalance()"](),
      successMessage: "Rebalance executed",
    })
    if (r) refresh()
  }

  return (
    <div className="space-y-5">
      <ContractHeader
        name="YieldVault V4"
        address={VAULT}
        description="ERC-4626 vault — deposit collateral, mint ymShares, and trigger AI-bounded rebalances."
      />

      <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
        <MetricRow label="TVL" value={fmtUsd(snap?.protocol?.tvlUsd ?? 0, 0)} sub="totalAssets()" />
        <MetricRow
          label="Share price"
          value={fmtUsd(snap?.protocol?.sharePriceUsd ?? 1, 4)}
          sub="convertToAssets(1e18)"
        />
        <MetricRow label="Estimated APY" value={`${(snap?.protocol?.estimatedApy ?? 0).toFixed(2)}%`} sub="oracle" />
        <MetricRow label="Your position" value={fmtUsd(positionUsd, 2)} sub={`${fmtNum(sharesBal, 4)} shares`} />
      </div>

      <div className="border border-white/10 bg-black/40">
        <div className="flex border-b border-white/10">
          <TabButton active={tab === "deposit"} onClick={() => setTab("deposit")}>
            Deposit
          </TabButton>
          <TabButton active={tab === "withdraw"} onClick={() => setTab("withdraw")}>
            Withdraw
          </TabButton>
        </div>

        <div className="space-y-4 p-5">
          <NumberInput
            label={tab === "deposit" ? `Amount (${symbol})` : `Assets to withdraw (${symbol})`}
            value={amount}
            onChange={setAmount}
            suffix={symbol}
            max={tab === "deposit" ? walletBal.toString() : positionUsd.toString()}
          />
          <div className="grid grid-cols-2 gap-px bg-white/10">
            <MetricRow
              label={`Wallet ${symbol}`}
              value={fmtNum(walletBal, 4)}
              sub={`Spendable on ${chainId === 137 ? "Polygon" : "Amoy"}`}
            />
            <MetricRow
              label="Vault shares"
              value={fmtNum(sharesBal, 4)}
              sub={`≈ ${fmtUsd(positionUsd, 2)}`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryAction
              onClick={submit}
              disabled={action.state === "pending" || action.state === "preparing" || !amount || Number(amount) <= 0}
            >
              {!isConnected
                ? "Connect Wallet"
                : tab === "deposit"
                  ? `Approve & Deposit`
                  : `Withdraw`}
            </PrimaryAction>
            <SecondaryAction
              onClick={triggerRebalance}
              disabled={action.state === "pending" || action.state === "preparing"}
            >
              Trigger rebalance
            </SecondaryAction>
            <a
              href={`https://amoy.polygonscan.com/address/${VAULT}#writeContract`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white"
            >
              Write on Polygonscan ↗
            </a>
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
