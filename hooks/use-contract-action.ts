"use client"

import { useCallback, useState } from "react"
import { ethers, type InterfaceAbi } from "ethers"
import { toast } from "sonner"
import { useWeb3 } from "@/lib/web3-context"

export type TxState = "idle" | "preparing" | "pending" | "success" | "error"

export interface UseContractActionResult {
  state: TxState
  hash: string | null
  error: string | null
  reset: () => void
  /**
   * Run a contract write. The runner is given a connected ethers Contract
   * instance plus the user's address and is expected to call a function and
   * return the resulting transaction object.
   */
  run: (opts: {
    address: string
    abi: InterfaceAbi
    label: string
    runner: (contract: ethers.Contract, account: string) => Promise<ethers.ContractTransactionResponse>
    successMessage?: string
    onConfirmed?: (receipt: ethers.TransactionReceipt | null) => void
  }) => Promise<ethers.TransactionReceipt | null>
}

export function useContractAction(): UseContractActionResult {
  const { signer, address, isConnected, connect, chainId } = useWeb3()
  const [state, setState] = useState<TxState>("idle")
  const [hash, setHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setState("idle")
    setHash(null)
    setError(null)
  }, [])

  const run: UseContractActionResult["run"] = useCallback(
    async ({ address: contractAddress, abi, label, runner, successMessage, onConfirmed }) => {
      try {
        if (!isConnected) {
          await connect()
        }
        if (!signer || !address) {
          throw new Error("Wallet not connected")
        }
        if (chainId !== 80002 && chainId !== 137) {
          throw new Error("Switch to Polygon Amoy or Polygon Mainnet to send this transaction")
        }
        if (!contractAddress || /^0x0+$/i.test(contractAddress)) {
          throw new Error("Contract is not deployed on this network")
        }

        setState("preparing")
        setError(null)
        setHash(null)

        const contract = new ethers.Contract(contractAddress, abi, signer)
        toast.info(`${label} — confirm in wallet`)

        const tx = await runner(contract, address)
        setHash(tx.hash)
        setState("pending")
        toast.info(`${label} submitted`, {
          description: tx.hash.slice(0, 10) + "…" + tx.hash.slice(-6),
        })

        const receipt = await tx.wait()
        const ok = receipt && (receipt.status === 1 || receipt.status === undefined)
        setState(ok ? "success" : "error")
        if (ok) {
          toast.success(successMessage ?? `${label} confirmed`)
        } else {
          toast.error(`${label} reverted on chain`)
        }
        onConfirmed?.(receipt)
        return receipt
      } catch (e: unknown) {
        const message =
          (typeof e === "object" && e !== null && "shortMessage" in e && String((e as { shortMessage: string }).shortMessage)) ||
          (e instanceof Error ? e.message : "Transaction failed")
        console.log("[v0] contract action error:", label, message)
        setError(message)
        setState("error")
        toast.error(`${label} failed`, { description: message })
        return null
      }
    },
    [signer, address, isConnected, connect, chainId],
  )

  return { state, hash, error, reset, run }
}
