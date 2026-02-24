import { useWeb3 } from "@/lib/web3-context"
import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"
import { CONTRACTS, VAULT_ABI, ERC20_ABI, isDeployedAddress } from "@/lib/contracts"
import { DEMO_VAULT_DATA } from "@/lib/demo-data"

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

  const useDemoData = !data || data.totalAssets === 0n
  const decimals = useDemoData ? 6 : data.assetDecimals

  return {
    totalValueLocked: useDemoData ? DEMO_VAULT_DATA.totalValueLocked : ethers.formatUnits(data.totalAssets, decimals),
    userBalance: useDemoData ? DEMO_VAULT_DATA.userBalance : ethers.formatUnits(data.userBalance, decimals),
    userShares: useDemoData ? DEMO_VAULT_DATA.userShares : ethers.formatUnits(data.userShares, 18),
    currentAPY: DEMO_VAULT_DATA.currentAPY,
    usdcBalance: useDemoData ? DEMO_VAULT_DATA.usdcBalance : ethers.formatUnits(data.assetBalance, decimals),
    assetAddress: useDemoData ? defaultAssetAddress : data.assetAddress,
    assetSymbol: useDemoData ? "TOKEN" : data.assetSymbol,
    assetDecimals: decimals,
    isLoading,
    vaultAddress,
    usdcAddress: useDemoData ? CONTRACTS[networkKey].usdc : data.assetAddress,
    isDemoMode: useDemoData,
  }
}
