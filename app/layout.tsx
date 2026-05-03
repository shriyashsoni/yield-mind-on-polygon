import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "sonner"
import { Suspense } from "react"
import { TermsModal } from "@/components/terms-modal"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "YieldMind — AI-Powered DeFi Portfolio Optimizer on Polygon zkEVM",
  description:
    "YieldMind automatically optimizes your portfolio across Polygon protocols using machine learning. Higher returns. Lower risk. Fully transparent.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${inter.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Providers>
          <Suspense fallback={null}>
            <TermsModal />
            {children}
            <Toaster position="bottom-right" theme="dark" />
          </Suspense>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
