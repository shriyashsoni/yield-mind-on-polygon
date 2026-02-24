import express from "express"
import cors from "cors"
import helmet from "helmet"
import { routes } from "./routes/index.js"
import { createRateLimiter } from "./middleware/rate-limit.js"
import { env } from "./config/env.js"

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(express.json({ limit: "1mb" }))
  app.use(createRateLimiter(env.RATE_LIMIT_MAX, env.RATE_LIMIT_WINDOW_MS))

  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true, uptime: process.uptime() })
  })

  app.use("/api", routes)

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const message = err instanceof Error ? err.message : "Internal server error"
    res.status(500).json({ error: message })
  })

  return app
}
