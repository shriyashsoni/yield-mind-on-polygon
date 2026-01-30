'use client'

import { useState } from 'react'
import { useWeb3 } from '@/lib/web3-context'
import { useTransactions } from '@/hooks/use-transactions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Send,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react'

export function TransactionInterface() {
  const { address, isConnected, chainId } = useWeb3()
  const { transactions, isLoading, error, submitTransaction, clearError } = useTransactions()
  const [amount, setAmount] = useState('')
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw'>('deposit')

  const isTestnet = chainId === 80002
  const isCorrectNetwork = isTestnet

  const handleSubmit = async () => {
    if (!amount) {
      alert('Please enter an amount')
      return
    }

    const tx = await submitTransaction(amount, transactionType)
    if (tx) {
      setAmount('')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>On-Chain Transactions</CardTitle>
          <CardDescription>Connect your wallet to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Please connect your wallet to submit transactions on Polygon Amoy testnet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!isCorrectNetwork) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>On-Chain Transactions</CardTitle>
          <CardDescription>Network mismatch</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Please switch to Polygon Amoy testnet (Chain ID: 80002) to submit transactions.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Submit On-Chain Transaction</CardTitle>
          <CardDescription>Test transactions on Polygon Amoy testnet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="flex items-center justify-between">
                {error}
                <button onClick={clearError} className="text-xs underline">
                  Dismiss
                </button>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Wallet Address</label>
            <div className="p-3 rounded-lg bg-muted font-mono text-sm truncate">
              {address}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Transaction Type</label>
            <div className="flex gap-2">
              <Button
                variant={transactionType === 'deposit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTransactionType('deposit')}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Deposit
              </Button>
              <Button
                variant={transactionType === 'withdraw' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTransactionType('withdraw')}
                className="gap-2"
              >
                <TrendingDown className="w-4 h-4" />
                Withdraw
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (USDC)</label>
            <Input
              type="number"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !amount}
            className="w-full gap-2"
          >
            {isLoading ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Transaction
              </>
            )}
          </Button>

          <Badge variant="secondary" className="w-full justify-center">
            Network: Polygon Amoy (80002)
          </Badge>
        </CardContent>
      </Card>

      {transactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>{transactions.length} transaction(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.txHash}
                    className="p-3 rounded-lg border flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getStatusIcon(tx.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{tx.amount} USDC</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {tx.type}
                      </Badge>
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted rounded transition-colors"
                        title="View on Polygonscan"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-2">
                {transactions
                  .filter((tx) => tx.status === 'pending')
                  .map((tx) => (
                    <div key={tx.txHash} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{tx.amount} USDC</span>
                        <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="confirmed" className="space-y-2">
                {transactions
                  .filter((tx) => tx.status === 'confirmed')
                  .map((tx) => (
                    <div key={tx.txHash} className="p-3 rounded-lg border bg-green-50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{tx.amount} USDC</span>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="failed" className="space-y-2">
                {transactions
                  .filter((tx) => tx.status === 'failed')
                  .map((tx) => (
                    <div key={tx.txHash} className="p-3 rounded-lg border bg-red-50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{tx.amount} USDC</span>
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
