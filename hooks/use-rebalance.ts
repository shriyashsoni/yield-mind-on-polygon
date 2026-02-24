"use client"

import { useWeb3 } from "@/lib/web3-context"
import { CONTRACTS, VAULT_ABI, isDeployedAddress } from "@/lib/contracts"
import { ethers } from "ethers"
import { useState } from "react"
import { toast } from "sonner"

export interface RebalanceRecommendation {
  strategyAddresses: string[]
  newAllocations: number[]
  confidence: number
  projectedAPY: number
  gasCost: string
  twapPrice?: string
  spotPrice?: string
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

    if (!isDeployedAddress(vaultAddress)) {
      toast.error("Vault contract is not deployed on this network")
      return
    }

    try {
      setIsPending(true)
      setIsSuccess(false)

      const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, signer)
      const twapPrice = recommendation.twapPrice ? BigInt(recommendation.twapPrice) : 1_000000000000000000n
      const spotPrice = recommendation.spotPrice ? BigInt(recommendation.spotPrice) : twapPrice

      toast.info("Executing rebalance...", { description: "Please confirm the transaction" })

      const tx = await vaultContract.rebalance(twapPrice, spotPrice)

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
