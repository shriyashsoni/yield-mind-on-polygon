"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import { toast } from "sonner"

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

  const connect = useCallback(async () => {
    console.log("[v0] Attempting to connect wallet...")

    if (typeof window === "undefined") {
      console.error("[v0] Window is undefined - not in browser environment")
      return
    }

    if (!window.ethereum) {
      console.error("[v0] No Web3 wallet detected")
      toast.error("No Web3 Wallet Detected", {
        description: "Please install MetaMask or another Web3 wallet extension to connect.",
      })
      return
    }

    try {
      console.log("[v0] Creating ethers provider...")
      const ethersProvider = new ethers.BrowserProvider(window.ethereum)

      console.log("[v0] Requesting account access...")
      const accounts = await ethersProvider.send("eth_requestAccounts", [])

      if (!accounts || accounts.length === 0) {
        console.error("[v0] No accounts returned from wallet")
        toast.error("Connection Failed", {
          description: "No accounts found. Please unlock your wallet and try again.",
        })
        return
      }

      console.log("[v0] Getting network information...")
      const network = await ethersProvider.getNetwork()

      console.log("[v0] Getting signer...")
      const ethSigner = await ethersProvider.getSigner()

      setProvider(ethersProvider)
      setSigner(ethSigner)
      setAddress(accounts[0])
      setChainId(Number(network.chainId))

      console.log("[v0] Wallet connected successfully:", accounts[0])
      toast.success("Wallet Connected", {
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      })
    } catch (error: any) {
      console.error("[v0] Failed to connect wallet:", error)

      if (error.code === 4001) {
        toast.error("Connection Rejected", {
          description: "You rejected the connection request. Please try again.",
        })
      } else if (error.code === -32002) {
        toast.error("Connection Pending", {
          description: "Please check your wallet for a pending connection request.",
        })
      } else {
        toast.error("Connection Failed", {
          description: error.message || "Failed to connect wallet. Please try again.",
        })
      }
    }
  }, [])

  const disconnect = useCallback(() => {
    console.log("[v0] Disconnecting wallet...")
    setAddress(null)
    setChainId(null)
    setProvider(null)
    setSigner(null)
    toast.info("Wallet Disconnected", {
      description: "Your wallet has been disconnected.",
    })
  }, [])

  const switchNetwork = useCallback(async (targetChainId: number) => {
    if (!window.ethereum) {
      toast.error("No Wallet Found", {
        description: "Please install a Web3 wallet to switch networks.",
      })
      return
    }

    console.log("[v0] Switching to chain:", targetChainId)

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })

      toast.success("Network Switched", {
        description: `Switched to ${targetChainId === 137 ? "Polygon Mainnet" : "Polygon Amoy Testnet"}`,
      })
    } catch (error: any) {
      console.error("[v0] Failed to switch network:", error)

      if (error.code === 4902) {
        console.log("[v0] Network not found, adding it...")
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
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainData],
          })

          toast.success("Network Added", {
            description: `Added and switched to ${chainData.chainName}`,
          })
        } catch (addError) {
          console.error("[v0] Failed to add network:", addError)
          toast.error("Failed to Add Network", {
            description: "Could not add the network to your wallet.",
          })
        }
      } else if (error.code === 4001) {
        toast.error("Request Rejected", {
          description: "You rejected the network switch request.",
        })
      } else {
        toast.error("Network Switch Failed", {
          description: error.message || "Failed to switch network.",
        })
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return

    const checkConnection = async () => {
      try {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await ethersProvider.listAccounts()

        if (accounts.length > 0) {
          console.log("[v0] Found existing connection, reconnecting...")
          const network = await ethersProvider.getNetwork()
          const ethSigner = await ethersProvider.getSigner()

          setProvider(ethersProvider)
          setSigner(ethSigner)
          setAddress(accounts[0].address)
          setChainId(Number(network.chainId))
        }
      } catch (error) {
        console.error("[v0] Failed to check existing connection:", error)
      }
    }

    checkConnection()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("[v0] Accounts changed:", accounts)
      if (accounts.length === 0) {
        disconnect()
      } else {
        setAddress(accounts[0])
        toast.info("Account Changed", {
          description: `Switched to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        })
      }
    }

    const handleChainChanged = (chainIdHex: string) => {
      const newChainId = Number.parseInt(chainIdHex, 16)
      console.log("[v0] Chain changed to:", newChainId)
      setChainId(newChainId)
      window.location.reload()
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
