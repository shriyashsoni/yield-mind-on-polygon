// YieldMind Wave 6 Deployment Configuration
// Smart Contract Deployment and Integration Guide

// Re-export CONTRACT_ADDRESSES so legacy imports from "@/lib/deployment-config"
// resolve to the same object exported by "@/lib/contract-abis".
export { CONTRACT_ADDRESSES } from "./contract-abis"

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
      explorerUrl: 'https://amoy.polygonscan.com/address/0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c#code',
    },
    YieldVaultV4: {
      name: 'YieldVault V4',
      description: 'Core vault contract with portfolio management',
      address: '0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3#code',
    },
    RiskGuard: {
      name: 'RiskGuard',
      description: 'Risk management and protection module',
      address: '0x1C304fe6Dd1c7797c09EE39c12387eF63eB1f664',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x1C304fe6Dd1c7797c09EE39c12387eF63eB1f664#code',
    },
    StrategyManager: {
      name: 'Strategy Manager',
      description: 'Manages yield strategies and execution',
      address: '0x82fc23020f1cf58EA47d4a0dDDc2F8C42BE65705',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x82fc23020f1cf58EA47d4a0dDDc2F8C42BE65705#code',
    },
    AIOracle: {
      name: 'AI Oracle',
      description: 'AI-powered price forecasting oracle',
      address: '0xFB5f412475b70Ef756E32a946731F2426c284522',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0xFB5f412475b70Ef756E32a946731F2426c284522#code',
    },
    InsuranceReserve: {
      name: 'Insurance Reserve',
      description: 'Insurance reserve and protection pool',
      address: '0x9D980e7418f692916Bc7f3A47A96074702F7B5f6',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x9D980e7418f692916Bc7f3A47A96074702F7B5f6#code',
    },
    YieldMindGovernor: {
      name: 'YieldMind Governor',
      description: 'DAO governance and voting',
      address: '0x78bf048E450Ec94cB055C8ab180CA27c912e975e',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x78bf048E450Ec94cB055C8ab180CA27c912e975e#code',
    },
    YLDStaking: {
      name: 'YLD Staking',
      description: 'Staking contract for governance participation',
      address: '0x48Bd564c86e379D08D5b536c766b65b966548Ab1',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x48Bd564c86e379D08D5b536c766b65b966548Ab1#code',
    },
    TimelockController: {
      name: 'Timelock Controller',
      description: 'Time-locked execution for governance',
      address: '0xc41CCBba49b84BB3E5CCb13020f2D41A0FC2786D',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0xc41CCBba49b84BB3E5CCb13020f2D41A0FC2786D#code',
    },
    AutonomousExecutor: {
      name: 'Autonomous Executor',
      description: 'Autonomous execution and rebalancing',
      address: '0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A',
      deployed: true,
      explorerUrl: 'https://amoy.polygonscan.com/address/0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A#code',
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
✅ YLDStaking: 0x48Bd564c86e379D08D5b536c766b65b966548Ab1
✅ TimelockController: 0xc41CCBba49b84BB3E5CCb13020f2D41A0FC2786D
✅ YieldMindGovernor: 0x78bf048E450Ec94cB055C8ab180CA27c912e975e
✅ InsuranceReserve: 0x9D980e7418f692916Bc7f3A47A96074702F7B5f6
✅ StrategyManager: 0x82fc23020f1cf58EA47d4a0dDDc2F8C42BE65705
✅ YieldVaultV4: 0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3
✅ AIOracle: 0xFB5f412475b70Ef756E32a946731F2426c284522
✅ RiskGuard: 0x1C304fe6Dd1c7797c09EE39c12387eF63eB1f664
✅ AutonomousExecutor: 0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A

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
