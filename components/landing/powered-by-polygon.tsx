import Image from "next/image"
import Link from "next/link"

type Props = {
  /** "pill" — full chip with "Powered by" label, "logo" — bare logo, "card" — large card. */
  variant?: "pill" | "logo" | "card"
  className?: string
}

export function PoweredByPolygon({ variant = "pill", className = "" }: Props) {
  if (variant === "logo") {
    return (
      <Link
        href="https://polygon.technology"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Polygon"
        className={`inline-flex items-center transition-opacity hover:opacity-80 ${className}`}
      >
        <Image
          src="/logos/polygon.png"
          alt="Polygon"
          width={120}
          height={28}
          className="h-7 w-auto"
          priority={false}
        />
      </Link>
    )
  }

  if (variant === "card") {
    return (
      <Link
        href="https://polygon.technology"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Powered by Polygon"
        className={`group relative inline-flex items-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 backdrop-blur transition-all hover:border-white/25 hover:bg-white/[0.05] ${className}`}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
            Powered by
          </span>
          <Image
            src="/logos/polygon.png"
            alt="Polygon"
            width={160}
            height={36}
            className="h-9 w-auto"
          />
        </div>
        <span
          aria-hidden="true"
          className="ml-2 text-xl text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white"
        >
          →
        </span>
      </Link>
    )
  }

  // pill (default)
  return (
    <Link
      href="https://polygon.technology"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by Polygon"
      className={`inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.06] ${className}`}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">
        Powered by
      </span>
      <span aria-hidden="true" className="h-3 w-px bg-white/15" />
      <Image
        src="/logos/polygon.png"
        alt="Polygon"
        width={84}
        height={20}
        className="h-5 w-auto"
      />
    </Link>
  )
}
