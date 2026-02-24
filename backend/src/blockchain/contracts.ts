import { env } from "../config/env.js"

export const contracts = {
  vault: env.VAULT_ADDRESS as `0x${string}`,
  aiOracle: env.AI_ORACLE_ADDRESS as `0x${string}`,
  governor: env.GOVERNOR_ADDRESS as `0x${string}`,
  riskGuard: env.RISK_GUARD_ADDRESS as `0x${string}`,
  autonomousExecutor: env.AUTONOMOUS_EXECUTOR_ADDRESS as `0x${string}`,
}

export const VAULT_EVENTS_ABI = [
  {
    type: "event",
    name: "Deposit",
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "assets", type: "uint256" },
      { indexed: false, name: "shares", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "Withdraw",
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "assets", type: "uint256" },
      { indexed: false, name: "shares", type: "uint256" },
    ],
  },
  {
    type: "event",
    name: "Rebalance",
    inputs: [
      { indexed: false, name: "timestamp", type: "uint256" },
      { indexed: false, name: "totalAssets", type: "uint256" },
    ],
  },
] as const

export const GOVERNOR_EVENTS_ABI = [
  {
    type: "event",
    name: "ProposalCreated",
    inputs: [
      { indexed: true, name: "proposalId", type: "uint256" },
      { indexed: true, name: "proposer", type: "address" },
      { indexed: false, name: "description", type: "string" },
    ],
  },
  {
    type: "event",
    name: "VoteCast",
    inputs: [
      { indexed: true, name: "voter", type: "address" },
      { indexed: true, name: "proposalId", type: "uint256" },
      { indexed: false, name: "support", type: "uint8" },
      { indexed: false, name: "weight", type: "uint256" },
      { indexed: false, name: "reason", type: "string" },
    ],
  },
] as const

export const AI_ORACLE_ABI = [
  {
    type: "function",
    name: "submitRecommendation",
    stateMutability: "nonpayable",
    inputs: [
      { name: "payloadHash", type: "bytes32" },
      { name: "signature", type: "bytes" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [],
  },
] as const
