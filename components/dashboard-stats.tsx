"use client"

import { TrendingUp, Wallet, Percent, Activity } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { useVaultData } from "@/hooks/use-vault-data"
import { useStrategyData } from "@/hooks/use-strategy-data"
import { useUserActivity } from "@/hooks/use-user-activity"
import { formatUSD, formatPercentage } from "@/lib/utils"
import { useWeb3 } from "@/lib/web3-context"
import { getVaultProductAddress, isDeployedAddress } from "@/lib/contracts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

export function DashboardStats() {
  const { address, chainId } = useWeb3()
  const { totalValueLocked, userBalance, isLoading: vaultLoading } = useVaultData()
  const { weightedAPY, isLoading: strategyLoading } = useStrategyData()
  const { activities } = useUserActivity()

  const isLoading = vaultLoading || strategyLoading

  const vaultGroups = [
    { key: "low", label: "Conservative Vault" },
    { key: "medium", label: "Balanced Vault" },
    { key: "high", label: "Aggressive Vault" },
  ] as const

  const toAmount = (value: string) => Number.parseFloat(value) || 0

  const vaultMetrics = vaultGroups.map((group) => {
    const vaultAddress = getVaultProductAddress(chainId, group.key)
    const byAddress = activities.filter((item) => item.vaultAddress?.toLowerCase() === vaultAddress.toLowerCase())
    const byName = activities.filter((item) => item.vaultName === group.label)
    const merged = byName.length > byAddress.length ? byName : byAddress

    const deposited = merged.filter((item) => item.type === "deposit").reduce((sum, item) => sum + toAmount(item.amount), 0)
    const withdrawn = merged.filter((item) => item.type === "withdraw").reduce((sum, item) => sum + toAmount(item.amount), 0)

    return {
      ...group,
      vaultAddress,
      txCount: merged.length,
      deposited,
      withdrawn,
      netFlow: deposited - withdrawn,
    }
  })

  const dayKeys = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - (6 - index))
    return date
  })

  const trendData = dayKeys.map((date) => {
    const dayStart = date.getTime()
    const dayEnd = dayStart + 24 * 60 * 60 * 1000

    const point = {
      day: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      low: 0,
      medium: 0,
      high: 0,
    }

    vaultGroups.forEach((group) => {
      const vaultAddress = getVaultProductAddress(chainId, group.key)
      const dayActivity = activities.filter((item) => {
        if (item.timestamp < dayStart || item.timestamp >= dayEnd) return false
        const addressMatch = item.vaultAddress?.toLowerCase() === vaultAddress.toLowerCase()
        const nameMatch = item.vaultName === group.label
        return addressMatch || nameMatch
      })

      const netFlow = dayActivity.reduce((sum, item) => {
        const value = toAmount(item.amount)
        return item.type === "deposit" ? sum + value : sum - value
      }, 0)

      point[group.key] = netFlow
    })

    return point
  })

  const trendTotals = trendData.reduce(
    (acc, day) => {
      acc.low += day.low
      acc.medium += day.medium
      acc.high += day.high
      return acc
    },
    { low: 0, medium: 0, high: 0 }
  )

  const formatFlow = (value: number) => `${value >= 0 ? "+" : ""}${value.toLocaleString(undefined, { maximumFractionDigits: 4 })}`

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Value Locked"
          value={formatUSD(Number(totalValueLocked))}
          change="+12.5% from last month"
          changeType="positive"
          icon={TrendingUp}
          isLoading={isLoading}
        />
        <StatsCard
          title="Your Balance"
          value={address ? formatUSD(Number(userBalance)) : "$0.00"}
          change="+8.2% this week"
          changeType="positive"
          icon={Wallet}
          isLoading={isLoading}
        />
        <StatsCard
          title="Current APY"
          value={formatPercentage(weightedAPY)}
          change="+2.3% from rebalance"
          changeType="positive"
          icon={Percent}
          isLoading={isLoading}
        />
        <StatsCard
          title="Active Strategies"
          value="4"
          change="Optimized 2m ago"
          changeType="neutral"
          icon={Activity}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {vaultMetrics.map((vault) => (
          <Card key={vault.key}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{vault.label}</CardTitle>
                <Badge variant={isDeployedAddress(vault.vaultAddress) ? "default" : "secondary"}>
                  {isDeployedAddress(vault.vaultAddress) ? "Active" : "Not Deployed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground font-mono break-all">{vault.vaultAddress}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Transactions</p>
                  <p className="font-semibold">{vault.txCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Net Flow</p>
                  <p className={`font-semibold ${vault.netFlow >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {vault.netFlow >= 0 ? "+" : ""}
                    {vault.netFlow.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deposited</p>
                  <p className="font-medium">{vault.deposited.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Withdrawn</p>
                  <p className="font-medium">{vault.withdrawn.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">7-Day Net Flow Trend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs text-[hsl(var(--chart-1))] border-[hsl(var(--chart-1))]/40">
              Conservative: {formatFlow(trendTotals.low)}
            </Badge>
            <Badge variant="outline" className="text-xs text-[hsl(var(--chart-2))] border-[hsl(var(--chart-2))]/40">
              Balanced: {formatFlow(trendTotals.medium)}
            </Badge>
            <Badge variant="outline" className="text-xs text-[hsl(var(--chart-3))] border-[hsl(var(--chart-3))]/40">
              Aggressive: {formatFlow(trendTotals.high)}
            </Badge>
          </div>
          <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis dataKey="day" className="text-xs" tickLine={false} axisLine={false} />
              <YAxis className="text-xs" tickLine={false} axisLine={false} />
              <Tooltip formatter={(value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 4 })} />
              <Line type="monotone" dataKey="low" name="Conservative" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              <Line
                type="monotone"
                dataKey="medium"
                name="Balanced"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="high"
                name="Aggressive"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
