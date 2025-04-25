"use client"

import React,{FC} from "react"
import { Coffee } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"
import {IUserLevelProgress} from "@/types";


interface IProps{
    levelProgress: IUserLevelProgress
}


const LevelsSystem:FC<IProps> =({levelProgress}) =>{
    // Get icon component from name
    const getIconComponent = (iconName: string): LucideIcon => {
        return (LucideIcons as never)[iconName] || Coffee
    }

    return (
        <div className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mt-8">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-coffee-800 flex items-center gap-2">
                        <Coffee className="h-5 w-5" />Level
                    </h2>
                    <span className="text-coffee-700">Current Level: {levelProgress.currentLevel}</span>
                </div>

                <p className="text-coffee-600 mb-4">Advance through levels by buying coffee and completing activities</p>

                {/* Current Level Progress */}
                <div className="bg-coffee-100 dark:bg-coffee-50/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                        {React.createElement(
                            getIconComponent(
                                levelProgress.allLevels.find((l) => l.level_number === levelProgress.currentLevel)?.icon || "Coffee",
                            ),
                            {
                                className: "h-8 w-8 p-1.5 rounded-full bg-coffee-300 text-coffee-800",
                            },
                        )}
                        <div>
                            <h3 className="font-medium text-coffee-800">{levelProgress.currentLevelName}</h3>
                            <p className="text-sm text-coffee-600">Level {levelProgress.currentLevel}</p>
                        </div>
                        <div className="ml-auto text-right">
                            <span className="font-medium text-coffee-800">{levelProgress.currentXP}/{levelProgress.requiredXP} XP</span>
                            <p className="text-sm text-coffee-600">to Level {levelProgress.nextLevel}</p>
                        </div>
                    </div>

                    <Progress value={levelProgress.progressPercent} className="h-2.5 bg-coffee-200 dark:bg-coffee-50/40" />
                </div>
            </div>
        </div>
    )
}

export default LevelsSystem
