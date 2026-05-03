"use client"

import { useEffect, useRef, useState } from "react"

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

/**
 * Number that counts up from 0 to `value` once it scrolls into view.
 * Uses requestAnimationFrame with an ease-out curve.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
  className,
}: CounterProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true
            io.disconnect()
            let start = 0
            const animate = (t: number) => {
              if (!start) start = t
              const elapsed = t - start
              const progress = Math.min(1, elapsed / duration)
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              setDisplay(value * eased)
              if (progress < 1) requestAnimationFrame(animate)
              else setDisplay(value)
            }
            requestAnimationFrame(animate)
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
