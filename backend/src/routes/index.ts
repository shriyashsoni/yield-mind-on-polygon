import { Router } from "express"
import { portfolioRoute } from "./portfolio.route.js"
import { riskRoute } from "./risk.route.js"
import { forecastRoute } from "./forecast.route.js"
import { rebalanceHistoryRoute } from "./rebalance-history.route.js"
import { governanceRoute } from "./governance.route.js"
import { treasuryRoute } from "./treasury.route.js"
import { webhooksRoute } from "./webhooks.route.js"

export const routes = Router()

routes.use("/portfolio", portfolioRoute)
routes.use("/risk", riskRoute)
routes.use("/forecast", forecastRoute)
routes.use("/rebalance-history", rebalanceHistoryRoute)
routes.use("/governance", governanceRoute)
routes.use("/treasury", treasuryRoute)
routes.use("/webhooks", webhooksRoute)
