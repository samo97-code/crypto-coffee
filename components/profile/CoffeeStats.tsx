"use client"

import React, {FC} from "react";
import {Badge} from "@/components/ui/badge"
import {IStreakInfo, IProfileStates} from "@/types";
import { Coffee, Trophy, Flame } from "lucide-react"
import { motion } from "framer-motion"

interface IProps {
    stats: IProfileStates
    streak: IStreakInfo | null
    level: number
}

const CoffeeStats: FC<IProps> = ({streak, stats, level}) => {
    return (
        <div className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 relative overflow-hidden"
        >
            {/* Coffee cup background pattern */}
            <div className="absolute inset-0 opacity-[0.03] overflow-hidden">
                {Array.from({length: 20}).map((_, i) => (
                    <Coffee
                        key={i}
                        className="absolute text-coffee-900"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 20 + 10}px`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                <h3 className="font-bold text-coffee-900 mb-4 flex items-center text-lg">
                    <div className="bg-coffee-100 dark:bg-coffee-50/40 p-2 rounded-full mr-3">
                        <Coffee className="h-5 w-5 text-coffee-700"/>
                    </div>
                    Coffee Stats
                </h3>

                <div className="space-y-4">
                    <motion.div
                        initial={{x: -20, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.1}}
                        className="flex justify-between items-center p-3 bg-coffee-50 dark:bg-coffee-50/40 rounded-lg shadow-sm border border-coffee-200 dark:border-coffee-600/50"
                    >
                        <div className="text-coffee-800 flex items-center">
                            <Coffee className="h-4 w-4 mr-2 text-coffee-700"/>
                            Bought Coffee
                        </div>
                        <div className="whitespace-nowrap font-medium text-coffee-900 bg-coffee-100 px-3 py-1 rounded-full">{stats.boughtCoffee}</div>
                    </motion.div>

                    <motion.div
                        initial={{x: -20, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.2}}
                        className="flex justify-between items-center p-3 bg-coffee-50 dark:bg-coffee-50/40 rounded-lg shadow-sm border border-coffee-200 dark:border-coffee-600/50"
                    >
                        <div className="text-coffee-800 flex items-center">
                            <Flame className="h-4 w-4 mr-2 text-coffee-700"/>
                            Daily Streak
                        </div>
                        <div className="whitespace-nowrap font-medium text-coffee-900 bg-coffee-100 px-3 py-1 rounded-full">{streak?.current_streak || 0} days</div>
                    </motion.div>

                    <motion.div
                        initial={{x: -20, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.3}}
                        className="flex justify-between items-center p-3 bg-coffee-50 dark:bg-coffee-50/40 rounded-lg shadow-sm border border-coffee-200 dark:border-coffee-600/50"
                    >
                        <div className="text-coffee-800 flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-coffee-700"/>
                            Achievements
                        </div>
                        <div className="whitespace-nowrap font-medium text-coffee-900 bg-coffee-100 px-3 py-1 rounded-full">{stats.achievementsCount}/{stats.totalAchievements}</div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.4}}
                    className="mt-6 pt-4 border-t border-coffee-200 dark:border-coffee-600/50"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-coffee-800 font-medium">Level</div>
                        <Badge className="bg-coffee-700 dark:bg-coffee-50/40 text-white border-none px-3 py-1">Level {level}</Badge>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-coffee-600">Progress to Level {level + 1}</span>
                            <span className="text-coffee-600 font-medium">{stats.levelProgress}%</span>
                        </div>
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-2.5 text-xs flex rounded-full bg-coffee-100 dark:bg-coffee-50/40">
                                <div
                                    style={{width: `${stats.levelProgress}%`}}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-coffee-700 rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CoffeeStats
