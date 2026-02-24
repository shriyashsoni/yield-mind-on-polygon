import { db } from "../config/db.js";
export async function sendWithRetry(label, txFn, maxRetries = 3, delayMs = 1_500) {
    let attempt = 0;
    let lastError;
    while (attempt < maxRetries) {
        try {
            const tx = await txFn();
            await db.query(`INSERT INTO execution_logs (event_type, tx_hash, status, details)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (tx_hash, event_type) DO NOTHING`, [label, tx.hash, "success", JSON.stringify({ attempt: attempt + 1 })]);
            return tx.hash;
        }
        catch (error) {
            lastError = error;
            attempt += 1;
            if (attempt >= maxRetries)
                break;
            await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
        }
    }
    await db.query(`INSERT INTO execution_logs (event_type, tx_hash, status, details)
     VALUES ($1, $2, $3, $4)`, [label, "0x", "failed", JSON.stringify({ maxRetries, error: String(lastError) })]);
    throw lastError;
}
