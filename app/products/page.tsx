"use client"

import { useState } from "react"
import { useWeb3 } from "@/lib/web3-context"
import { useVaultActions } from "@/hooks/use-vault-actions"
import { useVaultData } from "@/hooks/use-vault-data"
import { getVaultProductAddress, isDeployedAddress } from "@/lib/contracts"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrendingUp, Shield, Zap, Lock, Loader2 } from "lucide-react"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { toast } from "sonner"

type ProductRiskKey = "low" | "medium" | "high"

interface ProductCard {
  riskKey: ProductRiskKey
  name: string
  apy: string
  tvl: string
  risk: "Low" | "Medium" | "High"
  description: string
  strategies: string[]
  icon: typeof Shield
  color: string
}

const products: ProductCard[] = [
  {
    riskKey: "low",
    name: "Conservative Vault",
    apy: "8.5%",
    tvl: "$2.4M",
    risk: "Low",
    description: "Stable yield farming with blue-chip protocols",
    strategies: ["Aave USDC", "Compound DAI"],
    icon: Shield,
    color: "text-green-500",
  },
  {
    riskKey: "medium",
    name: "Balanced Vault",
    apy: "15.2%",
    tvl: "$5.8M",
    risk: "Medium",
    description: "Optimized multi-protocol allocation",
    strategies: ["Balancer Pools", "Curve Finance", "QuickSwap"],
    icon: TrendingUp,
    color: "text-blue-500",
  },
  {
    riskKey: "high",
    name: "Aggressive Vault",
    apy: "28.7%",
    tvl: "$1.2M",
    risk: "High",
    description: "Maximum yield with active rebalancing",
    strategies: ["Leveraged Farming", "Liquidity Mining", "Yield Aggregation"],
    icon: Zap,
    color: "text-orange-500",
  },
]

export default function ProductsPage() {
  const { isConnected, chainId } = useWeb3()
  const { deposit, isDepositPending } = useVaultActions()
  const { assetSymbol, usdcBalance } = useVaultData()
  const [selectedVault, setSelectedVault] = useState<ProductCard | null>(null)
  const [depositAmount, setDepositAmount] = useState("")

  const openDepositDialog = (product: ProductCard) => {
    setSelectedVault(product)
    setDepositAmount("")
  }

  const closeDialog = () => {
    if (isDepositPending) return
    setSelectedVault(null)
    setDepositAmount("")
  }

  const handleDeposit = async () => {
    if (!selectedVault) return

    if (!depositAmount || Number(depositAmount) <= 0) {
      toast.error("Please enter a valid deposit amount")
      return
    }

    try {
      const vaultAddress = getVaultProductAddress(chainId, selectedVault.riskKey)
      if (!isDeployedAddress(vaultAddress)) {
        toast.error("Selected vault is not deployed on this network")
        return
      }

      await deposit(depositAmount, { vaultName: selectedVault.name, vaultAddress })
      closeDialog()
    } catch (error) {
      console.error("[products] Deposit failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Vault Products</h1>
          <p className="text-muted-foreground text-lg">
            Choose the right vault for your risk tolerance and yield goals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon
            const productVaultAddress = getVaultProductAddress(chainId, product.riskKey)
            const isVaultAvailable = isDeployedAddress(productVaultAddress)
            return (
              <Card key={product.name} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Icon className={`h-8 w-8 ${product.color}`} />
                    <Badge
                      variant={
                        product.risk === "Low" ? "secondary" : product.risk === "Medium" ? "default" : "destructive"
                      }
                    >
                      {product.risk} Risk
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">APY</p>
                      <p className="text-2xl font-bold text-green-500">{product.apy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">TVL</p>
                      <p className="text-2xl font-bold">{product.tvl}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Active Strategies:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.strategies.map((strategy) => (
                        <Badge key={strategy} variant="outline" className="text-xs">
                          {strategy}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {isConnected ? (
                    <Button className="w-full mt-auto" onClick={() => openDepositDialog(product)} disabled={!isVaultAvailable}>
                      <Lock className="h-4 w-4 mr-2" />
                      {isVaultAvailable ? "Deposit" : "Vault Unavailable"}
                    </Button>
                  ) : (
                    <div className="mt-auto">
                      <WalletConnectButton />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Dialog open={!!selectedVault} onOpenChange={(open) => (!open ? closeDialog() : null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deposit to {selectedVault?.name}</DialogTitle>
              <DialogDescription>
                Enter amount to deposit into the vault contract. Your dashboard updates after confirmation.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <Label htmlFor="vault-deposit-amount">Amount ({assetSymbol})</Label>
              <div className="flex gap-2">
                <Input
                  id="vault-deposit-amount"
                  type="number"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(event) => setDepositAmount(event.target.value)}
                  disabled={isDepositPending}
                />
                <Button variant="outline" onClick={() => setDepositAmount(usdcBalance)} disabled={isDepositPending}>
                  MAX
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Available: {Number(usdcBalance).toLocaleString()} {assetSymbol}
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={closeDialog} disabled={isDepositPending}>
                Cancel
              </Button>
              <Button onClick={handleDeposit} disabled={isDepositPending || !depositAmount}>
                {isDepositPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Deposit"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
