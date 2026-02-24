import { Router } from "express";
import { db } from "../config/db.js";
export const rebalanceHistoryRoute = Router();
rebalanceHistoryRoute.get("/", async (_req, res, next) => {
    try {
        const rows = await db.query(`SELECT * FROM rebalances ORDER BY executed_at DESC LIMIT 100`);
        res.json({ history: rows.rows });
    }
    catch (error) {
        next(error);
    }
});
