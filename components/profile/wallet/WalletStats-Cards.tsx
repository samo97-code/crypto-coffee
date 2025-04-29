"use client"

import React, {FC} from "react";
import {motion} from "framer-motion"
import {Globe, History} from "lucide-react"
import {ITransactionStats} from "@/types";

interface IProps{
    allStats: ITransactionStats
}

const WalletStatsCards:FC<IProps> = ({allStats}) => {
    const stats = [
        {
            title: "Transactions",
            value: allStats?.transaction_count,
            subtitle: "Last 30 days",
            icon: History,
            color: "from-blue-500 to-indigo-700",
            delay: 0.2,
        },
        {
            title: "Networks Used",
            value: allStats?.networks_used,
            subtitle: `Most active: ${allStats?.most_active_network}`,
            icon: Globe,
            color: "from-purple-500 to-violet-700",
            delay: 0.3,
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: stat.delay}}
                    className="bg-card rounded-xl shadow-md border border-coffee-200 dark:border-coffee-600/50 overflow-hidden"
                >
                    <div className="p-4 relative">
                        <div className="absolute top-0 right-0 h-20 w-20 -mr-10 -mt-10 opacity-10">
                            <div className={`h-full w-full rounded-full bg-gradient-to-br ${stat.color}`}></div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-coffee-700">{stat.title}</h3>
                                <div className={`p-1.5 rounded-full bg-gradient-to-br ${stat.color} text-white`}>
                                    <stat.icon className="h-3.5 w-3.5"/>
                                </div>
                            </div>

                            <div className="text-2xl font-bold text-coffee-900 mb-1">{stat.value}</div>
                            <div className="text-xs text-coffee-600">{stat.subtitle}</div>
                        </div>
                    </div>

                    <div
                        className="h-1 w-full bg-gradient-to-r from-coffee-200 via-coffee-400 to-coffee-200 opacity-50 animate-gradient-shift"></div>
                </motion.div>
            ))}
        </div>
    )
}

export default WalletStatsCards
