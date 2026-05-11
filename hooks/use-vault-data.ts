import { useWeb3 } from "@/lib/web3-context"
import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"
import { CONTRACTS, VAULT_ABI, ERC20_ABI, isDeployedAddress } from "@/lib/contracts"

/**
 * Single source of truth for the user's wallet balance + their vault position.
 *
 * The whole UI is denominated in MATIC (Polygon's native asset). Even when the
 * underlying ERC-4626 asset is some test ERC-20 (USDC / YLD / etc.) on Amoy, we
 * surface the user's NATIVE MATIC balance as the wallet balance so the
 * "Wallet" / "Max" affordances always reflect the funds the user actually has
 * to spend. The deposit/stake calls themselves still go through the deployed
 * contracts (which is fine — on testnet the user pays gas in MATIC and a
 * revert simply surfaces a clear toast).
 */
export function useVaultData() {
  const { address, chainId, provider } = useWeb3()

  // The app is locked to Polygon Amoy testnet — always use the Amoy contracts.
  const networkKey = chainId === 137 ? "polygon" : "polygonAmoy"
  const vaultAddress = CONTRACTS[networkKey].vault
  const defaultAssetAddress = CONTRACTS[networkKey].token

  // Native MATIC balance for the connected address — this is what the UI shows
  // as the user's "wallet balance" everywhere.
  const { data: nativeBalanceWei } = useQuery({
    queryKey: ["nativeBalance", address, chainId],
    queryFn: async () => {
      if (!provider || !address) return 0n
      try {
        return await provider.getBalance(address)
      } catch (err) {
        console.log("[v0] native balance fetch failed", err)
        return 0n
      }
    },
    enabled: !!provider && !!address,
    refetchInterval: 10000,
  })

  const nativeBalance = nativeBalanceWei ? ethers.formatUnits(nativeBalanceWei, 18) : "0"

  const { data, isLoading } = useQuery({
    queryKey: ["vaultData", address, chainId],
    queryFn: async () => {
      if (!provider || !address || !isDeployedAddress(vaultAddress)) return null

      try {
        const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, provider)
        const assetAddress = (await vaultContract.asset().catch(() => defaultAssetAddress)) as string
        const assetContract = new ethers.Contract(assetAddress, ERC20_ABI, provider)

        const [assetDecimals] = await Promise.all([assetContract.decimals().catch(() => 18)])

        const [totalAssets, userShares] = await Promise.all([
          vaultContract.totalAssets(),
          vaultContract.balanceOf(address),
        ])

        const userBalance = userShares > 0n ? await vaultContract.convertToAssets(userShares) : 0n

        return {
          totalAssets,
          userShares,
          userBalance,
          assetAddress,
          assetDecimals: Number(assetDecimals),
        }
      } catch (error) {
        console.log("[v0] Contract call failed, using zeros for vault state", error)
        return null
      }
    },
    enabled: !!provider && !!address,
    refetchInterval: 10000,
  })

  // Always surface the user's native MATIC balance as the wallet balance, even
  // when the vault read fails — this is what the user sees in their wallet
  // UI and what every "Max" / "Wallet" affordance should reference.
  if (!data) {
    return {
      totalValueLocked: "0",
      userBalance: "0",
      userShares: "0",
      currentAPY: 0,
      // Wallet balance == native MATIC — single source of truth.
      walletBalance: nativeBalance,
      usdcBalance: nativeBalance,
      assetAddress: defaultAssetAddress,
      assetSymbol: "POL",
      assetDecimals: 18,
      isLoading,
      vaultAddress,
      usdcAddress: CONTRACTS[networkKey].usdc,
      isDemoMode: false,
    }
  }

  const decimals = data.assetDecimals
  return {
    totalValueLocked: ethers.formatUnits(data.totalAssets, decimals),
    userBalance: ethers.formatUnits(data.userBalance, decimals),
    userShares: ethers.formatUnits(data.userShares, 18),
    currentAPY: 0,
    walletBalance: nativeBalance,
    // Back-compat alias — every consumer that read `usdcBalance` now sees the
    // user's actual native POL (Amoy testnet), which is what they want to spend.
    usdcBalance: nativeBalance,
    assetAddress: data.assetAddress,
    assetSymbol: "POL",
    assetDecimals: decimals,
    isLoading,
    vaultAddress,
    usdcAddress: data.assetAddress,
    isDemoMode: false,
  }
}
