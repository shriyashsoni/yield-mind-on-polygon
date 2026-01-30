'use client';

import { useState, useCallback } from 'react'
import { useWeb3 } from '@/lib/web3-context'

interface Transaction {
  txHash: string
  address: string
  amount: string
  type: 'deposit' | 'withdraw'
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: string
  explorerUrl: string
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { address, chainId } = useWeb3()

  const submitTransaction = useCallback(
    async (amount: string, type: 'deposit' | 'withdraw') => {
      if (!address || !chainId) {
        setError('Wallet not connected')
        return null
      }

      if (chainId !== 80002) {
        setError('Please switch to Polygon Amoy testnet (80002)')
        return null
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/transactions/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address,
            amount,
            chainId,
            type,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit transaction')
        }

        const data = await response.json()

        const transaction: Transaction = {
          txHash: data.txHash,
          address: data.address,
          amount: data.amount,
          type: data.type,
          status: data.status,
          timestamp: data.timestamp,
          explorerUrl: data.explorerUrl,
        }

        setTransactions((prev) => [transaction, ...prev])
        return transaction
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
        console.error('[v0] Transaction submission error:', err)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [address, chainId]
  )

  const getTransactionStatus = useCallback(
    async (txHash: string) => {
      if (!chainId) {
        setError('Chain ID not available')
        return null
      }

      try {
        const response = await fetch(
          `/api/transactions/status?txHash=${txHash}&chainId=${chainId}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch status')
        }

        const data = await response.json()

        // Update transaction status in state
        setTransactions((prev) =>
          prev.map((tx) =>
            tx.txHash === txHash ? { ...tx, status: data.status } : tx
          )
        )

        return data
      } catch (err) {
        console.error('[v0] Status fetch error:', err)
        return null
      }
    },
    [chainId]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    transactions,
    isLoading,
    error,
    submitTransaction,
    getTransactionStatus,
    clearError,
  }
}
