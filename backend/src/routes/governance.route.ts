import { Router } from "express"
import { db } from "../config/db.js"

export const governanceRoute = Router()

governanceRoute.get("/", async (_req, res, next) => {
  try {
    const votes = await db.query(
      `SELECT proposal_id, support, weight, wallet_address, tx_hash, created_at
       FROM governance_votes ORDER BY created_at DESC LIMIT 100`
    )
    res.json({ votes: votes.rows })
  } catch (error) {
    next(error)
  }
})
