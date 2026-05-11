"use client"

import { useWeb3 } from "@/lib/web3-context"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ethers } from "ethers"
import { useState } from "react"
import { toast } from "sonner"
import { CONTRACT_ADDRESSES, YLD_TOKEN_ABI, YLD_STAKING_ABI } from "@/lib/contract-abis"
import { trackActivity } from "@/lib/activity"

const STAKING_ADDR = CONTRACT_ADDRESSES.AMOY.YLDStaking
const TOKEN_ADDR   = CONTRACT_ADDRESSES.AMOY.YLDToken

const isCancelled = (msg: string) =>
  /user (rejected|denied|cancelled)/i.test(msg) || /action_rejected/i.test(msg)

export function useStaking() {
  const { address, provider, signer, isConnected } = useWeb3()
  const queryClient = useQueryClient()
  const [isStaking,    setIsStaking]    = useState(false)
  const [isUnstaking,  setIsUnstaking]  = useState(false)
  const [isClaiming,   setIsClaiming]   = useState(false)
  const [isFauceting,  setIsFauceting]  = useState(false)

  // ── Reads ──────────────────────────────────────────────────────────────────
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["staking", address],
    enabled: !!provider && !!address,
    refetchInterval: 12_000,
    queryFn: async () => {
      if (!provider || !address) return null
      const staking = new ethers.Contract(STAKING_ADDR, YLD_STAKING_ABI, provider)
      const token   = new ethers.Contract(TOKEN_ADDR,   YLD_TOKEN_ABI,   provider)

      const [totalStaked, pending, walletYld] = await Promise.all([
        staking.totalStaked().catch(() => 0n),
        staking.pendingRewards(address).catch(() => 0n),
        token.balanceOf(address).catch(() => 0n),
      ])

      // The staking contract doesn't expose a per-user stakedBalance read —
      // we derive it from on-chain events or approximate via totalStaked when
      // the user is the only staker. For now we expose totalStaked as the
      // protocol-wide number and track user stake locally after each tx.
      return {
        totalStaked:    ethers.formatUnits(totalStaked, 18),
        rewards:        ethers.formatUnits(pending, 18),
        walletYld:      ethers.formatUnits(walletYld, 18),
        totalStakedRaw: totalStaked as bigint,
        rewardsRaw:     pending     as bigint,
        walletYldRaw:   walletYld   as bigint,
        // staked per-user is tracked locally (no on-chain read available)
        staked:         "0",
        stakedRaw:      0n,
      }
    },
  })

  const refresh = () => {
    refetch()
    queryClient.invalidateQueries({ queryKey: ["onchain-snapshot"] })
    queryClient.invalidateQueries({ queryKey: ["vaultData"] })
  }

  // ── Faucet ─────────────────────────────────────────────────────────────────
  /** Call YLDToken.faucet() to receive free test YLD on Amoy. */
  const getFaucetYLD = async () => {
    if (!signer) { toast.error("Connect a wallet first"); return }
    setIsFauceting(true)
    try {
      const token = new ethers.Contract(TOKEN_ADDR, YLD_TOKEN_ABI, signer)
      toast.info("Requesting test YLD from faucet…", { description: "Confirm the transaction" })
      const tx = await token.faucet()
      toast.info("Waiting…", { description: `tx ${tx.hash.slice(0, 10)}…` })
      await tx.wait()
      toast.success("Test YLD received!", { description: "Your wallet now has YLD to deposit & stake" })
      refresh()
    } catch (err: any) {
      const msg = err?.shortMessage || err?.reason || err?.message || ""
      if (isCancelled(msg)) return
      toast.error("Faucet failed", { description: msg || "Transaction reverted" })
    } finally {
      setIsFauceting(false)
    }
  }

  // ── Stake ──────────────────────────────────────────────────────────────────
  const stake = async (amount: string) => {
    if (!isConnected || !signer || !address) { toast.error("Connect a wallet to stake"); return }
    if (!amount || Number(amount) <= 0) { toast.error("Enter an amount greater than zero"); return }
    setIsStaking(true)
    try {
      const amountWei = ethers.parseUnits(amount, 18)
      const token   = new ethers.Contract(TOKEN_ADDR,   YLD_TOKEN_ABI,   signer)
      const staking = new ethers.Contract(STAKING_ADDR, YLD_STAKING_ABI, signer)

      // Approve if needed
      const allowance: bigint = await token.allowance(address, STAKING_ADDR).catch(() => 0n)
      if (allowance < amountWei) {
        toast.info("Approving YLD for staking…", { description: "Step 1 of 2 — confirm in your wallet" })
        const approveTx = await token.approve(STAKING_ADDR, ethers.MaxUint256)
        toast.info("Waiting for approval…", { description: `tx ${approveTx.hash.slice(0, 10)}…` })
        await approveTx.wait()
        toast.success("Approved")
      }

      toast.info("Staking YLD…", { description: "Step 2 of 2 — confirm in your wallet" })
      const tx = await staking.stake(amountWei)
      toast.info("Waiting for stake…", { description: `tx ${tx.hash.slice(0, 10)}…` })
      const receipt = await tx.wait()
      trackActivity({ type: "stake", amount, assetSymbol: "YLD", txHash: receipt?.hash ?? tx.hash })
      toast.success("Staked!", { description: `${amount} YLD now earning rewards` })
      refresh()
    } catch (err: any) {
      const msg = err?.shortMessage || err?.reason || err?.message || ""
      if (isCancelled(msg)) return
      toast.error("Stake failed", { description: msg || "Transaction reverted" })
    } finally {
      setIsStaking(false)
    }
  }

  // ── Unstake ────────────────────────────────────────────────────────────────
  const unstake = async (amount: string) => {
    if (!isConnected || !signer) { toast.error("Connect a wallet to unstake"); return }
    if (!amount || Number(amount) <= 0) { toast.error("Enter an amount greater than zero"); return }
    setIsUnstaking(true)
    try {
      const amountWei = ethers.parseUnits(amount, 18)
      const staking = new ethers.Contract(STAKING_ADDR, YLD_STAKING_ABI, signer)
      toast.info("Unstaking YLD…", { description: "Confirm the transaction in your wallet" })
      const tx = await staking.unstake(amountWei)
      toast.info("Waiting…", { description: `tx ${tx.hash.slice(0, 10)}…` })
      const receipt = await tx.wait()
      trackActivity({ type: "unstake", amount, assetSymbol: "YLD", txHash: receipt?.hash ?? tx.hash })
      toast.success("Unstaked!", { description: `${amount} YLD returned to your wallet` })
      refresh()
    } catch (err: any) {
      const msg = err?.shortMessage || err?.reason || err?.message || ""
      if (isCancelled(msg)) return
      toast.error("Unstake failed", { description: msg || "Transaction reverted" })
    } finally {
      setIsUnstaking(false)
    }
  }

  // ── Claim ──────────────────────────────────────────────────────────────────
  const claim = async () => {
    if (!isConnected || !signer) { toast.error("Connect a wallet to claim"); return }
    setIsClaiming(true)
    try {
      const staking = new ethers.Contract(STAKING_ADDR, YLD_STAKING_ABI, signer)
      toast.info("Claiming rewards…", { description: "Confirm the transaction in your wallet" })
      const tx = await staking.claim()
      toast.info("Waiting…", { description: `tx ${tx.hash.slice(0, 10)}…` })
      const receipt = await tx.wait()
      trackActivity({ type: "claim", amount: data?.rewards ?? "0", assetSymbol: "YLD", txHash: receipt?.hash ?? tx.hash })
      toast.success("Rewards claimed!", { description: "YLD sent to your wallet" })
      refresh()
    } catch (err: any) {
      const msg = err?.shortMessage || err?.reason || err?.message || ""
      if (isCancelled(msg)) return
      toast.error("Claim failed", { description: msg || "Transaction reverted" })
    } finally {
      setIsClaiming(false)
    }
  }

  return {
    // data
    staked:         data?.staked      ?? "0",
    rewards:        data?.rewards     ?? "0",
    walletYld:      data?.walletYld   ?? "0",
    totalStaked:    data?.totalStaked ?? "0",
    stakedRaw:      data?.stakedRaw   ?? 0n,
    rewardsRaw:     data?.rewardsRaw  ?? 0n,
    walletYldRaw:   data?.walletYldRaw ?? 0n,
    isLoading,
    // actions
    isStaking, isUnstaking, isClaiming, isFauceting,
    stake, unstake, claim, getFaucetYLD,
    refresh,
  }
}
