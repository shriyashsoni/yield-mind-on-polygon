import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "sonner"
import { Suspense } from "react"
import { TermsModal } from "@/components/terms-modal"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
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
