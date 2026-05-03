import { useWeb3 } from "@/lib/web3-context"
import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"
import { CONTRACTS, VAULT_ABI, ERC20_ABI, isDeployedAddress } from "@/lib/contracts"

export function useVaultData() {
  const { address, chainId, provider } = useWeb3()

  const networkKey = chainId === 137 ? "polygon" : "polygonAmoy"
  const vaultAddress = CONTRACTS[networkKey].vault
  const defaultAssetAddress = CONTRACTS[networkKey].token

  const { data, isLoading } = useQuery({
    queryKey: ["vaultData", address, chainId],
    queryFn: async () => {
      if (!provider || !address || !isDeployedAddress(vaultAddress)) return null

      try {
        const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, provider)
        const assetAddress = (await vaultContract.asset().catch(() => defaultAssetAddress)) as string
        const assetContract = new ethers.Contract(assetAddress, ERC20_ABI, provider)

        const [assetDecimals, assetSymbol] = await Promise.all([
          assetContract.decimals().catch(() => 18),
          assetContract.symbol().catch(() => "TOKEN"),
        ])

        const [totalAssets, userShares, assetBalance] = await Promise.all([
          vaultContract.totalAssets(),
          vaultContract.balanceOf(address),
          assetContract.balanceOf(address),
        ])

        const userBalance = userShares > 0n ? await vaultContract.convertToAssets(userShares) : 0n

        return {
          totalAssets,
          userShares,
          userBalance,
          assetBalance,
          assetAddress,
          assetDecimals: Number(assetDecimals),
          assetSymbol,
        }
      } catch (error) {
        console.log("[v0] Contract call failed, using demo data")
        return null
      }
    },
    enabled: !!provider && !!address,
    refetchInterval: 10000,
  })

  // Real on-chain data only. When no contract data is available we
  // return zeros so the UI clearly signals an empty/uninitialised state
  // rather than rendering invented numbers.
  if (!data) {
    return {
      totalValueLocked: "0",
      userBalance: "0",
      userShares: "0",
      currentAPY: 0,
      usdcBalance: "0",
      assetAddress: defaultAssetAddress,
      assetSymbol: "MATIC",
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
    usdcBalance: ethers.formatUnits(data.assetBalance, decimals),
    assetAddress: data.assetAddress,
    // The whole UI denominates value in MATIC (Polygon's native asset). Override the
    // on-chain symbol so users always see MATIC regardless of what the underlying
    // ERC-4626 asset reports (USDC / YLD / etc.).
    assetSymbol: "MATIC",
    assetDecimals: decimals,
    isLoading,
    vaultAddress,
    usdcAddress: data.assetAddress,
    isDemoMode: false,
  }
}
