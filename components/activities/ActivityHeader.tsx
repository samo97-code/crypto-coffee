"use client"

import {ArrowLeft, Zap} from "lucide-react"
import {motion} from "framer-motion"
import Link from "next/link"
import React from "react";

const ActivityHeader = () => {
    return (
        <div className="mb-6">
            <Link href="/"
                  className="inline-flex items-center text-coffee-700 hover:text-coffee-800 mb-4 group">
                <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1"/>
                <span>Back to Dashboard</span>
            </Link>

            <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}>
                <div className="flex items-center">
                    <div className="relative mr-3">
                        <div
                            className="absolute inset-0 bg-coffee-200 rounded-md blur-sm opacity-50 animate-pulse-slow"></div>
                        <div
                            className="relative bg-gradient-to-br from-coffee-600 to-coffee-800 p-2 rounded-md text-white">
                            <Zap className="h-6 w-6"/>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-coffee-900">Daily Activities</h1>
                </div>
            </motion.div>
        </div>
    )
}

export default ActivityHeader
