import {getDefaultConfig} from '@rainbow-me/rainbowkit';

import { defineChain } from 'viem';

import {
    sepolia,
    optimism,
    arbitrum,
    base,
    scroll,
    zksync,
    zora,
    linea,
    ink,
    unichain,
} from 'wagmi/chains';

// Define chains clearly with icons:
const monadTestnet = defineChain({
    id: 10143,
    name: 'Monad Testnet',
    nativeCurrency: { name: 'Monad', symbol: 'MONAD', decimals: 18 },
    rpcUrls: { default: { http: ['https://testnet-rpc.monad.xyz'] } },
    iconUrl: '/images/chains/monad.jpg',
    testnet: true
});
const soneium = defineChain({
    id: 2332,
    name: 'Soneium',
    nativeCurrency: { name: 'Soneium', symbol: 'SONE', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.soneium.network'] } },
    iconUrl: '/images/chains/soneium.jpeg',
});
const hemi = defineChain({
    id: 743111,
    name: 'Hemi',
    nativeCurrency: { name: 'Hemi', symbol: 'HEMI', decimals: 18 },
    rpcUrls: { default: { http: ['https://testnet.rpc.hemi.network'] } },
    iconUrl: '/images/chains/hemi.webp',
});
const bob = defineChain({
    id: 60808,
    name: 'BOB',
    nativeCurrency: { name: 'BOB', symbol: 'BOB', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.gobob.xyz'] } },
    iconUrl: '/images/chains/bob.webp',
});
const superseed = defineChain({
    id: 8008135,
    name: 'Superseed',
    nativeCurrency: { name: 'Superseed', symbol: 'SEED', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.superseed.xyz'] } },
    iconUrl: '/images/chains/superseed.png',
});
const fraxtal = defineChain({
    id: 252,
    name: 'Fraxtal',
    nativeCurrency: { name: 'Frax Ether', symbol: 'frxETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.frax.com'] } },
    iconUrl: '/images/chains/fraxtal.webp',
});
const lisk = defineChain({
    id: 4202,
    name: 'Lisk',
    nativeCurrency: { name: 'Lisk', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.sepolia-api.lisk.com'] } },
    iconUrl: '/images/chains/lisk.svg',
});
const mode = defineChain({
    id: 34443,
    name: 'Mode',
    nativeCurrency: { name: 'Mode ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://mainnet.mode.network'] } },
    iconUrl: '/images/chains/mode.svg',
});

export const config = getDefaultConfig({
    appName: 'cryptocoffee',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains: [sepolia, monadTestnet, optimism, arbitrum, base, scroll, zksync, mode, zora, linea, ink, soneium, unichain, hemi, bob, superseed, fraxtal, lisk],
});
