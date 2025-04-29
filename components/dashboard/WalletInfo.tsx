'use client'

import React, {FC, useState, useMemo} from "react";
import {useAccount} from 'wagmi';
import {Wallet, ExternalLink, Copy, CheckCircle2} from "lucide-react"
import {motion} from "framer-motion"
import Image from "next/image";
import {IProject} from "@/types";

interface IProps {
    projects: IProject[]
}

const WalletInfo: FC<IProps> = ({projects}) => {
    const {chainId, isConnected, address, status} = useAccount();
    const [copied, setCopied] = useState(false)

    console.log(status, 'status')


    const currentChain = useMemo(() => {
        return projects.find((item) => item.blockchain_networks[0].chain_id === chainId)
    }, [chainId])

    const shortAddress = `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`

    const copyAddress = () => {
        navigator.clipboard.writeText(address || '')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative w-full max-w-sm overflow-hidden shadow-lg rounded-xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-coffee-100">
                <div className="absolute inset-0 bg-[url('/wallet-pattern.svg')] bg-repeat opacity-20"></div>
            </div>

            {/* Card container with glass effect */}
            <div
                className="relative bg-card/80 rounded-xl border border-coffee-200 dark:border-coffee-600/50"
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between p-4 border-b border-coffee-100 dark:border-coffee-300">
                    <div className="flex items-center space-x-2">
                        <motion.div
                            animate={{rotate: [0, 10, 0]}}
                            transition={{repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut"}}
                        >
                            <Wallet className="h-5 w-5 text-coffee-700"/>
                        </motion.div>
                        <h3 className="font-bold text-coffee-900 bg-gradient-to-r from-coffee-800 to-coffee-600 bg-clip-text text-transparent">
                            Your Wallet
                        </h3>
                    </div>

                    {/* Connection status */}
                    <div className="flex items-center">
                        <motion.div
                            animate={{scale: isConnected ? [1, 1.2, 1] : 1}}
                            transition={{repeat: Number.POSITIVE_INFINITY, duration: 2}}
                            className="relative"
                        >
                            <div
                                className={`${['reconnecting', 'connecting'].includes(status) ? 'bg-yellow-500' : status === 'connected' ? 'bg-green-500' : status === 'disconnected' ? 'bg-red-500' : ''} h-2.5 w-2.5 rounded-full`}></div>
                            <motion.div
                                animate={{scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8]}}
                                transition={{repeat: Number.POSITIVE_INFINITY, duration: 2}}
                                className={`${['reconnecting', 'connecting'].includes(status) ? 'bg-yellow-500' : status === 'connected' ? 'bg-green-500' : status === 'disconnected' ? 'bg-red-500' : ''} absolute inset-0 h-2.5 w-2.5 rounded-full`}
                            ></motion.div>
                        </motion.div>
                        {
                            ['reconnecting', 'connecting'].includes(status) ? <span
                                    className="ml-2 text-sm font-medium text-green-600 dark:text-yellow-500">Loading</span>
                                :
                                status === 'connected' ? <span
                                        className="ml-2 text-sm font-medium text-green-600 dark:text-green-500">Connected</span>
                                    : status === 'disconnected' ? <span
                                            className="ml-2 text-sm font-medium text-red-600 dark:text-red-500">Disconnected</span>
                                        : ''
                        }
                    </div>
                </div>

                {
                    address ? <div className="p-4">
                        {/* Network info */}
                        <div className="mb-4">
                            <div className="text-sm text-coffee-500 mb-1">Current Network</div>
                            <div className="flex items-center space-x-2">
                                <div className="h-7 w-7 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Image src={currentChain?.icon_url || "/placeholder.svg"}
                                           alt={currentChain?.name || 'chain-img'}
                                           width={24}
                                           height={24}
                                           className="rounded-full max-h-6"/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-coffee-800">{currentChain?.name}</span>
                                    <span
                                        className="text-xs text-coffee-500 capitalize">{currentChain?.blockchain_networks[0]?.type}</span>
                                </div>
                            </div>
                        </div>

                        {/* Wallet address */}
                        <div className="mb-4">
                            <div className="text-sm text-coffee-500 mb-1">Wallet Address</div>
                            <div
                                className="flex items-center justify-between bg-coffee-50 dark:bg-coffee-50/60 p-2 rounded-lg">
                                <span className="text-sm font-mono text-coffee-800">{shortAddress}</span>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={copyAddress}
                                    className="p-1 rounded-md hover:bg-coffee-100 transition-colors"
                                >
                                    {copied ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-500"/>
                                    ) : (
                                        <Copy className="h-4 w-4 text-coffee-600"/>
                                    )}
                                </motion.button>
                            </div>
                        </div>

                        {/* View on explorer button */}
                        <motion.button
                            onClick={() => window.open(currentChain?.blockchain_networks[0].explorer_url)}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="mt-4 w-full flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-coffee-600 to-coffee-700 dark:from-coffee-50/50 dark:to-coffee-50/30 text-white rounded-lg text-sm font-medium"
                        >
                            <span>View on Explorer</span>
                            <ExternalLink className="h-3.5 w-3.5"/>
                        </motion.button>
                    </div> : ''
                }
            </div>

            {
                address ? <>
                    <div
                        className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-coffee-200 rounded-full blur-3xl opacity-20"></div>
                    <div
                        className="absolute bottom-0 left-0 -ml-4 -mb-4 h-24 w-24 bg-coffee-300 rounded-full blur-3xl opacity-20"></div>
                </> : ''
            }
        </div>
    )
}

export default WalletInfo

