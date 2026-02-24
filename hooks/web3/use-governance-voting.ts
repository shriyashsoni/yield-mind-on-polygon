"use client"

import { useQuery } from "@tanstack/react-query"
import { useAccount, usePublicClient, useWalletClient } from "wagmi"
import { CONTRACTS_ZKEVM, GOVERNOR_ABI } from "@/lib/web3/zkevm"

export function useGovernanceVoting(proposalId: bigint) {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const votes = useQuery({
    queryKey: ["governance", "votes", proposalId.toString()],
    enabled: Boolean(publicClient),
    queryFn: async () => {
      if (!publicClient) throw new Error("No public client")
      const [againstVotes, forVotes, abstainVotes] = await publicClient.readContract({
        address: CONTRACTS_ZKEVM.governor,
        abi: GOVERNOR_ABI,
        functionName: "proposalVotes",
        args: [proposalId],
      })

      return { againstVotes, forVotes, abstainVotes }
    },
    refetchInterval: 20_000,
  })

  const castVote = async (support: 0 | 1 | 2) => {
    if (!walletClient || !publicClient || !address) throw new Error("Wallet unavailable")

    const hash = await walletClient.writeContract({
      address: CONTRACTS_ZKEVM.governor,
      abi: GOVERNOR_ABI,
      functionName: "castVote",
      args: [proposalId, support],
      account: address,
    })

    return publicClient.waitForTransactionReceipt({ hash, confirmations: 1 })
  }

  return {
    votes,
    castVote,
  }
}
