"use client"

import { useWeb3 } from "@/lib/web3-context"
import { useQueryClient } from "@tanstack/react-query"
import { ethers } from "ethers"
import { useState } from "react"
import { toast } from "sonner"
import { CONTRACT_ADDRESSES, YIELD_VAULT_V4_ABI } from "@/lib/contract-abis"
import { trackActivity } from "@/lib/activity"

/**
 * Triggers the on-chain `vault.rebalance()` function. The deployed
 * YieldVaultV4 has two overloads — a no-arg public crank and a
 * twapPrice/spotPrice variant for keepers. We call the no-arg version
 * because it's permissionless and lets any wallet poke the AI agent
 * to recompute the optimal allocation.
 */
export function useVaultRebalance() {
  const { signer, chainId, isConnected } = useWeb3()
  const queryClient = useQueryClient()
  const [isPending, setIsPending] = useState(false)

  const vaultAddress = CONTRACT_ADDRESSES.AMOY.YieldVaultV4

  const trigger = async () => {
    if (!isConnected || !signer) {
      toast.error("Connect a wallet to trigger a rebalance")
      return
    }
    setIsPending(true)
    try {
      const vault = new ethers.Contract(vaultAddress, YIELD_VAULT_V4_ABI, signer)
      toast.info("Submitting rebalance…", {
        description: "The AI agent will recompute strategy weights",
      })
      const tx = await vault.rebalance()
      const receipt = await tx.wait()
      trackActivity({
        type: "rebalance",
        amount: "0",
        assetSymbol: "AI",
        txHash: receipt?.hash ?? tx.hash,
      })
      toast.success("Rebalance executed", {
        description: "AI strategy weights updated on-chain",
      })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["vaultData"] }),
        queryClient.invalidateQueries({ queryKey: ["onchain-snapshot"] }),
        queryClient.invalidateQueries({ queryKey: ["strategies"] }),
      ])
    } catch (err: any) {
      console.log("[v0] Rebalance failed", err)
      // Common revert: cooldown not elapsed. Translate to friendly copy.
      const raw = err?.shortMessage || err?.message || ""
      const friendly = /cooldown|elapsed|too soon/i.test(raw)
        ? "Rebalance cooldown is still active. Try again in a few minutes."
        : raw || "Transaction rejected"
      toast.error("Rebalance failed", { description: friendly })
    } finally {
      setIsPending(false)
    }
  }

  return { trigger, isPending }
}
