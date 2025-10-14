import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-primary/20 p-8">
      <div className="relative z-10">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Powered by Polygon zkEVM</Badge>
        <h2 className="text-4xl font-bold text-foreground mb-3 text-balance">Maximize Your DeFi Yields with AI</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl text-pretty">
          YieldMind uses machine learning to automatically optimize your portfolio across Polygon protocols, analyzing
          yields, gas fees, and volatility in real-time.
        </p>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Smart Rebalancing</p>
              <p className="text-xs text-muted-foreground">AI-driven optimization</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Secure & Audited</p>
              <p className="text-xs text-muted-foreground">DAO governance</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Low Gas Fees</p>
              <p className="text-xs text-muted-foreground">Polygon zkEVM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-0" />
    </div>
  )
}
