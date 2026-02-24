import { defineChain } from "viem"

export const polygonZkEvm = defineChain({
  id: 1101,
  name: "Polygon zkEVM",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_ZKEVM_RPC_URL || "https://zkevm-rpc.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Polygon zkEVM Explorer",
      url: "https://zkevm.polygonscan.com",
    },
  },
})

export const CONTRACTS_ZKEVM = {
  vault: process.env.NEXT_PUBLIC_VAULT_ADDRESS as `0x${string}`,
  aiOracle: process.env.NEXT_PUBLIC_AI_ORACLE_ADDRESS as `0x${string}`,
  riskGuard: process.env.NEXT_PUBLIC_RISK_GUARD_ADDRESS as `0x${string}`,
  governor: process.env.NEXT_PUBLIC_GOVERNOR_ADDRESS as `0x${string}`,
  autonomousExecutor: process.env.NEXT_PUBLIC_AUTONOMOUS_EXECUTOR_ADDRESS as `0x${string}`,
  insuranceReserve: process.env.NEXT_PUBLIC_INSURANCE_RESERVE_ADDRESS as `0x${string}`,
  usdc: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
}

export const VAULT_READ_ABI = [
  {
    type: "function",
    name: "totalAssets",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "getYieldRate",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "asset",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
] as const

export const VAULT_WRITE_ABI = [
  {
    type: "function",
    name: "deposit",
    stateMutability: "nonpayable",
    inputs: [{ type: "uint256", name: "amount" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "withdraw",
    stateMutability: "nonpayable",
    inputs: [{ type: "uint256", name: "shares" }],
    outputs: [{ type: "uint256" }],
  },
] as const

export const ERC20_ABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "spender" },
      { type: "uint256", name: "value" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
] as const

export const GOVERNOR_ABI = [
  {
    type: "function",
    name: "castVote",
    stateMutability: "nonpayable",
    inputs: [
      { type: "uint256", name: "proposalId" },
      { type: "uint8", name: "support" },
    ],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "proposalVotes",
    stateMutability: "view",
    inputs: [{ type: "uint256", name: "proposalId" }],
    outputs: [
      { type: "uint256", name: "againstVotes" },
      { type: "uint256", name: "forVotes" },
      { type: "uint256", name: "abstainVotes" },
    ],
  },
] as const

export const EVENT_ABI = [
  {
    type: "event",
    name: "Deposit",
    inputs: [
      { indexed: true, type: "address", name: "user" },
      { indexed: false, type: "uint256", name: "amount" },
    ],
  },
  {
    type: "event",
    name: "Withdraw",
    inputs: [
      { indexed: true, type: "address", name: "user" },
      { indexed: false, type: "uint256", name: "amount" },
    ],
  },
  {
    type: "event",
    name: "Rebalance",
    inputs: [
      { indexed: false, type: "uint256", name: "timestamp" },
      { indexed: false, type: "uint256", name: "totalAssets" },
    ],
  },
] as const
