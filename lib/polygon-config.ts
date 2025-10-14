/**
 * Polygon Network Configuration
 * Configuration for Polygon PoS and zkEVM networks
 */

export const POLYGON_NETWORKS = {
  polygonPos: {
    chainId: 137,
    name: "Polygon PoS",
    rpcUrl: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  polygonZkEVM: {
    chainId: 1101,
    name: "Polygon zkEVM",
    rpcUrl: "https://zkevm-rpc.com",
    blockExplorer: "https://zkevm.polygonscan.com",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
  },
  mumbai: {
    chainId: 80001,
    name: "Mumbai Testnet",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    blockExplorer: "https://mumbai.polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
}

/**
 * Protocol addresses on Polygon
 */
export const PROTOCOL_ADDRESSES = {
  // Balancer
  balancer: {
    vault: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
    weightedPoolFactory: "0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9",
  },

  // Aave V3
  aave: {
    pool: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
    poolDataProvider: "0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654",
  },

  // QuickSwap
  quickswap: {
    router: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    factory: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
  },

  // Curve
  curve: {
    addressProvider: "0x0000000022D53366457F9d5E68Ec105046FC4383",
    registry: "0x094d12e5b541784701FD8d65F11fc0598FBC6332",
  },

  // Chainlink Price Feeds
  chainlink: {
    usdcUsd: "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7",
    maticUsd: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
    ethUsd: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  },
}

/**
 * Supported assets for YieldMind
 */
export const SUPPORTED_ASSETS = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
    icon: "/assets/usdc.svg",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    decimals: 18,
    icon: "/assets/dai.svg",
  },
  {
    symbol: "WMATIC",
    name: "Wrapped Matic",
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    decimals: 18,
    icon: "/assets/matic.svg",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether",
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    decimals: 18,
    icon: "/assets/eth.svg",
  },
]

/**
 * Strategy configurations
 */
export const STRATEGIES = [
  {
    name: "Balancer Weighted Pool",
    protocol: "Balancer",
    riskLevel: "Medium",
    expectedAPY: 22.5,
    description: "Liquidity provision in Balancer weighted pools",
  },
  {
    name: "Aave Lending",
    protocol: "Aave",
    riskLevel: "Low",
    expectedAPY: 15.2,
    description: "Supply assets to Aave V3 lending markets",
  },
  {
    name: "QuickSwap LP",
    protocol: "QuickSwap",
    riskLevel: "Medium-High",
    expectedAPY: 18.7,
    description: "Provide liquidity to QuickSwap DEX pools",
  },
  {
    name: "Curve Stable Pool",
    protocol: "Curve",
    riskLevel: "Low",
    expectedAPY: 12.3,
    description: "Stablecoin liquidity in Curve pools",
  },
]
