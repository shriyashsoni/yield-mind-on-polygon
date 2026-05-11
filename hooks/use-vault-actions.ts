"use client"

import { useWeb3 } from "@/lib/web3-context"
import { CONTRACT_ADDRESSES, YIELD_VAULT_V4_ABI, YLD_TOKEN_ABI } from "@/lib/contract-abis"
import { ethers } from "ethers"
import { useState } from "react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { trackActivity } from "@/lib/activity"

const VAULT_ADDR  = CONTRACT_ADDRESSES.AMOY.YieldVaultV4
const TOKEN_ADDR  = CONTRACT_ADDRESSES.AMOY.YLDToken

export function useVaultActions() {
  const { address, signer } = useWeb3()
  const queryClient = useQueryClient()
  const [isDepositPending,  setIsDepositPending]  = useState(false)
  const [isWithdrawPending, setIsWithdrawPending] = useState(false)
  const [depositHash,  setDepositHash]  = useState<string | null>(null)
  const [withdrawHash, setWithdrawHash] = useState<string | null>(null)

  const invalidate = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["vaultData"] }),
      queryClient.invalidateQueries({ queryKey: ["staking"] }),
      queryClient.invalidateQueries({ queryKey: ["onchain-snapshot"] }),
    ])

  const isCancelled = (msg: string) =>
    /user (rejected|denied|cancelled)/i.test(msg) || /action_rejected/i.test(msg)

  /**
   * Deposit YLD into the vault.
   * Flow: check allowance → approve if needed → deposit(assets, receiver).
   * The vault is ERC-4626; underlying asset is YLDToken (verified on-chain).
   */
  const deposit = async (amount: string) => {
    if (!address || !signer) { toast.error("Connect your wallet first"); return }
    if (!amount || Number(amount) <= 0) { toast.error("Enter an amount greater than zero"); return }

    setIsDepositPending(true)
    try {
      const amountWei = ethers.parseUnits(amount, 18)
      const token = new ethers.Contract(TOKEN_ADDR, YLD_TOKEN_ABI, signer)
      const vault = new ethers.Contract(VAULT_ADDR, YIELD_VAULT_V4_ABI, signer)

      // 1. Approve if allowance is insufficient
      const allowance: bigint = await token.allowance(address, VAULT_ADDR).catch(() => 0n)
      if (allowance < amountWei) {
        toast.info("Approving YLD spend…", { description: "Step 1 of 2 — confirm in your wallet" })
        const approveTx = await token.approve(VAULT_ADDR, ethers.MaxUint256)
        toast.info("Waiting for approval…", { description: `tx ${approveTx.hash.slice(0, 10)}…` })
        await approveTx.wait()
        toast.success("Approved")
      }

      // 2. deposit(assets, receiver) — ERC-4626
      toast.info("Depositing to vault…", { description: "Step 2 of 2 — confirm in your wallet" })
      const tx = await vault.deposit(amountWei, address)
      setDepositHash(tx.hash)
      toast.info("Waiting for deposit…", { description: `tx ${tx.hash.slice(0, 10)}…` })
      await tx.wait()

      trackActivity({ type: "deposit", amount, assetSymbol: "YLD", txHash: tx.hash })
      await invalidate()
      toast.success("Deposit confirmed!", { description: `${amount} YLD deposited — vault shares minted` })
    } catch (err: any) {
      const msg = err?.shortMessage || err?.reason || err?.message || ""
      if (isCancelled(msg)) return
      toast.error("Deposit failed", { description: msg || "Transaction reverted" })
    } finally {
      setIsDepositPending(false)
    }
  }

  /**
   * Redeem vault shares back to YLD.
   * Flow: redeem(shares, receiver, owner) — ERC-4626 standard.
   */
  const withdraw = async (amount: string) => {
    if (!address || !signer) { toast.error("Connect your wallet first"); return }
    if (!amount || Number(amount) <= 0) { toast.error("Enter an amount greater than zero"); return }

    setIsWithdrawPending(true)
    try {
      const sharesWei = ethers.parseUnits(amount, 18)
      const vault = new ethers.Contract(VAULT_ADDR, YIELD_VAULT_V4_ABI, signer)

      toast.info("Redeeming shares…", { description: "Confirm the transaction in your wallet" })
      const tx = await vault.redeem(sharesWei, address, address)
      setWithdrawHash(tx.hash)
      toast.info("Waiting for redemption…", { description: `tx ${tx.hash.slice(0, 10)}…` })
      await tx.wait()

      trackActivity({ type: "withdraw", amount, assetSymbol: "YLD", txHash: tx.hash })
      await invalidate()
      toast.success("Withdrawal confirmed!", { description: `${amount} shares redeemed for YLD` })
    } catch (err: any) {
      const msg = err?.shortMessage || err?.reason || err?.message || ""
      if (isCancelled(msg)) return
      toast.error("Withdrawal failed", { description: msg || "Transaction reverted" })
    } finally {
      setIsWithdrawPending(false)
    }
  }

  return { deposit, withdraw, isDepositPending, isWithdrawPending, depositHash, withdrawHash }
}
