import type { NextFunction, Request, Response } from "express"
import { redis } from "../config/redis.js"

export function createRateLimiter(limit: number, windowMs: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `ratelimit:${req.ip}:${Math.floor(Date.now() / windowMs)}`
    const current = await redis.incr(key)
    if (current === 1) await redis.pexpire(key, windowMs)

    if (current > limit) {
      return res.status(429).json({ error: "Too many requests" })
    }

    next()
  }
}
