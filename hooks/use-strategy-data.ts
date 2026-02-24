"use client"

import { useWeb3 } from "@/lib/web3-context"
import { useQuery } from "@tanstack/react-query"
import { CONTRACTS, STRATEGY_MANAGER_ABI, isDeployedAddress } from "@/lib/contracts"
import { DEMO_STRATEGIES } from "@/lib/demo-data"
import { ethers } from "ethers"

export interface Strategy {
  address: string
  name: string
  protocol: string
  allocation: number
  apy: number
  tvl: string
  risk: "Low" | "Medium" | "High"
}

export function useStrategyData() {
  const { provider, chainId } = useWeb3()

  const networkKey = chainId === 137 ? "polygon" : "polygonAmoy"
  const strategyManagerAddress = CONTRACTS[networkKey].strategyManager

  const { data, isLoading } = useQuery({
    queryKey: ["strategies", chainId],
    queryFn: async () => {
      if (!provider) return null

      if (!isDeployedAddress(strategyManagerAddress)) {
        return null
      }

      const strategyManagerContract = new ethers.Contract(strategyManagerAddress, STRATEGY_MANAGER_ABI, provider)

      try {
        const strategyAddresses = (await strategyManagerContract.getStrategies()) as string[]
        const strategies: Strategy[] = []

        for (const strategyAddress of strategyAddresses) {
          const strategyData = await strategyManagerContract.strategies(strategyAddress)
          const allocation = Number(strategyData.weightBps) / 100

          if (!strategyData.active) {
            continue
          }

          strategies.push({
            address: strategyAddress,
            name: getStrategyName(strategyAddress),
            protocol: getProtocolName(strategyAddress),
            allocation,
            apy: calculateAPY(strategyAddress),
            tvl: "0",
            risk: getRiskLevel(strategyAddress),
          })
        }

        return strategies
      } catch (error) {
        console.log("[v0] Strategy data error, using demo data")
        return null
      }
    },
    enabled: !!provider,
    refetchInterval: 15000,
  })

  const useDemoData = !data || data.length === 0
  const strategies = useDemoData ? DEMO_STRATEGIES : data

  const weightedAPY =
    strategies.reduce((acc, strategy) => {
      return acc + (strategy.apy * strategy.allocation) / 100
    }, 0) || 0

  return {
    strategies,
    weightedAPY,
    isLoading,
    isDemoMode: useDemoData,
  }
}

function getStrategyName(address: string): string {
  const names: Record<string, string> = {
    "0x1234": "Balancer Weighted Pool",
    "0x5678": "Aave Lending",
    "0x9abc": "QuickSwap LP",
    "0xdef0": "Curve Stable Pool",
  }
  return names[address] || "Unknown Strategy"
}

function calculateAPY(address: string): number {
  const apys: Record<string, number> = {
    "0x1234": 22.5,
    "0x5678": 15.2,
    "0x9abc": 18.7,
    "0xdef0": 12.3,
  }
  return apys[address] || 0
}

function getProtocolName(address: string): string {
  const protocols: Record<string, string> = {
    "0x1234": "Balancer",
    "0x5678": "Aave",
    "0x9abc": "QuickSwap",
    "0xdef0": "Curve",
  }
  return protocols[address] || "Unknown Protocol"
}

function getRiskLevel(address: string): "Low" | "Medium" | "High" {
  const risks: Record<string, "Low" | "Medium" | "High"> = {
    "0x1234": "Medium",
    "0x5678": "High",
    "0x9abc": "Low",
    "0xdef0": "Medium",
  }
  return risks[address] || "Unknown Risk"
}
