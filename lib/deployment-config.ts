// YieldMind Wave 6 Deployment Configuration
// Smart Contract Deployment and Integration Guide

export const DEPLOYMENT_CONFIG = {
  network: {
    name: 'Polygon Amoy',
    chainId: 80002,
    rpcUrl: 'https://rpc-amoy.polygon.technology/',
    explorerUrl: 'https://amoy.polygonscan.com',
  },
  
  deploymentOrder: [
    'YLDToken',
    'TimelockController',
    'YieldMindGovernor',
    'InsuranceReserve',
    'StrategyManager',
    'YieldVaultV4',
    'AIOracle',
    'RiskGuard',
    'YLDStaking',
    'AutonomousExecutor',
  ],

  contracts: {
    YLDToken: {
      name: 'YLD Token',
      description: 'ERC20 governance token for YieldMind',
      address: '0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c',
    },
    YieldVaultV4: {
      name: 'YieldVault V4',
      description: 'Core vault contract with portfolio management',
      address: '0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3',
    },
    RiskGuard: {
      name: 'RiskGuard',
      description: 'Risk management and protection module',
      address: '0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A',
    },
    StrategyManager: {
      name: 'Strategy Manager',
      description: 'Manages yield strategies and execution',
      address: '0x0000000000000000000000000000000000000000',
      deployed: false,
    },
    AIOracle: {
      name: 'AI Oracle',
      description: 'AI-powered price forecasting oracle',
      address: '0x0000000000000000000000000000000000000000',
      deployed: false,
    },
    InsuranceReserve: {
      name: 'Insurance Reserve',
      description: 'Insurance reserve and protection pool',
      address: '0x0000000000000000000000000000000000000000',
      deployed: false,
    },
    YieldMindGovernor: {
      name: 'YieldMind Governor',
      description: 'DAO governance and voting',
      address: '0x0000000000000000000000000000000000000000',
      deployed: false,
    },
    YLDStaking: {
      name: 'YLD Staking',
      description: 'Staking contract for governance participation',
      address: '0x0000000000000000000000000000000000000000',
      deployed: false,
    },
    TimelockController: {
      name: 'Timelock Controller',
      description: 'Time-locked execution for governance',
      address: '0x0000000000000000000000000000000000000000',
      deployed: false,
    },
    AutonomousExecutor: {
      name: 'Autonomous Executor',
      description: 'Autonomous execution and rebalancing',
      address: '0x0000000000000000000000000000000000000000',
      deployed: false,
    },
  },

  deploymentInstructions: `
# YieldMind Wave 6 Smart Contract Deployment Guide

## Prerequisites
1. Clone the repository: https://github.com/shriyashsoni/yelid-mind-smart-contract.git
2. Install dependencies: npm install
3. Set up environment variables in .env file

## Environment Variables Required
- PRIVATE_KEY: Your wallet private key
- RPC_URL: Polygon Amoy RPC endpoint
- ETHERSCAN_API_KEY: For contract verification

## Deployment Steps

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Network
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

### 3. Compile Contracts
\`\`\`bash
npm run build
\`\`\`

### 4. Deploy Contracts (Amoy Testnet)
\`\`\`bash
npm run deploy:amoy
\`\`\`

### 5. Verify Contracts on PolygonScan
\`\`\`bash
npx hardhat verify --network amoy <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
\`\`\`

## Deployment Order (Critical)

The following order must be strictly followed due to dependencies:

1. **YLDToken** - Deploy first (governance token)
2. **TimelockController** - Required for governance
3. **YieldMindGovernor** - DAO governance contract
4. **InsuranceReserve** - Insurance and protection
5. **StrategyManager** - Strategy management
6. **YieldVaultV4** - Core vault (depends on InsuranceReserve, StrategyManager)
7. **AIOracle** - Price forecasting
8. **RiskGuard** - Risk management (depends on YieldVaultV4, InsuranceReserve)
9. **YLDStaking** - Staking rewards
10. **AutonomousExecutor** - Autonomous operations

## Currently Deployed Contracts (Amoy)

✅ YLDToken: 0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c
✅ YieldVaultV4: 0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3
✅ RiskGuard: 0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A

⏳ Pending Deployment: StrategyManager, AIOracle, InsuranceReserve, YieldMindGovernor, YLDStaking, TimelockController, AutonomousExecutor

## Verification
After deployment, verify contracts on PolygonScan:
- https://amoy.polygonscan.com/

## Integration with Frontend
Update \`lib/contract-abis.ts\` with deployed addresses
Update \`lib/contract-utils.ts\` with contract information
`,
};

export const getContractConfig = (contractName: string) => {
  return DEPLOYMENT_CONFIG.contracts[contractName as keyof typeof DEPLOYMENT_CONFIG.contracts];
};

export const getDeployedContracts = () => {
  return Object.values(DEPLOYMENT_CONFIG.contracts).filter((c) => c.deployed);
};

export const getPendingContracts = () => {
  return Object.values(DEPLOYMENT_CONFIG.contracts).filter((c) => !c.deployed);
};
