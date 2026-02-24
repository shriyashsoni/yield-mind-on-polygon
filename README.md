# YieldMind on Polygon

AI-powered DeFi vault platform on Polygon Amoy with on-chain deposits/withdrawals, risk-aware automation, wallet UX, and per-vault analytics.

## Repositories

- Frontend/App: https://github.com/shriyashsoni/yield-mind-on-polygon
- Smart Contracts: https://github.com/shriyashsoni/yelid-mind-smart-contract

## Current Status

- Network: Polygon Amoy Testnet
- Chain ID: 80002
- App model: Multi-vault product UX (Low / Medium / High)
- Contract integration: Live on-chain interactions enabled

## Working Features (Live)

### Wallet + Network

- Connect/disconnect wallet
- Network switch (Polygon Mainnet / Polygon Amoy)
- Wallet dropdown with:
  - address
  - native balance (MATIC)
  - vault asset balance
- Dashboard wallet panel showing:
  - wallet asset balance
  - in-vault balance

### Vault Products + Transactions

- Vault Products page with 3 products:
  - Conservative Vault (Low)
  - Balanced Vault (Medium)
  - Aggressive Vault (High)
- Deposit flow is functional from product cards:
  - amount input + MAX
  - ERC20 approve
  - on-chain deposit transaction
  - loading/pending states
- Withdraw flow functional via Vault Overview
- Per-vault address routing implemented for product cards
- Auto-refresh after transactions (query invalidation)

### Dashboard + Stats

- Connected dashboard with protocol metrics
- Recent activity tracking (deposit/withdraw)
- Per-vault grouped activity and metrics:
  - transaction count
  - deposited
  - withdrawn
  - net flow
- Stats tab includes:
  - per-vault summary cards
  - 7-day net-flow trend chart
  - color-mapped summary chips (Conservative/Balanced/Aggressive)

### Smart Contract Integration

- Frontend uses deployed contract addresses + ABIs from [lib/contract-abis.ts](lib/contract-abis.ts)
- Action hooks integrated with contracts:
  - deposits
  - withdrawals
  - strategy/risk reads
- Local activity tracking integrated with UI and explorer tx links

## Deployed Smart Contracts (Polygon Amoy)

Source of truth: [lib/contract-abis.ts](lib/contract-abis.ts)

| Contract | Address | Explorer |
|---|---|---|
| YLDToken | 0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c | https://amoy.polygonscan.com/address/0x030e4Dfc7D89e6251Ef06ADbC536A85357BCb28c |
| YLDStaking | 0x48Bd564c86e379D08D5b536c766b65b966548Ab1 | https://amoy.polygonscan.com/address/0x48Bd564c86e379D08D5b536c766b65b966548Ab1 |
| TimelockController | 0xc41CCBba49b84BB3E5CCb13020f2D41A0FC2786D | https://amoy.polygonscan.com/address/0xc41CCBba49b84BB3E5CCb13020f2D41A0FC2786D |
| YieldMindGovernor | 0x78bf048E450Ec94cB055C8ab180CA27c912e975e | https://amoy.polygonscan.com/address/0x78bf048E450Ec94cB055C8ab180CA27c912e975e |
| InsuranceReserve | 0x9D980e7418f692916Bc7f3A47A96074702F7B5f6 | https://amoy.polygonscan.com/address/0x9D980e7418f692916Bc7f3A47A96074702F7B5f6 |
| StrategyManager | 0x82fc23020f1cf58EA47d4a0dDDc2F8C42BE65705 | https://amoy.polygonscan.com/address/0x82fc23020f1cf58EA47d4a0dDDc2F8C42BE65705 |
| YieldVaultV4 | 0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3 | https://amoy.polygonscan.com/address/0x5A5Fc9066AbeC751577bA3BD330555E54e3aA8e3 |
| AIOracle | 0xFB5f412475b70Ef756E32a946731F2426c284522 | https://amoy.polygonscan.com/address/0xFB5f412475b70Ef756E32a946731F2426c284522 |
| RiskGuard | 0x1C304fe6Dd1c7797c09EE39c12387eF63eB1f664 | https://amoy.polygonscan.com/address/0x1C304fe6Dd1c7797c09EE39c12387eF63eB1f664 |
| AutonomousExecutor | 0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A | https://amoy.polygonscan.com/address/0x3CAb3d9b205DBc5dB656c16743fc88C301d0ad6A |

## Vault Product Address Mapping

Configured in [lib/contracts.ts](lib/contracts.ts).

- Current state: Low / Medium / High all map to `YieldVaultV4`.
- Ready for scale: each vault can be mapped to a unique contract address without UI refactor.

## Quick Start

### Frontend

```bash
pnpm install
pnpm dev
```

App default URL: http://localhost:3000

### Smart Contracts

```bash
cd yelid-mind-smart-contract
npm install
npm run build
npm run deploy:amoy
```

## Core App Routes

- /dashboard
- /products
- /strategies
- /analytics
- /governance
- /contracts
- /docs/deployment
- /release/wave-6

## Environment

Create `.env.local` in project root (frontend):

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

Smart-contract env is configured in smart-contract repo `.env`.

## Roadmap

### Done

- Wallet connect + network switching
- On-chain deposit/withdraw integration
- Multi-vault product UX (Low/Medium/High)
- Per-vault routing support
- Dashboard grouped vault metrics
- Stats tab 7-day per-vault trend
- Wallet balance visibility and improved wallet UI

### In Progress

- Split Low/Medium/High into separate vault contracts on-chain
- End-to-end data alignment between all docs and runtime views
- Additional contract-level observability in dashboard

### Next

- Per-vault historical PnL and APY charts from indexed data
- Automated strategy health badges from on-chain events
- Governance proposal actions from UI
- Contract verification + audit artifacts section in docs
- Mainnet rollout checklist and runbook

## Notes

- If you deploy new contracts, update [lib/contract-abis.ts](lib/contract-abis.ts) and [lib/contracts.ts](lib/contracts.ts).
- Explorer links in dashboard use active chain context.
- Some legacy docs may still contain old addresses; this README reflects current code-configured addresses.

## Related Docs

- [SMART_CONTRACTS.md](SMART_CONTRACTS.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- [INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md)
- [app/docs/deployment.mdx](app/docs/deployment.mdx)
