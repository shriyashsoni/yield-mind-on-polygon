# YieldMind Wave 6 Smart Contracts Integration

This document outlines the integration of YieldMind Wave 6 smart contracts with the frontend application.

## Overview

YieldMind Wave 6 consists of 10 smart contracts deployed on Polygon Amoy Testnet (Chain ID: 80002).

### Deployment Status

| Contract | Status | Address | Network |
|----------|--------|---------|---------|
| YLDToken | ✅ Deployed | 0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c | Polygon Amoy |
| YieldVaultV4 | ✅ Deployed | 0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3 | Polygon Amoy |
| RiskGuard | ✅ Deployed | 0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A | Polygon Amoy |
| StrategyManager | ⏳ Pending | - | - |
| AIOracle | ⏳ Pending | - | - |
| InsuranceReserve | ⏳ Pending | - | - |
| YieldMindGovernor | ⏳ Pending | - | - |
| YLDStaking | ⏳ Pending | - | - |
| TimelockController | ⏳ Pending | - | - |
| AutonomousExecutor | ⏳ Pending | - | - |

## Contract Architecture

```
YieldMind Wave 6
├── Core Contracts
│   ├── YLDToken (ERC20)
│   ├── YieldVaultV4 (Main Vault)
│   └── RiskGuard (Risk Management)
├── Intelligence Layer
│   ├── AIOracle (Price Forecasting)
│   └── StrategyManager (Strategy Execution)
├── Governance Layer
│   ├── YieldMindGovernor (DAO Voting)
│   ├── YLDStaking (Staking)
│   └── TimelockController (Time-Locked Execution)
└── Safety & Automation
    ├── InsuranceReserve (Protection Pool)
    └── AutonomousExecutor (Automated Operations)
```

## Frontend Integration Files

### 1. Contract ABIs and Addresses
**File**: `lib/contract-abis.ts`

Contains:
- Smart contract addresses for Polygon Amoy
- Contract ABIs (Application Binary Interfaces)
- Type definitions for contract interactions

```typescript
export const CONTRACT_ADDRESSES = {
  AMOY: {
    YLDToken: '0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c',
    YieldVaultV4: '0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3',
    RiskGuard: '0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A',
    // ... other contracts
  },
};
```

### 2. Contract Utilities
**File**: `lib/contract-utils.ts`

Provides:
- Contract configuration and metadata
- Helper functions for contract interactions
- Address formatting utilities

```typescript
export const DEPLOYED_CONTRACTS: ContractConfig[];
export const getContractsByType(type: ContractType): ContractConfig[];
export const getDeployedContracts(): ContractConfig[];
export const getPendingContracts(): ContractConfig[];
```

### 3. Deployment Configuration
**File**: `lib/deployment-config.ts`

Contains:
- Network configuration
- Deployment order (critical dependencies)
- Contract metadata and links
- Deployment instructions

### 4. Contract Interaction Hooks
**File**: `hooks/use-contract-interaction.ts`

Provides React hooks for:
- Reading contract state (`useContractRead`)
- Writing to contracts (`useContractWrite`)
- Fetching contract data (`useContractData`)

```typescript
// Example: Reading from contract
const { data, isLoading } = useContractRead({
  address: CONTRACT_ADDRESSES.AMOY.YieldVaultV4,
  abi: YIELD_VAULT_V4_ABI,
  functionName: 'getTotalAssets',
});

// Example: Writing to contract
const { write, isLoading } = useContractWrite({
  address: CONTRACT_ADDRESSES.AMOY.YieldVaultV4,
  abi: YIELD_VAULT_V4_ABI,
  functionName: 'deposit',
});
```

### 5. Components
**File**: `components/deployment-dashboard.tsx`

Displays:
- Deployment status and progress
- Contract information and links
- Network configuration
- Contract management tools

## Getting Started

### 1. Install Smart Contracts Repository

```bash
git clone https://github.com/shriyashsoni/yelid-mind-smart-contract.git
cd yelid-mind-smart-contract
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with:
# - PRIVATE_KEY: Your wallet private key
# - RPC_URL: https://rpc-amoy.polygon.technology/
# - ETHERSCAN_API_KEY: For contract verification
```

### 3. Compile and Deploy

```bash
# Compile contracts
npm run build

# Deploy to Polygon Amoy
npm run deploy:amoy

# Verify contracts on PolygonScan
npm run verify:amoy
```

### 4. Update Frontend

Update `lib/contract-abis.ts` with newly deployed contract addresses:

```typescript
export const CONTRACT_ADDRESSES = {
  AMOY: {
    YLDToken: '0x...',
    YieldVaultV4: '0x...',
    RiskGuard: '0x...',
    StrategyManager: '0x...', // New
    AIOracle: '0x...', // New
    InsuranceReserve: '0x...', // New
    YieldMindGovernor: '0x...', // New
    YLDStaking: '0x...', // New
    TimelockController: '0x...', // New
    AutonomousExecutor: '0x...', // New
  },
};
```

## Dashboard Pages

### Contracts Page
**Route**: `/contracts`

Displays:
- Contract deployment status
- Network configuration
- Deployed contract details with links
- Pending deployment contracts
- Deployment documentation links

### Dashboard Page
**Route**: `/dashboard`

Features:
- Connected wallet information
- Protocol metrics
- Contract deployment progress
- Analytics and performance data
- Network configuration

### Deployment Documentation
**Route**: `/docs/deployment`

Contains:
- Architecture overview
- Setup instructions
- Deployment steps
- Integration guidelines
- Troubleshooting

## Contract Interactions

### Example: Deposit to Vault

```typescript
const { write } = useContractWrite({
  address: CONTRACT_ADDRESSES.AMOY.YieldVaultV4,
  abi: YIELD_VAULT_V4_ABI,
  functionName: 'deposit',
});

// Call when user submits deposit
await write(depositAmount);
```

### Example: Get Risk Score

```typescript
const { data: riskScore } = useContractRead({
  address: CONTRACT_ADDRESSES.AMOY.RiskGuard,
  abi: RISK_GUARD_ABI,
  functionName: 'getRiskScore',
});
```

### Example: Stake YLD Tokens

```typescript
const { write: stake } = useContractWrite({
  address: CONTRACT_ADDRESSES.AMOY.YLDStaking,
  abi: YLD_STAKING_ABI,
  functionName: 'stake',
});

await stake(stakingAmount);
```

## Network Configuration

**Network**: Polygon Amoy (Testnet)
**Chain ID**: 80002
**RPC URL**: https://rpc-amoy.polygon.technology/
**Block Explorer**: https://amoy.polygonscan.com

## Deployment Order (CRITICAL)

The following order must be strictly followed due to contract dependencies:

1. YLDToken
2. TimelockController
3. YieldMindGovernor
4. InsuranceReserve
5. StrategyManager
6. YieldVaultV4
7. AIOracle
8. RiskGuard
9. YLDStaking
10. AutonomousExecutor

## Troubleshooting

### Wallet Not Connected
- Ensure MetaMask is installed
- Set network to Polygon Amoy (Chain ID: 80002)
- Check wallet balance for gas fees

### Contract Read Fails
- Verify contract address is correct
- Check if contract is deployed to that address
- Ensure network is set to Polygon Amoy

### Contract Write Fails
- Check wallet has sufficient gas (MATIC tokens)
- Verify contract approval if needed (for ERC20)
- Check contract state requirements

### PolygonScan Verification
- Visit: https://amoy.polygonscan.com
- Search for contract address
- Verify contract code matches source

## Resources

- **Smart Contract Repository**: https://github.com/shriyashsoni/yelid-mind-smart-contract
- **PolygonScan Amoy**: https://amoy.polygonscan.com
- **Polygon Docs**: https://polygon.technology/developers
- **Hardhat Docs**: https://hardhat.org/docs

## Support

For issues or questions:
1. Check the deployment documentation at `/docs/deployment`
2. Review contract code on GitHub
3. Search PolygonScan for contract interactions
4. Check browser console for error messages

## Next Steps

1. ✅ Deploy YLDToken, YieldVaultV4, RiskGuard
2. ⏳ Deploy remaining 7 contracts
3. ⏳ Verify all contracts on PolygonScan
4. ⏳ Connect frontend to all contracts
5. ⏳ Test all contract interactions
6. ⏳ Enable autonomous execution mode
7. ⏳ Launch mainnet deployment
