"use client"

import { useEffect, useRef } from "react"

/**
 * Subtle drifting white-dot particle field rendered to <canvas>.
 * Always-on, very low opacity, dots drift slowly upward.
 */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    type P = { x: number; y: number; r: number; vy: number; o: number }
    let particles: P[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(140, Math.floor((width * height) / 14000))
      particles = Array.from({ length: target }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vy: -(Math.random() * 0.18 + 0.05),
        o: Math.random() * 0.04 + 0.02,
      }))
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y += p.vy
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${p.o})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
