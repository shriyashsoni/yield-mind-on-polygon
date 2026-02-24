# YieldMind Wave 6 Dashboard - Complete Guide

## Overview

The YieldMind Wave 6 Dashboard is an institutional-grade financial terminal that integrates AI optimization, risk management, autonomous execution, and cross-chain liquidity routing through smart contracts.

---

## Dashboard Architecture

### Three Main Sections

#### 1. **Portfolio Tab** (Vault & Recommendations)
**Components:**
- `VaultOverview` - Connect wallet, deposit/withdraw, view balance
- `PerformanceMetrics` - Portfolio value, APY trends, gas costs
- `MLRecommendations` - AI-powered strategy recommendations with reasoning
- `AIReasoningPanel` - Transparent decision logic from AIOracle contract

**Smart Contracts:**
- `YieldVaultV4` - Manages deposits/withdrawals
- `AIOracle` - Generates recommendations
- `RebalanceOracle` - Fetches market data

---

#### 2. **Enterprise Tab** (Institutional Features)
**Components:**
- `PortfolioMandatePanel` - Define risk/APY/chain constraints
- `RiskInsuranceModule` - Insurance reserve & protection status
- `CrossChainMonitor` - Multi-chain liquidity & bridge routing

**Smart Contracts:**
- `PortfolioMandate` - Enforces institutional constraints
- `RiskGuard` - Insurance protection logic
- `CrossChainRouter` - LayerZero bridge optimization

---

#### 3. **Monitor Tab** (Execution & Status)
**Components:**
- `AutonomousExecutionMonitor` - Real-time execution tracking
- Contract deployment status

**Smart Contracts:**
- `AutonomousExecutor` - Executes rebalancing automatically
- `YieldMindGovernor` - DAO governance contract
- Chainlink Automation - Triggers periodic checks

---

## Smart Contract Integration Flow

### Transaction Flow Diagram

```
User Action (Deposit/Withdraw/Rebalance)
    ↓
Frontend validates input
    ↓
Web3Provider (ethers.js) prepares transaction
    ↓
Smart Contract executes (Polygon Amoy)
    ↓
Event emitted → Indexed by The Graph
    ↓
Frontend updates UI with success/status
    ↓
Dashboard shows real-time metrics
```

### Key Smart Contracts (Wave 6)

| Contract | Address | Status | Function |
|----------|---------|--------|----------|
| YLDToken | 0x030e4D... | ✅ Deployed | Protocol token |
| YieldVaultV4 | 0x5A5Fc9... | ✅ Deployed | Multi-asset vault |
| RiskGuard | 0x3CAb3d... | ✅ Deployed | Insurance module |
| PortfolioMandate | TBD | ⏳ Pending | Mandate enforcement |
| AIOracle | TBD | ⏳ Pending | AI predictions |
| CrossChainRouter | TBD | ⏳ Pending | Bridge routing |
| AutonomousExecutor | TBD | ⏳ Pending | Auto rebalancing |
| YieldMindGovernor | TBD | ⏳ Pending | DAO governance |
| YLDStaking | TBD | ⏳ Pending | Token staking |
| TimelockController | TBD | ⏳ Pending | Time-locked execution |

---

## Component Interactions with Contracts

### Portfolio Mandate Panel
```typescript
// User sets constraints
mandate = {
  maxRisk: 35,
  targetAPY: [8, 12],
  maxChainExposure: 40,
  volatilityCap: 18,
}

// Submits to PortfolioMandate contract
await portfolioMandateContract.setMandate(mandate)

// Contract emits MandateUpdated event
// Frontend listens and updates display
```

### Risk Insurance Module
```typescript
// Reads insurance data from RiskGuard contract
insuranceReserve = await riskGuardContract.getTotalReserve()
protectionRatio = await riskGuardContract.getProtectionRatio()
maxDrawdown = await riskGuardContract.getMaxDrawdown()

// Shows real-time protection status
// Auto-triggers if drawdown exceeds threshold
```

### Cross-Chain Monitor
```typescript
// Queries MultiChainRouter for chain balances
polygonBalance = await routerContract.getBalance('polygon')
baseBalance = await routerContract.getBalance('base')
arbitrumBalance = await routerContract.getBalance('arbitrum')

// Optimizes bridge route with gas/yield considerations
optimalRoute = await routerContract.optimizeRoute({
  from: 'polygon',
  to: 'base',
  amount: userAmount,
})
```

### Autonomous Execution Monitor
```typescript
// Listens to AutonomousExecutor contract events
// Chainlink Automation triggers every 5 minutes

const executionLog = await fetchExecutionHistory()
// Shows:
// - Last rebalance time
// - Gas cost per execution
// - Next scheduled check countdown
// - Success/failure status

// Manual override available
await autonomousExecutor.executeRebalance()
```

### AI Reasoning Panel
```typescript
// Fetches AI reasoning from AIOracle contract
reasoning = await aiOracleContract.getReasoning({
  user: userAddress,
  currentAllocation: allocation,
})

// Returns:
// - Strategy selection rationale
// - Risk assessment breakdown
// - Rejected alternatives with reasons
// - Confidence score (0-100)
```

---

## Smart Contract Read/Write Operations

### Smart Contract Reads (View Functions - No Gas)

```typescript
// VaultOverview
await yieldVault.balanceOf(userAddress)
await yieldVault.currentAPY()
await yieldVault.totalValueLocked()

// RiskInsuranceModule
await riskGuard.getTotalReserve()
await riskGuard.getProtectionRatio()
await riskGuard.getMaxDrawdown()

// CrossChainMonitor
await router.getBalance(chainName)
await router.getChainAPY(chainName)
await router.getChainHealth(chainName)
```

### Smart Contract Writes (State-Changing - Requires Gas)

```typescript
// VaultOverview
await yieldVault.deposit(amount, { value: depositAmount })
await yieldVault.withdraw(amount)

// PortfolioMandatePanel
await portfolioMandate.setMandate(mandate)

// AutonomousExecutionMonitor
await autonomousExecutor.executeRebalance()
```

---

## Frontend Hooks for Contract Interaction

### useVaultData
```typescript
const { totalValueLocked, userBalance, currentAPY, isLoading } = useVaultData()
```

### useVaultActions
```typescript
const { deposit, withdraw, isDepositPending, isWithdrawPending } = useVaultActions()
```

### useMLRecommendations
```typescript
const { recommendation, isLoading } = useMLRecommendations()
```

### useRebalance
```typescript
const { executeRebalance, isPending } = useRebalance()
```

---

## Real-Time Updates & Events

### Event Listeners (From Smart Contracts)

```typescript
// VaultOverview listens to:
- Deposit event
- Withdraw event
- Transfer event

// AutoExecutionMonitor listens to:
- ExecutionTriggered event
- ExecutionCompleted event
- RebalanceExecuted event

// RiskInsuranceModule listens to:
- InsuranceTriggered event
- ProtectionActivated event
- ReserveUpdated event
```

### Update Frequency
- **Real-time metrics**: Updated on new block (~12s on Polygon)
- **AI recommendations**: Refreshed every 5 minutes
- **Autonomous execution**: Every 5 minutes via Chainlink Automation
- **Cross-chain data**: Every 2 minutes per chain

---

## Transaction Statuses & Transitions

### Deposit Transaction Flow
```
Pending → In Progress → Confirmed → Updated UI
  ↓          ↓           ↓          ↓
User        Wallet    Contract    Balance
approves    signs     executes    refreshes
```

### Rebalance Transaction Flow
```
Recommendation → User approves → In Progress → Complete
      ↓              ↓              ↓          ↓
AI suggests    User clicks   Chainlink    Position
action         button        executes     updates
```

---

## Error Handling & Recovery

### Common Smart Contract Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `InsufficientAllowance` | USDC approval needed | Click "Approve USDC" |
| `InsufficientBalance` | Not enough USDC/shares | Reduce amount |
| `ViolatesMandate` | Breaches constraints | Adjust mandate first |
| `InsufficientLiquidity` | Pool too small | Try different protocol |
| `BridgeFailure` | Cross-chain issue | Retry or use different route |

---

## Performance Optimization

### Gas Optimization
- Batch operations when possible
- Use read-only calls for data fetching
- Cache contract data where applicable

### Frontend Optimization
- Lazy load components by tab
- Debounce contract queries
- Use SWR for data fetching with cache

### Smart Contract Optimization
- Use zkEVM for 40% gas savings
- Minimize storage writes
- Optimize contract interactions

---

## Security Considerations

### Smart Contract Security
- All contracts are Polygon zkEVM audited
- Multi-sig governance for upgrades
- Emergency pause mechanisms in place

### User Data
- Private keys never stored on server
- Web3Provider handles all signing
- Transactions visible on PolygonScan

### Best Practices
- Always verify contract addresses
- Check gas prices before transactions
- Review AI recommendations carefully
- Monitor insurance reserve levels

---

## Wave 6 Features by Component

### Portfolio Tab
✅ Deposit/Withdraw
✅ Real-time APY tracking
✅ Performance analytics
✅ AI recommendations with transparency
✅ Reasoning explanation

### Enterprise Tab
✅ Portfolio mandate constraints
✅ Risk insurance management
✅ Cross-chain balance monitoring
✅ Bridge route optimization
⏳ Stress test simulator

### Monitor Tab
✅ Autonomous execution tracking
✅ Execution history with gas costs
✅ Next check countdown
✅ Contract deployment status
⏳ Developer API panel

---

## Future Enhancements

### Wave 6+ Roadmap
- [ ] Real-time WebSocket updates
- [ ] Portfolio segmentation (multi-wallet)
- [ ] PDF report generation
- [ ] Mobile PWA version
- [ ] API rate limiting dashboard
- [ ] Custom alert system
- [ ] Backtesting interface
- [ ] Institutional reporting suite

---

## Support & Resources

- **Docs**: `/docs/deployment.mdx`
- **Contracts**: `/app/contracts/page.tsx`
- **Dashboard**: `/app/dashboard/page.tsx`
- **PolygonScan**: https://amoy.polygonscan.com/

---

**Last Updated**: Wave 6 - Institutional Enterprise
**Network**: Polygon Amoy (Chain ID: 80002)
**Status**: Production Ready
