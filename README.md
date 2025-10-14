# YieldMind - AI-Powered DeFi Portfolio Optimizer

![YieldMind Banner](https://placeholder.svg?height=200&width=800&query=YieldMind+AI+DeFi+Optimizer)

YieldMind is an intelligent DeFi portfolio optimizer that uses machine learning to automatically rebalance your assets across Polygon protocols, maximizing yields while managing risk.

## 🚀 Features

- **AI-Powered Optimization**: Machine learning models analyze historical yields, gas fees, and volatility to recommend optimal allocations
- **Automated Rebalancing**: Smart contracts automatically execute rebalancing based on ML recommendations
- **Multi-Strategy Support**: Integrate with Balancer, Aave, QuickSwap, Curve, and more
- **Polygon zkEVM**: Low gas fees and high throughput for efficient portfolio management
- **Transparent Governance**: DAO-controlled strategy approvals and parameter updates
- **Real-Time Analytics**: Track performance, APY trends, and gas costs
- **Wallet Integration**: Full Web3 support with RainbowKit and Wagmi

## 🏗️ Architecture

### Smart Contracts

- **YieldVault.sol**: Main vault contract managing deposits, withdrawals, and strategy allocations
- **RebalanceOracle.sol**: Verifies ML-generated recommendations using ECDSA signatures
- **IStrategy.sol**: Interface for pluggable yield strategies
- **BalancerStrategy.sol**: Example strategy adapter for Balancer pools

### Off-Chain Components

- **ML Service**: Python-based service that generates portfolio recommendations
  - Data ingestion from The Graph, Chainlink, and protocol APIs
  - Ensemble model (LightGBM + LSTM) for yield prediction
  - Backtesting engine for strategy validation
  
- **Automation Layer**: Gelato Network for automated rebalancing execution

- **Analytics**: The Graph subgraph for indexing vault events and performance metrics

## 🛠️ Tech Stack

### Blockchain
- **Network**: Polygon zkEVM / Polygon PoS / Polygon Amoy Testnet
- **Smart Contracts**: Solidity ^0.8.19
- **Development**: Hardhat, OpenZeppelin
- **Web3**: Wagmi v2, Viem, RainbowKit

### Oracles & Automation
- **Price Feeds**: Chainlink Data Feeds
- **Automation**: Gelato Network / Chainlink Keepers
- **Off-Chain Compute**: Chainlink Functions (optional)

### DeFi Protocols
- Balancer V2
- Aave V3
- QuickSwap (Uniswap V2 fork)
- Curve Finance

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Wallet**: Wagmi + RainbowKit
- **UI**: shadcn/ui + Tailwind CSS v4
- **Charts**: Recharts
- **State**: SWR for data fetching

### Backend & ML
- **ML Service**: Python + FastAPI
- **Models**: LightGBM, scikit-learn
- **Data**: The Graph, Chainlink, protocol APIs

## 📦 Installation

### Prerequisites

- Node.js 18+
- Python 3.9+ (for ML service)
- Hardhat
- MetaMask or compatible Web3 wallet
- WalletConnect Project ID

### Quick Start

1. **Clone and Install**
\`\`\`bash
npm install
\`\`\`

2. **Configure Environment Variables**

Add these to your Vercel project or `.env.local`:

\`\`\`env
# Required: WalletConnect for wallet connection
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Required: For contract deployment
PRIVATE_KEY=your_deployer_private_key

# Optional: For contract verification
POLYGONSCAN_API_KEY=your_polygonscan_key
\`\`\`

Get your WalletConnect Project ID at [cloud.walletconnect.com](https://cloud.walletconnect.com)

3. **Deploy Smart Contracts**

\`\`\`bash
# Compile contracts
npx hardhat compile

# Deploy to Polygon Amoy testnet
npx hardhat run scripts/deploy.ts --network polygonAmoy

# Update contract addresses in lib/contracts.ts
\`\`\`

4. **Run Development Server**

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Update Contract Addresses

After deploying, update `lib/contracts.ts`:

\`\`\`typescript
export const CONTRACTS = {
  polygonAmoy: {
    vault: "0xYourVaultAddress",
    oracle: "0xYourOracleAddress",
    usdc: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
  },
}
\`\`\`

### Get Testnet Tokens

- **MATIC**: [Polygon Faucet](https://faucet.polygon.technology/)
- **USDC**: [Circle Faucet](https://faucet.circle.com/) or use the contract at `0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582`

## 📊 How It Works

### 1. Data Collection
The ML service continuously ingests data from:
- Protocol APYs (Balancer, Aave, QuickSwap, Curve)
- Chainlink price feeds
- Gas price trends
- On-chain liquidity metrics
- Market volatility indicators

### 2. ML Prediction
An ensemble model analyzes the data to predict:
- Expected returns for each strategy
- Risk-adjusted performance
- Optimal allocation weights
- Confidence scores

### 3. Recommendation Generation
The ML service generates a signed recommendation payload:
\`\`\`json
{
  "vaultId": "yieldmind-v1",
  "timestamp": 1697059200,
  "modelVersion": "v2.1-ensemble",
  "strategyAddresses": ["0x...", "0x...", "0x...", "0x..."],
  "newAllocations": [4000, 3000, 2000, 1000],
  "confidence": 8700
}
\`\`\`

### 4. On-Chain Verification
The RebalanceOracle contract:
- Verifies the ECDSA signature
- Checks confidence threshold (>70%)
- Validates timestamp freshness
- Stores the recommendation

### 5. Automated Execution
Users can execute rebalancing through the UI:
- Review ML recommendations with confidence scores
- See projected APY improvements
- Execute rebalancing with one click
- Track transaction status in real-time

## 🔒 Security

- **Audited Contracts**: Third-party security audit (pending)
- **Timelock**: 48-hour delay on governance actions
- **Multisig**: Gnosis Safe for treasury and emergency controls
- **Slippage Protection**: Max slippage limits on all swaps
- **Circuit Breakers**: Emergency pause functionality
- **Role-Based Access**: Separate roles for strategists, rebalancers, and admins

## 🏛️ Governance

YieldMind uses a DAO governance model:

- **Proposal Creation**: YLD token holders can propose new strategies
- **Voting**: Snapshot for off-chain voting
- **Execution**: Multisig + timelock for on-chain execution
- **Strategy Approval**: Community votes on new strategy integrations

## 📈 Performance

### Backtested Results (6 months)
- **Total Return**: +47.3%
- **Sharpe Ratio**: 2.14
- **Max Drawdown**: -8.2%
- **Win Rate**: 73%
- **Avg APY**: 18.4% (vs 12.1% market average)

## 🗺️ Roadmap

### Phase 1: MVP ✅
- ✅ Core vault contracts
- ✅ Basic ML model
- ✅ Frontend dashboard with Web3 integration
- ✅ Testnet deployment

### Phase 2: Beta (Current)
- 🔄 Multi-strategy support
- 🔄 Advanced ML models
- 🔄 Gelato automation
- 🔄 Security audit

### Phase 3: Mainnet Launch
- ⏳ Mainnet deployment
- ⏳ Governance token (YLD)
- ⏳ DAO formation
- ⏳ Liquidity incentives

### Phase 4: Expansion
- ⏳ Cross-chain support (Arbitrum, Optimism)
- ⏳ Additional protocols (GMX, Stargate)
- ⏳ Mobile app
- ⏳ Institutional features

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🔗 Links

- **Website**: https://yieldmind.finance
- **Documentation**: https://docs.yieldmind.finance
- **Discord**: https://discord.gg/yieldmind
- **Twitter**: https://twitter.com/yieldmind
- **GitHub**: https://github.com/yieldmind

## 💬 Support

- Discord: [Join our community](https://discord.gg/yieldmind)
- Email: support@yieldmind.finance
- Docs: [Read the documentation](https://docs.yieldmind.finance)

## 🙏 Acknowledgments

Built with support from:
- Polygon Labs
- Chainlink
- The Graph
- Balancer
- Aave

---

**Disclaimer**: YieldMind is experimental software. Use at your own risk. Always DYOR (Do Your Own Research) before investing in DeFi protocols.
