import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

const strategies = [
  {
    name: "Aave USDC Lending",
    protocol: "Aave",
    apy: "6.2%",
    allocation: 35,
    tvl: "$3.2M",
    status: "active",
    change24h: 2.3,
  },
  {
    name: "Balancer WMATIC-USDC",
    protocol: "Balancer",
    apy: "18.5%",
    allocation: 25,
    tvl: "$2.1M",
    status: "active",
    change24h: -1.2,
  },
  {
    name: "Curve 3Pool",
    protocol: "Curve",
    apy: "12.8%",
    allocation: 20,
    tvl: "$1.8M",
    status: "active",
    change24h: 0.8,
  },
  {
    name: "QuickSwap MATIC-ETH",
    protocol: "QuickSwap",
    apy: "24.3%",
    allocation: 15,
    tvl: "$1.3M",
    status: "active",
    change24h: 5.1,
  },
  {
    name: "Compound DAI",
    protocol: "Compound",
    apy: "5.9%",
    allocation: 5,
    tvl: "$0.4M",
    status: "monitoring",
    change24h: -0.3,
  },
]

export default function StrategiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Active Strategies</h1>
          <p className="text-muted-foreground text-lg">
            Real-time performance of deployed yield strategies across Polygon
          </p>
        </div>

        <div className="space-y-4">
          {strategies.map((strategy) => (
            <Card key={strategy.name}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{strategy.name}</CardTitle>
                      <Badge variant={strategy.status === "active" ? "default" : "secondary"}>{strategy.status}</Badge>
                    </div>
                    <CardDescription>Protocol: {strategy.protocol}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-500">{strategy.apy}</p>
                    <div
                      className={`flex items-center gap-1 text-sm ${strategy.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {strategy.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(strategy.change24h)}% 24h
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Value Locked</p>
                    <p className="text-lg font-semibold">{strategy.tvl}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Allocation</p>
                    <p className="text-lg font-semibold">{strategy.allocation}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Optimized</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Portfolio Allocation</span>
                    <span className="font-medium">{strategy.allocation}%</span>
                  </div>
                  <Progress value={strategy.allocation} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
