"use client"

import { ExternalLink, Github } from "lucide-react"
import { Panel } from "./panel"

const REPO = "https://github.com/shriyashsoni/yelid-mind-smart-contract"

export function OpenSourceCard() {
  return (
    <Panel eyebrow="Open source" title="Inspect the protocol contracts">
      <p className="text-sm text-white/55">
        We don&apos;t inline raw contract addresses in the app. Open the GitHub repository for the canonical
        source, audited ABIs, and the deployment manifest, or verify any contract on Polygonscan directly.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer"
          className="group flex items-start justify-between gap-4 border border-white/12 bg-white/[0.02] p-5 transition-colors hover:border-white/30 hover:bg-white/[0.05]"
        >
          <div className="flex items-start gap-3">
            <Github className="size-4 shrink-0 text-white/55 transition-colors group-hover:text-white" aria-hidden />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Source</div>
              <div className="mt-1 text-sm font-medium text-white">GitHub repository</div>
              <div className="mt-1 text-xs text-white/55">
                Solidity sources, ABIs, deployment scripts, addresses file.
              </div>
            </div>
          </div>
          <ExternalLink className="size-4 shrink-0 text-white/40 transition-colors group-hover:text-white" aria-hidden />
        </a>

        <a
          href="https://amoy.polygonscan.com"
          target="_blank"
          rel="noreferrer"
          className="group flex items-start justify-between gap-4 border border-white/12 bg-white/[0.02] p-5 transition-colors hover:border-white/30 hover:bg-white/[0.05]"
        >
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center font-mono text-[11px] text-white/55 transition-colors group-hover:text-white">
              ⬡
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Verify</div>
              <div className="mt-1 text-sm font-medium text-white">Polygonscan (Amoy)</div>
              <div className="mt-1 text-xs text-white/55">
                Independently inspect verified bytecode, storage, and events.
              </div>
            </div>
          </div>
          <ExternalLink className="size-4 shrink-0 text-white/40 transition-colors group-hover:text-white" aria-hidden />
        </a>
      </div>
    </Panel>
  )
}
