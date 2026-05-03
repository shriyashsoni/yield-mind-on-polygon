"use client"

import { ExternalLink } from "lucide-react"
import { DocPageShell } from "@/components/docs/doc-page"
import { Admonition, H2, P } from "@/components/docs/primitives"
import { getDocBySlug } from "@/lib/docs/registry"

const CONTRACTS = [
  { name: "YieldVaultV4", desc: "ERC-4626 vault that holds user deposits and routes yield.", path: "contracts/YieldVaultV4.sol" },
  { name: "AIOracle", desc: "On-chain interface where the off-chain agent posts strategy decisions.", path: "contracts/AIOracle.sol" },
  { name: "RiskGuard", desc: "Risk scoring + circuit breaker. Pauses the vault under stress.", path: "contracts/RiskGuard.sol" },
  { name: "StrategyManager", desc: "Whitelist and lifecycle of yield strategies.", path: "contracts/StrategyManager.sol" },
  { name: "AutonomousExecutor", desc: "Bounded executor that turns AI decisions into vault calls.", path: "contracts/AutonomousExecutor.sol" },
  { name: "InsuranceReserve", desc: "Reserve fund that backstops capital under loss events.", path: "contracts/InsuranceReserve.sol" },
  { name: "YLDToken / YLDStaking", desc: "Governance + staking token with reward distribution.", path: "contracts/YLDToken.sol" },
  { name: "YieldMindGovernor", desc: "OpenZeppelin Governor with Timelock for protocol upgrades.", path: "contracts/YieldMindGovernor.sol" },
]

const REPO = "https://github.com/shriyashsoni/yelid-mind-smart-contract"

export default function Page() {
  const page = getDocBySlug("contracts")!
  return (
    <DocPageShell page={page}>
      <H2 id="overview">Source of truth</H2>
      <P>
        The full set of audited Wave 6 contracts is open source. To keep the docs readable we don&apos;t
        inline raw addresses — open the GitHub repository for the canonical source, ABIs, and the deployment
        manifest, and use Polygonscan to independently verify storage and events.
      </P>

      <div className="not-prose my-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        <LinkCard
          eyebrow="Source"
          title="GitHub repository"
          desc="Solidity sources, ABIs, deployment scripts, and addresses file."
          href={REPO}
        />
        <LinkCard
          eyebrow="Verify"
          title="Polygonscan (Amoy)"
          desc="Independently inspect verified bytecode, storage, and events."
          href="https://amoy.polygonscan.com"
        />
      </div>

      <H2 id="contracts">Contracts in the release</H2>
      <P>
        Each contract has a short description below and links directly to its source file in the repository.
        Click through to read the implementation, run tests, or build against the ABI.
      </P>
      <div className="not-prose my-6 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
        {CONTRACTS.map((c) => (
          <a
            key={c.name}
            href={`${REPO}/blob/main/${c.path}`}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-1.5 bg-black/40 p-4 transition-colors hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                {c.name}
              </div>
              <ExternalLink className="size-3.5 text-white/30 transition-colors group-hover:text-white" aria-hidden />
            </div>
            <p className="text-sm leading-relaxed text-white/70">{c.desc}</p>
          </a>
        ))}
      </div>

      <Admonition kind="note">
        Mainnet deployment is gated on a successful third-party audit pass. Subscribe to the project&apos;s{" "}
        <a className="text-white underline-offset-4 hover:underline" href={`${REPO}/releases`} target="_blank" rel="noreferrer">
          GitHub releases
        </a>{" "}
        to track promotion.
      </Admonition>
    </DocPageShell>
  )
}

function LinkCard({
  eyebrow,
  title,
  desc,
  href,
}: {
  eyebrow: string
  title: string
  desc: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start justify-between gap-4 border border-white/12 bg-white/[0.02] p-5 transition-colors hover:border-white/30 hover:bg-white/[0.05]"
    >
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{eyebrow}</div>
        <div className="mt-1 text-sm font-medium text-white">{title}</div>
        <div className="mt-1 text-xs text-white/55">{desc}</div>
      </div>
      <ExternalLink className="size-4 text-white/40 transition-colors group-hover:text-white" aria-hidden />
    </a>
  )
}
