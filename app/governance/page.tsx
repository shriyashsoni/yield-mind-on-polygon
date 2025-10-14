"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useWeb3 } from "@/lib/web3-context"
import { CheckCircle2, XCircle, Clock, Users, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const proposals = [
  {
    id: 1,
    title: "Add Stargate Finance Strategy",
    description: "Proposal to add Stargate USDC pool as a new yield strategy with 10% allocation",
    status: "active",
    votesFor: 2450000,
    votesAgainst: 450000,
    totalVotes: 2900000,
    quorum: 3000000,
    endDate: "2024-02-15",
    proposer: "0x742d...4f2a",
  },
  {
    id: 2,
    title: "Increase Rebalance Threshold",
    description: "Adjust ML confidence threshold from 75% to 80% for rebalancing decisions",
    status: "active",
    votesFor: 1800000,
    votesAgainst: 1200000,
    totalVotes: 3000000,
    quorum: 3000000,
    endDate: "2024-02-12",
    proposer: "0x8a3c...9b1d",
  },
  {
    id: 3,
    title: "Reduce Management Fee",
    description: "Lower annual management fee from 2% to 1.5%",
    status: "passed",
    votesFor: 4200000,
    votesAgainst: 800000,
    totalVotes: 5000000,
    quorum: 3000000,
    endDate: "2024-01-28",
    proposer: "0x1f5e...7c8b",
  },
]

const teamMembers = [
  {
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f4f2a",
    role: "Admin",
    permissions: ["Propose", "Execute", "Manage"],
  },
  { address: "0x8a3c91B2f0d3e4c5a6b7c8d9e0f1a2b3c4d5e6f7", role: "Strategist", permissions: ["Propose", "Rebalance"] },
  { address: "0x1f5e2d3c4b5a6978c8d9e0f1a2b3c4d5e6f7a8b9", role: "Operator", permissions: ["Rebalance"] },
]

export default function GovernancePage() {
  const { address, isConnected } = useWeb3()
  const { toast } = useToast()
  const [votedProposals, setVotedProposals] = useState<Set<number>>(new Set())

  const handleVote = (proposalId: number, support: boolean) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      })
      return
    }

    setVotedProposals(new Set(votedProposals).add(proposalId))
    toast({
      title: "Vote submitted",
      description: `You voted ${support ? "FOR" : "AGAINST"} proposal #${proposalId}`,
    })
  }

  const handleGrantPermission = (memberAddress: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to manage permissions",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Permission granted",
      description: `Granted permissions to ${memberAddress.slice(0, 6)}...${memberAddress.slice(-4)}`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">DAO Governance</h1>
          <p className="text-muted-foreground text-lg">Vote on proposals and manage protocol parameters</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Proposals</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">3 active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Your Voting Power</CardTitle>
              <Shield className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125,000</div>
              <p className="text-xs text-muted-foreground mt-1">2.5% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">Participation Rate</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>68%</span>
                <span className="text-muted-foreground">Last 30 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold">Active Proposals</h2>
          {proposals.map((proposal) => {
            const percentFor = (proposal.votesFor / proposal.totalVotes) * 100
            const percentAgainst = (proposal.votesAgainst / proposal.totalVotes) * 100
            const quorumReached = proposal.totalVotes >= proposal.quorum
            const hasVoted = votedProposals.has(proposal.id)

            return (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">
                          #{proposal.id} {proposal.title}
                        </CardTitle>
                        <Badge
                          variant={
                            proposal.status === "active"
                              ? "default"
                              : proposal.status === "passed"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {proposal.status === "active" && <Clock className="h-3 w-3 mr-1" />}
                          {proposal.status === "passed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {proposal.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                          {proposal.status}
                        </Badge>
                      </div>
                      <CardDescription>{proposal.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Proposed by {proposal.proposer}</span>
                    <span>•</span>
                    <span>Ends {proposal.endDate}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-500 font-medium">For: {percentFor.toFixed(1)}%</span>
                      <span className="text-muted-foreground">{(proposal.votesFor / 1000000).toFixed(2)}M votes</span>
                    </div>
                    <Progress value={percentFor} className="h-2 bg-red-500/20" indicatorClassName="bg-green-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-500 font-medium">Against: {percentAgainst.toFixed(1)}%</span>
                      <span className="text-muted-foreground">
                        {(proposal.votesAgainst / 1000000).toFixed(2)}M votes
                      </span>
                    </div>
                    <Progress value={percentAgainst} className="h-2 bg-green-500/20" indicatorClassName="bg-red-500" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Quorum: </span>
                      <span className={quorumReached ? "text-green-500 font-medium" : "text-orange-500 font-medium"}>
                        {((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}%
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        ({(proposal.totalVotes / 1000000).toFixed(2)}M / {(proposal.quorum / 1000000).toFixed(1)}M)
                      </span>
                    </div>
                  </div>

                  {proposal.status === "active" && (
                    <div className="flex gap-3 pt-2">
                      <Button
                        className="flex-1"
                        variant="default"
                        disabled={hasVoted || !isConnected}
                        onClick={() => handleVote(proposal.id, true)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Vote For
                      </Button>
                      <Button
                        className="flex-1"
                        variant="destructive"
                        disabled={hasVoted || !isConnected}
                        onClick={() => handleVote(proposal.id, false)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>
                  )}

                  {hasVoted && (
                    <p className="text-sm text-center text-muted-foreground">You have already voted on this proposal</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Team Permissions</h2>
          <Card>
            <CardHeader>
              <CardTitle>Authorized Team Members</CardTitle>
              <CardDescription>Manage roles and permissions for protocol operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.address} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-mono text-sm">{member.address}</p>
                        <Badge>{member.role}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGrantPermission(member.address)}
                      disabled={!isConnected}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
