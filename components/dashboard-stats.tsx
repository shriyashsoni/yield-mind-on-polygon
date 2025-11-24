"use client"

import { TrendingUp, Wallet, Percent, Activity, Shield, Zap } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { useVaultData } from "@/hooks/use-vault-data"
import { useStrategyData } from "@/hooks/use-strategy-data"
import { formatUSD, formatPercentage } from "@/lib/utils"
import { useWeb3 } from "@/lib/web3-context"

export function DashboardStats() {
  const { address } = useWeb3()
  const { totalValueLocked, userBalance, isLoading: vaultLoading } = useVaultData()
  const { weightedAPY, isLoading: strategyLoading } = useStrategyData()

  const isLoading = vaultLoading || strategyLoading

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
      <StatsCard
        title="Risk Score"
        value="32/100"
        change="Low risk portfolio"
        changeType="positive"
        icon={Shield}
        isLoading={isLoading}
      />
      <StatsCard
        title="Auto-Rebalance"
        value="12"
        change="Executions this month"
        changeType="neutral"
        icon={Zap}
        isLoading={isLoading}
      />
    </div>
  )
}
