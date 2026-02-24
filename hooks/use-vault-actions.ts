"use client"

import { useWeb3 } from "@/lib/web3-context"
import { CONTRACTS, VAULT_ABI, ERC20_ABI, isDeployedAddress } from "@/lib/contracts"
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
  const defaultAssetAddress = CONTRACTS[networkKey].token

  const getVaultAndAsset = async () => {
    if (!isDeployedAddress(vaultAddress)) throw new Error("Vault contract is not deployed on this network")

    const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer)
    const assetAddress = (await vaultContract.asset().catch(() => defaultAssetAddress)) as string
    const assetContract = new ethers.Contract(assetAddress, ERC20_ABI, signer)
    const assetDecimals = Number(await assetContract.decimals().catch(() => 18))
    const assetSymbol = (await assetContract.symbol().catch(() => "TOKEN")) as string

    return { vaultContract, assetContract, assetAddress, assetDecimals, assetSymbol }
  }

  const deposit = async (amount: string) => {
    if (!address || !signer) throw new Error("Wallet not connected")

    try {
      setIsDepositPending(true)

      const { vaultContract, assetContract, assetDecimals, assetSymbol } = await getVaultAndAsset()
      const amountBigInt = ethers.parseUnits(amount, assetDecimals)

      toast.info(`Approving ${assetSymbol}...`, { description: "Please confirm the transaction" })
      const approveTx = await assetContract.approve(vaultAddress, amountBigInt)
      await approveTx.wait()

      toast.info("Depositing to vault...", { description: "Please confirm the transaction" })
      const depositTx = await vaultContract.deposit(amountBigInt, address)
      setDepositHash(depositTx.hash)
      await depositTx.wait()

      toast.success("Deposit successful!", { description: `Deposited ${amount} ${assetSymbol}` })
    } catch (error: any) {
      console.error("[v0] Deposit error:", error)
      toast.error("Deposit failed", { description: error.message })
    } finally {
      setIsDepositPending(false)
    }
  }

  const withdraw = async (amount: string) => {
    if (!address || !signer) throw new Error("Wallet not connected")

    try {
      setIsWithdrawPending(true)
      const { vaultContract, assetDecimals, assetSymbol } = await getVaultAndAsset()
      const assetsBigInt = ethers.parseUnits(amount, assetDecimals)

      toast.info("Withdrawing from vault...", { description: "Please confirm the transaction" })
      const withdrawTx = await vaultContract.withdraw(assetsBigInt, address, address)
      setWithdrawHash(withdrawTx.hash)
      await withdrawTx.wait()

      toast.success("Withdrawal successful!", { description: `Withdrew ${amount} ${assetSymbol}` })
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
