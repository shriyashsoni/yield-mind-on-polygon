"use client"

/**
 * Web3 context — thin bridge over wagmi.
 *
 * The `useWeb3()` shape is identical to the previous implementation so every
 * existing consumer (useVaultData, useContractAction, useRebalance,
 * WalletGate, WalletConnectButton, the governance page, etc.) keeps working
 * unchanged. The connection itself is now powered by **wagmi connectors**:
 *
 *   - `injected()`        — MetaMask, Rabby, Brave, OKX, Coinbase Wallet,
 *                           and any EIP-6963 / EIP-1193 browser wallet.
 *   - `walletConnect()`   — Trust, Rainbow, MetaMask Mobile, Zerion, Ledger
 *                           Live, OKX, Safe, … via QR code or deeplink.
 *
 * The bridge takes whatever EIP-1193 provider wagmi exposes for the active
 * connector and wraps it with ethers v6 so existing protocol hooks (which
 * were authored against ethers) stay unchanged.
 */

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
import {
  useAccount,
  useChainId,
  useConfig,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi"
import { polygon, polygonAmoy } from "wagmi/chains"
import { getAccount } from "wagmi/actions"
import type { EIP1193Provider } from "viem"

type ConnectorKind = "injected" | "walletconnect"

interface Web3ContextValue {
  address: string | null
  chainId: number | null
  isConnected: boolean
  isConnecting: boolean
  connector: ConnectorKind | null
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
  connect: () => Promise<void>
  connectWalletConnect: () => Promise<void>
  disconnect: () => void
  switchNetwork: (chainId: number) => Promise<void>
}

const Web3Context = createContext<Web3ContextValue>({
  address: null,
  chainId: null,
  isConnected: false,
  isConnecting: false,
  connector: null,
  provider: null,
  signer: null,
  connect: async () => {},
  connectWalletConnect: async () => {},
  disconnect: () => {},
  switchNetwork: async () => {},
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const config = useConfig()
  const { address, isConnected, isConnecting: wagmiIsConnecting, connector: activeConnector } =
    useAccount()
  const chainId = useChainId()
  const { connectors, connectAsync, isPending: connectPending } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { switchChainAsync } = useSwitchChain()

  // Ethers wrappers around the active wagmi connector's EIP-1193 provider.
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)

  // Re-derive the ethers provider/signer whenever the active connection
  // changes (connector, account, or chain).
  useEffect(() => {
    let cancelled = false

    async function syncEthers() {
      if (!isConnected) {
        if (!cancelled) {
          setProvider(null)
          setSigner(null)
        }
        return
      }

      try {
        const account = getAccount(config)
        const eip1193 = (await account.connector?.getProvider()) as
          | EIP1193Provider
          | undefined
        if (!eip1193 || cancelled) return

        const browserProvider = new ethers.BrowserProvider(
          eip1193 as unknown as ethers.Eip1193Provider,
          "any",
        )
        const ethersSigner = await browserProvider.getSigner().catch(() => null)

        if (!cancelled) {
          setProvider(browserProvider)
          setSigner(ethersSigner)
        }
      } catch (err) {
        console.warn("[v0] Failed to derive ethers signer from wagmi connector", err)
        if (!cancelled) {
          setProvider(null)
          setSigner(null)
        }
      }
    }

    syncEthers()
    return () => {
      cancelled = true
    }
  }, [config, isConnected, address, chainId, activeConnector])

  const findConnector = useCallback(
    (id: "injected" | "walletConnect") => connectors.find((c) => c.id === id || c.type === id),
    [connectors],
  )

  const connect = useCallback(async () => {
    const injected = findConnector("injected") ?? connectors[0]
    if (!injected) {
      throw new Error(
        "No browser wallet detected. Install MetaMask, Rabby, or use the WalletConnect option.",
      )
    }
    await connectAsync({ connector: injected, chainId: polygonAmoy.id })
  }, [connectAsync, connectors, findConnector])

  const connectWalletConnect = useCallback(async () => {
    const wc = findConnector("walletConnect")
    if (!wc) {
      throw new Error(
        "WalletConnect is not configured. Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID and reload.",
      )
    }
    await connectAsync({ connector: wc, chainId: polygonAmoy.id })
  }, [connectAsync, findConnector])

  const disconnect = useCallback(() => {
    void disconnectAsync()
  }, [disconnectAsync])

  const switchNetwork = useCallback(
    async (target: number) => {
      if (target !== polygon.id && target !== polygonAmoy.id) {
        throw new Error(
          `Unsupported chain ${target}. Only Polygon (137) and Polygon Amoy (80002) are supported.`,
        )
      }
      await switchChainAsync({ chainId: target as 137 | 80002 })
    },
    [switchChainAsync],
  )

  const connectorKind: ConnectorKind | null = useMemo(() => {
    if (!activeConnector) return null
    if (activeConnector.id === "walletConnect" || activeConnector.type === "walletConnect") {
      return "walletconnect"
    }
    return "injected"
  }, [activeConnector])

  const value = useMemo<Web3ContextValue>(
    () => ({
      address: address ?? null,
      chainId: chainId ?? null,
      isConnected: Boolean(isConnected),
      isConnecting: Boolean(wagmiIsConnecting || connectPending),
      connector: connectorKind,
      provider,
      signer,
      connect,
      connectWalletConnect,
      disconnect,
      switchNetwork,
    }),
    [
      address,
      chainId,
      isConnected,
      wagmiIsConnecting,
      connectPending,
      connectorKind,
      provider,
      signer,
      connect,
      connectWalletConnect,
      disconnect,
      switchNetwork,
    ],
  )

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export const useWeb3 = (): Web3ContextValue => useContext(Web3Context)
