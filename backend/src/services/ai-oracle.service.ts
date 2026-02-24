import { encodeAbiParameters, keccak256, parseAbiParameters } from "viem"
import { aiSignerAccount, aiWalletClient, publicClient } from "../blockchain/clients.js"
import { AI_ORACLE_ABI, contracts } from "../blockchain/contracts.js"
import { db } from "../config/db.js"
import { sendWithRetry } from "./tx-handler.service.js"

type Allocation = {
  chainId: number
  vault: `0x${string}`
  targetApyBps: number
  riskScore: number
  rebalanceBps: number
}

async function pullProtocolData() {
  const portfolio = await fetch("https://api.llama.fi/protocols").then((r) => r.json() as Promise<unknown[]>)
  return {
    protocols: portfolio.length,
    sampledAt: Date.now(),
  }
}

async function generateAllocation(): Promise<Allocation> {
  const data = await pullProtocolData()
  const allocation: Allocation = {
    chainId: 1101,
    vault: contracts.vault,
    targetApyBps: 1800,
    riskScore: 42,
    rebalanceBps: data.protocols > 0 ? 500 : 300,
  }

  await db.query(
    `INSERT INTO ai_recommendations (chain_id, vault_address, recommendation, confidence, model_version)
     VALUES ($1, $2, $3, $4, $5)`,
    [allocation.chainId, allocation.vault, JSON.stringify(allocation), 0.86, "ensemble-v4"]
  )

  return allocation
}

function buildPayloadHash(allocation: Allocation, nonce: bigint, deadline: bigint): `0x${string}` {
  const encoded = encodeAbiParameters(parseAbiParameters("uint256,address,uint256,uint256,uint256,uint256,uint256"), [
    BigInt(allocation.chainId),
    allocation.vault,
    BigInt(allocation.targetApyBps),
    BigInt(allocation.riskScore),
    BigInt(allocation.rebalanceBps),
    nonce,
    deadline,
  ])

  return keccak256(encoded)
}

export async function submitAiRecommendation() {
  const allocation = await generateAllocation()
  const nonce = BigInt(Date.now())
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 300)
  const payloadHash = buildPayloadHash(allocation, nonce, deadline)

  const signature = await aiSignerAccount.signMessage({ message: { raw: payloadHash } })

  const hash = await sendWithRetry("AIOracleSubmit", async () => {
    const txHash = await aiWalletClient.writeContract({
      address: contracts.aiOracle,
      abi: AI_ORACLE_ABI,
      functionName: "submitRecommendation",
      args: [payloadHash, signature, nonce, deadline],
      account: aiSignerAccount,
    })
    await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 })
    return { hash: txHash }
  })

  return { hash, payloadHash, nonce: nonce.toString(), deadline: deadline.toString(), allocation }
}
