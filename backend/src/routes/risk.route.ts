import { Router } from "express"
import { db } from "../config/db.js"

export const riskRoute = Router()

riskRoute.get("/", async (_req, res, next) => {
  try {
    const risk = await db.query(
      `SELECT recommendation, confidence, created_at
       FROM ai_recommendations ORDER BY created_at DESC LIMIT 1`
    )
    res.json({ risk: risk.rows[0] || null })
  } catch (error) {
    next(error)
  }
})
