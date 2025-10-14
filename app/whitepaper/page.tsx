"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Brain, Shield, TrendingUp, Users } from "lucide-react"
import Image from "next/image"

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl font-bold">YieldMind Whitepaper</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Technical documentation for AI-powered DeFi portfolio optimization on Polygon
            </p>
            <Button size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-4">Abstract</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  YieldMind introduces an AI-powered DeFi portfolio optimizer built on Polygon zkEVM that automatically
                  reallocates user funds across multiple protocols to maximize risk-adjusted returns. By leveraging
                  machine learning models trained on historical yield data, gas fees, and volatility patterns, YieldMind
                  provides institutional-grade portfolio management accessible to all DeFi users.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The DeFi ecosystem has grown exponentially, offering users numerous opportunities to earn yields
                    through lending, liquidity provision, and yield farming. However, optimal capital allocation across
                    these protocols requires constant monitoring, analysis, and rebalancing—tasks that are
                    time-consuming and require significant expertise.
                  </p>
                  <p>
                    YieldMind solves this problem by automating portfolio optimization using machine learning algorithms
                    that continuously analyze market conditions and execute rebalancing strategies. Built on Polygon
                    zkEVM, the platform benefits from low transaction costs, enabling frequent rebalancing without
                    eroding user returns.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">2. System Architecture</h2>

                <div className="space-y-6">
                  <div className="p-6 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">2.1 Machine Learning Engine</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      The ML engine consists of multiple models that analyze historical data to predict optimal
                      allocations. Key inputs include protocol APYs, historical volatility, gas costs, liquidity depth,
                      and smart contract risk scores. The models use ensemble learning techniques combining gradient
                      boosting and neural networks to generate allocation recommendations.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">2.2 Smart Contract Layer</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      The smart contract architecture uses a vault pattern where user deposits are pooled and managed
                      through a modular strategy system. Each strategy is an isolated contract that interfaces with
                      specific DeFi protocols. The RebalanceOracle verifies ML recommendations through cryptographic
                      signatures before execution.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">2.3 Strategy Execution</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Rebalancing operations are executed through Gelato Network automation, ensuring timely execution
                      without requiring manual intervention. The system implements slippage protection and circuit
                      breakers to prevent losses during volatile market conditions.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">3. Polygon Integration</h2>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 mb-4">
                  <Image src="/polygon-logo.png" alt="Polygon" width={140} height={35} className="h-8 w-auto" />
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    YieldMind is built on Polygon zkEVM, a zero-knowledge rollup that provides Ethereum-equivalent
                    security with significantly lower transaction costs. This choice is critical for our use case as
                    frequent rebalancing operations would be prohibitively expensive on Ethereum mainnet.
                  </p>
                  <p>Key benefits of Polygon zkEVM include:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Transaction costs 100x lower than Ethereum mainnet</li>
                    <li>Fast finality enabling responsive rebalancing</li>
                    <li>Full EVM compatibility for seamless protocol integrations</li>
                    <li>Transparent optimization logs verified on-chain</li>
                    <li>Access to Polygon's thriving DeFi ecosystem</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">4. Risk Management</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>YieldMind implements multiple layers of risk management to protect user funds:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Protocol Diversification:</strong> Funds are spread across multiple audited protocols to
                      minimize single-point-of-failure risk
                    </li>
                    <li>
                      <strong>Position Limits:</strong> Maximum allocation caps prevent over-concentration in any single
                      strategy
                    </li>
                    <li>
                      <strong>Circuit Breakers:</strong> Automated pauses trigger if abnormal conditions are detected
                    </li>
                    <li>
                      <strong>Smart Contract Audits:</strong> All contracts audited by leading security firms
                    </li>
                    <li>
                      <strong>Insurance Integration:</strong> Optional coverage through DeFi insurance protocols
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">5. Governance</h2>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">DAO Structure</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    YieldMind is governed by a decentralized autonomous organization (DAO) where vault share holders can
                    propose and vote on protocol changes. Key governance decisions include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Addition or removal of yield strategies</li>
                    <li>Fee structure adjustments</li>
                    <li>Risk parameter modifications</li>
                    <li>Protocol integration approvals</li>
                    <li>Treasury management</li>
                  </ul>
                  <p>
                    Voting power is proportional to vault share holdings, ensuring that those with the most at stake
                    have the greatest influence on protocol direction.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">6. Tokenomics</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>The protocol charges a performance fee on generated yields, which is distributed as follows:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>10% performance fee on profits</li>
                    <li>70% to vault share holders (auto-compounded)</li>
                    <li>20% to protocol treasury (DAO controlled)</li>
                    <li>10% to ML infrastructure and development</li>
                  </ul>
                  <p>No deposit or withdrawal fees are charged, ensuring users can enter and exit positions freely.</p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">7. Roadmap</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-card">
                    <h3 className="font-semibold mb-2">Phase 1: Launch (Q1 2025)</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Deploy core vault contracts on Polygon zkEVM</li>
                      <li>Integrate with Aave, Balancer, and Curve</li>
                      <li>Launch conservative and balanced vaults</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <h3 className="font-semibold mb-2">Phase 2: Expansion (Q2 2025)</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Add aggressive vault with advanced strategies</li>
                      <li>Integrate additional protocols (QuickSwap, Gains Network)</li>
                      <li>Launch DAO governance token</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <h3 className="font-semibold mb-2">Phase 3: Advanced Features (Q3 2025)</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Cross-chain expansion to other Polygon chains</li>
                      <li>Advanced ML models with reinforcement learning</li>
                      <li>Insurance integration and risk tranching</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">8. Conclusion</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  YieldMind represents the next evolution in DeFi portfolio management, combining cutting-edge machine
                  learning with the efficiency of Polygon zkEVM to deliver superior risk-adjusted returns. By automating
                  complex optimization strategies and making them accessible through a simple interface, YieldMind
                  democratizes institutional-grade portfolio management for all DeFi users.
                </p>
              </section>

              <section className="pt-8 border-t">
                <h2 className="text-2xl font-bold mb-4">References</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>[1] Polygon zkEVM Documentation - https://polygon.technology/polygon-zkevm</p>
                  <p>[2] Aave Protocol Whitepaper - https://aave.com</p>
                  <p>[3] Balancer V2 Documentation - https://docs.balancer.fi</p>
                  <p>[4] Curve Finance Documentation - https://curve.fi</p>
                  <p>[5] Gelato Network Documentation - https://docs.gelato.network</p>
                </div>
              </section>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download Complete Whitepaper (PDF)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
