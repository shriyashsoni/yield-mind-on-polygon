"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Code, Wallet, TrendingUp, Shield, Settings } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Documentation</h1>
            <p className="text-xl text-muted-foreground">Everything you need to know about using YieldMind</p>
          </div>

          <Tabs defaultValue="getting-started" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="vaults">Vaults</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="getting-started" className="space-y-6">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Book className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold">Getting Started</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">1. Connect Your Wallet</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Click the "Connect Wallet" button in the top right corner and select your preferred wallet
                        provider. Make sure you're connected to the Polygon network.
                      </p>
                      <div className="p-4 rounded-lg bg-muted">
                        <code className="text-sm">Network: Polygon (Chain ID: 137)</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">2. Choose a Vault</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Browse our available vaults in the Products section. Each vault has different risk profiles and
                        target APYs. Select one that matches your investment goals.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">3. Deposit Funds</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Enter the amount you want to deposit and approve the transaction. You'll receive vault shares
                        representing your portion of the pool.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">4. Monitor Performance</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Track your portfolio performance in the Dashboard. Our AI automatically rebalances your funds
                        across protocols to maximize yields.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vaults" className="space-y-6">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold">Understanding Vaults</h2>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Vaults are smart contracts that pool user funds and automatically allocate them across multiple DeFi
                    protocols to maximize yields while managing risk.
                  </p>

                  <div className="space-y-4">
                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Conservative Vault</h3>
                      <p className="text-muted-foreground mb-3">
                        Low-risk strategies focusing on stable yields from established protocols like Aave and Compound.
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">Target APY: 8-12%</span>
                        <span className="text-muted-foreground">Risk: Low</span>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Balanced Vault</h3>
                      <p className="text-muted-foreground mb-3">
                        Moderate risk with diversified strategies across lending, liquidity provision, and yield
                        farming.
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">Target APY: 15-25%</span>
                        <span className="text-muted-foreground">Risk: Medium</span>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Aggressive Vault</h3>
                      <p className="text-muted-foreground mb-3">
                        Higher risk strategies targeting maximum yields through advanced DeFi protocols and strategies.
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-orange-600 dark:text-orange-400 font-medium">Target APY: 30-50%</span>
                        <span className="text-muted-foreground">Risk: High</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-6">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold">Yield Strategies</h2>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our AI engine analyzes multiple yield strategies and automatically allocates funds to optimize
                    risk-adjusted returns.
                  </p>

                  <div className="space-y-4">
                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Lending Strategies</h3>
                      <p className="text-muted-foreground">
                        Supply assets to lending protocols like Aave and Compound to earn interest from borrowers. Low
                        risk with stable returns.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Liquidity Provision</h3>
                      <p className="text-muted-foreground">
                        Provide liquidity to DEX pools on Balancer, Curve, and QuickSwap to earn trading fees and
                        incentive rewards.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Yield Farming</h3>
                      <p className="text-muted-foreground">
                        Stake LP tokens in farms to earn additional protocol tokens. Higher yields but requires active
                        management.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Arbitrage Opportunities</h3>
                      <p className="text-muted-foreground">
                        Exploit price differences across protocols to generate additional returns with minimal risk.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="governance" className="space-y-6">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Settings className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold">DAO Governance</h2>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    YieldMind is governed by its community through a decentralized autonomous organization (DAO). Token
                    holders can propose and vote on important protocol decisions.
                  </p>

                  <div className="space-y-4">
                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Voting Power</h3>
                      <p className="text-muted-foreground">
                        Your voting power is proportional to your vault share holdings. The more you have invested, the
                        more influence you have on governance decisions.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Proposal Types</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3">
                        <li>Strategy additions or removals</li>
                        <li>Fee structure changes</li>
                        <li>Risk parameter adjustments</li>
                        <li>Protocol integrations</li>
                        <li>Treasury management</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Voting Process</h3>
                      <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-3">
                        <li>Proposal submission with detailed description</li>
                        <li>Community discussion period (3 days)</li>
                        <li>Voting period (7 days)</li>
                        <li>Execution if quorum and majority reached</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold">Security</h2>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Security is our top priority. We employ multiple layers of protection to keep your funds safe.
                  </p>

                  <div className="space-y-4">
                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Smart Contract Audits</h3>
                      <p className="text-muted-foreground">
                        All our smart contracts have been audited by leading security firms including CertiK and
                        OpenZeppelin. Audit reports are publicly available.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
                      <p className="text-muted-foreground">
                        Automated circuit breakers pause operations if abnormal conditions are detected. Position limits
                        prevent over-concentration in any single protocol.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Insurance Coverage</h3>
                      <p className="text-muted-foreground">
                        Vault deposits are covered by DeFi insurance protocols, providing an additional layer of
                        protection against smart contract exploits.
                      </p>
                    </div>

                    <div className="p-6 rounded-lg border bg-card">
                      <h3 className="text-xl font-semibold mb-2">Bug Bounty Program</h3>
                      <p className="text-muted-foreground">
                        We offer rewards up to $100,000 for responsible disclosure of security vulnerabilities. Contact
                        security@yieldmind.io to report issues.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Code className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold">Developer API</h2>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Integrate YieldMind into your applications using our smart contract interfaces and REST API.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Smart Contract Addresses</h3>
                      <div className="p-4 rounded-lg bg-muted space-y-2 font-mono text-sm">
                        <div>YieldVault: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</div>
                        <div>RebalanceOracle: 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063</div>
                        <div>BalancerStrategy: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">REST API Endpoints</h3>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border bg-card">
                          <code className="text-sm text-primary">GET /api/vaults</code>
                          <p className="text-muted-foreground mt-2">Get list of all vaults with current APY and TVL</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <code className="text-sm text-primary">GET /api/strategies</code>
                          <p className="text-muted-foreground mt-2">Get active strategies and their allocations</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card">
                          <code className="text-sm text-primary">GET /api/ml/recommendations</code>
                          <p className="text-muted-foreground mt-2">Get latest AI recommendations for rebalancing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
