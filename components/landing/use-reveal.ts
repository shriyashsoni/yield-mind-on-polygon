"use client"

import { useEffect } from "react"

/**
 * Adds `is-visible` class to any `[data-reveal]` element when it scrolls into view.
 * Pair with the `.ym-reveal` CSS utility for the fade-up effect.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
