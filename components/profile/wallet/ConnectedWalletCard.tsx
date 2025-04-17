"use client"

import {Copy} from "lucide-react"
import {motion} from "framer-motion"
import React, {useState} from "react"
import {useAccount} from "wagmi";
import {useAppSelector} from "@/store/hook";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const ConnectedWalletCard = () => {
    const {address} = useAccount()
    const {user} = useAppSelector(state => state.user);
    const [isCopied, setIsCopied] = useState(false)

    const shortAddress = `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address || '')
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="bg-white rounded-xl p-6 shadow-md border border-coffee-200 overflow-hidden"
        >
            <h2 className="text-lg font-semibold text-coffee-900 mb-4">Connected Wallet</h2>

            <div className="bg-coffee-50 border border-coffee-200 rounded-lg p-4 relative overflow-hidden">
                {/* Decorative coffee beans */}
                <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" fill="currentColor"
                              className="text-coffee-900"/>
                        <path
                            d="M6 1v3M10 1v3M14 1v3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="text-coffee-900"
                        />
                        <path d="M22 8h-4v5a3 3 0 0 0 6 0V8h-2z" fill="currentColor" className="text-coffee-900"/>
                    </svg>
                </div>

                <div className="flex items-center relative z-10 gap-2">
                    <Avatar className="bg-white rounded-full mr-3 border border-coffee-200 h-12 w-12 shadow-lg">
                        <AvatarImage src={`${user.avatar_url}`}/>
                        <AvatarFallback>
                            <div
                                className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">CC</span>
                            </div>
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="flex items-center">
                            <span className="text-green-600 text-sm font-medium mr-2">Connected</span>
                        </div>
                        <div className="flex items-center mt-1">
                            <span className="text-coffee-900 font-mono">{shortAddress}</span>
                            <button
                                onClick={copyToClipboard}
                                className="ml-2 text-coffee-600 hover:text-coffee-800 transition-colors"
                            >
                                {isCopied ? <span className="text-green-600 text-xs">Copied!</span> :
                                    <Copy className="h-4 w-4"/>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ConnectedWalletCard
