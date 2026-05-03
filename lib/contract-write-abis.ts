// Lightweight, write-only ABIs for the dashboard contract panels.
// These complement the read-focused ABIs in `lib/contract-abis.ts`.

export const YLD_TOKEN_WRITE_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
] as const

export const YLD_STAKING_WRITE_ABI = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function claim()",
  "function claimRewards()",
  "function getStakedAmount(address) view returns (uint256)",
  "function getRewards(address) view returns (uint256)",
  "function totalStaked() view returns (uint256)",
] as const

export const YIELD_VAULT_WRITE_ABI = [
  "function deposit(uint256 amount, address receiver) returns (uint256)",
  "function withdraw(uint256 assets, address receiver, address owner) returns (uint256)",
  "function redeem(uint256 shares, address receiver, address owner) returns (uint256)",
  "function rebalance()",
  "function rebalance(uint256 twapPrice, uint256 spotPrice)",
  "function asset() view returns (address)",
  "function balanceOf(address) view returns (uint256)",
  "function totalAssets() view returns (uint256)",
  "function convertToAssets(uint256 shares) view returns (uint256)",
  "function lastRebalanceAt() view returns (uint256)",
] as const

export const AI_ORACLE_WRITE_ABI = [
  "function updateForecast()",
  "function getLatestForecast() view returns (uint256 predictedAPY, uint256 confidence)",
] as const

export const RISK_GUARD_WRITE_ABI = [
  "function setRiskThreshold(uint256 threshold)",
  "function pauseCircuitBreaker()",
  "function unpauseCircuitBreaker()",
  "function getRiskScore() view returns (uint256)",
  "function isProtectionActive() view returns (bool)",
] as const

export const GOVERNOR_WRITE_ABI = [
  "function castVote(uint256 proposalId, uint8 support) returns (uint256)",
  "function castVoteWithReason(uint256 proposalId, uint8 support, string reason) returns (uint256)",
  "function getProposalCount() view returns (uint256)",
  "function getProposalDetails(uint256) view returns (string, uint256, uint256)",
] as const

export const AUTONOMOUS_EXECUTOR_WRITE_ABI = [
  "function getQueuedExecutions() view returns (uint256)",
  "function getExecutionHistory() view returns (tuple(uint256 timestamp, string action, bool success)[])",
  "function executeNext()",
] as const
