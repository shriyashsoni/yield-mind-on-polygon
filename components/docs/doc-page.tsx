import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { DOC_CATEGORIES, type DocPage, docPath, getPagerFor } from "@/lib/docs/registry"
import { DocsToc } from "./toc"

export function DocPageShell({ page, children }: { page: DocPage; children: ReactNode }) {
  const cat = DOC_CATEGORIES.find((c) => c.id === page.category)
  const { prev, next } = getPagerFor(page.slug)

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_220px]">
      <article className="min-w-0">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40"
        >
          <Link href="/docs" className="transition-colors hover:text-white">
            Docs
          </Link>
          <ChevronRight className="size-3" aria-hidden />
          <span className="text-white/55">{cat?.label ?? "Reference"}</span>
          <ChevronRight className="size-3" aria-hidden />
          <span className="text-white">{page.title}</span>
        </nav>

        <header className="border-b border-white/10 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{page.title}</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-white/55">{page.description}</p>
        </header>

        <div className="space-y-3 pb-12 pt-2">{children}</div>

        <Pager prev={prev} next={next} />
      </article>

      <aside className="hidden xl:block xl:sticky xl:top-24 xl:self-start">
        <DocsToc headings={page.headings} />
      </aside>
    </div>
  )
}

function Pager({ prev, next }: { prev?: DocPage; next?: DocPage }) {
  if (!prev && !next) return null
  return (
    <nav aria-label="Pagination" className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-8">
      <div className={prev ? "" : "pointer-events-none opacity-30"}>
        {prev && (
          <Link
            href={docPath(prev.slug)}
            className="block border border-white/10 p-4 transition-colors hover:border-white/40 hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              <ArrowLeft className="size-3" aria-hidden /> Previous
            </div>
            <div className="mt-1.5 truncate text-[15px] font-semibold text-white">{prev.title}</div>
          </Link>
        )}
      </div>
      <div className={next ? "" : "pointer-events-none opacity-30"}>
        {next && (
          <Link
            href={docPath(next.slug)}
            className="block border border-white/10 p-4 text-right transition-colors hover:border-white/40 hover:bg-white/[0.02]"
          >
            <div className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Next <ArrowRight className="size-3" aria-hidden />
            </div>
            <div className="mt-1.5 truncate text-[15px] font-semibold text-white">{next.title}</div>
          </Link>
        )}
      </div>
    </nav>
  )
}
