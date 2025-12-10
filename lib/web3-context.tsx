"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"

interface Web3ContextType {
  address: string | null
  isConnected: boolean
  chainId: number | null
  connect: () => Promise<void>
  disconnect: () => void
  switchNetwork: (chainId: number) => Promise<void>
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
}

const Web3Context = createContext<Web3ContextType>({
  address: null,
  isConnected: false,
  chainId: null,
  connect: async () => {},
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
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const restoreConnection = async () => {
      try {
        const savedAddress = localStorage.getItem("web3_address")
        const savedChainId = localStorage.getItem("web3_chainId")

        if (savedAddress && window.ethereum) {
          const ethersProvider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await ethersProvider.listAccounts()

          if (accounts.length > 0) {
            const network = await ethersProvider.getNetwork()
            const ethSigner = await ethersProvider.getSigner()

            setProvider(ethersProvider)
            setSigner(ethSigner)
            setAddress(accounts[0].address)
            setChainId(Number(network.chainId))
          }
        }
      } catch (error) {
        console.error("[v0] Failed to restore wallet connection:", error)
        localStorage.removeItem("web3_address")
        localStorage.removeItem("web3_chainId")
      }
    }

    restoreConnection()
  }, [])

  const connect = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet")
      return
    }

    if (isConnecting) return
    setIsConnecting(true)

    try {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await ethersProvider.send("eth_requestAccounts", [])
      const network = await ethersProvider.getNetwork()
      const ethSigner = await ethersProvider.getSigner()

      setProvider(ethersProvider)
      setSigner(ethSigner)
      setAddress(accounts[0])
      setChainId(Number(network.chainId))

      localStorage.setItem("web3_address", accounts[0])
      localStorage.setItem("web3_chainId", String(network.chainId))
    } catch (error) {
      console.error("[v0] Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }, [isConnecting])

  const disconnect = useCallback(() => {
    setAddress(null)
    setChainId(null)
    setProvider(null)
    setSigner(null)
    localStorage.removeItem("web3_address")
    localStorage.removeItem("web3_chainId")
  }, [])

  const switchNetwork = useCallback(async (targetChainId: number) => {
    if (!window.ethereum) return

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })
      setChainId(targetChainId)
      localStorage.setItem("web3_chainId", String(targetChainId))
    } catch (error: any) {
      if (error.code === 4902) {
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

        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [chainData],
        })
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("[v0] Accounts changed:", accounts)
      if (accounts.length === 0) {
        disconnect()
      } else {
        setAddress(accounts[0])
        localStorage.setItem("web3_address", accounts[0])
      }
    }

    const handleChainChanged = (chainIdHex: string) => {
      console.log("[v0] Chain changed to:", chainIdHex)
      const newChainId = Number.parseInt(chainIdHex, 16)
      setChainId(newChainId)
      localStorage.setItem("web3_chainId", String(newChainId))
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
      window.ethereum?.removeListener("chainChanged", handleChainChanged)
    }
  }, [disconnect])

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected: !!address,
        chainId,
        connect,
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
