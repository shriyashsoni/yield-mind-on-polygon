// YieldMind Backend API Client
// Connects frontend to backend services and smart contracts

import { CONTRACT_ADDRESSES } from './contract-abis';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yieldmind.dev';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface ContractEvent {
  contract: keyof typeof CONTRACT_ADDRESSES.AMOY;
  event: string;
  data: any;
  timestamp: number;
}

interface PortfolioMetrics {
  totalValue: string;
  yieldEarned: string;
  apy: number;
  riskScore: number;
  strategies: Array<{
    name: string;
    allocation: number;
    apy: number;
  }>;
}

interface RiskMetrics {
  riskScore: number;
  insuranceReserve: string;
  protectionActive: boolean;
  drawdownRisk: number;
  lastUpdate: number;
}

interface StrategyMetrics {
  name: string;
  performanceChange24h: number;
  totalValue: string;
  allocation: number;
  apy: number;
  riskScore: number;
}

class YieldMindApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('[v0] API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Contract Operations

  async getContractStatus(contractName: string): Promise<ApiResponse<{ status: string; lastUpdate: number }>> {
    return this.makeRequest(`/contracts/${contractName}/status`);
  }

  async getContractEvents(contractName: string, limit: number = 10): Promise<ApiResponse<ContractEvent[]>> {
    return this.makeRequest(`/contracts/${contractName}/events?limit=${limit}`);
  }

  async executeContractFunction(
    contractName: string,
    functionName: string,
    args: any[]
  ): Promise<ApiResponse<{ txHash: string; status: string }>> {
    return this.makeRequest(`/contracts/${contractName}/execute`, {
      method: 'POST',
      body: JSON.stringify({ functionName, args }),
    });
  }

  // Portfolio Operations

  async getPortfolioMetrics(userAddress: string): Promise<ApiResponse<PortfolioMetrics>> {
    return this.makeRequest(`/portfolio/${userAddress}/metrics`);
  }

  async depositToVault(amount: string, assetType: string): Promise<ApiResponse<{ txHash: string }>> {
    return this.makeRequest('/portfolio/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount, assetType }),
    });
  }

  async withdrawFromVault(amount: string, shares: string): Promise<ApiResponse<{ txHash: string }>> {
    return this.makeRequest('/portfolio/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, shares }),
    });
  }

  async rebalancePortfolio(): Promise<ApiResponse<{ txHash: string; newAllocation: any }>> {
    return this.makeRequest('/portfolio/rebalance', {
      method: 'POST',
    });
  }

  // Risk Management

  async getRiskMetrics(): Promise<ApiResponse<RiskMetrics>> {
    return this.makeRequest('/risk/metrics');
  }

  async getInsuranceStatus(): Promise<ApiResponse<{ reserveBalance: string; reserveRatio: number; protectionActive: boolean }>> {
    return this.makeRequest('/risk/insurance');
  }

  async activateProtection(): Promise<ApiResponse<{ txHash: string }>> {
    return this.makeRequest('/risk/activate-protection', {
      method: 'POST',
    });
  }

  // AI & Forecasting

  async getAIForecast(): Promise<ApiResponse<{
    predictedAPY: number;
    confidence: number;
    recommendations: string[];
    nextUpdate: number;
  }>> {
    return this.makeRequest('/ai/forecast');
  }

  async updateAIForecast(): Promise<ApiResponse<{ status: string; nextUpdate: number }>> {
    return this.makeRequest('/ai/forecast/update', {
      method: 'POST',
    });
  }

  // Strategy Management

  async getActiveStrategies(): Promise<ApiResponse<StrategyMetrics[]>> {
    return this.makeRequest('/strategies/active');
  }

  async getStrategyPerformance(strategyAddress: string): Promise<ApiResponse<StrategyMetrics>> {
    return this.makeRequest(`/strategies/${strategyAddress}/performance`);
  }

  async enableStrategy(strategyAddress: string): Promise<ApiResponse<{ txHash: string }>> {
    return this.makeRequest('/strategies/enable', {
      method: 'POST',
      body: JSON.stringify({ strategyAddress }),
    });
  }

  async disableStrategy(strategyAddress: string): Promise<ApiResponse<{ txHash: string }>> {
    return this.makeRequest('/strategies/disable', {
      method: 'POST',
      body: JSON.stringify({ strategyAddress }),
    });
  }

  // Governance

  async getProposals(limit: number = 10): Promise<ApiResponse<Array<{
    id: number;
    title: string;
    description: string;
    forVotes: string;
    againstVotes: string;
    status: string;
  }>>> {
    return this.makeRequest(`/governance/proposals?limit=${limit}`);
  }

  async createProposal(proposal: {
    title: string;
    description: string;
    actions: any[];
  }): Promise<ApiResponse<{ proposalId: number; txHash: string }>> {
    return this.makeRequest('/governance/proposals', {
      method: 'POST',
      body: JSON.stringify(proposal),
    });
  }

  async voteOnProposal(proposalId: number, support: boolean): Promise<ApiResponse<{ txHash: string }>> {
    return this.makeRequest(`/governance/proposals/${proposalId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ support }),
    });
  }

  // Staking

  async getStakingInfo(userAddress: string): Promise<ApiResponse<{
    stakedAmount: string;
    rewards: string;
    apy: number;
    lockPeriod: number;
  }>> {
    return this.makeRequest(`/staking/${userAddress}/info`);
  }

  async stakeTokens(amount: string): Promise<ApiResponse<{ txHash: string }>> {
    return this.makeRequest('/staking/stake', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  async claimRewards(): Promise<ApiResponse<{ txHash: string; amount: string }>> {
    return this.makeRequest('/staking/claim', {
      method: 'POST',
    });
  }

  // Autonomous Execution

  async getExecutionQueue(): Promise<ApiResponse<Array<{
    id: string;
    action: string;
    status: string;
    executionTime: number;
  }>>> {
    return this.makeRequest('/execution/queue');
  }

  async getExecutionHistory(limit: number = 50): Promise<ApiResponse<Array<{
    id: string;
    action: string;
    timestamp: number;
    success: boolean;
  }>>> {
    return this.makeRequest(`/execution/history?limit=${limit}`);
  }

  // Health & Status

  async getSystemHealth(): Promise<ApiResponse<{
    status: 'healthy' | 'warning' | 'critical';
    uptime: number;
    contractsDeployed: number;
    totalValueLocked: string;
  }>> {
    return this.makeRequest('/health');
  }

  async getNetworkStatus(): Promise<ApiResponse<{
    networkName: string;
    chainId: number;
    rpcHealth: number;
    gasPrice: string;
    blockNumber: number;
  }>> {
    return this.makeRequest('/network/status');
  }
}

// Singleton instance
let apiClient: YieldMindApiClient | null = null;

export function getApiClient(): YieldMindApiClient {
  if (!apiClient) {
    apiClient = new YieldMindApiClient();
  }
  return apiClient;
}

export function initializeApiClient(baseUrl: string): YieldMindApiClient {
  apiClient = new YieldMindApiClient(baseUrl);
  return apiClient;
}

export default YieldMindApiClient;
