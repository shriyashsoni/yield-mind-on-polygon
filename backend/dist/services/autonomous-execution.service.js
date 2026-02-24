import { executorAccount, executorWalletClient, publicClient } from "../blockchain/clients.js";
import { contracts } from "../blockchain/contracts.js";
import { sendWithRetry } from "./tx-handler.service.js";
const EXECUTOR_ABI = [
    {
        type: "function",
        name: "executeRebalance",
        stateMutability: "nonpayable",
        inputs: [{ type: "bytes32", name: "recommendationHash" }],
        outputs: [],
    },
];
export async function triggerAutonomousRebalance(recommendationHash) {
    const hash = await sendWithRetry("AutonomousExecute", async () => {
        const txHash = await executorWalletClient.writeContract({
            address: contracts.autonomousExecutor,
            abi: EXECUTOR_ABI,
            functionName: "executeRebalance",
            args: [recommendationHash],
            account: executorAccount,
        });
        await publicClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });
        return { hash: txHash };
    });
    return { hash };
}
