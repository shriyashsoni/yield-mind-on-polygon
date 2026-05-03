import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DocPageShell } from "@/components/docs/doc-page"
import { Admonition, H2, P, StatGrid, Stat } from "@/components/docs/primitives"
import { DOC_CATEGORIES, getDocBySlug, getOrderedDocs, docPath } from "@/lib/docs/registry"

export const metadata = {
  title: "YieldMind Docs · Introduction",
  description: "AI-driven autonomous yield optimisation on Polygon Amoy.",
}

export default function DocsIndexPage() {
  const page = getDocBySlug("")!
  const ordered = getOrderedDocs().filter((p) => p.slug !== "")

  return (
    <DocPageShell page={page}>
      <H2 id="what-is-yieldmind">What is YieldMind?</H2>
      <P>
        YieldMind is an autonomous DeFi protocol that pools deposits, scores opportunities with an AI agent, and
        rebalances across whitelisted strategies (Aave, Compound, Curve, Balancer, Uniswap). Every state transition
        — deposit, withdraw, rebalance, vote — is on-chain and auditable on Polygon Amoy.
      </P>

      <StatGrid>
        <Stat title="Live network" value="Polygon Amoy" sub="Chain 80002" />
        <Stat title="Vault" value="YieldVaultV4" sub="ERC-4626 inspired" />
        <Stat title="Agent" value="Groq Llama 3.3" sub="70B versatile" />
        <Stat title="Governance" value="OZ Governor" sub="Token-weighted" />
      </StatGrid>

      <H2 id="design-principles">Design principles</H2>
      <P>
        Three rules drive every decision in this codebase: every number the UI shows must come from a contract or
        a real model output, the AI never holds custody, and the user can always exit by burning shares — even when
        the agent is offline.
      </P>

      <Admonition kind="tip" title="No mocks">
        The dashboard, governance and API routes all read from <code>readProtocolSnapshot()</code> against the
        deployed Amoy contracts. There is no demo data path.
      </Admonition>

      <H2 id="live-network">Live network</H2>
      <P>
        The current deployment lives on Polygon Amoy testnet. See{" "}
        <Link href="/docs/contracts" className="text-white underline-offset-4 hover:underline">
          deployed contracts
        </Link>{" "}
        for canonical addresses and{" "}
        <Link href="/docs/quickstart" className="text-white underline-offset-4 hover:underline">
          quickstart
        </Link>{" "}
        to make your first deposit.
      </P>

      <div className="not-prose mt-10 space-y-6">
        {DOC_CATEGORIES.filter((c) => c.id !== "getting-started" || ordered.some((p) => p.category === c.id)).map(
          (cat) => {
            const pages = ordered.filter((p) => p.category === cat.id)
            if (pages.length === 0) return null
            return (
              <section key={cat.id}>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {cat.label}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {pages.map((p) => (
                    <Link
                      key={p.slug}
                      href={docPath(p.slug)}
                      className="group flex h-full flex-col justify-between border border-white/10 p-4 transition-colors hover:border-white/40 hover:bg-white/[0.02]"
                    >
                      <div>
                        <div className="text-[15px] font-semibold text-white">{p.title}</div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{p.description}</p>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 group-hover:text-white">
                        Read <ArrowRight className="size-3" aria-hidden />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          },
        )}
      </div>
    </DocPageShell>
  )
}
