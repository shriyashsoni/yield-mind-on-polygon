"use client"
import { WalletConnectButton } from "./wallet-connect-button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10 p-1">
            <Image
              src="/yieldmind-logo.png"
              alt="YieldMind"
              width={40}
              height={40}
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">YieldMind</h1>
            <p className="text-xs text-muted-foreground">AI-Powered DeFi Optimizer</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className={`text-sm transition-colors ${
              pathname === "/about" ? "text-primary font-medium" : "text-foreground hover:text-primary"
            }`}
          >
            About
          </Link>
          <Link
            href="/docs"
            className={`text-sm transition-colors ${
              pathname === "/docs" ? "text-primary font-medium" : "text-foreground hover:text-primary"
            }`}
          >
            Docs
          </Link>
          <Link
            href="/release/wave-2"
            className={`text-sm transition-colors flex items-center gap-1 ${
              pathname === "/release/wave-2" ? "text-primary font-medium" : "text-foreground hover:text-primary"
            }`}
          >
            Wave 2
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              NEW
            </span>
          </Link>
          <Link
            href="/whitepaper"
            className={`text-sm transition-colors ${
              pathname === "/whitepaper" ? "text-primary font-medium" : "text-foreground hover:text-primary"
            }`}
          >
            Whitepaper
          </Link>
        </nav>

        <WalletConnectButton />
      </div>
    </header>
  )
}
