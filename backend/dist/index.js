import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { startChainEventListener } from "./listeners/chain-events.listener.js";
async function main() {
    const app = createApp();
    app.listen(env.PORT, () => {
        console.log(`YieldMind backend listening on ${env.PORT}`);
    });
    await startChainEventListener();
}
main().catch((error) => {
    console.error("Fatal startup error", error);
    process.exit(1);
});
