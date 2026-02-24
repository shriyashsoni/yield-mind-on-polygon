import { db } from "../config/db.js";
import { redis } from "../config/redis.js";
import { publicClient } from "../blockchain/clients.js";
import { contracts, GOVERNOR_EVENTS_ABI, VAULT_EVENTS_ABI } from "../blockchain/contracts.js";
async function logExecution(eventType, txHash, status, details) {
    await db.query(`INSERT INTO execution_logs (event_type, tx_hash, status, details)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (tx_hash, event_type) DO NOTHING`, [eventType, txHash, status, JSON.stringify(details)]);
}
export async function startChainEventListener() {
    publicClient.watchContractEvent({
        address: contracts.vault,
        abi: VAULT_EVENTS_ABI,
        onLogs: async (logs) => {
            for (const log of logs) {
                const txHash = log.transactionHash || "0x";
                const eventType = log.eventName || "Unknown";
                await logExecution(eventType, txHash, "success", {
                    args: log.args,
                    blockNumber: log.blockNumber?.toString(),
                });
                if (eventType === "Deposit" || eventType === "Withdraw") {
                    await redis.publish("portfolio:updates", JSON.stringify({ txHash, eventType, args: log.args }));
                }
                if (eventType === "Rebalance") {
                    await db.query(`INSERT INTO rebalances (tx_hash, rebalance_type, total_assets, metadata)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (tx_hash) DO NOTHING`, [
                        txHash,
                        "autonomous",
                        log.args?.totalAssets?.toString() ?? "0",
                        JSON.stringify(log.args ?? {}),
                    ]);
                }
            }
        },
    });
    publicClient.watchContractEvent({
        address: contracts.governor,
        abi: GOVERNOR_EVENTS_ABI,
        onLogs: async (logs) => {
            for (const log of logs) {
                const txHash = log.transactionHash || "0x";
                const eventType = log.eventName || "Unknown";
                await logExecution(eventType, txHash, "success", {
                    args: log.args,
                    blockNumber: log.blockNumber?.toString(),
                });
                if (eventType === "VoteCast") {
                    const args = log.args;
                    await db.query(`INSERT INTO governance_votes (wallet_address, proposal_id, support, weight, tx_hash)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (tx_hash) DO NOTHING`, [args.voter, args.proposalId?.toString(), args.support ?? 2, args.weight?.toString() ?? "0", txHash]);
                }
            }
        },
    });
    console.log("Chain event listeners started");
}
