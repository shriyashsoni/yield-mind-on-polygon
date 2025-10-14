"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, RefreshCw, ExternalLink } from "lucide-react"
import { useWeb3 } from "@/lib/web3-context"
import { formatDistanceToNow } from "date-fns"
import { DEMO_TRANSACTIONS } from "@/lib/demo-data"

interface Transaction {
  type: "deposit" | "withdraw" | "rebalance"
  amount?: string
  hash: string
  timestamp: number
  status: "success" | "pending" | "failed"
}

export function TransactionHistory() {
  const { address, chainId } = useWeb3()

  const getIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight className="w-4 h-4 text-success" />
      case "withdraw":
        return <ArrowUpRight className="w-4 h-4 text-warning" />
      case "rebalance":
        return <RefreshCw className="w-4 h-4 text-primary" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
            Success
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  if (!address) {
    return null
  }

  const transactions = DEMO_TRANSACTIONS

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Recent activity on your vault</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-background">{getIcon(tx.type)}</div>
                <div>
                  <p className="text-sm font-medium text-foreground capitalize">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {tx.amount && <span className="text-sm font-mono text-foreground">{tx.amount} USDC</span>}
                {getStatusBadge(tx.status)}
                <a
                  href={`https://${chainId === 137 ? "" : "amoy."}polygonscan.com/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
