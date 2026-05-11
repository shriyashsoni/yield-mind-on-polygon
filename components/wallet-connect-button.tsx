"use client"

import { useWeb3 } from "@/lib/web3-context"
import { WALLETCONNECT_ENABLED, AMOY_CHAIN_ID } from "@/lib/wagmi"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle, Smartphone, Droplets } from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useVaultData } from "@/hooks/use-vault-data"

const AMOY_FAUCET_URL = "https://faucet.polygon.technology/"

export function WalletConnectButton() {
  const {
    address,
    isConnected,
    chainId,
    connect,
    connectWalletConnect,
    disconnect,
    switchNetwork,
    isConnecting,
  } = useWeb3()

  // walletBalance = user's native MATIC on Amoy — single source of truth
  const { walletBalance } = useVaultData()

  const isOnAmoy = chainId === AMOY_CHAIN_ID
  const wrongNetwork = isConnected && !isOnAmoy

  const formattedBalance = Number(walletBalance ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })

  const handleConnect = async (kind: "injected" | "wc") => {
    try {
      if (kind === "wc") {
        if (!WALLETCONNECT_ENABLED) {
          toast.error("Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID and reload to enable WalletConnect.")
          return
        }
        await connectWalletConnect()
      } else {
        await connect()
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err ?? "")
      if (/user (rejected|cancelled|closed)|modal closed|Connection request reset/i.test(msg)) return
      toast.error(msg || "Connection failed. Please try again.")
    }
  }

  // ── Not connected ──────────────────────────────────────────────────
  if (!isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="sm" className="gap-2" disabled={isConnecting}>
            <Wallet className="w-4 h-4" />
            {isConnecting ? "Connecting…" : "Connect Wallet"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span>Connect to Polygon Amoy</span>
            <span className="font-normal text-[11px] text-muted-foreground">Testnet · chain 80002</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleConnect("injected")} className="cursor-pointer gap-2">
            <Wallet className="w-4 h-4" />
            Browser wallet
            <span className="ml-auto text-[10px] text-muted-foreground">Recommended</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleConnect("wc")}
            disabled={!WALLETCONNECT_ENABLED}
            className="cursor-pointer gap-2"
          >
            <Smartphone className="w-4 h-4" />
            WalletConnect
            {!WALLETCONNECT_ENABLED && (
              <span className="ml-auto text-[10px] text-muted-foreground">Off</span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // ── Connected but wrong network ───────────────────────────────────
  if (wrongNetwork) {
    return (
      <Button variant="destructive" size="sm" onClick={() => switchNetwork()} className="gap-2">
        <AlertCircle className="w-4 h-4" />
        Switch to Amoy testnet
      </Button>
    )
  }

  // ── Connected on Amoy ─────────────────────────────────────────────
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-auto py-1.5 px-3 gap-2 bg-transparent">
          <Wallet className="w-4 h-4" />
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-xs font-medium">
              {address?.slice(0, 6)}…{address?.slice(-4)}
            </span>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {formattedBalance} POL
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-white/20 px-1.5 py-0.5 ml-1">
            Amoy
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[11px] break-all text-white/70">{address}</span>
            <span className="flex justify-between text-[11px] font-normal">
              <span className="text-muted-foreground">Balance</span>
              <span className="tabular-nums font-semibold text-white">{formattedBalance} POL</span>
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Network badge */}
        <div className="px-2 py-1.5 flex items-center gap-2">
          <span className="size-2 rounded-full bg-green-400" aria-hidden />
          <span className="text-xs text-white/70">Polygon Amoy Testnet · #80002</span>
        </div>

        <DropdownMenuSeparator />

        {/* Faucet shortcut */}
        <DropdownMenuItem
          onClick={() => window.open(AMOY_FAUCET_URL, "_blank", "noopener,noreferrer")}
          className="cursor-pointer gap-2 text-xs"
        >
          <Droplets className="w-4 h-4" />
          Get test POL (faucet)
          <span className="ml-auto text-[10px] text-muted-foreground">↗</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={disconnect} className="cursor-pointer text-destructive gap-2">
          <LogOut className="w-4 h-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
