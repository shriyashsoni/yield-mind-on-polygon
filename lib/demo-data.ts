// Demo data for showcasing YieldMind platform capabilities

export const DEMO_VAULT_DATA = {
  totalValueLocked: "12547832.50", // $12.5M TVL
  userBalance: "25000.00", // $25k user balance
  userShares: "24850.00",
  currentAPY: 18.4, // 18.4% APY
  usdcBalance: "5000.00", // $5k available USDC
}

export const DEMO_STRATEGIES = [
  {
    name: "Balancer USDC-WMATIC",
    protocol: "Balancer",
    allocation: 35,
    apy: 22.5,
    tvl: "4,391,641.38",
    risk: "Medium" as const,
  },
  {
    name: "Aave USDC Lending",
    protocol: "Aave",
    allocation: 30,
    apy: 15.8,
    tvl: "3,764,349.75",
    risk: "Low" as const,
  },
  {
    name: "QuickSwap USDC-USDT",
    protocol: "QuickSwap",
    allocation: 25,
    apy: 18.2,
    tvl: "3,136,958.13",
    risk: "Medium" as const,
  },
  {
    name: "Curve 3Pool",
    protocol: "Curve",
    allocation: 10,
    apy: 12.4,
    tvl: "1,254,783.25",
    risk: "Low" as const,
  },
]

export const DEMO_ML_RECOMMENDATION = {
  action: "rebalance" as const,
  confidence: 87,
  estimatedGain: 2.3,
  reasoning: [
    "Balancer pool APY increased by 4.2% in the last 24 hours",
    "Gas costs are 35% lower than average, optimal for rebalancing",
    "Aave utilization rate suggests stable returns for next 7 days",
    "Market volatility decreased, favorable for position adjustments",
  ],
  suggestedAllocations: [
    { strategy: "Balancer USDC-WMATIC", current: 35, suggested: 40 },
    { strategy: "Aave USDC Lending", current: 30, suggested: 28 },
    { strategy: "QuickSwap USDC-USDT", current: 25, suggested: 22 },
    { strategy: "Curve 3Pool", current: 10, suggested: 10 },
  ],
  timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
}

export const DEMO_TRANSACTIONS = [
  {
    type: "rebalance" as const,
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    status: "success" as const,
    hash: "0x1234...5678",
  },
  {
    type: "deposit" as const,
    amount: "5000",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    status: "success" as const,
    hash: "0xabcd...efgh",
  },
  {
    type: "withdraw" as const,
    amount: "2500",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "success" as const,
    hash: "0x9876...5432",
  },
  {
    type: "deposit" as const,
    amount: "10000",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "success" as const,
    hash: "0xfedc...ba98",
  },
  {
    type: "rebalance" as const,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "success" as const,
    hash: "0x1111...2222",
  },
]

export const DEMO_PERFORMANCE_DATA = [
  { date: "Jan 1", value: 20000, apy: 15.2, gas: 12 },
  { date: "Jan 8", value: 21200, apy: 16.1, gas: 15 },
  { date: "Jan 15", value: 22100, apy: 17.3, gas: 11 },
  { date: "Jan 22", value: 23400, apy: 18.8, gas: 14 },
  { date: "Jan 29", value: 24200, apy: 17.9, gas: 13 },
  { date: "Feb 5", value: 24800, apy: 18.4, gas: 10 },
  { date: "Feb 12", value: 25000, apy: 18.4, gas: 9 },
]
