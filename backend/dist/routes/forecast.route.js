import { Router } from "express";
import { db } from "../config/db.js";
export const forecastRoute = Router();
forecastRoute.get("/", async (_req, res, next) => {
    try {
        const data = await db.query(`SELECT recommendation, confidence, model_version, created_at
       FROM ai_recommendations ORDER BY created_at DESC LIMIT 10`);
        res.json({ forecasts: data.rows });
    }
    catch (error) {
        next(error);
    }
});
