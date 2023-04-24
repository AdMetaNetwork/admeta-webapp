import * as T from '../utils'

export const seo_default_title = 'AdMeta | A privacy-preserving Ad Platform in Metaverse'
export const seo_default_keywords = 'AdMeta, Metaverse advertisement, advertising platform, web3, web3 advertising'
export const seo_default_description = `AdMeta is a Metaverse ad platform that focuses on privacy preserving. We use a Trusted Execution Environment (TEE) to store and process user's private data for privacy protection.`


export const polkadot_network = 'wss://testnet.admeta.network'
export const extension_name = 'admeta-app'

export const ADMETA_MSG_ACCOUNT = 'ADMETA_MSG_ACCOUNT'
export const ADMETA_MSG_DOMAIN = 'ADMETA_MSG_DOMAIN'
export const ADMETA_MSG_SWITCH = 'ADMETA_MSG_SWITCH'

export const HTTP_SERVER = 'https://api.admeta.network/'

export const CONTRACT_ADDRESS = '0xd112476CA74aAa81D4B4cB1921423260dff57aF2'

export const DEFAULT_CHAIN_ID = 11155111

export const AD_CATEGORY = [
  {
    name: 'GameFi',
    state: true
  },
  {
    name: 'DeFi',
    state: true
  },
  {
    name: 'Metaverse',
    state: true
  },
  {
    name: 'NFT',
    state: true
  }
]

export const DEFAULT_CHAIN: T.ChainType = {
  1: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://main-light.eth.linkpool.io/"],
  },
  4: {
    chainId: `0x${Number(4).toString(16)}`,
    chainName: "Rinkeby (ETH Testnet)",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby-light.eth.linkpool.io/"],
  },
  137: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet (Matic)",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  250: {
    chainId: `0x${Number(250).toString(16)}`,
    chainName: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  43114: {
    chainId: `0x${Number(43114).toString(16)}`,
    chainName: "Avalanche Mainnet C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network"],
  },
  80001: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai Testnet",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-mumbai.maticvigil.com",
      "https://rpc-mumbai.matic.today",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
  11155111: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc.sepolia.org",
    ],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
};
