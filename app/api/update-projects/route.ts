import { NextResponse } from "next/server"
import {supabase} from "@/lib/supabase";


// Import the projects data
const projects = [
    {
        id: 1,
        name: "Eth Sepolia",
        chain: "Eth",
        chainKey: "Eth",
        chainId: 11155111,
        icon: "/images/chains/eth.svg",
        isNew: true,
        type: "testnet",
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
        chainKey: "Mon",
        chainId: 10143,
        icon: "/images/chains/monad.jpg",
        isNew: true,
        type: "testnet",
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
        chainKey: "Eth",
        chainId: 10,
        icon: "/images/chains/optimism.svg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 42161,
        icon: "/images/chains/arbitrum.svg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 8453,
        icon: "/images/chains/base.svg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 534352,
        icon: "/images/chains/scroll.svg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 324,
        icon: "/images/chains/zkSync.png",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 34443,
        icon: "/images/chains/mode.svg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 7777777,
        icon: "/images/chains/zora.svg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 59144,
        icon: "/images/chains/linea.svg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 57073,
        icon: "/images/chains/ink.png",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 1868,
        icon: "/images/chains/soneium.jpeg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 130,
        icon: "/images/chains/unichain.jpg",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 43111,
        icon: "/images/chains/hemi.webp",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 60808,
        icon: "/images/chains/bob.webp",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 5330,
        icon: "/images/chains/superseed.png",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 252,
        icon: "/images/chains/fraxtal.webp",
        isNew: true,
        type: "mainnet",
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
        chainKey: "Eth",
        chainId: 1135,
        icon: "/images/chains/lisk.svg",
        isNew: true,
        type: "mainnet",
        status: "Ready for your daily support!",
        buttonText: "Buy Coffee on Lisk",
        buttonColor: "bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500",
        description: "A decentralized exchange",
        explorerUrl: "https://blockscout.lisk.com/",
        updatedAt: Date.now(),
    },
]

export async function GET() {
    try {
        // First, update the projects table with the new data
        await updateProjects()

        // Then update the blockchain_networks table with the correct data
        await updateBlockchainNetworks()

        return NextResponse.json({
            success: true,
            message: "Projects updated successfully",
        })
    } catch (error) {
        console.error("Error updating projects:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Failed to update projects",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
        )
    }
}

async function updateProjects() {
    // Update each project with the new data
    for (const project of projects) {
        const { error } = await supabase.from("projects").upsert(
            {
                id: project.id,
                name: project.name,
                chain: project.chain,
                network_name: project.name,
                icon_url: project.icon,
                description: project.description,
                status: project.status,
                button_text: project.buttonText,
                button_color: project.buttonColor,
                is_new: project.isNew,
                updated_at: new Date(),
            },
            { onConflict: "id" },
        )

        if (error) {
            console.error(`Error updating project ${project.id}:`, error)
            throw error
        }
    }
}

async function updateBlockchainNetworks() {
    // First, clear existing blockchain_networks data
    const { error: clearError } = await supabase.from("blockchain_networks").delete().neq("id", 0)
    if (clearError) {
        console.error("Error clearing blockchain_networks:", clearError)
        throw clearError
    }

    // Insert new blockchain_networks data
    for (const project of projects) {
        const { error } = await supabase.from("blockchain_networks").insert({
            project_id: project.id,
            chain_key: project.chainKey,
            chain_id: project.chainId,
            explorer_url: project.explorerUrl,
            type: project.type,
        })

        if (error) {
            console.error(`Error inserting blockchain_network for project ${project.id}:`, error)
            throw error
        }
    }
}
