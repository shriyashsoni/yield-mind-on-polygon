"use client"

import { useWeb3 } from "@/lib/web3-context"
import { CONTRACTS, VAULT_ABI, ERC20_ABI } from "@/lib/contracts"
import { ethers } from "ethers"
import { useState } from "react"
import { toast } from "sonner"

export function useVaultActions() {
  const { address, chainId, signer } = useWeb3()
  const [isDepositPending, setIsDepositPending] = useState(false)
  const [isWithdrawPending, setIsWithdrawPending] = useState(false)
  const [depositHash, setDepositHash] = useState<string | null>(null)
  const [withdrawHash, setWithdrawHash] = useState<string | null>(null)

  const networkKey = chainId === 137 ? "polygon" : "polygonAmoy"
  const vaultAddress = CONTRACTS[networkKey].vault
  const usdcAddress = CONTRACTS[networkKey].usdc

  const deposit = async (amount: string) => {
    if (!address || !signer) throw new Error("Wallet not connected")

    try {
      setIsDepositPending(true)
      const amountBigInt = ethers.parseUnits(amount, 6)

      const usdcContract = new ethers.Contract(usdcAddress, ERC20_ABI, signer)
      const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer)

      toast.info("Approving USDC...", { description: "Please confirm the transaction" })
      const approveTx = await usdcContract.approve(vaultAddress, amountBigInt)
      await approveTx.wait()

      toast.info("Depositing to vault...", { description: "Please confirm the transaction" })
      const depositTx = await vaultContract.deposit(amountBigInt, address)
      setDepositHash(depositTx.hash)
      await depositTx.wait()

      toast.success("Deposit successful!", { description: `Deposited ${amount} USDC` })
    } catch (error: any) {
      console.error("[v0] Deposit error:", error)
      toast.error("Deposit failed", { description: error.message })
    } finally {
      setIsDepositPending(false)
    }
  }

  const withdraw = async (shares: string) => {
    if (!address || !signer) throw new Error("Wallet not connected")

    try {
      setIsWithdrawPending(true)
      const sharesBigInt = ethers.parseUnits(shares, 18)

      const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer)

      toast.info("Withdrawing from vault...", { description: "Please confirm the transaction" })
      const withdrawTx = await vaultContract.redeem(sharesBigInt, address, address)
      setWithdrawHash(withdrawTx.hash)
      await withdrawTx.wait()

      toast.success("Withdrawal successful!", { description: `Redeemed ${shares} shares` })
    } catch (error: any) {
      console.error("[v0] Withdraw error:", error)
      toast.error("Withdrawal failed", { description: error.message })
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
