// YieldMind — Polygon Amoy Testnet Contract ABIs
// All ABIs verified against deployed bytecode via on-chain selector probing.

export const CONTRACT_ADDRESSES = {
  AMOY: {
    YLDToken:           '0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c',
    YLDStaking:         '0x48Bd564c86e379D08D5b536c766b65b966548Ab1',
    TimelockController: '0xc41CCBba49b84BB3E5CCb13020f2D41A0FC2786D',
    YieldMindGovernor:  '0x78bf048E450Ec94cB055C8ab180CA27c912e975e',
    InsuranceReserve:   '0x9D980e7418f692916Bc7f3A47A96074702F7B5f6',
    StrategyManager:    '0x82fc23020f1cf58EA47d4a0dDDc2F8C42BE65705',
    YieldVaultV4:       '0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3',
    AIOracle:           '0xFB5f412475b70Ef756E32a946731F2426c284522',
    RiskGuard:          '0x1C304fe6Dd1c7797c09EE39c12387eF63eB1f664',
    AutonomousExecutor: '0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A',
  },
};

// ─── YLDToken (ERC-20) ────────────────────────────────────────────────────────
// Symbol: YLD  |  Decimals: 18
// faucet() is a public function — any address can call it to receive test YLD.
export const YLD_TOKEN_ABI = [
  { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'approve', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'address', name: 'owner', type: 'address' }, { internalType: 'address', name: 'spender', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  // Public testnet faucet — anyone can call to receive free YLD on Amoy
  { inputs: [], name: 'faucet', outputs: [], stateMutability: 'nonpayable', type: 'function' },
] as const;

// ─── YieldVaultV4 (ERC-4626) ──────────────────────────────────────────────────
// Underlying asset: YLDToken (0x030e4Dfc...)
// deposit(uint256 assets, address receiver) → shares
// redeem(uint256 shares, address receiver, address owner) → assets
// totalAssets() → uint256 (verified: returns 10,000,000 YLD)
export const YIELD_VAULT_V4_ABI = [
  // ERC-4626 reads
  { inputs: [], name: 'asset', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalAssets', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }], name: 'previewDeposit', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }], name: 'previewRedeem', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  // ERC-4626 writes
  { inputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }, { internalType: 'address', name: 'receiver', type: 'address' }], name: 'deposit', outputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }, { internalType: 'address', name: 'receiver', type: 'address' }, { internalType: 'address', name: 'owner', type: 'address' }], name: 'redeem', outputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function' },
  // Custom
  { inputs: [], name: 'rebalance', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'lastRebalanceAt', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const;

// ─── YLDStaking ───────────────────────────────────────────────────────────────
// Verified selectors: totalStaked(), pendingRewards(address), claim()
// stake(uint256) and unstake(uint256) exist (revert without YLD approval)
export const YLD_STAKING_ABI = [
  { inputs: [], name: 'totalStaked', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'pendingRewards', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'stake', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'unstake', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'claim', outputs: [], stateMutability: 'nonpayable', type: 'function' },
] as const;

// ─── Remaining ABIs ───────────────────────────────────────────────────────────
export const RISK_GUARD_ABI = [
  { inputs: [], name: 'getRiskScore', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getInsuranceReserve', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'isProtectionActive', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
] as const;

export const STRATEGY_MANAGER_ABI = [
  { inputs: [], name: 'getActiveStrategies', outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'address', name: 'strategy', type: 'address' }], name: 'getStrategyPerformance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const;

export const AI_ORACLE_ABI = [
  { inputs: [], name: 'getLatestForecast', outputs: [{ internalType: 'uint256', name: 'predictedAPY', type: 'uint256' }, { internalType: 'uint256', name: 'confidence', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'updateForecast', outputs: [], stateMutability: 'nonpayable', type: 'function' },
] as const;

export const INSURANCE_RESERVE_ABI = [
  { inputs: [], name: 'getReserveBalance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getReserveRatio', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const;

export const AUTONOMOUS_EXECUTOR_ABI = [
  { inputs: [], name: 'getQueuedExecutions', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const;

export const YIELD_MIND_GOVERNOR_ABI = [
  { inputs: [], name: 'getProposalCount', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }], name: 'getProposalDetails', outputs: [{ internalType: 'string', name: 'description', type: 'string' }, { internalType: 'uint256', name: 'forVotes', type: 'uint256' }, { internalType: 'uint256', name: 'againstVotes', type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const;
