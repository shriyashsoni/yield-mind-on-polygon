import type { ReactNode } from "react"

export function ContractHeader({
  name,
  address,
  description,
  badge,
}: {
  name: string
  address: string
  description: string
  badge?: ReactNode
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-white">{name}</h3>
          {badge}
        </div>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/55">{description}</p>
      </div>
      <a
        href={`https://amoy.polygonscan.com/address/${address}`}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
      >
        {address.slice(0, 8)}…{address.slice(-6)} ↗
      </a>
    </header>
  )
}

export function StatusPill({
  state,
  hash,
}: {
  state: "idle" | "preparing" | "pending" | "success" | "error"
  hash: string | null
}) {
  if (state === "idle") return null
  const label =
    state === "preparing"
      ? "Awaiting wallet"
      : state === "pending"
        ? "Pending"
        : state === "success"
          ? "Confirmed"
          : "Failed"
  return (
    <div className="mt-3 flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${
          state === "pending" ? "animate-pulse bg-white" : state === "success" ? "bg-white" : "bg-white/40"
        }`}
      />
      {label}
      {hash && (
        <a
          href={`https://amoy.polygonscan.com/tx/${hash}`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto truncate text-white/60 hover:text-white"
        >
          {hash.slice(0, 10)}…
        </a>
      )}
    </div>
  )
}

export function PrimaryAction({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 border border-white bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-white/30 disabled:bg-transparent disabled:text-white/40"
    >
      {children}
    </button>
  )
}

export function SecondaryAction({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:border-white/15 disabled:text-white/30"
    >
      {children}
    </button>
  )
}

export function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  max,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  suffix?: string
  max?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</span>
      <div className="flex items-center gap-2 border border-white/15 bg-black/40 px-3 focus-within:border-white">
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder={placeholder ?? "0.00"}
          className="w-full bg-transparent py-2.5 text-sm tabular-nums text-white outline-none placeholder:text-white/30"
        />
        {max !== undefined && (
          <button
            type="button"
            onClick={() => onChange(max)}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
          >
            Max
          </button>
        )}
        {suffix && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{suffix}</span>
        )}
      </div>
    </label>
  )
}

export function MetricRow({
  label,
  value,
  sub,
}: {
  label: string
  value: ReactNode
  sub?: ReactNode
}) {
  return (
    <div className="bg-black/40 p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</div>
      <div className="mt-1 text-base font-semibold tabular-nums text-white">{value}</div>
      {sub && <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">{sub}</div>}
    </div>
  )
}
