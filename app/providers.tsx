"use client"

import type React from "react"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Web3Provider } from "@/lib/web3-context"

export function Providers({ children }: { children: React.ReactNode }) {
  // Lazy, per-render client. This is the recommended React Query +
  // Next.js App Router pattern — module-level singletons can be torn
  // down by Suspense boundaries during SSR which leaves child trees
  // without a QueryClient context (the "No QueryClient set" error).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 30_000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>{children}</Web3Provider>
    </QueryClientProvider>
  )
}
