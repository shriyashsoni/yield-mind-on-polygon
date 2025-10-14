import { useWeb3 } from "@/lib/web3-context"
import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"
import { CONTRACTS, VAULT_ABI, ERC20_ABI } from "@/lib/contracts"
import { DEMO_VAULT_DATA } from "@/lib/demo-data"

export function useVaultData() {
  const { address, chainId, provider } = useWeb3()

  const networkKey = chainId === 137 ? "polygon" : "polygonAmoy"
  const vaultAddress = CONTRACTS[networkKey].vault
  const usdcAddress = CONTRACTS[networkKey].usdc

  const { data, isLoading } = useQuery({
    queryKey: ["vaultData", address, chainId],
    queryFn: async () => {
      if (!provider || !address) return null

      try {
        const vaultContract = new ethers.Contract(vaultAddress, VAULT_ABI, provider)
        const usdcContract = new ethers.Contract(usdcAddress, ERC20_ABI, provider)

        const [totalAssets, userShares, currentAPY, usdcBalance] = await Promise.all([
          vaultContract.totalAssets(),
          vaultContract.balanceOf(address),
          vaultContract.currentAPY().catch(() => 0n),
          usdcContract.balanceOf(address),
        ])

        const userBalance = userShares > 0n ? await vaultContract.convertToAssets(userShares) : 0n

        return {
          totalAssets,
          userShares,
          userBalance,
          currentAPY,
          usdcBalance,
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

  return {
    totalValueLocked: useDemoData ? DEMO_VAULT_DATA.totalValueLocked : ethers.formatUnits(data.totalAssets, 6),
    userBalance: useDemoData ? DEMO_VAULT_DATA.userBalance : ethers.formatUnits(data.userBalance, 6),
    userShares: useDemoData ? DEMO_VAULT_DATA.userShares : ethers.formatUnits(data.userShares, 18),
    currentAPY: useDemoData ? DEMO_VAULT_DATA.currentAPY : Number(data.currentAPY) / 100,
    usdcBalance: useDemoData ? DEMO_VAULT_DATA.usdcBalance : ethers.formatUnits(data.usdcBalance, 6),
    isLoading,
    vaultAddress,
    usdcAddress,
    isDemoMode: useDemoData,
  }
}
