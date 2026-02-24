import { createPublicClient, createWalletClient, http } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { polygonZkEvm } from "viem/chains"
import { env } from "../config/env.js"

const transport = http(env.ZKEVM_RPC_URL)

export const publicClient = createPublicClient({
  chain: polygonZkEvm,
  transport,
})

export const aiSignerAccount = privateKeyToAccount(env.AI_SIGNER_PRIVATE_KEY as `0x${string}`)
export const executorAccount = privateKeyToAccount(env.EXECUTOR_PRIVATE_KEY as `0x${string}`)

export const aiWalletClient = createWalletClient({
  account: aiSignerAccount,
  chain: polygonZkEvm,
  transport,
})

export const executorWalletClient = createWalletClient({
  account: executorAccount,
  chain: polygonZkEvm,
  transport,
})
