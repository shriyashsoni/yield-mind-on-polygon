"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { Loader2, ShieldCheck, Smartphone, Wallet } from "lucide-react"
import { useWeb3 } from "@/lib/web3-context"

const FEATURES = [
  {
    icon: Wallet,
    title: "Browser wallets",
    desc: "MetaMask, Rabby, Coinbase Wallet, Brave Wallet, OKX, and any EIP-1193 provider.",
  },
  {
    icon: Smartphone,
    title: "Mobile via WalletConnect",
    desc: "Trust Wallet, Rainbow, MetaMask Mobile, Zerion, Ledger Live — scan a QR code.",
  },
  {
    icon: ShieldCheck,
    title: "Read-only by default",
    desc: "We only read your address and on-chain positions until you sign a transaction.",
  },
]

export function WalletGate({ children }: { children: ReactNode }) {
  const { isConnected, connect, connectWalletConnect } = useWeb3() as ReturnType<typeof useWeb3> & {
    connectWalletConnect?: () => Promise<void>
  }
  const [busy, setBusy] = useState<"injected" | "wc" | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Avoid flicker for already-connected users while the provider rehydrates from localStorage.
  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 60)
    return () => clearTimeout(t)
  }, [])

  if (isConnected) return <>{children}</>
  if (!hydrated) {
    return (
      <div className="mx-auto flex min-h-[40vh] max-w-[1400px] items-center justify-center px-4 py-16">
        <Loader2 className="size-5 animate-spin text-white/40" aria-hidden />
      </div>
    )
  }

  const onInjected = async () => {
    setBusy("injected")
    try {
      await connect()
    } finally {
      setBusy(null)
    }
  }

  const onWalletConnect = async () => {
    if (!connectWalletConnect) {
      // WalletConnect plumbing is loaded lazily; fall back to injected if not yet available.
      return onInjected()
    }
    setBusy("wc")
    try {
      await connectWalletConnect()
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-20">
      <div className="grid items-stretch gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: pitch */}
        <div className="flex flex-col justify-between gap-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
              <span className="size-1.5 rounded-full bg-white" aria-hidden />
              Wallet required
            </div>
            <h1 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Connect a wallet to enter the dashboard.
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/55 md:text-base">
              YieldMind is a non-custodial protocol on Polygon. The dashboard reads your real on-chain
              positions, AI insights, and live oracle prices — all of it requires a connected EVM wallet.
            </p>
          </div>

          <ul className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex flex-col gap-2 bg-black p-5">
                <f.icon className="size-4 text-white/70" aria-hidden />
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {f.title}
                </div>
                <p className="text-xs leading-relaxed text-white/65">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: connect card */}
        <div className="relative flex flex-col gap-6 border border-white/15 bg-white/[0.02] p-6 md:p-8">
          <div className="space-y-1.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Step 1 of 1
            </div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Choose how to connect</h2>
            <p className="text-xs text-white/55 md:text-sm">
              We support every major EVM wallet. No sign-up, no email — just sign with your wallet.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onInjected}
              disabled={busy !== null}
              className="group relative flex items-center justify-between gap-3 border border-white bg-white px-5 py-4 text-left text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <Wallet className="size-4" aria-hidden />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
                    Recommended
                  </div>
                  <div className="text-sm font-semibold">Browser wallet</div>
                </div>
              </div>
              {busy === "injected" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <span aria-hidden className="font-mono text-xs">
                  →
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onWalletConnect}
              disabled={busy !== null}
              className="group flex items-center justify-between gap-3 border border-white/20 bg-transparent px-5 py-4 text-left text-white transition-colors hover:border-white hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="size-4" aria-hidden />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Universal · Mobile
                  </div>
                  <div className="text-sm font-semibold">WalletConnect</div>
                </div>
              </div>
              {busy === "wc" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <span aria-hidden className="font-mono text-xs text-white/55">
                  →
                </span>
              )}
            </button>
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-[11px] leading-relaxed text-white/40">
              By connecting, you agree to the protocol&apos;s terms of use. We never request approvals to
              move your funds without an explicit on-chain transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
