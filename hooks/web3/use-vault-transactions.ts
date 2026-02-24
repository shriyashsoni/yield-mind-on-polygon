"use client"

import { useState } from "react"
import { parseUnits } from "viem"
import { useAccount, usePublicClient, useWalletClient } from "wagmi"
import { CONTRACTS_ZKEVM, ERC20_ABI, VAULT_WRITE_ABI } from "@/lib/web3/zkevm"

export type TxState = "idle" | "pending" | "success" | "failed"

export function useVaultTransactions() {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const [depositState, setDepositState] = useState<TxState>("idle")
  const [withdrawState, setWithdrawState] = useState<TxState>("idle")
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null)

  const deposit = async (amount: string, decimals = 6) => {
    if (!walletClient || !publicClient || !address) throw new Error("Wallet not connected")
    setError(null)
    setDepositState("pending")

    try {
      const amountWei = parseUnits(amount, decimals)

      const approvalHash = await walletClient.writeContract({
        address: CONTRACTS_ZKEVM.usdc,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [CONTRACTS_ZKEVM.vault, amountWei],
        account: address,
      })

      await publicClient.waitForTransactionReceipt({ hash: approvalHash, confirmations: 1 })

      const hash = await walletClient.writeContract({
        address: CONTRACTS_ZKEVM.vault,
        abi: VAULT_WRITE_ABI,
        functionName: "deposit",
        args: [amountWei],
        account: address,
      })

      setTxHash(hash)
      const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 2 })
      setDepositState(receipt.status === "success" ? "success" : "failed")
      return receipt
    } catch (e) {
      setDepositState("failed")
      setError(e instanceof Error ? e.message : "Deposit failed")
      throw e
    }
  }

  const withdraw = async (shares: string, decimals = 18) => {
    if (!walletClient || !publicClient || !address) throw new Error("Wallet not connected")
    setError(null)
    setWithdrawState("pending")

    try {
      const sharesWei = parseUnits(shares, decimals)
      const hash = await walletClient.writeContract({
        address: CONTRACTS_ZKEVM.vault,
        abi: VAULT_WRITE_ABI,
        functionName: "withdraw",
        args: [sharesWei],
        account: address,
      })

      setTxHash(hash)
      const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 2 })
      setWithdrawState(receipt.status === "success" ? "success" : "failed")
      return receipt
    } catch (e) {
      setWithdrawState("failed")
      setError(e instanceof Error ? e.message : "Withdraw failed")
      throw e
    }
  }

  return {
    deposit,
    withdraw,
    depositState,
    withdrawState,
    error,
    txHash,
  }
}
