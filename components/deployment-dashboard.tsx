'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  AlertCircle,
  Network,
  Settings,
  BarChart3,
} from 'lucide-react';
import { DEPLOYED_CONTRACTS, formatAddress, getDeployedContracts, getPendingContracts } from '@/lib/contract-utils';
import { toast } from 'sonner';

export function DeploymentDashboard() {
  const [copied, setCopied] = useState<string | null>(null);

  const deployed = getDeployedContracts();
  const pending = getPendingContracts();
  const deploymentPercentage = Math.round((deployed.length / DEPLOYED_CONTRACTS.length) * 100);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    toast.success('Address copied to clipboard');
    setTimeout(() => setCopied(null), 2000);
  };

  const groupedContracts = {
    Core: DEPLOYED_CONTRACTS.filter((c) => ['Token', 'Vault'].includes(c.type)),
    Risk: DEPLOYED_CONTRACTS.filter((c) => ['Risk', 'Insurance'].includes(c.type)),
    Intelligence: DEPLOYED_CONTRACTS.filter((c) => ['Oracle', 'Strategy'].includes(c.type)),
    Governance: DEPLOYED_CONTRACTS.filter((c) => c.type === 'Governance'),
    Execution: DEPLOYED_CONTRACTS.filter((c) => ['Staking', 'Executor'].includes(c.type)),
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{DEPLOYED_CONTRACTS.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Wave 6 Protocol</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Deployed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{deployed.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{deploymentPercentage}% Complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{pending.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting Deployment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Polygon Amoy</div>
            <p className="text-xs text-muted-foreground mt-1">Testnet 80002</p>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Deployment Progress
          </CardTitle>
          <CardDescription>Overall deployment status across all contract modules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Deployment Progress</span>
              <span className="font-medium">{deploymentPercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${deploymentPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contract Groups */}
      {Object.entries(groupedContracts).map(([groupName, contracts]) => (
        <Card key={groupName}>
          <CardHeader>
            <CardTitle className="text-lg">{groupName} Module</CardTitle>
            <CardDescription>{contracts.length} contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract.address}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{contract.name}</h4>
                      {contract.isDeployed ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Deployed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-500/30">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      {contract.type && (
                        <Badge variant="secondary" className="ml-1">
                          {contract.type}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{contract.description}</p>
                    {contract.isDeployed && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <span>{formatAddress(contract.address)}</span>
                        <button
                          onClick={() => copyAddress(contract.address)}
                          className="hover:text-foreground transition-colors"
                          title="Copy full address"
                        >
                          <Copy className={`w-3 h-3 ${copied === contract.address ? 'text-green-500' : ''}`} />
                        </button>
                        {contract.explorerUrl && (
                          <a
                            href={contract.explorerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                            title="View on PolygonScan"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                    {contract.deployedAt && (
                      <p className="text-xs text-muted-foreground">Deployed: {contract.deployedAt}</p>
                    )}
                  </div>
                  {contract.isDeployed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 ml-4" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 ml-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Network Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Network Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Network</p>
              <p className="font-semibold">Polygon Amoy (Testnet)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chain ID</p>
              <p className="font-semibold">80002</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">RPC Endpoint</p>
              <p className="font-mono text-xs truncate">https://rpc-amoy.polygon.technology/</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Explorer</p>
              <a
                href="https://amoy.polygonscan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                PolygonScan Amoy
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Contract Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">View Source Code</Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              PolygonScan
            </Button>
            <Button variant="outline">Contract Documentation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
