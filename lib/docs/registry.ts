export type DocHeading = { id: string; label: string; depth?: 2 | 3 }

export type DocPage = {
  slug: string // "" = /docs index
  title: string
  description: string
  category: string
  order: number
  headings: DocHeading[]
}

export const DOC_CATEGORIES = [
  { id: "getting-started", label: "Getting started" },
  { id: "protocol", label: "Protocol" },
  { id: "ai-agent", label: "AI agent" },
  { id: "developers", label: "Developers" },
] as const

export const DOC_PAGES: DocPage[] = [
  {
    slug: "",
    title: "Introduction",
    description:
      "YieldMind is an autonomous, AI-driven yield optimisation protocol on Polygon. This is the canonical reference.",
    category: "getting-started",
    order: 1,
    headings: [
      { id: "what-is-yieldmind", label: "What is YieldMind?" },
      { id: "design-principles", label: "Design principles" },
      { id: "live-network", label: "Live network" },
    ],
  },
  {
    slug: "quickstart",
    title: "Quickstart",
    description: "Connect a wallet on Polygon Amoy, deposit into the vault, and watch the AI agent rebalance.",
    category: "getting-started",
    order: 2,
    headings: [
      { id: "prerequisites", label: "Prerequisites" },
      { id: "connect-wallet", label: "Connect wallet" },
      { id: "deposit", label: "Deposit" },
      { id: "next-steps", label: "Next steps" },
    ],
  },
  {
    slug: "architecture",
    title: "Architecture",
    description: "How the six core contracts cooperate to deliver autonomous yield with on-chain risk control.",
    category: "protocol",
    order: 3,
    headings: [
      { id: "overview", label: "Overview" },
      { id: "control-flow", label: "Control flow" },
      { id: "trust-model", label: "Trust model" },
    ],
  },
  {
    slug: "vault",
    title: "Vault & shares",
    description: "YieldVaultV4 is the only contract user funds touch. It issues YLD shares and tracks yield rate.",
    category: "protocol",
    order: 4,
    headings: [
      { id: "interface", label: "Interface" },
      { id: "share-math", label: "Share math" },
      { id: "events", label: "Events" },
    ],
  },
  {
    slug: "risk-guard",
    title: "Risk guard",
    description: "On-chain risk score, insurance reserve and protection switch. Every executor action is gated by this contract.",
    category: "protocol",
    order: 5,
    headings: [
      { id: "score", label: "Risk score" },
      { id: "protection", label: "Protection switch" },
      { id: "reserve", label: "Insurance reserve" },
    ],
  },
  {
    slug: "governance",
    title: "Governance",
    description: "Token-weighted voting via the OpenZeppelin Governor interface.",
    category: "protocol",
    order: 6,
    headings: [
      { id: "lifecycle", label: "Proposal lifecycle" },
      { id: "voting", label: "Voting" },
      { id: "proposing", label: "Creating proposals" },
    ],
  },
  {
    slug: "ai-agent",
    title: "The AI agent",
    description: "Groq-powered Llama 3.3 reasons over the live on-chain snapshot and returns structured insight.",
    category: "ai-agent",
    order: 7,
    headings: [
      { id: "loop", label: "Reasoning loop" },
      { id: "schema", label: "Output schema" },
      { id: "streaming", label: "Streaming reasoning" },
    ],
  },
  {
    slug: "contracts",
    title: "Deployed contracts",
    description: "All canonical addresses on Polygon Amoy with explorer links.",
    category: "developers",
    order: 8,
    headings: [
      { id: "amoy", label: "Polygon Amoy" },
      { id: "verifying", label: "Verifying contracts" },
    ],
  },
  {
    slug: "api-reference",
    title: "REST API",
    description: "Public, edge-cached endpoints powering the dashboard.",
    category: "developers",
    order: 9,
    headings: [
      { id: "snapshot", label: "GET /api/onchain/snapshot" },
      { id: "insights", label: "GET /api/ai/insights" },
      { id: "rebalance", label: "POST /api/ai/rebalance" },
      { id: "governance", label: "GET /api/governance/proposals" },
    ],
  },
  {
    slug: "integrate",
    title: "Integrate",
    description: "Read protocol state from your own dApp, indexer or backend service.",
    category: "developers",
    order: 10,
    headings: [
      { id: "read-via-rest", label: "Read via REST" },
      { id: "read-via-ethers", label: "Read via ethers" },
      { id: "submitting-tx", label: "Submitting transactions" },
    ],
  },
]

export function getDocBySlug(slug: string): DocPage | undefined {
  return DOC_PAGES.find((p) => p.slug === slug)
}

export function getOrderedDocs(): DocPage[] {
  return [...DOC_PAGES].sort((a, b) => a.order - b.order)
}

export function getPagerFor(slug: string): { prev?: DocPage; next?: DocPage } {
  const ordered = getOrderedDocs()
  const idx = ordered.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? ordered[idx - 1] : undefined,
    next: idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : undefined,
  }
}

export function docPath(slug: string): string {
  return slug === "" ? "/docs" : `/docs/${slug}`
}
