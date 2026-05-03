const ITEMS = [
  "AI OPTIMIZATION",
  "POLYGON ZKEVM",
  "DAO GOVERNED",
  "AUDITED CONTRACTS",
  "RISK MANAGED",
  "CROSS-CHAIN ROUTING",
  "ENTERPRISE GRADE",
  "REAL-TIME ANALYTICS",
]

export function Marquee() {
  // Render the list twice so the seamless loop in CSS works (-50%).
  const sequence = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black py-5">
      <div className="ym-marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {sequence.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-xs font-semibold uppercase tracking-[0.45em] text-white">
              {item}
            </span>
            <Dot />
          </div>
        ))}
      </div>
      {/* Soft edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent"
      />
    </div>
  )
}

function Dot() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
      <circle cx="3" cy="3" r="2" fill="rgba(255,255,255,0.7)" />
    </svg>
  )
}
