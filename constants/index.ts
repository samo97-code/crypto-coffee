import {Coffee, Zap, Beaker, Award, Droplets, Users,} from "lucide-react"
import {optimism, arbitrum} from 'viem/chains';

export const projects = [
    {
        id: 1,
        name: "Eth Sepolia",
        chain: "Eth",
        chainKey: 'Eth',
        chainId: 11155111,
        icon: "/images/chains/eth.svg",
        isNew: true,
        type: 'testnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on ETH",
        buttonColor: "bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500",
        description: "A decentralized exchange",
        explorerUrl: "https://sepolia.etherscan.io/",
        updatedAt: Date.now(),
    },
    {
        id: 2,
        name: "Monad",
        chain: "Monad",
        chainKey: 'Mon',
        chainId: 10143,
        icon: "/images/chains/monad.jpg",
        isNew: true,
        type: 'testnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Monad",
        buttonColor: "bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-900 hover:to-indigo-900",
        description: "A decentralized exchange",
        explorerUrl: "https://testnet.monadexplorer.com/",
        updatedAt: Date.now(),
    },
    {
        id: 3,
        name: "Optimism",
        chain: "Optimism",
        chainKey: 'Eth',
        chainId: 10,
        icon: "/images/chains/optimism.svg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Optimism",
        buttonColor: "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
        description: "A decentralized exchange",
        explorerUrl: "https://optimistic.etherscan.io/",
        updatedAt: Date.now(),
    },
    {
        id: 4,
        name: "Arbitrum",
        chain: "Arbitrum",
        chainKey: 'Eth',
        chainId: 42161,
        icon: "/images/chains/arbitrum.svg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Arbitrum",
        buttonColor: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
        description: "A decentralized exchange",
        explorerUrl: "https://arbiscan.io/",
        updatedAt: Date.now(),
    },
    {
        id: 5,
        name: "Base",
        chain: "Base",
        chainKey: 'Eth',
        chainId: 8453,
        icon: "/images/chains/base.svg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Base",
        buttonColor: "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500",
        description: "A decentralized exchange",
        explorerUrl: "https://basescan.org/",
        updatedAt: Date.now(),
    },
    {
        id: 6,
        name: "Scroll",
        chain: "Scroll",
        chainKey: 'Eth',
        chainId: 534352,
        icon: "/images/chains/scroll.svg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Scroll",
        buttonColor: "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
        description: "A decentralized exchange",
        explorerUrl: "https://scrollscan.com/",
        updatedAt: Date.now(),
    },
    {
        id: 7,
        name: "zkSync",
        chain: "zkSync",
        chainKey: 'Eth',
        chainId: 324,
        icon: "/images/chains/zkSync.png",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on zkSync",
        buttonColor: "bg-gradient-to-r from-zinc-800 to-gray-700 hover:from-zinc-900 hover:to-gray-800",
        description: "A decentralized exchange",
        explorerUrl: "https://explorer.zksync.io/",
        updatedAt: Date.now(),
    },
    {
        id: 8,
        name: "Mode",
        chain: "Mode",
        chainKey: 'Eth',
        chainId: 34443,
        icon: "/images/chains/mode.svg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Mode",
        buttonColor: "bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500",
        description: "A decentralized exchange",
        explorerUrl: "https://explorer.mode.network/",
        updatedAt: Date.now(),
    },
    {
        id: 9,
        name: "Zora",
        chain: "Zora",
        chainKey: 'Eth',
        chainId: 7777777,
        icon: "/images/chains/zora.svg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Zora",
        buttonColor: "bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600",
        description: "A decentralized exchange",
        explorerUrl: "https://explorer.zora.energy/",
        updatedAt: Date.now(),
    },
    {
        id: 10,
        name: "Linea",
        chain: "Linea",
        chainKey: 'Eth',
        chainId: 59144,
        icon: "/images/chains/linea.svg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Linea",
        buttonColor: "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600",
        description: "A decentralized exchange",
        explorerUrl: "https://lineascan.build/",
        updatedAt: Date.now(),
    },
    {
        id: 11,
        name: "Ink",
        chain: "Ink",
        chainKey: 'Eth',
        chainId: 57073,
        icon: "/images/chains/ink.png",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Ink",
        buttonColor: "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
        description: "A decentralized exchange",
        explorerUrl: "https://explorer.inkonchain.com/",
        updatedAt: Date.now(),
    },
    {
        id: 12,
        name: "Soneium",
        chain: "Soneium",
        chainKey: 'Eth',
        chainId: 1868,
        icon: "/images/chains/soneium.jpeg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Soneium",
        buttonColor: "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700",
        description: "Privacy-focused blockchain",
        explorerUrl: "https://soneium.blockscout.com/",
        updatedAt: Date.now(),
    },
    {
        id: 13,
        name: "Unichain",
        chain: "Unichain",
        chainKey: 'Eth',
        chainId: 130,
        icon: "/images/chains/unichain.jpg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Unichain",
        buttonColor: "bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500",
        description: "Interoperability protocol",
        explorerUrl: "https://unichain.blockscout.com/",
        updatedAt: Date.now(),
    },
    {
        id: 14,
        name: "Hemi",
        chain: "Hemi",
        chainKey: 'Eth',
        chainId: 43111,
        icon: "/images/chains/hemi.webp",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Hemi",
        buttonColor: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
        description: "A decentralized exchange",
        explorerUrl: "https://explorer.hemi.xyz/",
        updatedAt: Date.now(),
    },
    {
        id: 15,
        name: "BOB",
        chain: "Bob",
        chainKey: 'Eth',
        chainId: 60808,
        icon: "/images/chains/bob.webp",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Bob",
        buttonColor: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
        description: "A decentralized exchange",
        explorerUrl: "https://explorer.gobob.xyz/",
        updatedAt: Date.now(),
    },
    {
        id: 16,
        name: "Superseed",
        chain: "Superseed",
        chainKey: 'Eth',
        chainId: 5330,
        icon: "/images/chains/superseed.png",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Superseed",
        buttonColor: "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800",
        description: "A decentralized exchange",
        explorerUrl: "https://explorer.superseed.xyz/",
        updatedAt: Date.now(),
    },
    {
        id: 17,
        name: "Fraxtal",
        chain: "Fraxtal",
        chainKey: 'Eth',
        chainId: 252,
        icon: "/images/chains/fraxtal.webp",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Fraxtal",
        buttonColor: "bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-black hover:to-zinc-900",
        description: "Layer 2 scaling solution",
        explorerUrl: "https://fraxscan.com/",
        updatedAt: Date.now(),
    },
    {
        id: 18,
        name: "Lisk",
        chain: "Lisk",
        chainKey: 'Eth',
        chainId: 1135,
        icon: "/images/chains/lisk.svg",
        isNew: true,
        type: 'mainnet',
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Lisk",
        buttonColor: "bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500",
        description: "A decentralized exchange",
        explorerUrl: "https://blockscout.lisk.com/",
        updatedAt: Date.now(),
    },
]

export const dashboardTabs = [
    {id: 1, label: 'All', value: 'all', icon: Coffee, count: projects.length},
    {id: 2, label: 'Mainnet', value: 'mainnet', icon: Zap, count: projects.length - 2},
    {id: 3, label: 'Testnet', value: 'testnet', icon: Beaker, count: 2},
]

export const mockAnnouncements = [
    {
        id: 1,
        title: "New Features!",
        date: "2024-02-08",
        content: "Coffee staking pools are now live! Earn while you brew.",
        icon: "Sparkles",
        isNew: true,
    },
    {
        id: 2,
        title: "New chain added!",
        date: "2024-02-01",
        content: "Arabica Network is now available for brewing!",
        icon: "Zap",
        isNew: true,
    },
    {
        id: 3,
        title: "Weekly Rewards Distributed",
        date: "2024-01-25",
        content: "Check your wallet for last week's activity rewards!",
        icon: "Award",
        isNew: false,
    },
]

// Sample data for the profile page
export const activities = [
    {
        title: "Supported a Project",
        description: "You supported Uniswap with a coffee.",
        time: "2 hours ago",
        icon: Coffee,
        iconColor: "text-white",
        iconBg: "bg-gradient-to-r from-coffee-500 to-coffee-700",
        projectDetails: {
            name: "Uniswap",
            chain: "Optimism",
        },
    },
    {
        title: "Achievement Unlocked",
        description: "You earned the 'Generous Brewer' achievement.",
        time: "Yesterday",
        icon: Award,
        iconColor: "text-white",
        iconBg: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
        title: "Completed Daily Activity",
        description: "You completed the Gas Fee Lottery activity.",
        time: "2 days ago",
        icon: Zap,
        iconColor: "text-white",
        iconBg: "bg-gradient-to-r from-purple-500 to-violet-500",
    },
    {
        title: "Supported a Project",
        description: "You supported Base with a coffee.",
        time: "3 days ago",
        icon: Coffee,
        iconColor: "text-white",
        iconBg: "bg-gradient-to-r from-coffee-500 to-coffee-700",
        projectDetails: {
            name: "Base",
            chain: "Ethereum",
        },
    },
]

export const supportedProjects = [
    {
        name: "Uniswap",
        description: "Decentralized trading protocol",
        network: "Optimism",
        supportAmount: "$12.45",
        icon: Zap,
        badgeBg: "bg-red-100",
        badgeColor: "text-red-800",
    },
    {
        name: "Base",
        description: "Layer 2 scaling solution",
        network: "Ethereum",
        supportAmount: "$8.75",
        icon: Zap,
        badgeBg: "bg-blue-100",
        badgeColor: "text-blue-800",
    },
    {
        name: "Arbitrum",
        description: "Layer 2 scaling solution",
        network: "Ethereum",
        supportAmount: "$6.30",
        icon: Zap,
        badgeBg: "bg-blue-100",
        badgeColor: "text-blue-800",
    },
    {
        name: "Optimism",
        description: "Layer 2 scaling solution",
        network: "Ethereum",
        supportAmount: "$10.80",
        icon: Zap,
        badgeBg: "bg-red-100",
        badgeColor: "text-red-800",
    },
]

export const achievements = [
    {
        name: "Early Adopter",
        description: "Joined Crypto Coffee in the first month of launch",
        unlocked: true,
        unlockedDate: "Apr 5, 2025",
        icon: Award,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        featured: true,
        progress: 100,
    },
    {
        name: "Coffee Connoisseur",
        description: "Supported 50 different projects",
        unlocked: true,
        unlockedDate: "Apr 8, 2025",
        icon: Coffee,
        iconBg: "bg-coffee-100",
        iconColor: "text-coffee-700",
        featured: true,
        progress: 100,
    },
    {
        name: "Generous Brewer",
        description: "Contributed over $1,000 in total support",
        unlocked: true,
        unlockedDate: "Apr 10, 2025",
        icon: Droplets,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        featured: true,
        progress: 100,
    },
    {
        name: "Streak Master",
        description: "Maintained a 30-day support streak",
        unlocked: false,
        icon: Zap,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        featured: false,
        progress: 33,
    },
    {
        name: "SuperChain Explorer",
        description: "Supported projects on 10 different networks",
        unlocked: true,
        unlockedDate: "Apr 7, 2025",
        icon: Zap,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        featured: true,
        progress: 100,
    },
    {
        name: "Community Champion",
        description: "Referred 20 new users to the platform",
        unlocked: false,
        icon: Users,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        featured: false,
        progress: 45,
    },
]

export const avatars = [
    {id: 1, name: 'Ai Coder', path: '/images/avatars/ai_coder.png'},
    {id: 2, name: 'Coffee Alchemist', path: '/images/avatars/coffee_alchemist.png'},
    {id: 3, name: 'Crypto Shaman', path: '/images/avatars/crypto_shaman.png'},
    {id: 4, name: 'Hacker Girl', path: '/images/avatars/cyberpunk_hacker_girl.png'},
    {id: 5, name: 'Digital Samurai', path: '/images/avatars/digital_samurai.png'},
    {id: 6, name: 'Enhanced Cat', path: '/images/avatars/enhanced_cat.png'},
    {id: 7, name: 'Galactic Explorer', path: '/images/avatars/galactic_explorer.png'},
    {id: 8, name: 'God of Coffee', path: '/images/avatars/god_of_coffee.png'},
    {id: 9, name: 'Hacker Kid', path: '/images/avatars/hacker_kid.png'},
    {id: 10, name: 'Masked Hacker', path: '/images/avatars/masked_hacker.png'},
    {id: 11, name: 'Mystical Female', path: '/images/avatars/mystical_female.png'},
    {id: 12, name: 'Synthwave Warrior', path: '/images/avatars/synthwave_warrior.png'},
    {id: 13, name: 'VR Streamer', path: '/images/avatars/vr_streamer.png'},
]

export const avatarsOptions = [
    {label: 'Ai Coder', value: '/images/avatars/ai_coder.png'},
    {label: 'Coffee Alchemist', value: '/images/avatars/coffee_alchemist.png'},
    {label: 'Crypto Shaman', value: '/images/avatars/crypto_shaman.png'},
    {label: 'Hacker Girl', value: '/images/avatars/cyberpunk_hacker_girl.png'},
    {label: 'Digital Samurai', value: '/images/avatars/digital_samurai.png'},
    {label: 'Enhanced Cat', value: '/images/avatars/enhanced_cat.png'},
    {label: 'Galactic Explorer', value: '/images/avatars/galactic_explorer.png'},
    {label: 'God of Coffee', value: '/images/avatars/god_of_coffee.png'},
    {label: 'Hacker Kid', value: '/images/avatars/hacker_kid.png'},
    {label: 'Masked Hacker', value: '/images/avatars/masked_hacker.png'},
    {label: 'Mystical Female', value: '/images/avatars/mystical_female.png'},
    {label: 'Synthwave Warrior', value: '/images/avatars/synthwave_warrior.png'},
    {label: 'VR Streamer', value: '/images/avatars/vr_streamer.png'},
]

export const filterDays = [
    {label: "All time", value: 'all'},
    {label: "Last 7 days", value: '7'},
    {label: "Last 30 days", value: '30'},
    {label: "Last 90 days", value: '90'},
]

export const REQUIREMENT_TYPES = {
    JOIN_DATE: "join_date",                        // Joined in first month
    PROJECTS_SUPPORTED: "projects_supported",      // Coffee 50 times (unique projects)
    TOTAL_SUPPORT: "total_support",                // $200+ contributed
    STREAK_DAYS: "streak_days",                    // Maintain daily streak
    NETWORKS_SUPPORTED: "networks_supported",      // Buy coffee on 10 chains
    DAILY_ACTIVITIES: "daily_activities",          // All daily tasks for 7 days
    UNIQUE_CHAINS: "unique_chains",                // Coffee on 5 different chains
    SOCIAL_CONNECTIONS: "social_connections",      // Connect social account(s)
    TRIVIA_CORRECT: "trivia_correct",              // Correct trivia answers
    LOTTERY_WINS: "lottery_wins",                  // Win lottery
    SINGLE_SUPPORT: "single_support",              // Buy $50+ in one tx
    TRIVIA_STREAK: "trivia_streak",                // 5 correct in a row
    DAILY_STREAK: "daily_streak",                  // 14 daily actions in a row
    HIGH_GAS_TX: "high_gas_tx",                    // Send tx when gas > 200 gwei
    REPEAT_SUPPORT: "repeat_support",              // Buy on same chain 30 days
    FOUNDING_ACTIVITY: "founding_activity",        // Was active in first 3 months
    JOKES_REVEALED: "jokes_revealed",              // View jokes
    BINGO_WINS: "bingo_wins",                      // Win 3 times
    BINGO_FULL_CARD: "bingo_full_card",            // Complete bingo card
    RPS_PLAYED: "rps_played",                      // Played 10 RPS games
    RPS_3_WINS: "rps_3_wins",                      // 3 wins with rock
    RPS_10_WINS: "rps_10_wins",                    // 3 wins with rock
}


// Chain configurations
export const CHAIN_CONFIG = {
    'Optimism': {
        chain: optimism,
        chainId: 10,
        usdtAddress: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    },
    'Arbitrum One': {
        chain: arbitrum,
        chainId: 42161,
        usdtAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    }
};


// Bet amount options
export const betAmounts = [
    {value: 0.05, label: "$0.05"},
    {value: 0.2, label: "$0.2"},
    {value: 0.5, label: "$0.5"},
    {value: 1.2, label: "$1.2"},
    {value: 2, label: "$2"},
]

export const buyCoffeeTxXp = 10
export const gameTxXp = 15
