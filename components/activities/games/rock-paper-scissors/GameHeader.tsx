"use client"

import React, {FC, useMemo} from "react";
import {ArrowLeft, Gift, Hand} from "lucide-react"
import {motion} from "framer-motion"
import Link from "next/link"

interface IProps {
    title: string
    type: string
}

const GameHeader: FC<IProps> = ({title, type}) => {
    const IconComponent = useMemo(()=>{
        if (type=== 'rock-paper-scissors') return <Hand className="h-6 w-6"/>

        return <Gift className="h-6 w-6"/>

    },[type])


    return (
        <div className="mb-6">
            <Link href="/daily-activities"
                  className="inline-flex items-center text-coffee-700 hover:text-coffee-800 mb-4 group">
                <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1"/>
                <span>Back to Daily Activities</span>
            </Link>

            <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} className="flex items-center">
                <div className="relative mr-3">
                    <div
                        className="absolute inset-0 bg-coffee-200 dark:bg-coffee-100/50 rounded-md blur-sm opacity-50 animate-pulse-slow"></div>
                    <div
                        className="relative bg-gradient-to-br from-coffee-600 to-coffee-800 dark:from-coffee-100 dark:to-coffee-300 p-2 rounded-md text-white">
                        {IconComponent}
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-coffee-900">{title}</h1>
            </motion.div>
        </div>
    )
}

export default GameHeader
