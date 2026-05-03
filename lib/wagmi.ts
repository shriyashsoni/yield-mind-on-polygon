"use client"

import { createConfig, http } from "wagmi"
import { polygon, polygonAmoy } from "wagmi/chains"
import { injected, walletConnect } from "@wagmi/connectors"

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  // Fallback Reown demo projectId — works for development but should be replaced
  // in production via the env var. Avoids "missing projectId" build errors.
  "00000000000000000000000000000000"

// Build connector list. The WalletConnect connector is only added when a real
// projectId is configured so we don't surface a non-functional QR option.
const connectors = [
  injected({ shimDisconnect: true }),
  ...(projectId && projectId !== "00000000000000000000000000000000"
    ? [
        walletConnect({
          projectId,
          showQrModal: true,
          metadata: {
            name: "YieldMind",
            description: "AI-driven DeFi yield optimization on Polygon",
            url: "https://yieldmind.xyz",
            icons: ["/logos/polygon.png"],
          },
        }),
      ]
    : []),
]

export const wagmiConfig = createConfig({
  chains: [polygon, polygonAmoy],
  connectors,
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
  ssr: true,
})

export const SUPPORTED_CHAIN_IDS = [polygon.id, polygonAmoy.id] as const
export const DEFAULT_CHAIN_ID = polygonAmoy.id

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig
  }
}
