"use client"

import { useWeb3 } from "@/lib/web3-context"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle, Smartphone } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"
import { useVaultData } from "@/hooks/use-vault-data"

export function WalletConnectButton() {
  const {
    address,
    isConnected,
    chainId,
    connect,
    connectWalletConnect,
    disconnect,
    switchNetwork,
    provider,
    isConnecting,
  } = useWeb3()
  const { usdcBalance, assetSymbol } = useVaultData()

  const isCorrectNetwork = chainId === 137 || chainId === 80002
  const currentChain = chainId === 137 ? "Polygon" : chainId === 80002 ? "Amoy" : "Unknown"
  const nativeSymbol = chainId === 137 || chainId === 80002 ? "MATIC" : "NATIVE"

  const { data: nativeBalance = "0" } = useQuery({
    queryKey: ["nativeBalance", address, chainId],
    queryFn: async () => {
      if (!provider || !address) return "0"
      const balance = await provider.getBalance(address)
      return ethers.formatUnits(balance, 18)
    },
    enabled: !!provider && !!address,
    refetchInterval: 10000,
  })

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
          <DropdownMenuItem onClick={connect} className="cursor-pointer">
            <Wallet className="w-4 h-4 mr-2" />
            Browser wallet
          </DropdownMenuItem>
          <DropdownMenuItem onClick={connectWalletConnect} className="cursor-pointer">
            <Smartphone className="w-4 h-4 mr-2" />
            WalletConnect (mobile)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
          <Button variant="outline" size="sm" className="h-auto py-2 px-3 gap-2 bg-transparent">
            <Wallet className="w-4 h-4" />
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-xs font-medium">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {Number(nativeBalance).toLocaleString(undefined, { maximumFractionDigits: 4 })} {nativeSymbol}
              </span>
            </div>
            <Badge variant="secondary" className="ml-1">
              {currentChain}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-mono text-xs">{address}</DropdownMenuItem>
          <DropdownMenuItem className="text-xs flex justify-between">
            <span>Wallet Balance</span>
            <span className="font-medium">
              {Number(nativeBalance).toLocaleString(undefined, { maximumFractionDigits: 4 })} {nativeSymbol}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs flex justify-between">
            <span>{assetSymbol} Balance</span>
            <span className="font-medium">{Number(usdcBalance).toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
          </DropdownMenuItem>
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
