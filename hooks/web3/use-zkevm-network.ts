"use client"

import { useMemo } from "react"
import { useChainId, useSwitchChain } from "wagmi"
import { polygonZkEvm } from "@/lib/web3/zkevm"

export function useZkEvmNetwork() {
  const chainId = useChainId()
  const { switchChainAsync, isPending } = useSwitchChain()

  const isCorrectNetwork = useMemo(() => chainId === polygonZkEvm.id, [chainId])

  const ensureZkEvm = async () => {
    if (isCorrectNetwork) return
    await switchChainAsync({ chainId: polygonZkEvm.id })
  }

  return {
    chainId,
    isCorrectNetwork,
    switchToZkEvm: ensureZkEvm,
    isSwitching: isPending,
  }
}
