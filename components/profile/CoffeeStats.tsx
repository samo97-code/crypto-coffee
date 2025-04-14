"use client"

import React, {FC} from "react";
import {Badge} from "@/components/ui/badge"
import {IStreakInfo, IProfileStates} from "@/types";

interface IProps {
    stats: IProfileStates
    streak: IStreakInfo | null
    level: number
}

const CoffeeStats: FC<IProps> = ({streak, stats, level}) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
            <h3 className="font-semibold text-coffee-900 mb-4">Coffee Stats</h3>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-coffee-700">Bought Coffee</span>
                        <span className="font-medium text-coffee-900">{stats.boughtCoffee}</span>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-coffee-700">Daily Streak</span>
                        <span className="font-medium text-coffee-900">{streak?.current_streak || 0} days</span>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-coffee-700">Achievements</span>
                        <span className="font-medium text-coffee-900">
              {stats.achievementsCount}/{stats.totalAchievements}
            </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-coffee-100">
                <div className="flex items-center justify-between">
                    <div className="text-coffee-700">Level</div>
                    <Badge
                        className="bg-gradient-to-r from-coffee-500 to-coffee-700 text-white border-none">Level {level}</Badge>
                </div>
                <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span>Progress to Level {level + 1}</span>
                        <span>{stats.levelProgress}%</span>
                    </div>
                    <div className="h-2 bg-coffee-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-coffee-500 to-coffee-700"
                            style={{width: `${stats.levelProgress}%`}}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoffeeStats
