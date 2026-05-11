"use client"

import { useQuery } from "@tanstack/react-query"
import { useWeb3 } from "@/lib/web3-context"
import { ethers } from "ethers"
import { CONTRACT_ADDRESSES, YIELD_VAULT_V4_ABI, YLD_TOKEN_ABI } from "@/lib/contract-abis"

const VAULT_ADDR = CONTRACT_ADDRESSES.AMOY.YieldVaultV4
const TOKEN_ADDR = CONTRACT_ADDRESSES.AMOY.YLDToken

/**
 * Reads YieldVaultV4 (ERC-4626) on Polygon Amoy.
 * Verified selectors (from on-chain bytecode probe):
 *   totalAssets()          → total YLD managed by vault
 *   totalSupply()          → total vault shares outstanding
 *   balanceOf(address)     → user's vault shares
 *   previewRedeem(shares)  → YLD value of shares
 *   asset()                → YLDToken address
 *
 * The user's wallet balance shown in the UI is their YLD ERC-20 balance
 * (what they can deposit). Native POL is shown separately for gas info.
 */
export function useVaultData() {
  const { provider, address } = useWeb3()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["vaultData", address],
    enabled: !!provider,
    refetchInterval: 15_000,
    queryFn: async () => {
      if (!provider) return null
      const vault = new ethers.Contract(VAULT_ADDR, YIELD_VAULT_V4_ABI, provider)
      const token = new ethers.Contract(TOKEN_ADDR, YLD_TOKEN_ABI, provider)

      const [totalAssets, totalSupply, userShares, userYLD, nativeBal] = await Promise.all([
        vault.totalAssets().catch(() => 0n),
        vault.totalSupply().catch(() => 0n),
        address ? vault.balanceOf(address).catch(() => 0n) : 0n,
        address ? token.balanceOf(address).catch(() => 0n) : 0n,
        address ? provider.getBalance(address).catch(() => 0n) : 0n,
      ])

      const totalAssetsFmt = Number(ethers.formatUnits(totalAssets as bigint, 18))
      const totalSupplyFmt = Number(ethers.formatUnits(totalSupply as bigint, 18))
      const sharePrice     = totalSupplyFmt > 0 ? totalAssetsFmt / totalSupplyFmt : 1
      const userSharesFmt  = Number(ethers.formatUnits(userShares as bigint, 18))
      const userAssetValue = userSharesFmt * sharePrice
      const yldWallet      = Number(ethers.formatUnits(userYLD    as bigint, 18))
      const nativeWallet   = Number(ethers.formatEther(nativeBal  as bigint))

      return {
        totalValueLocked: String(totalAssetsFmt),
        totalShares:      String(totalSupplyFmt),
        sharePrice,
        userShares:       String(userSharesFmt),
        userBalance:      String(userAssetValue),
        walletYld:        String(yldWallet),
        walletBalance:    String(nativeWallet),
        usdcBalance:      String(yldWallet),  // back-compat alias
      }
    },
  })

  return {
    totalValueLocked: data?.totalValueLocked ?? "0",
    totalShares:      data?.totalShares      ?? "0",
    sharePrice:       data?.sharePrice       ?? 1,
    userShares:       data?.userShares       ?? "0",
    userBalance:      data?.userBalance      ?? "0",
    walletYld:        data?.walletYld        ?? "0",
    walletBalance:    data?.walletBalance    ?? "0",
    usdcBalance:      data?.usdcBalance      ?? "0",
    assetSymbol:      "YLD",
    assetDecimals:    18,
    assetAddress:     TOKEN_ADDR,
    vaultAddress:     VAULT_ADDR,
    currentAPY:       0,
    isLoading,
    isDemoMode:       false,
    refetch,
  }
}
