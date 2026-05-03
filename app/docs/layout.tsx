"use client"

import { useState, type ReactNode } from "react"
import { Menu, X } from "lucide-react"
import { SiteNav } from "@/components/landing/site-nav"
import { SiteFooter } from "@/components/landing/site-footer"
import { DocsSidebar } from "@/components/docs/sidebar"

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <div className="pt-16">
        <div className="border-b border-white/10 bg-black/60 backdrop-blur">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              <span className="text-white">Docs</span>
              <span aria-hidden>·</span>
              <span>Polygon Amoy</span>
              <span aria-hidden>·</span>
              <span>v4 protocol</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Open docs sidebar"
            >
              <Menu className="size-3.5" aria-hidden /> Menu
            </button>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start">
            <DocsSidebar />
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute inset-0 bg-black/80 backdrop-blur"
          />
          <div className="absolute inset-y-0 left-0 w-[300px] max-w-[85vw] border-r border-white/10 bg-black p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Docs</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white"
                aria-label="Close docs sidebar"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <DocsSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
