"use client"

import { useWeb3 } from "@/lib/web3-context"
import { WALLETCONNECT_ENABLED } from "@/lib/wagmi"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle, Smartphone, Check } from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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
  // walletBalance is the user's NATIVE MATIC — single source of truth.
  const { walletBalance } = useVaultData()

  const isCorrectNetwork = chainId === 137 || chainId === 80002
  const isAmoy = chainId === 80002
  const isPolygon = chainId === 137
  const currentChain = isPolygon ? "Polygon" : isAmoy ? "Amoy" : "Unknown"

  const formattedBalance = Number(walletBalance ?? 0).toLocaleString(undefined, {
    maximumFractionDigits: 4,
  })

  const handleConnect = async (kind: "injected" | "wc") => {
    try {
      if (kind === "wc") {
        if (!WALLETCONNECT_ENABLED) {
          toast.error(
            "WalletConnect isn't configured. Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID and reload.",
          )
          return
        }
        await connectWalletConnect()
      } else {
        await connect()
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err ?? "")
      if (
        /user (rejected|cancelled|closed)/i.test(msg) ||
        /modal closed/i.test(msg) ||
        /Connection request reset/i.test(msg)
      ) {
        return
      }
      console.log("[v0] wallet connect failed", err)
      toast.error(msg || "Connection failed. Please try again.")
    }
  }

  if (!isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="sm" className="gap-2" disabled={isConnecting}>
            <Wallet className="w-4 h-4" />
            {isConnecting ? "Connecting…" : "Connect Wallet"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Choose a wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleConnect("injected")} className="cursor-pointer">
            <Wallet className="w-4 h-4 mr-2" />
            Browser wallet
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleConnect("wc")}
            className="cursor-pointer"
            disabled={!WALLETCONNECT_ENABLED}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            WalletConnect (mobile)
            {!WALLETCONNECT_ENABLED ? (
              <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                Off
              </span>
            ) : null}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {!isCorrectNetwork && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => switchNetwork(80002)}
          className="gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          Switch to Amoy
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-auto py-2 px-3 gap-2 bg-transparent">
            <Wallet className="w-4 h-4" />
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-xs font-medium">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {formattedBalance} MATIC
              </span>
            </div>
            <Badge variant="secondary" className="ml-1">
              {currentChain}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-mono text-[11px] break-all">
            {address}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs flex justify-between cursor-default focus:bg-transparent">
            <span className="text-muted-foreground">Wallet balance</span>
            <span className="font-medium tabular-nums">{formattedBalance} MATIC</span>
          </DropdownMenuItem>
          {isAmoy ? (
            <DropdownMenuItem
              onClick={() => window.open(AMOY_FAUCET_URL, "_blank", "noopener,noreferrer")}
              className="text-xs cursor-pointer"
            >
              <span className="mr-2">↗</span>
              Get test MATIC (Amoy faucet)
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Network
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => switchNetwork(80002)} className="cursor-pointer">
            {isAmoy ? <Check className="w-4 h-4 mr-2" /> : <span className="w-4 h-4 mr-2" />}
            Polygon Amoy (testnet)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchNetwork(137)} className="cursor-pointer">
            {isPolygon ? <Check className="w-4 h-4 mr-2" /> : <span className="w-4 h-4 mr-2" />}
            Polygon Mainnet
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnect} className="cursor-pointer text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
