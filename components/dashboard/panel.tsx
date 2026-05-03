import { type ReactNode } from "react"

type PanelProps = {
  title?: string
  eyebrow?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export function Panel({ title, eyebrow, action, children, className = "", bodyClassName = "" }: PanelProps) {
  return (
    <section
      className={`relative border border-white/10 bg-black/40 backdrop-blur-sm ${className}`}
    >
      {(title || action || eyebrow) && (
        <header className="flex items-end justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            {eyebrow && (
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                {eyebrow}
              </div>
            )}
            {title && (
              <h3 className="mt-1 text-base font-semibold tracking-tight text-white">{title}</h3>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={`px-5 py-5 ${bodyClassName}`}>{children}</div>
    </section>
  )
}

export function StatTile({
  label,
  value,
  sub,
  trend,
}: {
  label: string
  value: ReactNode
  sub?: ReactNode
  trend?: "up" | "down" | "flat"
}) {
  return (
    <div className="border border-white/10 bg-black/30 p-5 transition-colors hover:border-white/30">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-white tabular-nums">{value}</div>
        {trend && (
          <span
            className={`font-mono text-[10px] uppercase tracking-widest ${
              trend === "up" ? "text-white" : trend === "down" ? "text-white/40" : "text-white/30"
            }`}
            aria-hidden
          >
            {trend === "up" ? "▲" : trend === "down" ? "▼" : "●"}
          </span>
        )}
      </div>
      {sub && <div className="mt-2 text-xs text-white/50">{sub}</div>}
    </div>
  )
}
