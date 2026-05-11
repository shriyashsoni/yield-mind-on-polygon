import { useWeb3 } from "@/lib/web3-context"
import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"
import { CONTRACT_ADDRESSES, YLD_TOKEN_ABI, YIELD_VAULT_V4_ABI } from "@/lib/contract-abis"
import { CONTRACTS } from "@/lib/contracts"

/**
 * Reads the deployed YieldVaultV4 on Polygon Amoy using the actual ABI:
 *   - getTotalAssets()  → tvl
 *   - getYieldRate()    → apy
 *   - balanceOf(addr)   → user vault shares
 *   - deposit / withdraw (handled in use-vault-actions)
 *
 * The user's wallet balance is their NATIVE POL (fetched via provider.getBalance).
 * The YLDToken balance is also read separately for staking needs.
 */
export function useVaultData() {
  const { address, chainId, provider } = useWeb3()

  const vaultAddress = CONTRACT_ADDRESSES.AMOY.YieldVaultV4
  const tokenAddress = CONTRACT_ADDRESSES.AMOY.YLDToken
  const networkKey = chainId === 137 ? "polygon" : "polygonAmoy"

  // Native POL balance — shown everywhere as "wallet balance"
  const { data: nativeBalanceWei } = useQuery({
    queryKey: ["nativeBalance", address, chainId],
    queryFn: async () => {
      if (!provider || !address) return 0n
      return provider.getBalance(address).catch(() => 0n)
    },
    enabled: !!provider && !!address,
    refetchInterval: 10_000,
  })

  const nativeBalance = nativeBalanceWei ? ethers.formatUnits(nativeBalanceWei, 18) : "0"

  const { data, isLoading } = useQuery({
    queryKey: ["vaultData", address, chainId],
    queryFn: async () => {
      if (!provider || !address) return null
      try {
        const vault = new ethers.Contract(vaultAddress, YIELD_VAULT_V4_ABI, provider)
        const token = new ethers.Contract(tokenAddress, YLD_TOKEN_ABI, provider)

        const [totalAssets, userShares, yieldRate, yldBalance] = await Promise.allSettled([
          vault.getTotalAssets(),
          vault.balanceOf(address),
          vault.getYieldRate(),
          token.balanceOf(address),
        ])

        return {
          totalAssets: totalAssets.status === "fulfilled" ? (totalAssets.value as bigint) : 0n,
          userShares: userShares.status === "fulfilled" ? (userShares.value as bigint) : 0n,
          yieldRate: yieldRate.status === "fulfilled" ? (yieldRate.value as bigint) : 0n,
          yldBalance: yldBalance.status === "fulfilled" ? (yldBalance.value as bigint) : 0n,
        }
      } catch (err) {
        console.log("[v0] vault read failed", err)
        return null
      }
    },
    enabled: !!provider && !!address,
    refetchInterval: 10_000,
  })

  const tvl = data ? ethers.formatUnits(data.totalAssets, 18) : "0"
  const userShares = data ? ethers.formatUnits(data.userShares, 18) : "0"
  // Share price: if totalAssets > 0 and userShares > 0 we can derive; otherwise 1:1
  const totalSharesFloat = data ? Number(ethers.formatUnits(data.totalAssets, 18)) : 0
  const userSharesFloat = Number(userShares)
  // yieldRate is stored as basis-points on-chain (e.g. 500 = 5%)
  const apyBps = data ? Number(data.yieldRate) : 0
  const currentAPY = apyBps / 100
  const yldTokenBalance = data ? ethers.formatUnits(data.yldBalance, 18) : "0"

  return {
    totalValueLocked: tvl,
    userBalance: userShares,   // vault shares the user holds
    userShares,
    currentAPY,
    walletBalance: nativeBalance,     // native POL
    usdcBalance: nativeBalance,       // back-compat alias
    yldTokenBalance,                  // YLD ERC-20 balance (for staking)
    assetAddress: tokenAddress,
    assetSymbol: "POL",
    assetDecimals: 18,
    isLoading,
    vaultAddress,
    usdcAddress: CONTRACTS[networkKey].usdc,
    isDemoMode: false,
  }
}
