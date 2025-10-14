"use client"

import { useWeb3 } from "@/lib/web3-context"
import { CONTRACTS, VAULT_ABI } from "@/lib/contracts"
import { ethers } from "ethers"
import { useState } from "react"
import { toast } from "sonner"

export interface RebalanceRecommendation {
  strategyAddresses: string[]
  newAllocations: number[]
  confidence: number
  projectedAPY: number
  gasCost: string
}

export function useRebalance() {
  const { signer, chainId } = useWeb3()
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const networkKey = chainId === 137 ? "polygon" : "polygonAmoy"
  const vaultAddress = CONTRACTS[networkKey].vault

  const executeRebalance = async (recommendation: RebalanceRecommendation) => {
    if (!signer) {
      toast.error("Wallet not connected")
      return
    }

    try {
      setIsPending(true)
      setIsSuccess(false)

      const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer)
      const signature = "0x" + "00".repeat(65)

      toast.info("Executing rebalance...", { description: "Please confirm the transaction" })

      const tx = await vaultContract.rebalance(
        recommendation.strategyAddresses,
        recommendation.newAllocations.map((a) => BigInt(a * 100)),
        signature,
      )

      await tx.wait()

      setIsSuccess(true)
      toast.success("Rebalance successful!", { description: "Your portfolio has been optimized" })
    } catch (error: any) {
      console.error("[v0] Rebalance error:", error)
      toast.error("Rebalance failed", { description: error.message })
    } finally {
      setIsPending(false)
    }
  }

  return {
    executeRebalance,
    isPending,
    isSuccess,
  }
}
