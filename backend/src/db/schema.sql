CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vault_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  chain_id INT NOT NULL,
  vault_address TEXT NOT NULL,
  assets NUMERIC(78, 0) NOT NULL,
  shares NUMERIC(78, 0) NOT NULL,
  tx_hash TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('deposit', 'withdraw')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(chain_id, tx_hash, event_type)
);

CREATE TABLE IF NOT EXISTS ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chain_id INT NOT NULL,
  vault_address TEXT NOT NULL,
  recommendation JSONB NOT NULL,
  confidence NUMERIC(5, 4) NOT NULL,
  model_version TEXT NOT NULL,
  signature TEXT,
  payload_hash TEXT,
  nonce NUMERIC(78, 0),
  deadline NUMERIC(78, 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rebalances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tx_hash TEXT UNIQUE NOT NULL,
  rebalance_type TEXT NOT NULL,
  total_assets NUMERIC(78, 0) NOT NULL DEFAULT 0,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  executed_by TEXT,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS governance_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  proposal_id NUMERIC(78, 0) NOT NULL,
  support SMALLINT NOT NULL CHECK (support IN (0, 1, 2)),
  weight NUMERIC(78, 0) NOT NULL,
  tx_hash TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS treasury_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chain_id INT NOT NULL,
  insurance_reserve NUMERIC(78, 0) NOT NULL,
  protocol_treasury NUMERIC(78, 0) NOT NULL,
  reserve_ratio_bps INT NOT NULL,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cross_chain_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  chain_id INT NOT NULL,
  chain_name TEXT NOT NULL,
  usdc_balance NUMERIC(78, 0) NOT NULL DEFAULT 0,
  yld_balance NUMERIC(78, 0) NOT NULL DEFAULT 0,
  native_balance NUMERIC(78, 0) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(wallet_address, chain_id)
);

CREATE TABLE IF NOT EXISTS execution_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  tx_hash TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed')),
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tx_hash, event_type)
);

CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_vault_positions_wallet_chain ON vault_positions(wallet_address, chain_id);
CREATE INDEX IF NOT EXISTS idx_vault_positions_created ON vault_positions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_recs_created ON ai_recommendations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rebalances_executed ON rebalances(executed_at DESC);
CREATE INDEX IF NOT EXISTS idx_governance_proposal ON governance_votes(proposal_id);
CREATE INDEX IF NOT EXISTS idx_treasury_chain_time ON treasury_stats(chain_id, captured_at DESC);
CREATE INDEX IF NOT EXISTS idx_cross_chain_wallet ON cross_chain_balances(wallet_address);
CREATE INDEX IF NOT EXISTS idx_execution_logs_created ON execution_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_execution_logs_failed ON execution_logs(created_at DESC) WHERE status = 'failed';

CREATE MATERIALIZED VIEW IF NOT EXISTS latest_portfolio_snapshot AS
SELECT
  vp.wallet_address,
  vp.chain_id,
  vp.vault_address,
  SUM(CASE WHEN vp.event_type = 'deposit' THEN vp.assets ELSE -vp.assets END) AS net_assets,
  MAX(vp.updated_at) AS last_updated
FROM vault_positions vp
GROUP BY vp.wallet_address, vp.chain_id, vp.vault_address;
