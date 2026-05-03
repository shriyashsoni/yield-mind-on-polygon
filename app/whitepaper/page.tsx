"use client"

import Link from "next/link"
import { SiteNav } from "@/components/landing/site-nav"
import { SiteFooter } from "@/components/landing/site-footer"
import { Admonition, CodeBlock, H2, H3, Hr, Mono, Ol, P, Stat, StatGrid, Ul } from "@/components/docs/primitives"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"

const SECTIONS = [
  { id: "abstract", title: "Abstract" },
  { id: "introduction", title: "1. Introduction" },
  { id: "architecture", title: "2. System Architecture" },
  { id: "ai-engine", title: "3. The AI Engine" },
  { id: "polygon", title: "4. Polygon Integration" },
  { id: "risk", title: "5. Risk Management" },
  { id: "governance", title: "6. Governance" },
  { id: "tokenomics", title: "7. Tokenomics" },
  { id: "contracts", title: "8. Deployed Contracts" },
  { id: "roadmap", title: "9. Roadmap" },
  { id: "conclusion", title: "10. Conclusion" },
  { id: "references", title: "References" },
]

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-black">
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Technical Whitepaper · v6.0 · Polygon Amoy
            </div>

            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              YieldMind: AI-Powered DeFi Portfolio Optimization
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/65 md:text-lg">
              An autonomous, on-chain portfolio optimizer that allocates capital across DeFi protocols using a
              Groq-hosted reasoning agent, a Pyth-fed AI Oracle, and a circuit-breaker risk module — all fully
              transparent on Polygon.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="ym-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                Open the dashboard <span aria-hidden>→</span>
              </Link>
              <Link
                href="/docs/contracts"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white hover:text-white"
              >
                View deployed contracts
              </Link>
              <a
                href="https://github.com/shriyashsoni/yelid-mind-smart-contract"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white hover:text-white"
              >
                GitHub
              </a>
            </div>

            <StatGrid>
              <Stat title="AI Engine" value="v6.0" sub="Groq · Llama 3.3" />
              <Stat title="Network" value="Polygon Amoy" sub="Chain ID 80002" />
              <Stat title="Contracts" value="10" sub="Deployed & verified" />
              <Stat title="Performance fee" value="10%" sub="On profits only" />
            </StatGrid>
          </div>
        </section>

        {/* Body */}
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 md:px-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Contents
              </div>
              <nav className="mt-3 flex flex-col gap-1.5 border-l border-white/10 pl-3">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="-ml-3 border-l-2 border-transparent pl-3 text-sm text-white/55 transition-colors hover:border-white hover:text-white"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="max-w-3xl space-y-1">
            <section className="space-y-3">
              <H2 id="abstract">Abstract</H2>
              <P>
                YieldMind is an autonomous, on-chain portfolio optimizer that allocates user capital across
                multiple DeFi protocols on Polygon. The system combines a Groq-hosted reasoning agent, a
                Pyth-fed on-chain oracle, and a circuit-breaker risk module to continuously optimize for
                risk-adjusted yield. All decisions, signals, and rebalances are recorded on-chain and
                governed by YLD-token holders, removing the opacity that has historically plagued
                yield-aggregator products.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="introduction">1. Introduction</H2>
              <P>
                DeFi has compounded into hundreds of yield-bearing protocols. For an end user the result is
                paradoxically worse: capital sits idle in a single venue, or chases the highest visible APY
                — often a temporary signal that decays once liquidity arrives. Skilled allocators rebalance
                continuously, model gas, and maintain protocol-risk dossiers. That work is invisible to
                most users and prohibitively expensive on Ethereum mainnet.
              </P>
              <P>
                YieldMind is built on the thesis that <Mono>continuous, accountable</Mono> portfolio
                management is now feasible: language-model agents can reason over high-dimensional state,
                Polygon makes frequent rebalancing economical, and on-chain risk modules can backstop
                automated execution. The protocol packages those three primitives into a single ERC-4626
                vault that any user can deposit into.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="architecture">2. System Architecture</H2>
              <P>
                YieldMind&apos;s contracts are organized as five concentric layers. Each layer is independently
                upgradeable through governance and isolated by access control.
              </P>
              <H3 id="vault-layer">2.1 Vault layer (YieldVaultV4)</H3>
              <P>
                The vault is an ERC-4626 share token. <Mono>deposit()</Mono> mints proportional shares,{" "}
                <Mono>withdraw()</Mono> burns them, and <Mono>rebalance(twap, spot)</Mono> hands the active
                allocation to the StrategyManager. Deposits never sit on the vault — they are immediately
                routed by weight to underlying strategies.
              </P>

              <H3 id="strategy-layer">2.2 Strategy layer (StrategyManager)</H3>
              <P>
                Each strategy is an isolated adapter contract. The manager keeps a registry of{" "}
                <Mono>active</Mono>, <Mono>daoApproved</Mono>, weighted, and risk-scored strategies. Adding
                or removing a strategy requires a Governor proposal, and weight changes ≥10% require a
                timelocked execution.
              </P>

              <H3 id="ai-layer">2.3 AI layer (AIOracle + off-chain agent)</H3>
              <P>
                The AI Oracle is the on-chain mailbox for the off-chain agent. The agent reads protocol
                state from the same chain reader the dashboard uses, queries Groq with the protocol prompt,
                and writes the structured allocation result to the oracle via{" "}
                <Mono>updateForecast()</Mono>. The vault&apos;s <Mono>rebalance()</Mono> consumes that
                forecast — never the agent directly.
              </P>

              <H3 id="risk-layer">2.4 Risk layer (RiskGuard + InsuranceReserve)</H3>
              <P>
                Before any rebalance executes, the vault asks <Mono>RiskGuard.canRebalance()</Mono>. The
                guard returns false if the system risk score breaches the configured threshold or if the
                circuit breaker is tripped. The InsuranceReserve holds a slice of fees as a backstop for
                strategy failures and is itself governed.
              </P>

              <H3 id="governance-layer">2.5 Governance layer (Governor + Timelock + YLD Staking)</H3>
              <P>
                YLD holders vote on strategy adds/removes, fee changes, risk parameters, and emergency
                actions. Every executed proposal flows through a 48-hour Timelock so users can exit before
                state-changing decisions land. Staked YLD earns a share of the performance fee and counts
                fully toward voting power.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="ai-engine">3. The AI Engine</H2>
              <P>
                The agent is intentionally not a black box. It is a Groq-hosted Llama-3.3-70B model called
                with a deterministic system prompt and the live on-chain snapshot. Every call returns a
                strict, schema-validated JSON object: a headline, risk band, confidence score,
                recommendation enum, target allocation per strategy, and an array of human-readable signals.
              </P>
              <CodeBlock
                language="json"
                code={`{
  "headline": "Reduce volatility, tilt to lending",
  "riskBand": "moderate",
  "confidence": 0.82,
  "recommendation": "rebalance",
  "allocation": [
    { "strategyId": "0x..", "weightBps": 4500 },
    { "strategyId": "0x..", "weightBps": 3500 },
    { "strategyId": "0x..", "weightBps": 2000 }
  ],
  "signals": [
    "USDC lending APY +18bps over 24h",
    "Volatility rising on volatile-pair LPs",
    "Risk score under threshold, rebalance allowed"
  ]
}`}
              />
              <Admonition kind="note" title="Why structured output">
                Because the recommendation is parsed and validated by the API route, the AI cannot
                accidentally trigger an unsafe state. Anything outside the JSON schema is rejected; anything
                inside the schema is bounded to safe weights and known strategies.
              </Admonition>
            </section>

            <section className="space-y-3">
              <H2 id="polygon">4. Polygon Integration</H2>
              <P>
                YieldMind targets Polygon for three concrete reasons: rebalances cost cents instead of tens
                of dollars; finality is fast enough that the vault can react to volatility within a single
                block; and EVM equivalence means strategies plug into Aave, Balancer, Curve, and the rest of
                the existing Polygon DeFi stack without bespoke adapters.
              </P>
              <Ul>
                <li>Sub-cent transaction cost makes minute-grained rebalancing viable.</li>
                <li>Pyth and Chainlink oracles are both natively available.</li>
                <li>Verified contracts are queryable on <Mono>amoy.polygonscan.com</Mono> by anyone.</li>
                <li>Polygon&apos;s account abstraction work pairs naturally with the autonomous executor.</li>
              </Ul>
            </section>

            <section className="space-y-3">
              <H2 id="risk">5. Risk Management</H2>
              <P>YieldMind applies five layers of risk control before any user is exposed to a strategy:</P>
              <Ol>
                <li>
                  <strong className="text-white">Strategy approval gate:</strong> only DAO-approved strategies
                  ever receive flow.
                </li>
                <li>
                  <strong className="text-white">Per-strategy weight cap:</strong> no single venue may exceed
                  its configured ceiling.
                </li>
                <li>
                  <strong className="text-white">RiskGuard system score:</strong> a real-time score that
                  blocks rebalances when stressed.
                </li>
                <li>
                  <strong className="text-white">Circuit breaker:</strong> a guardian-callable kill switch
                  that pauses the vault.
                </li>
                <li>
                  <strong className="text-white">Insurance Reserve:</strong> protocol-owned capital that
                  socializes any single-venue loss.
                </li>
              </Ol>
              <Admonition kind="warning" title="No system is risk-free">
                YieldMind reduces operational and concentration risk; it does not remove smart-contract or
                oracle risk. Users should size positions accordingly.
              </Admonition>
            </section>

            <section className="space-y-3">
              <H2 id="governance">6. Governance</H2>
              <P>
                Governance flows through OpenZeppelin&apos;s Governor + Timelock pattern. Voting power equals
                YLD balance plus staked YLD, snapshotted at proposal creation. Anything that touches user
                funds — strategy adds, fee changes, risk-parameter updates — must go through the
                <Mono>YieldMindGovernor</Mono> and queue through the 48-hour Timelock.
              </P>
              <P>
                Day-to-day rebalances are <em>not</em> governed: those are AI-driven and bounded by the
                approved strategy set and risk limits. Governance defines the box; the agent moves inside
                it.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="tokenomics">7. Tokenomics</H2>
              <P>
                The protocol charges a single performance fee on realized profit. There are no deposit or
                withdrawal fees — users can exit at any time at the current share price.
              </P>
              <StatGrid>
                <Stat title="Performance fee" value="10%" sub="On profits only" />
                <Stat title="Holders share" value="70%" sub="Auto-compounded" />
                <Stat title="Treasury" value="20%" sub="DAO controlled" />
                <Stat title="AI / infra" value="10%" sub="Agent + oracles" />
              </StatGrid>
              <P>
                The 70% share holders portion compounds back into the vault each cycle, increasing the
                ymShare price. The 20% treasury is held by the Timelock and deployed by governance. The 10%
                AI / infra slice funds the off-chain agent, oracle gas, and protocol monitoring.
              </P>
            </section>

            <section className="space-y-3">
              <H2 id="contracts">8. Deployed Contracts</H2>
              <P>
                All ten contracts of the Wave 6 release are deployed and verified on Polygon Amoy. The
                addresses are wired directly into both the dashboard and the documentation; nothing is
                stubbed or mocked.
              </P>
              <div className="not-prose mt-4 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
                {Object.entries(CONTRACT_ADDRESSES.AMOY).map(([name, address]) => (
                  <a
                    key={name}
                    href={`https://amoy.polygonscan.com/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between bg-black/40 p-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                        {name}
                      </div>
                      <div className="mt-1 truncate font-mono text-xs text-white">{address}</div>
                    </div>
                    <span aria-hidden className="ml-3 font-mono text-xs text-white/40">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <H2 id="roadmap">9. Roadmap</H2>
              <H3 id="rm-q1">Phase 1 — Wave 6 (Live)</H3>
              <Ul>
                <li>YieldVaultV4 + StrategyManager + RiskGuard + AIOracle on Amoy.</li>
                <li>Groq-hosted reasoning agent in production.</li>
                <li>Governor + Timelock with on-chain proposal voting.</li>
              </Ul>
              <H3 id="rm-q2">Phase 2 — Mainnet & cross-chain</H3>
              <Ul>
                <li>Audited deployment on Polygon mainnet.</li>
                <li>Cross-chain liquidity router (Polygon ↔ Arbitrum ↔ Base).</li>
                <li>Account-abstraction wrapper for one-click vaults.</li>
              </Ul>
              <H3 id="rm-q3">Phase 3 — Institutional</H3>
              <Ul>
                <li>Portfolio mandates (per-LP risk profile).</li>
                <li>Insurance tranches and risk-bucketed shares.</li>
                <li>Enterprise API with SLAs.</li>
              </Ul>
            </section>

            <section className="space-y-3">
              <H2 id="conclusion">10. Conclusion</H2>
              <P>
                Yield optimization should not require a private quant desk. By pairing accountable AI with
                cheap, transparent execution on Polygon, YieldMind brings continuous, risk-aware portfolio
                management to any wallet. The contracts are deployed, the agent is live, and the vault is
                open.
              </P>
              <Admonition kind="tip" title="Try it now">
                Connect a wallet on Polygon Amoy, deposit a test USDC, and watch the agent reason and
                rebalance in real time on the{" "}
                <Link href="/dashboard" className="underline hover:text-white">
                  dashboard
                </Link>
                .
              </Admonition>
            </section>

            <Hr />

            <section className="space-y-2">
              <H2 id="references">References</H2>
              <ul className="space-y-1.5 text-[14px] text-white/55">
                <li>[1] Polygon zkEVM — https://polygon.technology/polygon-zkevm</li>
                <li>[2] OpenZeppelin Governor — https://docs.openzeppelin.com/contracts/governance</li>
                <li>[3] ERC-4626 Tokenized Vault Standard — https://eips.ethereum.org/EIPS/eip-4626</li>
                <li>[4] Pyth Network — https://pyth.network</li>
                <li>[5] Chainlink Price Feeds — https://docs.chain.link</li>
                <li>[6] Groq Inference — https://groq.com</li>
                <li>[7] YieldMind Smart Contracts — https://github.com/shriyashsoni/yelid-mind-smart-contract</li>
              </ul>
            </section>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
