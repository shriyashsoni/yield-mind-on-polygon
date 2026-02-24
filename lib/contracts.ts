import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const CONTRACTS = {
  polygon: {
    vault: ZERO_ADDRESS,
    oracle: ZERO_ADDRESS,
    riskGuard: ZERO_ADDRESS,
    strategyManager: ZERO_ADDRESS,
    token: ZERO_ADDRESS,
    usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  },
  polygonAmoy: {
    vault: CONTRACT_ADDRESSES.AMOY.YieldVaultV4,
    oracle: CONTRACT_ADDRESSES.AMOY.AIOracle,
    riskGuard: CONTRACT_ADDRESSES.AMOY.RiskGuard,
    strategyManager: CONTRACT_ADDRESSES.AMOY.StrategyManager,
    token: CONTRACT_ADDRESSES.AMOY.YLDToken,
    usdc: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
  },
} as const

export const isDeployedAddress = (address: string) => address.toLowerCase() !== ZERO_ADDRESS

export const VAULT_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "deposit",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "redeem",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "withdraw",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "convertToAssets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rebalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "twapPrice", type: "uint256" },
      { internalType: "uint256", name: "spotPrice", type: "uint256" },
    ],
    name: "rebalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastRebalanceAt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const

export const ERC20_ABI = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const

export const RISK_GUARD_ABI = [
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "canRebalance",
    outputs: [
      { internalType: "bool", name: "allowed", type: "bool" },
      { internalType: "string", name: "reason", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseCircuitBreaker",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpauseCircuitBreaker",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const

export const STRATEGY_MANAGER_ABI = [
  {
    inputs: [],
    name: "getStrategies",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "strategies",
    outputs: [
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "bool", name: "active", type: "bool" },
      { internalType: "bool", name: "daoApproved", type: "bool" },
      { internalType: "uint16", name: "weightBps", type: "uint16" },
      { internalType: "uint16", name: "riskScore", type: "uint16" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const

export const VAULT_ADDRESS = CONTRACTS.polygonAmoy.vault as `0x${string}`
export const ORACLE_ADDRESS = CONTRACTS.polygonAmoy.oracle as `0x${string}`
export const USDC_ADDRESS = CONTRACTS.polygonAmoy.usdc as `0x${string}`
export const TOKEN_ADDRESS = CONTRACTS.polygonAmoy.token as `0x${string}`
