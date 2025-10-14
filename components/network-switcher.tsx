"use client"

import { useWeb3 } from "@/lib/web3-context"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function NetworkSwitcher() {
  const { chainId, switchNetwork } = useWeb3()

  const isWrongNetwork = chainId && chainId !== 137 && chainId !== 80002

  if (!isWrongNetwork) return null

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>Please switch to Polygon network to use YieldMind</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => switchNetwork?.(137)}>
            Switch to Polygon
          </Button>
          <Button size="sm" variant="outline" onClick={() => switchNetwork?.(80002)}>
            Switch to Amoy Testnet
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
