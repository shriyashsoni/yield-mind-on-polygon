"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Features", href: "#features", anchor: true },
  { label: "How It Works", href: "#how", anchor: true },
  { label: "Polygon", href: "#polygon", anchor: true },
  { label: "Governance", href: "/governance" },
  { label: "Docs", href: "/docs" },
] as const

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const onLanding = pathname === "/"
  const resolve = (l: { href: string; anchor?: boolean }) =>
    l.anchor && !onLanding ? `/${l.href}` : l.href

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:py-5">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="YieldMind home">
          <DiamondMark className="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-45" />
          <span className="text-base font-bold tracking-tight text-white">YieldMind</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={resolve(l)}
                className="text-sm font-medium text-white/55 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/dashboard"
            className="ym-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            <span className="relative">Launch App</span>
            <span aria-hidden="true" className="relative">→</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-white/10 p-2 text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={resolve(l)}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black"
              >
                Launch App →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

function DiamondMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2 L22 12 L12 22 L2 12 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 6 L18 12 L12 18 L6 12 Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  )
}
