import { Router } from "express"
import { db } from "../config/db.js"

export const portfolioRoute = Router()

portfolioRoute.get("/", async (req, res, next) => {
  try {
    const wallet = String(req.query.wallet || "").toLowerCase()
    if (!wallet) return res.status(400).json({ error: "wallet is required" })

    const [positions, balances] = await Promise.all([
      db.query(
        `SELECT * FROM vault_positions WHERE wallet_address = $1 ORDER BY updated_at DESC LIMIT 20`,
        [wallet]
      ),
      db.query(
        `SELECT chain_id, chain_name, wallet_address AS wallet, usdc_balance AS usdc, yld_balance AS yld, native_balance AS native, updated_at
         FROM cross_chain_balances WHERE wallet_address = $1 ORDER BY updated_at DESC`,
        [wallet]
      ),
    ])

    res.json({ positions: positions.rows, crossChainBalances: balances.rows })
  } catch (error) {
    next(error)
  }
})
