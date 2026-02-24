import "dotenv/config"
import { z } from "zod"

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  ZKEVM_RPC_URL: z.string().url(),
  CHAIN_ID: z.coerce.number().default(1101),
  VAULT_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  AI_ORACLE_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  GOVERNOR_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  RISK_GUARD_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  AUTONOMOUS_EXECUTOR_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  LISTENER_START_BLOCK: z.coerce.number().default(0),
  AI_SIGNER_PRIVATE_KEY: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  EXECUTOR_PRIVATE_KEY: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  WEBHOOK_SECRET: z.string().min(8),
  TENDERLY_WEBHOOK_URL: z.string().url(),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().default(120),
})

export const env = EnvSchema.parse(process.env)
