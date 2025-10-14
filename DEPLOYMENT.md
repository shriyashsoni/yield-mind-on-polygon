# YieldMind Deployment Guide

## Prerequisites

1. **WalletConnect Project ID**
   - Go to https://cloud.walletconnect.com/
   - Create a new project
   - Copy your Project ID
   - Add to `.env.local`: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id`

2. **Polygon RPC Setup**
   - Get free RPC from https://www.alchemy.com/ or https://www.quicknode.com/
   - Add to your wallet (MetaMask, Rainbow, etc.)

## Smart Contract Deployment

### 1. Install Hardhat
\`\`\`bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
\`\`\`

### 2. Configure Hardhat for Polygon

Create `hardhat.config.js`:
\`\`\`javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygonAmoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 137
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};
\`\`\`

### 3. Deploy Contracts

\`\`\`bash
# Deploy to Amoy Testnet
npx hardhat run scripts/deploy.js --network polygonAmoy

# Deploy to Polygon Mainnet
npx hardhat run scripts/deploy.js --network polygon
\`\`\`

### 4. Update Contract Addresses

After deployment, update `lib/contracts.ts` with your deployed contract addresses:

\`\`\`typescript
export const CONTRACTS = {
  polygon: {
    vault: '0xYourVaultAddress',
    oracle: '0xYourOracleAddress',
    usdc: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
  },
  polygonAmoy: {
    vault: '0xYourTestnetVaultAddress',
    oracle: '0xYourTestnetOracleAddress',
    usdc: '0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582',
  },
}
\`\`\`

## Frontend Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
4. Deploy!

## Testing on Polygon Amoy Testnet

1. **Get Test MATIC**
   - Visit https://faucet.polygon.technology/
   - Request test MATIC for Amoy network

2. **Get Test USDC**
   - Use Aave faucet: https://staging.aave.com/faucet/
   - Or swap test MATIC for test USDC on QuickSwap

3. **Connect Wallet**
   - Switch to Polygon Amoy network
   - Connect your wallet to YieldMind
   - Start testing deposits and withdrawals!

## Production Checklist

- [ ] Smart contracts audited
- [ ] Contracts deployed to Polygon mainnet
- [ ] Contract addresses updated in code
- [ ] WalletConnect Project ID configured
- [ ] Frontend deployed to Vercel
- [ ] DNS configured
- [ ] Analytics enabled
- [ ] Error monitoring setup (Sentry)
- [ ] Rate limiting configured
- [ ] Security headers enabled

## Monitoring

- **Blockchain Explorer**: https://polygonscan.com/
- **Transaction Status**: Monitor via wallet or explorer
- **Contract Events**: Use The Graph for indexing
- **Frontend Analytics**: Vercel Analytics enabled

## Support

For issues or questions:
- Check contract on Polygonscan
- Review transaction logs
- Test on Amoy testnet first
- Verify wallet connection and network
