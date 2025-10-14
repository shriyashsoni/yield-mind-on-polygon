"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownToLine, ArrowUpFromLine, DollarSign, TrendingUp, Loader2 } from "lucide-react"
import { useVaultData } from "@/hooks/use-vault-data"
import { useVaultActions } from "@/hooks/use-vault-actions"
import { useWeb3 } from "@/lib/web3-context"
import { useState } from "react"
import { toast } from "sonner"

export function VaultOverview() {
  const { address, isConnected } = useWeb3()
  const { totalValueLocked, userBalance, currentAPY, usdcBalance, isLoading } = useVaultData()
  const { deposit, withdraw, isDepositPending, isWithdrawPending } = useVaultActions()

  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const handleDeposit = async () => {
    if (!depositAmount || Number(depositAmount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    try {
      await deposit(depositAmount)
      toast.success("Deposit successful!")
      setDepositAmount("")
    } catch (error) {
      console.error("[v0] Deposit error:", error)
      toast.error("Deposit failed. Please try again.")
    }
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    try {
      await withdraw(withdrawAmount)
      toast.success("Withdrawal successful!")
      setWithdrawAmount("")
    } catch (error) {
      console.error("[v0] Withdraw error:", error)
      toast.error("Withdrawal failed. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Vault Overview</CardTitle>
            <CardDescription>Manage your deposits and track performance</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Value Locked</p>
            <p className="text-2xl font-bold text-foreground">
              {isLoading ? "..." : `$${Number(totalValueLocked).toLocaleString()}`}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Your Balance</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {!isConnected ? "Connect Wallet" : isLoading ? "..." : `$${Number(userBalance).toLocaleString()}`}
            </p>
            <p className="text-xs text-success mt-1">Real-time balance</p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Current APY</p>
            </div>
            <p className="text-2xl font-bold text-success">{isLoading ? "..." : `${currentAPY.toFixed(1)}%`}</p>
            <p className="text-xs text-muted-foreground mt-1">Optimized by AI</p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Available USDC</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {!isConnected ? "---" : isLoading ? "..." : Number(usdcBalance).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">In your wallet</p>
          </div>
        </div>

        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount</Label>
              <div className="flex gap-2">
                <Input
                  id="deposit-amount"
                  placeholder="0.00"
                  type="number"
                  className="flex-1"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  disabled={!isConnected || isDepositPending}
                />
                <Button
                  variant="outline"
                  onClick={() => setDepositAmount(usdcBalance)}
                  disabled={!isConnected || isDepositPending}
                >
                  MAX
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Available: {isConnected ? `${Number(usdcBalance).toLocaleString()} USDC` : "Connect wallet"}
              </p>
            </div>
            <Button
              className="w-full gap-2"
              onClick={handleDeposit}
              disabled={!isConnected || isDepositPending || !depositAmount}
            >
              {isDepositPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowDownToLine className="w-4 h-4" />
                  Deposit to Vault
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount</Label>
              <div className="flex gap-2">
                <Input
                  id="withdraw-amount"
                  placeholder="0.00"
                  type="number"
                  className="flex-1"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  disabled={!isConnected || isWithdrawPending}
                />
                <Button
                  variant="outline"
                  onClick={() => setWithdrawAmount(userBalance)}
                  disabled={!isConnected || isWithdrawPending}
                >
                  MAX
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Deposited: {isConnected ? `${Number(userBalance).toLocaleString()} USDC` : "Connect wallet"}
              </p>
            </div>
            <Button
              className="w-full gap-2 bg-transparent"
              variant="outline"
              onClick={handleWithdraw}
              disabled={!isConnected || isWithdrawPending || !withdrawAmount}
            >
              {isWithdrawPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="w-4 h-4" />
                  Withdraw from Vault
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
