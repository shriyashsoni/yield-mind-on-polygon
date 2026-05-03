"use client"

import { useState } from "react"
import { Check, Copy, ExternalLink } from "lucide-react"
import { DocPageShell } from "@/components/docs/doc-page"
import { Admonition, H2, P } from "@/components/docs/primitives"
import { CONTRACT_ADDRESSES } from "@/lib/contract-abis"
import { getDocBySlug } from "@/lib/docs/registry"

export default function Page() {
  const page = getDocBySlug("contracts")!
  return (
    <DocPageShell page={page}>
      <H2 id="amoy">Polygon Amoy</H2>
      <P>
        These are the canonical deployment addresses on chain id <code>80002</code>. They are sourced from{" "}
        <code>lib/contract-abis.ts</code> and read live by the dashboard.
      </P>

      <div className="not-prose my-6 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
        {Object.entries(CONTRACT_ADDRESSES.AMOY).map(([k, v]) => (
          <AddressRow key={k} name={k} address={v} />
        ))}
      </div>

      <H2 id="verifying">Verifying contracts</H2>
      <P>
        Every address links to <a className="text-white underline-offset-4 hover:underline" href="https://amoy.polygonscan.com" target="_blank" rel="noreferrer">amoy.polygonscan.com</a>. Source is verified
        against the audited Wave-4 release tag.
      </P>
      <Admonition kind="note">
        Mainnet deployment is gated on a successful third-party audit pass. Subscribe to the project&apos;s GitHub
        releases to track promotion.
      </Admonition>
    </DocPageShell>
  )
}

function AddressRow({ name, address }: { name: string; address: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
  }
  return (
    <div className="flex flex-col gap-2 bg-black/40 p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{name}</div>
      <div className="flex items-center gap-2">
        <code className="flex-1 truncate font-mono text-[12.5px] text-white">{address}</code>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${name} address`}
          className="border border-white/15 p-1.5 text-white/55 hover:bg-white/5 hover:text-white"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
        <a
          href={`https://amoy.polygonscan.com/address/${address}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${name} on Polygonscan`}
          className="border border-white/15 p-1.5 text-white/55 hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  )
}
