import React, {FC} from 'react';
import {motion} from "framer-motion";
import {Progress} from "@/components/ui/progress";
import {Loader} from "lucide-react";

interface IProps {
    unlockedAchievements: number,
    totalAchievements: number,
    achievementPercentage: number,
}

const AchievementStats: FC<IProps> = ({unlockedAchievements, totalAchievements, achievementPercentage}) => {
    return (
        <div className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mt-8">
            <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <div>
                    <h2 className="text-xl font-semibold text-coffee-800 flex items-center">
                        <Loader className="h-5 w-5 mr-2 text-coffee-700"/>
                        Achievement Progress
                    </h2>
                    <p className="text-coffee-600 mt-1">Track your journey and unlock rewards</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <div className="text-coffee-600 font-medium">
                        <span
                            className="text-2xl font-bold text-coffee-800">{unlockedAchievements}</span> / {totalAchievements}{" "}
                        Completed
                    </div>
                    <div className="w-full sm:w-48 relative">
                        <div className="absolute inset-0 rounded-full bg-coffee-100 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-coffee-500 to-coffee-700"
                                initial={{width: 0}}
                                animate={{width: `${achievementPercentage}%`}}
                                transition={{duration: 1, ease: "easeOut"}}
                            />
                        </div>
                        <Progress value={achievementPercentage} className="h-3 bg-transparent dark:bg-coffee-50/40"/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AchievementStats;
