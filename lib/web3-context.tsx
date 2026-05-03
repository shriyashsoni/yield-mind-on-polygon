"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { ethers } from "ethers"

// Polygon Amoy testnet (default) and mainnet are the only supported chains
// for WalletConnect — the gate refuses anything else.
const SUPPORTED_CHAIN_IDS = [80002, 137] as const
const DEFAULT_CHAIN_ID = 80002

type ConnectorKind = "injected" | "walletconnect"

interface Web3ContextType {
  address: string | null
  isConnected: boolean
  chainId: number | null
  connector: ConnectorKind | null
  isConnecting: boolean
  connect: () => Promise<void>
  connectWalletConnect: () => Promise<void>
  disconnect: () => void
  switchNetwork: (chainId: number) => Promise<void>
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
}

const Web3Context = createContext<Web3ContextType>({
  address: null,
  isConnected: false,
  chainId: null,
  connector: null,
  isConnecting: false,
  connect: async () => {},
  connectWalletConnect: async () => {},
  disconnect: () => {},
  switchNetwork: async () => {},
  provider: null,
  signer: null,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [connector, setConnector] = useState<ConnectorKind | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // The raw EIP-1193 provider we own (injected window.ethereum or a
  // WalletConnect EthereumProvider instance). We hold a ref so listeners
  // can reach the right object regardless of re-renders.
  const eip1193Ref = useRef<any>(null)
  const wcInstanceRef = useRef<any>(null)

  const wireProvider = useCallback(
    async (eip1193: any, kind: ConnectorKind, accounts?: string[]) => {
      const ethersProvider = new ethers.BrowserProvider(eip1193)
      const accs =
        accounts && accounts.length
          ? accounts
          : ((await eip1193.request({ method: "eth_accounts" })) as string[])
      if (!accs || accs.length === 0) throw new Error("No accounts available")

      const network = await ethersProvider.getNetwork()
      const ethSigner = await ethersProvider.getSigner()

      eip1193Ref.current = eip1193
      setProvider(ethersProvider)
      setSigner(ethSigner)
      setAddress(accs[0])
      setChainId(Number(network.chainId))
      setConnector(kind)

      try {
        localStorage.setItem("web3_address", accs[0])
        localStorage.setItem("web3_chainId", String(network.chainId))
        localStorage.setItem("web3_connector", kind)
      } catch {}
    },
    [],
  )

  // Restore previous session on first mount.
  useEffect(() => {
    if (typeof window === "undefined") return
    let cancelled = false

    ;(async () => {
      try {
        const saved = localStorage.getItem("web3_connector") as ConnectorKind | null
        if (saved === "injected" && (window as any).ethereum) {
          const eip1193 = (window as any).ethereum
          const accounts = (await eip1193.request({ method: "eth_accounts" })) as string[]
          if (!cancelled && accounts && accounts.length > 0) {
            await wireProvider(eip1193, "injected", accounts)
          }
        } else if (saved === "walletconnect") {
          const wc = await getWalletConnectProvider()
          if (!wc) return
          if (wc.session) {
            const accounts = (await wc.request({ method: "eth_accounts" })) as string[]
            if (!cancelled && accounts && accounts.length > 0) {
              wcInstanceRef.current = wc
              await wireProvider(wc, "walletconnect", accounts)
            }
          }
        }
      } catch (err) {
        console.error("[v0] Failed to restore wallet:", err)
        try {
          localStorage.removeItem("web3_address")
          localStorage.removeItem("web3_chainId")
          localStorage.removeItem("web3_connector")
        } catch {}
      }
    })()

    return () => {
      cancelled = true
    }
  }, [wireProvider])

  const connect = useCallback(async () => {
    if (typeof window === "undefined") return
    if (isConnecting) return
    const eip1193 = (window as any).ethereum
    if (!eip1193) {
      alert(
        "No browser wallet detected. Use the WalletConnect option to connect a mobile wallet or any EVM wallet.",
      )
      return
    }
    setIsConnecting(true)
    try {
      const accounts = (await eip1193.request({ method: "eth_requestAccounts" })) as string[]
      await wireProvider(eip1193, "injected", accounts)
    } catch (err) {
      console.error("[v0] Failed to connect injected wallet:", err)
    } finally {
      setIsConnecting(false)
    }
  }, [isConnecting, wireProvider])

  const connectWalletConnect = useCallback(async () => {
    if (isConnecting) return
    setIsConnecting(true)
    try {
      const wc = await getWalletConnectProvider()
      if (!wc) {
        alert(
          "WalletConnect is not configured. Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID and try again.",
        )
        return
      }
      wcInstanceRef.current = wc
      // Opens the QR / mobile deeplink modal.
      await wc.connect()
      const accounts = (await wc.request({ method: "eth_accounts" })) as string[]
      await wireProvider(wc, "walletconnect", accounts)
    } catch (err) {
      console.error("[v0] WalletConnect failed:", err)
    } finally {
      setIsConnecting(false)
    }
  }, [isConnecting, wireProvider])

  const disconnect = useCallback(() => {
    if (wcInstanceRef.current) {
      try {
        wcInstanceRef.current.disconnect?.()
      } catch {}
      wcInstanceRef.current = null
    }
    eip1193Ref.current = null
    setAddress(null)
    setChainId(null)
    setProvider(null)
    setSigner(null)
    setConnector(null)
    try {
      localStorage.removeItem("web3_address")
      localStorage.removeItem("web3_chainId")
      localStorage.removeItem("web3_connector")
    } catch {}
  }, [])

  const switchNetwork = useCallback(async (targetChainId: number) => {
    const eip1193 = eip1193Ref.current
    if (!eip1193) return
    const hex = `0x${targetChainId.toString(16)}`
    try {
      await eip1193.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hex }],
      })
      setChainId(targetChainId)
      try {
        localStorage.setItem("web3_chainId", String(targetChainId))
      } catch {}
    } catch (error: any) {
      if (error?.code === 4902) {
        const chainData =
          targetChainId === 137
            ? {
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
                rpcUrls: ["https://polygon-rpc.com"],
                blockExplorerUrls: ["https://polygonscan.com"],
              }
            : {
                chainId: "0x13882",
                chainName: "Polygon Amoy Testnet",
                nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
                rpcUrls: ["https://rpc-amoy.polygon.technology"],
                blockExplorerUrls: ["https://amoy.polygonscan.com"],
              }

        try {
          await eip1193.request({
            method: "wallet_addEthereumChain",
            params: [chainData],
          })
          setChainId(targetChainId)
        } catch (addErr) {
          console.error("[v0] Failed to add chain:", addErr)
        }
      } else {
        console.error("[v0] Failed to switch chain:", error)
      }
    }
  }, [])

  // Keep provider/account/chain state in sync with any active connector.
  useEffect(() => {
    const eip1193 = eip1193Ref.current
    if (!eip1193 || typeof eip1193.on !== "function") return

    const handleAccountsChanged = (accounts: string[]) => {
      if (!accounts || accounts.length === 0) {
        disconnect()
        return
      }
      setAddress(accounts[0])
      try {
        localStorage.setItem("web3_address", accounts[0])
      } catch {}
    }

    const handleChainChanged = (chainIdHex: string) => {
      const newChainId =
        typeof chainIdHex === "string" ? Number.parseInt(chainIdHex, 16) : Number(chainIdHex)
      setChainId(newChainId)
      try {
        localStorage.setItem("web3_chainId", String(newChainId))
      } catch {}
    }

    const handleDisconnect = () => disconnect()

    eip1193.on("accountsChanged", handleAccountsChanged)
    eip1193.on("chainChanged", handleChainChanged)
    eip1193.on("disconnect", handleDisconnect)

    return () => {
      try {
        eip1193.removeListener?.("accountsChanged", handleAccountsChanged)
        eip1193.removeListener?.("chainChanged", handleChainChanged)
        eip1193.removeListener?.("disconnect", handleDisconnect)
      } catch {}
    }
  }, [disconnect, address, connector])

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected: !!address,
        chainId,
        connector,
        isConnecting,
        connect,
        connectWalletConnect,
        disconnect,
        switchNetwork,
        provider,
        signer,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)

// ---- WalletConnect provider singleton ----------------------------------
//
// We dynamically import @walletconnect/ethereum-provider so it never ships
// in the SSR bundle and only initialises when the user actually clicks the
// WalletConnect button. If NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is missing
// we return null so callers can show a graceful message.

let _wcInstance: any = null
let _wcInitPromise: Promise<any> | null = null

async function getWalletConnectProvider(): Promise<any | null> {
  if (typeof window === "undefined") return null
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  if (!projectId) return null
  if (_wcInstance) return _wcInstance
  if (_wcInitPromise) return _wcInitPromise

  _wcInitPromise = (async () => {
    const { EthereumProvider } = await import("@walletconnect/ethereum-provider")
    const instance = await EthereumProvider.init({
      projectId,
      chains: [DEFAULT_CHAIN_ID],
      optionalChains: [...SUPPORTED_CHAIN_IDS],
      showQrModal: true,
      metadata: {
        name: "YieldMind",
        description: "AI-powered DeFi yield optimization on Polygon",
        url: typeof window !== "undefined" ? window.location.origin : "https://yieldmind.app",
        icons: ["/logos/polygon.png"],
      },
      rpcMap: {
        80002: "https://rpc-amoy.polygon.technology",
        137: "https://polygon-rpc.com",
      },
    })
    _wcInstance = instance
    return instance
  })()

  return _wcInitPromise
}
