"use client"

import { createConfig, http } from "wagmi"
import { polygonAmoy } from "wagmi/chains"
import { injected, walletConnect } from "@wagmi/connectors"

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ""

// Use the actual runtime origin so it matches the domain you registered
// in your Reown / WalletConnect Cloud allowlist. Falls back to a sane
// default during SSR / build.
const appOrigin =
  typeof window !== "undefined" ? window.location.origin : "https://yieldmind.app"

const isWcConfigured =
  projectId.length > 0 &&
  projectId !== "00000000000000000000000000000000" &&
  projectId !== "your-walletconnect-project-id"

if (typeof window !== "undefined") {
  // Helps you confirm in the browser console whether the WalletConnect
  // connector was actually wired up at runtime.
  console.log("[v0] wagmi config", {
    walletConnectEnabled: isWcConfigured,
    projectIdPresent: projectId.length > 0,
    origin: appOrigin,
  })
}

const connectors = [
  injected({ shimDisconnect: true }),
  ...(isWcConfigured
    ? [
        walletConnect({
          projectId,
          showQrModal: true,
          metadata: {
            name: "YieldMind",
            description: "AI-driven DeFi yield optimization on Polygon",
            url: appOrigin,
            icons: [`${appOrigin}/logos/polygon.png`],
          },
        }),
      ]
    : []),
]

// The whole app runs on Polygon Amoy testnet (chain 80002).
// Mainnet is intentionally excluded so every connected wallet always lands on the testnet.
export const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  connectors,
  transports: {
    [polygonAmoy.id]: http("https://rpc-amoy.polygon.technology"),
  },
  ssr: true,
})

export const SUPPORTED_CHAIN_IDS = [polygonAmoy.id] as const
export const DEFAULT_CHAIN_ID = polygonAmoy.id
export const AMOY_CHAIN_ID = polygonAmoy.id
export const WALLETCONNECT_ENABLED = isWcConfigured

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig
  }
}
