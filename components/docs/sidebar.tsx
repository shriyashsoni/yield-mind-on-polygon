"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { DOC_CATEGORIES, DOC_PAGES, docPath, getOrderedDocs } from "@/lib/docs/registry"

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [q, setQ] = useState("")

  const grouped = useMemo(() => {
    const filter = q.trim().toLowerCase()
    const ordered = getOrderedDocs()
    const visible = filter
      ? ordered.filter(
          (p) => p.title.toLowerCase().includes(filter) || p.description.toLowerCase().includes(filter),
        )
      : ordered
    return DOC_CATEGORIES.map((c) => ({
      ...c,
      pages: visible.filter((p) => p.category === c.id),
    })).filter((c) => c.pages.length > 0)
  }, [q])

  return (
    <div className="flex h-full flex-col gap-4">
      <label className="relative block">
        <span className="sr-only">Search docs</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/40"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search docs"
          className="w-full border border-white/10 bg-black/40 py-2 pl-9 pr-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
        />
      </label>

      <nav aria-label="Documentation" className="flex-1 overflow-y-auto pr-2">
        {grouped.length === 0 && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">No matches.</p>
        )}
        <ul className="space-y-6">
          {grouped.map((cat) => (
            <li key={cat.id}>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                {cat.label}
              </div>
              <ul className="space-y-px">
                {cat.pages.map((p) => {
                  const href = docPath(p.slug)
                  const active = pathname === href
                  return (
                    <li key={p.slug || "index"}>
                      <Link
                        href={href}
                        onClick={onNavigate}
                        className={[
                          "block border-l px-3 py-1.5 text-[13px] transition-colors",
                          active
                            ? "border-white bg-white/[0.05] text-white"
                            : "border-white/10 text-white/55 hover:border-white/40 hover:text-white",
                        ].join(" ")}
                      >
                        {p.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
