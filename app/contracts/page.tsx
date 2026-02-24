'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { DEPLOYMENT_CONFIG } from '@/lib/deployment-config';
import { ExternalLink, Copy, CheckCircle2, Clock, Code2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContractsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyAddress = (address: string) => {
    if (address === '0x0000000000000000000000000000000000000000') return;
    navigator.clipboard.writeText(address);
    setCopied(address);
    toast.success('Address copied');
    setTimeout(() => setCopied(null), 2000);
  };

  const deployedCount = Object.values(DEPLOYMENT_CONFIG.contracts).filter((c) => c.deployed).length;
  const pendingCount = Object.values(DEPLOYMENT_CONFIG.contracts).filter((c) => !c.deployed).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Smart Contracts</h1>
          <p className="text-lg text-muted-foreground">
            YieldMind Wave 6 protocol contracts on Polygon Amoy Testnet
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Object.keys(DEPLOYMENT_CONFIG.contracts).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-600">Deployed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{deployedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-amber-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{pendingCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Network Info */}
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>Network Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Network</p>
                <p className="font-semibold">Polygon Amoy (Testnet)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Chain ID</p>
                <p className="font-semibold">80002</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">RPC URL</p>
                <p className="font-mono text-xs break-all">https://rpc-amoy.polygon.technology/</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Explorer</p>
                <a
                  href="https://amoy.polygonscan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  PolygonScan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Order */}
        <Card>
          <CardHeader>
            <CardTitle>Deployment Order (Critical)</CardTitle>
            <CardDescription>Contracts must be deployed in this order due to dependencies</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {DEPLOYMENT_CONFIG.deploymentOrder.map((contractName, index) => (
                <li key={contractName} className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-primary rounded-full w-6 h-6 flex items-center justify-center bg-primary/10">
                    {index + 1}
                  </span>
                  <span>{contractName}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Deployed Contracts */}
        {deployedCount > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              Deployed Contracts ({deployedCount})
            </h2>
            <div className="grid gap-4">
              {Object.entries(DEPLOYMENT_CONFIG.contracts)
                .filter(([, contract]) => contract.deployed)
                .map(([key, contract]) => (
                  <Card key={key} className="border-green-500/30 bg-green-500/5">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {contract.name}
                            <Badge variant="outline" className="bg-green-500/10 text-green-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Live
                            </Badge>
                          </CardTitle>
                          <CardDescription>{contract.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Contract Address</p>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg font-mono text-sm">
                          <span className="flex-1 break-all">{contract.address}</span>
                          <button
                            onClick={() => copyAddress(contract.address)}
                            className="flex-shrink-0 hover:text-foreground transition-colors"
                          >
                            <Copy
                              className={`w-4 h-4 ${copied === contract.address ? 'text-green-500' : ''}`}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={contract.explorerUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View on PolygonScan
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Code2 className="w-4 h-4 mr-2" />
                          View ABI
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}

        {/* Pending Contracts */}
        {pendingCount > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-amber-500" />
              Pending Deployment ({pendingCount})
            </h2>
            <div className="grid gap-4">
              {Object.entries(DEPLOYMENT_CONFIG.contracts)
                .filter(([, contract]) => !contract.deployed)
                .map(([key, contract]) => (
                  <Card key={key} className="border-amber-500/30 bg-amber-500/5">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {contract.name}
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-700">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          </CardTitle>
                          <CardDescription>{contract.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        This contract is scheduled for deployment. Check the docs for deployment instructions.
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}

        {/* Documentation Link */}
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Deployment Guide</CardTitle>
            <CardDescription>
              Learn how to deploy and integrate YieldMind Wave 6 smart contracts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/docs/deployment">
                <Code2 className="w-4 h-4 mr-2" />
                View Deployment Documentation
              </a>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
