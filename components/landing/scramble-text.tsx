"use client"

import { useEffect, useRef, useState } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

interface ScrambleTextProps {
  text: string
  delay?: number
  duration?: number
  className?: string
  as?: "span" | "div"
}

/**
 * On-mount "hacker" reveal: scrambles random characters then resolves to `text`.
 * Respects prefers-reduced-motion (renders instantly).
 */
export function ScrambleText({
  text,
  delay = 0,
  duration = 900,
  className,
  as = "span",
}: ScrambleTextProps) {
  const [output, setOutput] = useState(text)
  const Tag = as
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setOutput(text)
      return
    }

    let raf = 0
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      const elapsed = t - start - delay
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min(1, elapsed / duration)
      const reveal = Math.floor(progress * text.length)
      let next = ""
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === " ") {
          next += " "
        } else if (i < reveal) {
          next += ch
        } else {
          next += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setOutput(next)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setOutput(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, duration])

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </Tag>
  )
}
