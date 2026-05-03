/**
 * YieldMind — Real on-chain data reader (Polygon Amoy)
 * Server-side ethers reader. No wallet required. Public RPC.
 *
 * Reads from already-deployed Wave 6 contracts and gracefully falls
 * back to safe defaults when a particular view function reverts (e.g.
 * a freshly deployed contract that hasn't been initialised yet).
 */

import { ethers } from "ethers"
import {
  CONTRACT_ADDRESSES,
  YIELD_VAULT_V4_ABI,
  YLD_TOKEN_ABI,
  YLD_STAKING_ABI,
  RISK_GUARD_ABI,
  AI_ORACLE_ABI,
  STRATEGY_MANAGER_ABI,
  INSURANCE_RESERVE_ABI,
  AUTONOMOUS_EXECUTOR_ABI,
  YIELD_MIND_GOVERNOR_ABI,
} from "./contract-abis"

export const AMOY = {
  chainId: 80002,
  name: "Polygon Amoy",
  rpcUrl: process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology",
  explorer: "https://amoy.polygonscan.com",
}

let _provider: ethers.JsonRpcProvider | null = null

export function getProvider() {
  if (!_provider) {
    _provider = new ethers.JsonRpcProvider(AMOY.rpcUrl, {
      chainId: AMOY.chainId,
      name: AMOY.name,
    })
  }
  return _provider
}

const ADDR = CONTRACT_ADDRESSES.AMOY

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch {
    return fallback
  }
}

/* ---------------------------------------------------------------- */
/*                              VAULT                                */
/* ---------------------------------------------------------------- */

export type VaultSnapshot = {
  totalAssets: string // human-readable (assumed 18 decimals)
  totalAssetsRaw: string
  yieldRateBps: number // basis points
  yieldRateApy: number // %
  blockNumber: number
  source: "onchain" | "rpc-error"
}

export async function readVault(): Promise<VaultSnapshot> {
  const provider = getProvider()
  const vault = new ethers.Contract(ADDR.YieldVaultV4, YIELD_VAULT_V4_ABI, provider)

  const [totalAssetsRaw, yieldRateRaw, blockNumber] = await Promise.all([
    safe(() => vault.getTotalAssets() as Promise<bigint>, 0n),
    safe(() => vault.getYieldRate() as Promise<bigint>, 0n),
    safe(() => provider.getBlockNumber(), 0),
  ])

  const yieldRateBps = Number(yieldRateRaw)
  return {
    totalAssetsRaw: totalAssetsRaw.toString(),
    totalAssets: ethers.formatUnits(totalAssetsRaw, 18),
    yieldRateBps,
    yieldRateApy: yieldRateBps / 100, // bps -> %
    blockNumber,
    source: blockNumber > 0 ? "onchain" : "rpc-error",
  }
}

/* ---------------------------------------------------------------- */
/*                              TOKEN                                */
/* ---------------------------------------------------------------- */

export type TokenSnapshot = {
  totalSupply: string
  totalSupplyRaw: string
  address: string
}

export async function readToken(): Promise<TokenSnapshot> {
  const provider = getProvider()
  const token = new ethers.Contract(ADDR.YLDToken, YLD_TOKEN_ABI, provider)
  const totalSupplyRaw = await safe(() => token.totalSupply() as Promise<bigint>, 0n)
  return {
    totalSupplyRaw: totalSupplyRaw.toString(),
    totalSupply: ethers.formatUnits(totalSupplyRaw, 18),
    address: ADDR.YLDToken,
  }
}

/* ---------------------------------------------------------------- */
/*                              RISK                                 */
/* ---------------------------------------------------------------- */

export type RiskSnapshot = {
  riskScore: number // 0-100
  insuranceReserve: string
  protectionActive: boolean
  reserveRatioBps: number
  reserveRatioPct: number
}

export async function readRisk(): Promise<RiskSnapshot> {
  const provider = getProvider()
  const risk = new ethers.Contract(ADDR.RiskGuard, RISK_GUARD_ABI, provider)
  const insurance = new ethers.Contract(ADDR.InsuranceReserve, INSURANCE_RESERVE_ABI, provider)

  const [scoreRaw, reserveRaw, isActive, reserveRatioRaw] = await Promise.all([
    safe(() => risk.getRiskScore() as Promise<bigint>, 0n),
    safe(() => insurance.getReserveBalance() as Promise<bigint>, 0n),
    safe(() => risk.isProtectionActive() as Promise<boolean>, false),
    safe(() => insurance.getReserveRatio() as Promise<bigint>, 0n),
  ])

  return {
    riskScore: Math.min(100, Number(scoreRaw)),
    insuranceReserve: ethers.formatUnits(reserveRaw, 18),
    protectionActive: isActive,
    reserveRatioBps: Number(reserveRatioRaw),
    reserveRatioPct: Number(reserveRatioRaw) / 100,
  }
}

/* ---------------------------------------------------------------- */
/*                            STRATEGIES                             */
/* ---------------------------------------------------------------- */

export type StrategySnapshot = {
  address: string
  performanceBps: number
  performancePct: number
}

export async function readStrategies(): Promise<StrategySnapshot[]> {
  const provider = getProvider()
  const sm = new ethers.Contract(ADDR.StrategyManager, STRATEGY_MANAGER_ABI, provider)
  const list = await safe(() => sm.getActiveStrategies() as Promise<string[]>, [])
  if (!list.length) return []
  const perfs = await Promise.all(
    list.map((addr) => safe(() => sm.getStrategyPerformance(addr) as Promise<bigint>, 0n)),
  )
  return list.map((address, i) => ({
    address,
    performanceBps: Number(perfs[i]),
    performancePct: Number(perfs[i]) / 100,
  }))
}

/* ---------------------------------------------------------------- */
/*                            AI ORACLE                              */
/* ---------------------------------------------------------------- */

export type ForecastSnapshot = {
  predictedAPY: number
  confidence: number
  oracle: string
}

export async function readForecast(): Promise<ForecastSnapshot> {
  const provider = getProvider()
  const oracle = new ethers.Contract(ADDR.AIOracle, AI_ORACLE_ABI, provider)
  const result = await safe(
    () => oracle.getLatestForecast() as Promise<[bigint, bigint]>,
    [0n, 0n] as [bigint, bigint],
  )
  return {
    predictedAPY: Number(result[0]) / 100,
    confidence: Number(result[1]) / 100,
    oracle: ADDR.AIOracle,
  }
}

/* ---------------------------------------------------------------- */
/*                            STAKING                                */
/* ---------------------------------------------------------------- */

export type StakingSnapshot = {
  staked: string
  rewards: string
  contract: string
}

export async function readStaking(account?: string): Promise<StakingSnapshot> {
  const provider = getProvider()
  const staking = new ethers.Contract(ADDR.YLDStaking, YLD_STAKING_ABI, provider)
  if (!account || !ethers.isAddress(account)) {
    return { staked: "0", rewards: "0", contract: ADDR.YLDStaking }
  }
  const [staked, rewards] = await Promise.all([
    safe(() => staking.getStakedAmount(account) as Promise<bigint>, 0n),
    safe(() => staking.getRewards(account) as Promise<bigint>, 0n),
  ])
  return {
    staked: ethers.formatUnits(staked, 18),
    rewards: ethers.formatUnits(rewards, 18),
    contract: ADDR.YLDStaking,
  }
}

/* ---------------------------------------------------------------- */
/*                          AUTONOMOUS                               */
/* ---------------------------------------------------------------- */

export type AutonomousSnapshot = {
  queued: number
  recent: { timestamp: number; action: string; success: boolean }[]
}

export async function readAutonomous(): Promise<AutonomousSnapshot> {
  const provider = getProvider()
  const exec = new ethers.Contract(ADDR.AutonomousExecutor, AUTONOMOUS_EXECUTOR_ABI, provider)
  const queued = await safe(() => exec.getQueuedExecutions() as Promise<bigint>, 0n)
  const history = await safe(
    () =>
      exec.getExecutionHistory() as Promise<
        { timestamp: bigint; action: string; success: boolean }[]
      >,
    [] as { timestamp: bigint; action: string; success: boolean }[],
  )
  return {
    queued: Number(queued),
    recent: history.slice(-8).map((h) => ({
      timestamp: Number(h.timestamp) * 1000,
      action: h.action,
      success: h.success,
    })),
  }
}

/* ---------------------------------------------------------------- */
/*                          GOVERNANCE                               */
/* ---------------------------------------------------------------- */

export type GovernanceProposal = {
  id: number
  description: string
  forVotes: string
  againstVotes: string
}

export async function readGovernance(): Promise<{
  count: number
  proposals: GovernanceProposal[]
  governor: string
}> {
  const provider = getProvider()
  const gov = new ethers.Contract(ADDR.YieldMindGovernor, YIELD_MIND_GOVERNOR_ABI, provider)
  const countRaw = await safe(() => gov.getProposalCount() as Promise<bigint>, 0n)
  const count = Number(countRaw)
  const ids = Array.from({ length: Math.min(count, 10) }, (_, i) => count - 1 - i).filter((i) => i >= 0)
  const proposals = await Promise.all(
    ids.map(async (id) => {
      const detail = await safe(
        () =>
          gov.getProposalDetails(id) as Promise<[string, bigint, bigint]>,
        ["", 0n, 0n] as [string, bigint, bigint],
      )
      return {
        id,
        description: detail[0],
        forVotes: ethers.formatUnits(detail[1], 18),
        againstVotes: ethers.formatUnits(detail[2], 18),
      }
    }),
  )
  return { count, proposals, governor: ADDR.YieldMindGovernor }
}

/* ---------------------------------------------------------------- */
/*                          USER POSITION                            */
/* ---------------------------------------------------------------- */

export async function readUserPosition(account: string) {
  if (!ethers.isAddress(account)) {
    return { yld: "0", staked: "0", rewards: "0" }
  }
  const provider = getProvider()
  const token = new ethers.Contract(ADDR.YLDToken, YLD_TOKEN_ABI, provider)
  const staking = new ethers.Contract(ADDR.YLDStaking, YLD_STAKING_ABI, provider)
  const [bal, staked, rewards] = await Promise.all([
    safe(() => token.balanceOf(account) as Promise<bigint>, 0n),
    safe(() => staking.getStakedAmount(account) as Promise<bigint>, 0n),
    safe(() => staking.getRewards(account) as Promise<bigint>, 0n),
  ])
  return {
    yld: ethers.formatUnits(bal, 18),
    staked: ethers.formatUnits(staked, 18),
    rewards: ethers.formatUnits(rewards, 18),
  }
}

/* ---------------------------------------------------------------- */
/*                       AGGREGATED SNAPSHOT                         */
/* ---------------------------------------------------------------- */

export type ProtocolSnapshot = {
  network: { chainId: number; name: string; explorer: string; rpc: string; blockNumber: number }
  vault: VaultSnapshot
  token: TokenSnapshot
  risk: RiskSnapshot
  strategies: StrategySnapshot[]
  forecast: ForecastSnapshot
  autonomous: AutonomousSnapshot
  governance: { count: number; proposals: GovernanceProposal[]; governor: string }
  contracts: typeof CONTRACT_ADDRESSES.AMOY
  fetchedAt: number
}

export async function readProtocolSnapshot(): Promise<ProtocolSnapshot> {
  const [vault, token, risk, strategies, forecast, autonomous, governance] = await Promise.all([
    readVault(),
    readToken(),
    readRisk(),
    readStrategies(),
    readForecast(),
    readAutonomous(),
    readGovernance(),
  ])
  return {
    network: {
      chainId: AMOY.chainId,
      name: AMOY.name,
      explorer: AMOY.explorer,
      rpc: AMOY.rpcUrl,
      blockNumber: vault.blockNumber,
    },
    vault,
    token,
    risk,
    strategies,
    forecast,
    autonomous,
    governance,
    contracts: ADDR,
    fetchedAt: Date.now(),
  }
}
