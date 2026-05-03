import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="relative z-10 overflow-hidden bg-black py-32 md:py-40">
      <div className="ym-grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 text-center">
        <h2
          className="ym-reveal text-balance text-5xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white md:text-7xl lg:text-[96px]"
          data-reveal
        >
          Ready to Maximize
          <br />
          <span className="ym-text-stroke">Your Yields?</span>
        </h2>
        <p
          className="ym-reveal max-w-xl text-pretty text-base leading-relaxed text-white/55 md:text-lg"
          data-reveal
        >
          Join 50,000+ users already earning higher returns with AI-powered portfolio
          management.
        </p>
        <div className="ym-reveal flex flex-col items-center gap-3 sm:flex-row" data-reveal>
          <Link
            href="/dashboard"
            className="ym-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            <span className="relative">Get Started Now</span>
            <span aria-hidden="true" className="relative">→</span>
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.02] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.06]"
          >
            Read Documentation
          </Link>
        </div>
        <div className="ym-reveal mt-8 h-px w-full max-w-2xl bg-white ym-pulse-line" data-reveal aria-hidden="true" />
      </div>
    </section>
  )
}
