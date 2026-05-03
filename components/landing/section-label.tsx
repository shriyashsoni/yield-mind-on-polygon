/**
 * Polygon-style section label: "▲ ▲  WAVE 6  ▲ ▲"
 */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55">
      <Triangle />
      <Triangle />
      <span>{children}</span>
      <Triangle />
      <Triangle />
    </div>
  )
}

function Triangle() {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 8 8"
      aria-hidden="true"
      className="text-white/70"
    >
      <path d="M4 0 L8 8 L0 8 Z" fill="currentColor" />
    </svg>
  )
}
