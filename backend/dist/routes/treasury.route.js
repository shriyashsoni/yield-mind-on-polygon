import { Router } from "express";
import { db } from "../config/db.js";
export const treasuryRoute = Router();
treasuryRoute.get("/", async (_req, res, next) => {
    try {
        const rows = await db.query(`SELECT * FROM treasury_stats ORDER BY captured_at DESC LIMIT 30`);
        res.json({ treasury: rows.rows });
    }
    catch (error) {
        next(error);
    }
});
