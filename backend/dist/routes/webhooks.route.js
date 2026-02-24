import { Router } from "express";
import { env } from "../config/env.js";
import { db } from "../config/db.js";
export const webhooksRoute = Router();
webhooksRoute.post("/tenderly", async (req, res, next) => {
    try {
        const secret = req.header("x-yieldmind-webhook-secret");
        if (secret !== env.WEBHOOK_SECRET)
            return res.status(401).json({ error: "Invalid webhook secret" });
        await db.query(`INSERT INTO execution_logs (event_type, tx_hash, status, details)
       VALUES ($1, $2, $3, $4)`, ["WebhookReceived", "0x", "success", JSON.stringify(req.body)]);
        res.json({ ok: true });
    }
    catch (error) {
        next(error);
    }
});
