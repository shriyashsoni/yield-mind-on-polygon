"use client"

import { useWeb3 } from "@/lib/web3-context"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ethers } from "ethers"
import { useState } from "react"
import { toast } from "sonner"
import { CONTRACT_ADDRESSES, YLD_TOKEN_ABI, YLD_STAKING_ABI } from "@/lib/contract-abis"
import { trackActivity } from "@/lib/activity"

// Use the canonical ABI from contract-abis.ts (now includes unstake + claimRewards)
const STAKING_ABI = YLD_STAKING_ABI

export function useStaking() {
  const { address, provider, signer, isConnected } = useWeb3()
  const queryClient = useQueryClient()
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  const stakingAddress = CONTRACT_ADDRESSES.AMOY.YLDStaking
  const tokenAddress = CONTRACT_ADDRESSES.AMOY.YLDToken

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["staking", address],
    enabled: !!provider && !!address,
    refetchInterval: 12_000,
    queryFn: async () => {
      if (!provider || !address) return null
      const stake = new ethers.Contract(stakingAddress, STAKING_ABI, provider)
      const token = new ethers.Contract(tokenAddress, YLD_TOKEN_ABI, provider)
      const [staked, rewards, walletYld] = await Promise.all([
        stake.getStakedAmount(address).catch(() => 0n),
        stake.getRewards(address).catch(() => 0n),
        token.balanceOf(address).catch(() => 0n),
      ])
      return {
        stakedRaw: staked as bigint,
        rewardsRaw: rewards as bigint,
        walletYldRaw: walletYld as bigint,
        staked: ethers.formatUnits(staked, 18),
        rewards: ethers.formatUnits(rewards, 18),
        walletYld: ethers.formatUnits(walletYld, 18),
      }
    },
  })

  const refresh = () => {
    refetch()
    queryClient.invalidateQueries({ queryKey: ["onchain-snapshot"] })
  }

  const stake = async (amount: string) => {
    if (!isConnected || !signer || !address) {
      toast.error("Connect a wallet to stake")
      return
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter an amount greater than zero")
      return
    }
    setIsStaking(true)
    try {
      const amountWei = ethers.parseUnits(amount, 18)
      const token = new ethers.Contract(tokenAddress, YLD_TOKEN_ABI, signer)
      const stakingContract = new ethers.Contract(stakingAddress, STAKING_ABI, signer)

      // 1. Approve YLD spend
      const allowance: bigint = await token.allowance?.(address, stakingAddress).catch(() => 0n) ?? 0n
      if (allowance < amountWei) {
        toast.info("Approving stake token…", { description: "Confirm the approval in your wallet" })
        const approveTx = await token.approve(stakingAddress, amountWei)
        await approveTx.wait()
      }

      // 2. Stake
      toast.info("Staking…", { description: "Confirm the staking transaction" })
      const tx = await stakingContract.stake(amountWei)
      const receipt = await tx.wait()
      trackActivity({
        type: "stake",
        amount,
        assetSymbol: "MATIC",
        txHash: receipt?.hash ?? tx.hash,
      })
      toast.success("Stake confirmed", { description: `${amount} MATIC now earning rewards` })
      refresh()
    } catch (err: any) {
      console.log("[v0] Stake failed", err)
      toast.error("Stake failed", { description: err?.shortMessage || err?.message || "Transaction rejected" })
    } finally {
      setIsStaking(false)
    }
  }

  const unstake = async (amount: string) => {
    if (!isConnected || !signer) {
      toast.error("Connect a wallet to unstake")
      return
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter an amount greater than zero")
      return
    }
    setIsUnstaking(true)
    try {
      const amountWei = ethers.parseUnits(amount, 18)
      const stakingContract = new ethers.Contract(stakingAddress, STAKING_ABI, signer)
      toast.info("Unstaking…", { description: "Confirm the transaction" })
      const tx = await stakingContract.unstake(amountWei)
      const receipt = await tx.wait()
      trackActivity({ type: "unstake", amount, assetSymbol: "MATIC", txHash: receipt?.hash ?? tx.hash })
      toast.success("Unstake confirmed", { description: `${amount} MATIC released` })
      refresh()
    } catch (err: any) {
      console.log("[v0] Unstake failed", err)
      toast.error("Unstake failed", { description: err?.shortMessage || err?.message || "Transaction rejected" })
    } finally {
      setIsUnstaking(false)
    }
  }

  const claim = async () => {
    if (!isConnected || !signer) {
      toast.error("Connect a wallet to claim")
      return
    }
    setIsClaiming(true)
    try {
      const stakingContract = new ethers.Contract(stakingAddress, STAKING_ABI, signer)
      toast.info("Claiming rewards…", { description: "Confirm the transaction" })
      const tx = await stakingContract.claimRewards()
      const receipt = await tx.wait()
      trackActivity({
        type: "claim",
        amount: data?.rewards ?? "0",
        assetSymbol: "YLD",
        txHash: receipt?.hash ?? tx.hash,
      })
      toast.success("Rewards claimed", { description: "YLD sent to your wallet" })
      refresh()
    } catch (err: any) {
      console.log("[v0] Claim failed", err)
      toast.error("Claim failed", { description: err?.shortMessage || err?.message || "Transaction rejected" })
    } finally {
      setIsClaiming(false)
    }
  }

  return {
    staked: data?.staked ?? "0",
    rewards: data?.rewards ?? "0",
    walletYld: data?.walletYld ?? "0",
    stakedRaw: data?.stakedRaw ?? 0n,
    rewardsRaw: data?.rewardsRaw ?? 0n,
    walletYldRaw: data?.walletYldRaw ?? 0n,
    isLoading,
    isStaking,
    isUnstaking,
    isClaiming,
    stake,
    unstake,
    claim,
    refresh,
  }
}
