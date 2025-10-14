"use client"

import { useWeb3 } from "@/lib/web3-context"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle } from "lucide-react"
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

  const isCorrectNetwork = chainId === 137 || chainId === 80002
  const currentChain = chainId === 137 ? "Polygon" : chainId === 80002 ? "Amoy" : "Unknown"

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
          Switch to Polygon
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <Badge variant="secondary" className="ml-1">
              {currentChain}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-mono text-xs">{address}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => switchNetwork(137)} className="cursor-pointer">
            Switch to Polygon Mainnet
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchNetwork(80002)} className="cursor-pointer">
            Switch to Amoy Testnet
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
