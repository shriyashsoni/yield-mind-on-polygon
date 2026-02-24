# YieldMind Production Integration Architecture (zkEVM)

This document provides an implementation-ready architecture to connect deployed contracts, off-chain AI, backend services, and Next.js dashboard into one production system.

## 1) Frontend Architecture (Next.js + TypeScript + Wagmi + Viem)

### Core goals
- Wallet connection with MetaMask + network enforcement (Polygon zkEVM)
- Live vault reads (TVL, APY, totalAssets)
- Deposit/withdraw with pending/success/failure states
- Governance voting
- Rebalance status monitoring
- Cross-chain balance visualization
- Backend API synchronization with stale/refresh strategy
- Event-driven cache invalidation

### Recommended folder layout
```
app/
  dashboard/
  governance/
  api/
components/
  dashboard/
  governance/
hooks/
  web3/
    use-zkevm-network.ts
    use-vault-read.ts
    use-vault-transactions.ts
    use-governance-voting.ts
    use-rebalance-monitor.ts
    use-cross-chain-balances.ts
lib/
  web3/
    zkevm.ts
```

### Frontend runtime model
1. Wallet connects through Wagmi connector (MetaMask / injected).
2. `useZkEvmNetwork()` validates chain and triggers chain switch.
3. Contract reads use Viem public client with React Query caching.
4. Writes use wallet client + `waitForTransactionReceipt`.
5. Contract events trigger query invalidation and immediate UI refresh.
6. Backend APIs (`/api/portfolio`, `/api/risk`, `/api/forecast`, `/api/rebalance-history`, `/api/governance`, `/api/treasury`) hydrate non-chain analytics.

## 2) Backend Architecture (Node.js + Express + PostgreSQL + Redis)

### Services
- API gateway (Express)
- Chain event listener workers
- AI recommendation service + oracle submitter
- Transaction manager with retries
- Webhook dispatcher (Tenderly + internal consumers)

### Separation of roles
- `API_ROLE`: read-heavy, no signing
- `LISTENER_ROLE`: blockchain event indexing + DB writes
- `AI_SIGNER_ROLE`: signs recommendation payloads and submits to AIOracle
- `EXECUTOR_ROLE`: triggers autonomous rebalance only when policy passes

### Backend module layout
```
backend/
  src/
    app.ts
    index.ts
    config/
      env.ts
      db.ts
      redis.ts
    blockchain/
      clients.ts
      contracts.ts
    listeners/
      chain-events.listener.ts
    services/
      tx-handler.service.ts
      ai-oracle.service.ts
    routes/
      index.ts
      portfolio.route.ts
      risk.route.ts
      forecast.route.ts
      rebalance-history.route.ts
      governance.route.ts
      treasury.route.ts
    db/
      schema.sql
```

## 3) Database Design (PostgreSQL)

Tables are implemented in `backend/src/db/schema.sql`:
- `users`
- `vault_positions`
- `ai_recommendations`
- `rebalances`
- `governance_votes`
- `treasury_stats`
- `cross_chain_balances`
- `execution_logs`

### Performance strategy
- Composite indexes for `(user_id, chain_id)`, `(tx_hash)`, `(created_at DESC)`
- Partial index on failed executions for operations dashboard
- Foreign keys with cascade/delete rules for integrity
- Materialized view (`latest_portfolio_snapshot`) for fast dashboard load

## 4) Contract Connection Layer

### Read
- Viem `publicClient.readContract` for deterministic, typed reads.

### Write
- Viem `walletClient.writeContract` + centralized `sendWithRetry` wrapper.

### Event processing
- `watchContractEvent` for low-latency stream
- periodic reconciliation (`getLogs`) for missed ranges
- idempotent DB writes keyed by `(chain_id, tx_hash, log_index)`

### AI signature verification on-chain
Standard pattern:
1. Backend builds deterministic payload hash (`keccak256(abi.encode(...))`).
2. AI signer signs payload hash (EIP-191 or EIP-712).
3. Contract verifies signer address is authorized oracle signer.
4. Nonce + deadline checked for replay protection.

## 5) Real-time Lifecycle (End-to-End)

1. User submits deposit from frontend.
2. Tx is sent to vault and receipt awaited.
3. `Deposit` event emitted.
4. Backend listener captures event and writes `vault_positions` + `execution_logs`.
5. Redis pub/sub emits `portfolio:updated:{wallet}`.
6. Frontend invalidates query cache and refreshes UI.
7. AI service recalculates allocation on schedule or threshold trigger.
8. AI signs recommendation and submits to `AIOracle`.
9. Autonomous executor evaluates policy and triggers rebalance.
10. `Rebalance` event logged -> `rebalances` table updated -> dashboard refreshes.

## 6) Security Controls

- Private keys stored in KMS/HSM where possible; `.env` only for local dev.
- Strict schema validation for every API input.
- Chain replay protection: chainId checks + per-action nonce + deadline.
- Signature verification for AI payloads on-chain and off-chain preflight.
- Slippage bounds enforced in contract calls (`minOut`, `maxDeviationBps`).
- Emergency pause check before any mutating execution.
- Admin actions behind multisig (Safe) + timelock.
- API rate limiting + IP/Wallet abuse controls + Redis throttling.
- Transaction and error logs are immutable and auditable.

## 7) Production Deployment

### Docker-ready topology
- `frontend` (Next.js)
- `backend` (Express worker/API)
- `postgres`
- `redis`

### Environment strategy
- `NEXT_PUBLIC_*`: non-secret chain metadata and addresses
- backend secrets only server-side (`AI_SIGNER_PRIVATE_KEY`, DB URL, webhook secrets)
- per-environment files (`.env.development`, `.env.staging`, `.env.production`)

### CI/CD recommendations
- Lint + typecheck + tests on PR
- Build images and scan vulnerabilities
- Deploy by environment with gated approvals
- Run DB migrations before backend rollout

### Monitoring
- Tenderly alerts for failed tx/reverts
- Webhooks from backend for `rebalance_failed`, `risk_threshold_breach`
- Metrics: tx success rate, listener lag, API p95 latency, rebalance execution time

## 8) Implementation Files Added

This repository now includes implementation examples for:
- Production frontend hooks (`hooks/web3/*`)
- Backend service scaffold (`backend/src/*`)
- Event listener (`backend/src/listeners/chain-events.listener.ts`)
- API route set (`backend/src/routes/*`)
- SQL schema (`backend/src/db/schema.sql`)
- Transaction handler with retries (`backend/src/services/tx-handler.service.ts`)
- AI signing/submission flow (`backend/src/services/ai-oracle.service.ts`)
- Governance voting hook (`hooks/web3/use-governance-voting.ts`)
- Autonomous monitor flow (`hooks/web3/use-rebalance-monitor.ts`)
