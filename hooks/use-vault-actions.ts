"use client"

import { useWeb3 } from "@/lib/web3-context"
import { CONTRACTS, VAULT_ABI, ERC20_ABI, isDeployedAddress } from "@/lib/contracts"
import { CONTRACT_ADDRESSES, YLD_TOKEN_ABI } from "@/lib/contract-abis"
import { ethers } from "ethers"
import { useState } from "react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { trackActivity } from "@/lib/activity"

export function useVaultActions() {
  const { address, chainId, signer } = useWeb3()
  const queryClient = useQueryClient()
  const [isDepositPending, setIsDepositPending] = useState(false)
  const [isWithdrawPending, setIsWithdrawPending] = useState(false)
  const [depositHash, setDepositHash] = useState<string | null>(null)
  const [withdrawHash, setWithdrawHash] = useState<string | null>(null)

  // Always use Amoy — the app is testnet-only
  const vaultAddress = CONTRACT_ADDRESSES.AMOY.YieldVaultV4
  const tokenAddress = CONTRACT_ADDRESSES.AMOY.YLDToken

  const refreshVaultViews = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["vaultData"] }),
      queryClient.invalidateQueries({ queryKey: ["strategies"] }),
      queryClient.invalidateQueries({ queryKey: ["staking"] }),
    ])
  }

  /**
   * Deposit POL (via YLDToken approve → vault.deposit(amount)).
   *
   * The deployed YieldVaultV4 on Amoy accepts the YLDToken as its
   * underlying asset, using a single-arg deposit(uint256) — NOT the
   * 2-arg ERC-4626 form. We approve the vault to spend the token first.
   */
  const deposit = async (amount: string) => {
    if (!address || !signer) {
      toast.error("Connect your wallet first")
      return
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter an amount greater than zero")
      return
    }
    if (!isDeployedAddress(vaultAddress)) {
      toast.error("Vault contract not found on this network")
      return
    }

    setIsDepositPending(true)
    try {
      const amountWei = ethers.parseUnits(amount, 18)
      const tokenContract = new ethers.Contract(tokenAddress, YLD_TOKEN_ABI, signer)
      const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer)

      // 1. Check allowance & approve if needed
      const allowance: bigint = await tokenContract.allowance(address, vaultAddress).catch(() => 0n)
      if (allowance < amountWei) {
        toast.info("Approving YLD token spend…", { description: "Confirm the approval in your wallet" })
        const approveTx = await tokenContract.approve(vaultAddress, amountWei)
        toast.info("Waiting for approval…", { description: `tx: ${approveTx.hash.slice(0, 10)}…` })
        await approveTx.wait()
        toast.success("Approval confirmed")
      }

      // 2. Deposit — single-arg matching the deployed contract
      toast.info("Depositing to vault…", { description: "Confirm the transaction in your wallet" })
      const depositTx = await vaultContract.deposit(amountWei)
      setDepositHash(depositTx.hash)
      toast.info("Waiting for deposit…", { description: `tx: ${depositTx.hash.slice(0, 10)}…` })
      await depositTx.wait()

      trackActivity({
        type: "deposit",
        vaultAddress,
        amount,
        assetSymbol: "POL",
        txHash: depositTx.hash,
      })
      await refreshVaultViews()
      toast.success("Deposit successful!", { description: `${amount} POL deposited into vault` })
    } catch (err: any) {
      console.log("[v0] Deposit error:", err)
      const msg = err?.shortMessage || err?.reason || err?.message || "Transaction failed"
      // Ignore user-cancelled
      if (/user (rejected|denied|cancelled)/i.test(msg)) return
      toast.error("Deposit failed", { description: msg })
    } finally {
      setIsDepositPending(false)
    }
  }

  /**
   * Withdraw — single-arg withdraw(uint256 shares) matching the deployed contract.
   * The user passes the number of vault shares they want to redeem.
   */
  const withdraw = async (amount: string) => {
    if (!address || !signer) {
      toast.error("Connect your wallet first")
      return
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter an amount greater than zero")
      return
    }
    if (!isDeployedAddress(vaultAddress)) {
      toast.error("Vault contract not found on this network")
      return
    }

    setIsWithdrawPending(true)
    try {
      const sharesWei = ethers.parseUnits(amount, 18)
      const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer)

      toast.info("Withdrawing from vault…", { description: "Confirm the transaction in your wallet" })
      const withdrawTx = await vaultContract.withdraw(sharesWei)
      setWithdrawHash(withdrawTx.hash)
      toast.info("Waiting for withdrawal…", { description: `tx: ${withdrawTx.hash.slice(0, 10)}…` })
      await withdrawTx.wait()

      trackActivity({
        type: "withdraw",
        vaultAddress,
        amount,
        assetSymbol: "POL",
        txHash: withdrawTx.hash,
      })
      await refreshVaultViews()
      toast.success("Withdrawal successful!", { description: `${amount} shares redeemed` })
    } catch (err: any) {
      console.log("[v0] Withdraw error:", err)
      const msg = err?.shortMessage || err?.reason || err?.message || "Transaction failed"
      if (/user (rejected|denied|cancelled)/i.test(msg)) return
      toast.error("Withdrawal failed", { description: msg })
    } finally {
      setIsWithdrawPending(false)
    }
  }

  return {
    deposit,
    withdraw,
    isDepositPending,
    isWithdrawPending,
    depositHash,
    withdrawHash,
  }
}
