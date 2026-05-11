"use client"

import { useMemo, useState } from "react"
import {
  ArrowDownToLine, ArrowUpFromLine, Coins, Gift,
  Loader2, RefreshCw, ShieldCheck, Sparkles, Droplets,
} from "lucide-react"
import { useWeb3 } from "@/lib/web3-context"
import { useVaultData } from "@/hooks/use-vault-data"
import { useVaultActions } from "@/hooks/use-vault-actions"
import { useVaultRebalance } from "@/hooks/use-vault-rebalance"
import { useStaking } from "@/hooks/use-staking"
import { useProtocolSnapshot, useAiInsight } from "@/hooks/use-protocol"
import { Panel } from "./panel"
import { fmtNum } from "./format"

type Tab = "deposit" | "withdraw" | "stake" | "claim"

const TABS: { id: Tab; label: string; icon: typeof ArrowDownToLine }[] = [
  { id: "deposit",  label: "Deposit",  icon: ArrowDownToLine },
  { id: "withdraw", label: "Withdraw", icon: ArrowUpFromLine },
  { id: "stake",    label: "Stake",    icon: Coins },
  { id: "claim",    label: "Claim",    icon: Gift },
]

function relativeTime(ts: number) {
  if (!ts) return "—"
  const ms  = ts < 1e12 ? ts * 1000 : ts
  const diff = Date.now() - ms
  if (diff < 0) return "just now"
  const s = Math.floor(diff / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function PositionTile({ label, value, sub, highlight }: {
  label: string; value: string; sub?: string; highlight?: boolean
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</div>
      <div className={`mt-1 tabular-nums ${highlight
        ? "text-2xl font-semibold text-white"
        : "text-base font-medium text-white/90"}`}>
        {value}
      </div>
      {sub && <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{sub}</div>}
    </div>
  )
}

function Cue({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-2 bg-black/40 px-3 py-2.5">
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
        {icon}{label}
      </span>
      <span className="font-mono tabular-nums text-white">{value}</span>
    </li>
  )
}

export function InvestPanel() {
  const { isConnected, address } = useWeb3()
  const { data: snap }           = useProtocolSnapshot(address)
  const { data: ai }             = useAiInsight(address)
  const vault                    = useVaultData()
  const { deposit, withdraw, isDepositPending, isWithdrawPending } = useVaultActions()
  const staking                  = useStaking()
  const rebalance                = useVaultRebalance()

  const [tab, setTab]       = useState<Tab>("deposit")
  const [amount, setAmount] = useState("")

  // ── derived numbers ──────────────────────────────────────────────────────
  const apy            = snap?.protocol?.estimatedApy    ?? 0
  const aiConfidence   = Math.round((ai?.insight?.confidence ?? 0.7) * 100)
  const lastRebalance  = snap?.protocol?.lastRebalance
  const insuranceRsv   = Number(snap?.risk?.insuranceReserve ?? 0)
  const protActive     = snap?.risk?.protectionActive ?? false
  const totalRebalances = snap?.protocol?.totalRebalances ?? 0
  const recentDeposits = useMemo(() =>
    (snap?.events ?? []).filter(e => /deposit/i.test(e.kind)).slice(0, 3),
    [snap?.events])

  // Vault position
  const yldWallet      = Number(vault.walletYld  ?? 0)   // YLD ERC-20 to deposit
  const nativeWallet   = Number(vault.walletBalance ?? 0) // native POL (gas display)
  const userShares     = Number(vault.userShares  ?? 0)
  const sharePrice     = vault.sharePrice         ?? 1
  const userValue      = userShares * sharePrice           // YLD value of shares

  // Staking
  const stakedYld      = Number(staking.staked   ?? 0)
  const pendingRewards = Number(staking.rewards  ?? 0)
  const stakingWalletYld = Number(staking.walletYld ?? 0)

  // ── per-tab max ──────────────────────────────────────────────────────────
  const max = useMemo(() => {
    if (tab === "deposit")  return Math.max(0, yldWallet)        // deposit YLD ERC-20
    if (tab === "withdraw") return Math.max(0, userShares)       // redeem shares
    if (tab === "stake")    return Math.max(0, stakingWalletYld) // stake YLD
    return 0
  }, [tab, yldWallet, userShares, stakingWalletYld])

  const amt = Number(amount || 0)

  const preview = useMemo(() => {
    if (tab === "deposit") {
      const shares = sharePrice > 0 ? amt / sharePrice : amt
      return { primary: `${fmtNum(shares, 4)} ymYLD`, label: "Vault shares you receive" }
    }
    if (tab === "withdraw") {
      const yld = amt * sharePrice
      return { primary: `${fmtNum(yld, 4)} YLD`, label: "YLD you receive back" }
    }
    if (tab === "stake") {
      return { primary: `${fmtNum(amt, 4)} YLD staked`, label: "Earning rewards immediately" }
    }
    return { primary: `${fmtNum(pendingRewards, 6)} YLD`, label: "Rewards available to claim" }
  }, [tab, amt, sharePrice, pendingRewards])

  const submit = () => {
    if (tab === "deposit")  return deposit(amount)
    if (tab === "withdraw") return withdraw(amount)
    if (tab === "stake")    return staking.stake(amount)
    return staking.claim()
  }

  const isBusy =
    (tab === "deposit"  && isDepositPending)   ||
    (tab === "withdraw" && isWithdrawPending)  ||
    (tab === "stake"    && staking.isStaking)  ||
    (tab === "claim"    && staking.isClaiming)

  const submitLabel = (() => {
    if (isBusy) return "Pending…"
    if (tab === "deposit")  return "Deposit YLD & earn"
    if (tab === "withdraw") return "Redeem shares"
    if (tab === "stake")    return "Stake YLD"
    return pendingRewards > 0 ? `Claim ${fmtNum(pendingRewards, 6)} YLD` : "No rewards yet"
  })()

  const submitDisabled =
    !isConnected || isBusy ||
    (tab !== "claim" && (!amount || amt <= 0 || amt > max + 1e-9)) ||
    (tab === "claim" && pendingRewards <= 0)

  const needsFaucet = isConnected && yldWallet < 0.001 && stakingWalletYld < 0.001

  return (
    <Panel
      eyebrow="Invest & Earn"
      title="One-click yield, governed by the AI agent"
      action={
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Live · Amoy testnet
        </span>
      }
    >
      {/* Faucet banner — shown when user has no YLD to work with */}
      {needsFaucet && (
        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-3">
          <div className="text-sm text-white/70">
            <span className="font-semibold text-white">No test YLD in wallet.</span>{" "}
            Claim free testnet YLD from the contract faucet to deposit, stake, and vote.
          </div>
          <button
            type="button"
            onClick={staking.getFaucetYLD}
            disabled={staking.isFauceting}
            className="inline-flex shrink-0 items-center gap-2 border border-white bg-white px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {staking.isFauceting
              ? <Loader2 className="size-3.5 animate-spin" aria-hidden />
              : <Droplets className="size-3.5" aria-hidden />}
            {staking.isFauceting ? "Requesting…" : "Get test YLD"}
          </button>
        </div>
      )}

      <div className="grid gap-px bg-white/10 lg:grid-cols-[1.4fr_1fr]">
        {/* ── LEFT: action card ─────────────────────────────────────────── */}
        <div className="bg-black/40 p-5 md:p-6">
          {/* tabs */}
          <div role="tablist" aria-label="Investment actions" className="flex flex-wrap gap-2">
            {TABS.map(({ id, label, icon: Icon }) => {
              const active = id === tab
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => { setTab(id); setAmount("") }}
                  className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "border-white bg-white text-black"
                      : "border-white/20 bg-transparent text-white/70 hover:border-white/50 hover:text-white"
                  }`}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </button>
              )
            })}
          </div>

          <div className="mt-6 space-y-4">
            {tab !== "claim" ? (
              <div>
                <div className="flex items-end justify-between">
                  <label htmlFor="invest-amount" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Amount ({tab === "withdraw" ? "shares" : "YLD"})
                  </label>
                  <button
                    type="button"
                    onClick={() => setAmount(max > 0 ? String(max) : "")}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 hover:text-white"
                  >
                    Max · {fmtNum(max, 4)} {tab === "withdraw" ? "ymYLD" : "YLD"}
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-3 border border-white/15 bg-black/60 px-4 py-3 focus-within:border-white">
                  <input
                    id="invest-amount"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      const raw = e.target.value.replace(",", ".")
                      if (/^\d*\.?\d*$/.test(raw)) setAmount(raw)
                    }}
                    disabled={!isConnected || isBusy}
                    className="w-full bg-transparent text-2xl font-semibold tabular-nums text-white outline-none placeholder:text-white/25 disabled:cursor-not-allowed"
                  />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/45">
                    {tab === "withdraw" ? "ymYLD" : "YLD"}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {[0.25, 0.5, 0.75, 1].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => max > 0 && setAmount(String((max * p).toFixed(6)))}
                      disabled={max <= 0 || isBusy}
                      className="border border-white/15 bg-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {Math.round(p * 100)}%
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border border-white/15 bg-black/60 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Pending rewards</div>
                <div className="mt-1 text-3xl font-semibold tabular-nums text-white">
                  {fmtNum(pendingRewards, 6)}{" "}
                  <span className="text-base text-white/45">YLD</span>
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Streamed continuously · claim anytime
                </div>
              </div>
            )}

            {/* preview */}
            <div className="border border-white/10 bg-white/[0.02] p-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{preview.label}</div>
              <div className="mt-1 text-base font-semibold tabular-nums text-white">{preview.primary}</div>
            </div>

            {/* submit */}
            <button
              type="button"
              onClick={submit}
              disabled={submitDisabled}
              className="group inline-flex w-full items-center justify-center gap-2 border border-white bg-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black transition-all hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isBusy && <Loader2 className="size-3.5 animate-spin" aria-hidden />}
              {submitLabel}
              {!isBusy && <span className="transition-transform group-hover:translate-x-0.5">→</span>}
            </button>

            {/* faucet inline link if no YLD */}
            {needsFaucet && (
              <button
                type="button"
                onClick={staking.getFaucetYLD}
                disabled={staking.isFauceting}
                className="inline-flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 hover:border-white/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {staking.isFauceting
                  ? <Loader2 className="size-3.5 animate-spin" aria-hidden />
                  : <Droplets className="size-3.5" aria-hidden />}
                {staking.isFauceting ? "Requesting…" : "Claim free test YLD first →"}
              </button>
            )}

            {/* trust micro-cues */}
            <ul className="grid grid-cols-2 gap-px bg-white/10 text-xs">
              <Cue icon={<Sparkles className="size-3.5" aria-hidden />} label="AI confidence" value={`${aiConfidence}%`} />
              <Cue icon={<ShieldCheck className="size-3.5" aria-hidden />} label={protActive ? "Protection active" : "Insurance reserve"} value={fmtNum(insuranceRsv, 0)} />
              <Cue label="Estimated APY" value={`${apy.toFixed(2)}%`} />
              <Cue label="Last rebalance" value={lastRebalance ? relativeTime(lastRebalance) : "—"} />
            </ul>
          </div>
        </div>

        {/* ── RIGHT: position + rebalance ───────────────────────────────── */}
        <div className="space-y-px bg-white/10">
          {/* position */}
          <div className="bg-black/40 p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Your position</div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <PositionTile label="YLD wallet"     value={fmtNum(yldWallet, 4)}      sub="YLD · available" />
              <PositionTile label="Vault shares"   value={fmtNum(userShares, 4)}     sub="ymYLD" />
              <PositionTile label="Position value" value={`${fmtNum(userValue, 4)} YLD`} highlight />
              <PositionTile label="Native POL"     value={fmtNum(nativeWallet, 4)}   sub="POL · gas only" />
              <PositionTile label="Staked"         value={fmtNum(stakedYld, 4)}      sub="YLD" />
              <PositionTile label="Rewards"        value={fmtNum(pendingRewards, 6)} sub="YLD pending" />
            </div>
          </div>

          {/* rebalance */}
          <div className="bg-black/40 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">AI agent</div>
                <h4 className="mt-1 text-sm font-semibold text-white">Trigger a rebalance</h4>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  Permissionless · the on-chain AI recomputes strategy weights. Anyone can poke it; you pay only gas.
                </p>
              </div>
              <span className="border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                {fmtNum(totalRebalances, 0)} runs
              </span>
            </div>
            <button
              type="button"
              onClick={rebalance.trigger}
              disabled={!isConnected || rebalance.isPending}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-white/30 bg-transparent px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:border-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {rebalance.isPending
                ? <Loader2 className="size-3.5 animate-spin" aria-hidden />
                : <RefreshCw className="size-3.5" aria-hidden />}
              {rebalance.isPending ? "Rebalancing…" : "Run AI rebalance"}
            </button>
          </div>

          {/* social proof */}
          <div className="bg-black/40 p-5">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Recent depositors</div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">on-chain</span>
            </div>
            {recentDeposits.length === 0 ? (
              <p className="mt-3 text-xs leading-relaxed text-white/45">
                Be among the first depositors. The AI agent compounds yield from the very first share.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {recentDeposits.map((evt, i) => (
                  <li key={`${evt.txHash}-${i}`} className="flex items-center justify-between gap-2 text-xs">
                    <span className="truncate font-mono text-white/65">
                      {evt.actor ? `${evt.actor.slice(0, 6)}…${evt.actor.slice(-4)}` : "wallet"}
                    </span>
                    <span className="font-mono text-white/40">{relativeTime(evt.timestamp)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Panel>
  )
}
