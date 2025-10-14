import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "sonner"
import { Suspense } from "react"
import { TermsModal } from "@/components/terms-modal"

export const metadata: Metadata = {
  title: "YieldMind - AI-Powered DeFi Portfolio Optimizer",
  description: "Optimize your DeFi yields with AI-powered portfolio management on Polygon",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <Providers>
            <TermsModal />
            {children}
            <Toaster position="bottom-right" theme="dark" />
          </Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
