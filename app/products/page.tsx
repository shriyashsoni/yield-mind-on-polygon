"use client"

import { useWeb3 } from "@/lib/web3-context"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Zap, Lock } from "lucide-react"
import { WalletConnectButton } from "@/components/wallet-connect-button"

const products = [
  {
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
  const { isConnected } = useWeb3()

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
                    <Button className="w-full mt-auto">
                      <Lock className="h-4 w-4 mr-2" />
                      Deposit
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
      </main>
    </div>
  )
}
