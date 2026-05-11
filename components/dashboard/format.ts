// All on-chain values in YieldMind are denominated in POL — the native token
// of Polygon Amoy testnet (chain 80002). "fmtUsd" is kept as a back-compat
// alias so existing call-sites work without changes.

const formatAmount = (n: number, max: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: max,
  }).format(Number.isFinite(n) ? n : 0)

// Primary formatter: "1,234.56 POL"
export const fmtPol = (n: number, max = 2) => `${formatAmount(n, max)} POL`

// Back-compat alias — renders as POL (not USD)
export const fmtUsd = fmtPol
export const fmtMatic = fmtPol

export const fmtNum = (n: number, max = 2) => formatAmount(n, max)

export const fmtPct = (n: number, max = 2) =>
  `${(Number.isFinite(n) ? n : 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: max,
  })}%`

export const shortAddr = (addr?: string | null, chars = 4) => {
  if (!addr) return "—"
  return `${addr.slice(0, 2 + chars)}…${addr.slice(-chars)}`
}

export const timeAgo = (ts?: number | null) => {
  if (!ts) return "—"
  const diff = Math.floor(Date.now() / 1000) - ts
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}
