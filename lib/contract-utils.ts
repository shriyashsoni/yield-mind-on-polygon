import { CONTRACT_ADDRESSES } from './contract-abis';

export interface ContractConfig {
  name: string;
  address: string;
  description: string;
  type: 'Token' | 'Vault' | 'Risk' | 'Strategy' | 'Oracle' | 'Insurance' | 'Governance' | 'Staking' | 'Executor';
  isDeployed: boolean;
  deployedAt: string;
  explorerUrl: string;
}

export const DEPLOYED_CONTRACTS: ContractConfig[] = [
  {
    name: 'YLD Token',
    address: CONTRACT_ADDRESSES.AMOY.YLDToken,
    description: 'YieldMind governance and utility token',
    type: 'Token',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.YLDToken}#code`,
  },
  {
    name: 'YieldVault V4',
    address: CONTRACT_ADDRESSES.AMOY.YieldVaultV4,
    description: 'Core yield vault with portfolio management',
    type: 'Vault',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.YieldVaultV4}#code`,
  },
  {
    name: 'Risk Guard',
    address: CONTRACT_ADDRESSES.AMOY.RiskGuard,
    description: 'Risk management and insurance module',
    type: 'Risk',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.RiskGuard}#code`,
  },
  {
    name: 'Strategy Manager',
    address: CONTRACT_ADDRESSES.AMOY.StrategyManager,
    description: 'Manages yield strategies and execution',
    type: 'Strategy',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.StrategyManager}#code`,
  },
  {
    name: 'AI Oracle',
    address: CONTRACT_ADDRESSES.AMOY.AIOracle,
    description: 'AI-powered price and forecast oracle',
    type: 'Oracle',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.AIOracle}#code`,
  },
  {
    name: 'Insurance Reserve',
    address: CONTRACT_ADDRESSES.AMOY.InsuranceReserve,
    description: 'Insurance reserve and protection pool',
    type: 'Insurance',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.InsuranceReserve}#code`,
  },
  {
    name: 'YieldMind Governor',
    address: CONTRACT_ADDRESSES.AMOY.YieldMindGovernor,
    description: 'Governance and DAO voting contract',
    type: 'Governance',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.YieldMindGovernor}#code`,
  },
  {
    name: 'YLD Staking',
    address: CONTRACT_ADDRESSES.AMOY.YLDStaking,
    description: 'Staking rewards and governance participation',
    type: 'Staking',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.YLDStaking}#code`,
  },
  {
    name: 'Timelock Controller',
    address: CONTRACT_ADDRESSES.AMOY.TimelockController,
    description: 'Time-locked execution for governance',
    type: 'Governance',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.TimelockController}#code`,
  },
  {
    name: 'Autonomous Executor',
    address: CONTRACT_ADDRESSES.AMOY.AutonomousExecutor,
    description: 'Autonomous execution and rebalancing',
    type: 'Executor',
    isDeployed: true,
    deployedAt: '2024',
    explorerUrl: `https://amoy.polygonscan.com/address/${CONTRACT_ADDRESSES.AMOY.AutonomousExecutor}#code`,
  },
];

export const getContractsByType = (type: ContractConfig['type']): ContractConfig[] => {
  return DEPLOYED_CONTRACTS.filter((contract) => contract.type === type);
};

export const getDeployedContracts = (): ContractConfig[] => {
  return DEPLOYED_CONTRACTS.filter((contract) => contract.isDeployed);
};

export const getPendingContracts = (): ContractConfig[] => {
  return DEPLOYED_CONTRACTS.filter((contract) => !contract.isDeployed);
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getChainId = (): number => {
  return 80002; // Polygon Amoy Testnet
};

export const getChainName = (): string => {
  return 'Polygon Amoy';
};
