"use client"

import { useWeb3 } from "@/lib/web3-context"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle, CheckCircle2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function WalletConnectButton() {
  const { address, isConnected, chainId, connect, disconnect, switchNetwork } = useWeb3()

  const isMainnet = chainId === 137
  const isTestnet = chainId === 80002
  const isCorrectNetwork = isMainnet || isTestnet
  const currentChain = isMainnet ? "Polygon Mainnet" : isTestnet ? "Amoy Testnet" : "Unknown"
  const chainBadgeVariant = isMainnet ? "default" : isTestnet ? "secondary" : "destructive"

  if (!isConnected) {
    return (
      <Button variant="default" size="sm" className="gap-2" onClick={connect}>
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {!isCorrectNetwork && (
        <Button variant="destructive" size="sm" onClick={() => switchNetwork(137)} className="gap-2">
          <AlertCircle className="w-4 h-4" />
          Switch Network
        </Button>
      )}
      {isCorrectNetwork && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-xs text-green-700">
          <CheckCircle2 className="w-3 h-3" />
          <span>Connected</span>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <Badge variant={chainBadgeVariant} className="ml-1">
              {isTestnet ? "Testnet" : "Mainnet"}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-mono text-xs">{address}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Network</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => switchNetwork(137)} 
            className="cursor-pointer"
            disabled={isMainnet}
          >
            {isMainnet && <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />}
            Polygon Mainnet (137)
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => switchNetwork(80002)} 
            className="cursor-pointer"
            disabled={isTestnet}
          >
            {isTestnet && <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />}
            Amoy Testnet (80002)
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
