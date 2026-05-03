"use client"

import { useState } from "react"
import { SiteNav } from "@/components/landing/site-nav"
import { SiteFooter } from "@/components/landing/site-footer"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "ai-agent", label: "AI Agent" },
  { id: "vault", label: "Vault & Shares" },
  { id: "risk", label: "Risk Guard" },
  { id: "governance", label: "Governance" },
  { id: "contracts", label: "Contracts" },
  { id: "api", label: "API Reference" },
  { id: "integrate", label: "Integrate" },
]

export default function DocsPage() {
  const [active, setActive] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="pt-16">
        <div className="border-b border-white/10 bg-black/60">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-10 md:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              <span>Documentation</span>
              <span aria-hidden>·</span>
              <span>Polygon Amoy</span>
              <span aria-hidden>·</span>
              <span>v4 Protocol</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Build with the YieldMind Protocol
            </h1>
            <p className="max-w-3xl text-sm text-white/55 md:text-base">
              YieldMind is an AI-driven yield optimisation protocol on Polygon. This reference covers the deployed
              contracts, the autonomous agent loop, the on-chain risk system, governance, and the public API used by
              this dashboard.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 md:grid-cols-[220px_1fr] md:px-8">
          {/* Sidebar */}
          <aside className="md:sticky md:top-24 md:self-start">
            <nav aria-label="Docs sections" className="border border-white/10">
              <ul>
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setActive(s.id)}
                      className={[
                        "flex items-center justify-between border-white/10 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                        i > 0 ? "border-t" : "",
                        active === s.id ? "bg-white text-black" : "text-white/60 hover:bg-white/5 hover:text-white",
                      ].join(" ")}
                    >
                      <span>{s.label}</span>
                      <span aria-hidden>→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="space-y-16 text-white/80">
            <Section id="overview" eyebrow="01" title="Overview">
              <P>
                YieldMind is an autonomous DeFi vault that pools deposits, scores opportunities with an AI agent, and
                rebalances across whitelisted strategies (Aave, Compound, Curve, Balancer, Uniswap). Every state
                transition — deposit, withdraw, rebalance, vote — is on-chain and auditable on Polygon Amoy.
              </P>
              <Grid>
                <Stat title="Live network" value="Polygon Amoy" sub={`Chain 80002`} />
                <Stat title="Vault" value="YieldVaultV4" sub="ERC-4626 inspired" />
                <Stat title="Agent" value="Groq + ethers" sub="Llama 3.3 70B" />
                <Stat title="Governance" value="OZ Governor" sub="Token-weighted" />
              </Grid>
            </Section>

            <Section id="architecture" eyebrow="02" title="Architecture">
              <P>
                Six contracts cooperate to deliver autonomous yield. The vault is the only contract user funds
                interact with — it delegates capital to the strategy manager, which routes to whitelisted protocol
                adapters under the supervision of the risk guard.
              </P>
              <Diagram />
            </Section>

            <Section id="ai-agent" eyebrow="03" title="The AI agent">
              <P>
                The agent runs server-side on every dashboard load. It reads the live snapshot via{" "}
                <Mono>readProtocolSnapshot()</Mono>, feeds it to Groq&apos;s Llama 3.3 70B model with a structured
                Zod schema, and returns a typed insight: headline, risk band, confidence, recommended action,
                allocation, and live signals. There is no hidden state — the LLM only sees on-chain numbers.
              </P>
              <CodeBlock
                language="ts"
                code={`// app/api/ai/insights/route.ts
const snapshot = await readProtocolSnapshot()
const { object } = await generateObject({
  model: groq("llama-3.3-70b-versatile"),
  schema: InsightSchema,
  system: "You are YieldMind's autonomous AI yield agent...",
  prompt: \`Live snapshot at block \${snapshot.network.blockNumber}...\`,
})
return Response.json({ insight: object, snapshot })`}
              />
            </Section>

            <Section id="vault" eyebrow="04" title="Vault & shares">
              <P>
                <Mono>YieldVaultV4</Mono> issues YLD shares against deposits, tracks <Mono>totalAssets()</Mono> and a
                public <Mono>yieldRate()</Mono> in basis points. The conversion between assets and shares is
                deterministic and on-chain.
              </P>
              <CodeBlock
                language="solidity"
                code={`function deposit(uint256 assets, address receiver) external returns (uint256 shares);
function withdraw(uint256 shares, address receiver) external returns (uint256 assets);
function totalAssets() external view returns (uint256);
function yieldRate()  external view returns (uint256); // basis points`}
              />
            </Section>

            <Section id="risk" eyebrow="05" title="Risk guard">
              <P>
                <Mono>RiskGuard</Mono> exposes a 0–100 system risk score, an insurance reserve and a
                <Mono> protectionActive()</Mono> flag. The autonomous executor refuses to deploy capital when the
                guard returns a score above the configured ceiling.
              </P>
              <CodeBlock
                language="solidity"
                code={`function getRiskScore() external view returns (uint256); // 0..100
function insuranceReserve() external view returns (uint256);
function protectionActive() external view returns (bool);`}
              />
            </Section>

            <Section id="governance" eyebrow="06" title="Governance">
              <P>
                Voting is OpenZeppelin&apos;s standard <Mono>Governor</Mono> interface, weighted by YLD balance.
                Proposals progress through Pending → Active → Succeeded → Queued → Executed, all on-chain.
              </P>
              <CodeBlock
                language="solidity"
                code={`function castVote(uint256 proposalId, uint8 support) external returns (uint256);
function state(uint256 proposalId) external view returns (uint8);
function proposalCount() external view returns (uint256);`}
              />
            </Section>

            <Section id="contracts" eyebrow="07" title="Deployed contracts (Amoy)">
              <ul className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
                {Object.entries(CONTRACT_ADDRESSES.AMOY).map(([k, v]) => (
                  <li key={k} className="bg-black/40 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{k}</div>
                    <a
                      href={`https://amoy.polygonscan.com/address/${v}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block truncate font-mono text-sm text-white hover:text-white/80"
                    >
                      {v} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="api" eyebrow="08" title="REST API">
              <P>
                The dashboard is built on a small set of public endpoints. They are server-rendered, edge-cached for 5
                seconds and require no authentication.
              </P>
              <ApiRow
                method="GET"
                path="/api/onchain/snapshot"
                desc="Unified protocol snapshot — vault, risk, strategies, oracle, governance, events. Optional ?account=0x… includes wallet position."
              />
              <ApiRow
                method="GET"
                path="/api/ai/insights"
                desc="Structured AI insight (headline, risk band, recommendation, allocation, signals)."
              />
              <ApiRow
                method="POST"
                path="/api/ai/rebalance"
                desc="Streaming rebalance reasoning. Body: { account?, question? }. Response: text/plain stream."
              />
              <ApiRow method="GET" path="/api/governance/proposals" desc="Indexed proposals from the Governor contract." />
              <ApiRow method="GET" path="/api/forecast" desc="Predicted APY and oracle confidence." />
            </Section>

            <Section id="integrate" eyebrow="09" title="Integrating with your dApp">
              <P>
                The simplest way to read protocol state from another app is the JSON snapshot endpoint. For wallet
                interactions, point ethers at the deployed addresses with the ABIs in <Mono>lib/contract-abis.ts</Mono>.
              </P>
              <CodeBlock
                language="ts"
                code={`import { ethers } from "ethers"
import { CONTRACT_ADDRESSES, YIELD_VAULT_V4_ABI } from "@/lib/contract-abis"

const provider = new ethers.JsonRpcProvider("https://rpc-amoy.polygon.technology")
const vault = new ethers.Contract(
  CONTRACT_ADDRESSES.AMOY.YieldVaultV4,
  YIELD_VAULT_V4_ABI,
  provider,
)
const tvl = await vault.totalAssets()
const apyBps = await vault.yieldRate()`}
              />
              <P>
                Need help? Open an issue on the GitHub repo or ask the AI agent directly via the dashboard&apos;s live
                rebalance stream.
              </P>
            </Section>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

/* ----------------------------- primitives ----------------------------- */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-5 flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
        <span>{eyebrow}</span>
        <span className="h-px w-8 bg-white/20" aria-hidden />
        <span>Section</span>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-white/70 md:text-base">{children}</p>
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="border border-white/15 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[12px] text-white">
      {children}
    </code>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">{children}</div>
}

function Stat({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="bg-black/40 p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{title}</div>
      <div className="mt-1 text-base font-semibold text-white">{value}</div>
      {sub && <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">{sub}</div>}
    </div>
  )
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="border border-white/10 bg-black">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{language}</span>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(code)}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white"
        >
          Copy
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function ApiRow({ method, path, desc }: { method: string; path: string; desc: string }) {
  return (
    <div className="border border-white/10 bg-black/40 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="border border-white bg-white px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-black">
          {method}
        </span>
        <code className="font-mono text-sm text-white">{path}</code>
      </div>
      <p className="mt-2 text-sm text-white/60">{desc}</p>
    </div>
  )
}

function Diagram() {
  const nodes = [
    { id: "user", label: "User", row: 0, col: 0 },
    { id: "vault", label: "YieldVaultV4", row: 0, col: 1 },
    { id: "manager", label: "StrategyManager", row: 0, col: 2 },
    { id: "executor", label: "AutonomousExecutor", row: 1, col: 2 },
    { id: "oracle", label: "AIOracle", row: 1, col: 1 },
    { id: "risk", label: "RiskGuard", row: 1, col: 0 },
  ]
  return (
    <div className="border border-white/10 bg-black/50 p-6">
      <div className="grid grid-cols-3 gap-px bg-white/10">
        {nodes.map((n) => (
          <div key={n.id} className="flex h-20 items-center justify-center bg-black/60">
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Contract</div>
              <div className="mt-1 text-sm font-semibold text-white">{n.label}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        Deposits flow user → vault → strategy manager. Oracle + risk guard gate every executor action.
      </p>
    </div>
  )
}
