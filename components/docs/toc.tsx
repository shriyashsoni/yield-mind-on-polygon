"use client"

import { useEffect, useState } from "react"
import type { DocHeading } from "@/lib/docs/registry"

export function DocsToc({ headings }: { headings: DocHeading[] }) {
  const [active, setActive] = useState<string | undefined>(headings[0]?.id)

  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return
    const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: [0, 1] },
    )
    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [headings])

  if (headings.length === 0) return null
  return (
    <nav aria-label="On this page" className="text-[12px]">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">On this page</div>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className={[
                "block border-l py-1 pl-3 transition-colors",
                active === h.id
                  ? "border-white text-white"
                  : "border-white/10 text-white/45 hover:border-white/40 hover:text-white",
              ].join(" ")}
            >
              {h.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
