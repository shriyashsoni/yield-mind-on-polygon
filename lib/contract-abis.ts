// YieldMind Wave 6 Smart Contract ABIs
// Amoy Testnet Deployment

export const CONTRACT_ADDRESSES = {
  AMOY: {
    YLDToken: '0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c',
    YieldVaultV4: '0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3',
    RiskGuard: '0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A',
    // Additional contracts to be added
    StrategyManager: '0x0000000000000000000000000000000000000000',
    AIOracle: '0x0000000000000000000000000000000000000000',
    InsuranceReserve: '0x0000000000000000000000000000000000000000',
    YieldMindGovernor: '0x0000000000000000000000000000000000000000',
    YLDStaking: '0x0000000000000000000000000000000000000000',
    TimelockController: '0x0000000000000000000000000000000000000000',
    AutonomousExecutor: '0x0000000000000000000000000000000000000000',
  },
};

export const YLD_TOKEN_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const YIELD_VAULT_V4_ABI = [
  {
    inputs: [],
    name: 'getTotalAssets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getYieldRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'deposit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    name: 'withdraw',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rebalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const RISK_GUARD_ABI = [
  {
    inputs: [],
    name: 'getRiskScore',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getInsuranceReserve',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isProtectionActive',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'threshold', type: 'uint256' }],
    name: 'setRiskThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const STRATEGY_MANAGER_ABI = [
  {
    inputs: [],
    name: 'getActiveStrategies',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'strategy', type: 'address' }],
    name: 'getStrategyPerformance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const AI_ORACLE_ABI = [
  {
    inputs: [],
    name: 'getLatestForecast',
    outputs: [
      { internalType: 'uint256', name: 'predictedAPY', type: 'uint256' },
      { internalType: 'uint256', name: 'confidence', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'updateForecast',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const INSURANCE_RESERVE_ABI = [
  {
    inputs: [],
    name: 'getReserveBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getReserveRatio',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const YLD_STAKING_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getStakedAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getRewards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const AUTONOMOUS_EXECUTOR_ABI = [
  {
    inputs: [],
    name: 'getQueuedExecutions',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getExecutionHistory',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
          { internalType: 'string', name: 'action', type: 'string' },
          { internalType: 'bool', name: 'success', type: 'bool' },
        ],
        internalType: 'struct AutonomousExecutor.ExecutionRecord[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const YIELD_MIND_GOVERNOR_ABI = [
  {
    inputs: [],
    name: 'getProposalCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
    name: 'getProposalDetails',
    outputs: [
      { internalType: 'string', name: 'description', type: 'string' },
      { internalType: 'uint256', name: 'forVotes', type: 'uint256' },
      { internalType: 'uint256', name: 'againstVotes', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
