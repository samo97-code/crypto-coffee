import React, {FC, useMemo, useState} from 'react';
import {IUserAchievement} from "@/types";
import {motion, AnimatePresence} from 'framer-motion'
import { CheckCircle, Award} from 'lucide-react'
import {cn} from '@/utils/utils'
import {REQUIREMENT_TYPES} from "@/constants";
import {achievementIconMap} from "@/utils/utils";

interface IProps {
    achievements: IUserAchievement[],
}

interface AchievementIconProps  {
    iconName: string;
    className?: string;
}

const AllAchievements: FC<IProps> = ({achievements}) => {
    const [activeFilter, setActiveFilter] = useState("all")

    const filteredAchievements = useMemo(() => {
        if (activeFilter === 'all') return achievements

        if (activeFilter === 'unlocked') return achievements.filter((a) => a.is_unlocked)

        return achievements.filter((a) => !a.is_unlocked)

    }, [activeFilter])

    const AchievementIcon = ({ iconName, className }: AchievementIconProps) => {
        const IconComponent = achievementIconMap[iconName];

        if (!IconComponent) return null;

        return <IconComponent className={className} />;
    };

    // Map achievement types to patterns
    const getPatternForAchievement = (achievementType: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const patternMap: Record<string, string> = {
            [REQUIREMENT_TYPES.JOIN_DATE]: 'beans-pattern',
            [REQUIREMENT_TYPES.NETWORKS_SUPPORTED]: 'beans-pattern',
            [REQUIREMENT_TYPES.TOTAL_SUPPORT]: 'beans-pattern',
            [REQUIREMENT_TYPES.PROJECTS_SUPPORTED]: 'zigzag-pattern',
            [REQUIREMENT_TYPES.HIGH_GAS_TX]: 'dots-pattern',
            [REQUIREMENT_TYPES.STREAK_DAYS]: 'waves-pattern',
            [REQUIREMENT_TYPES.TRIVIA_CORRECT]: 'dots-pattern',
            [REQUIREMENT_TYPES.TRIVIA_STREAK]: 'waves-pattern',
            [REQUIREMENT_TYPES.JOKES_REVEALED]: 'waves-pattern',
            [REQUIREMENT_TYPES.LOTTERY_WINS]: 'zigzag-pattern',
            [REQUIREMENT_TYPES.FOUNDING_ACTIVITY]: 'circles-pattern',
            [REQUIREMENT_TYPES.SOCIAL_CONNECTIONS]: 'dots-pattern',
            [REQUIREMENT_TYPES.BINGO_WINS]: 'zigzag-pattern',
            [REQUIREMENT_TYPES.BINGO_FULL_CARD]: 'waves-pattern',
            [REQUIREMENT_TYPES.RPS_PLAYED]: 'dots-pattern',
            [REQUIREMENT_TYPES.RPS_ROCK_WINS]: 'circles-pattern',
        }

        return patternMap[achievementType] || 'zigzag-pattern'
    }

    const BeansSVG = () => (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M30,20 Q40,5 50,20 Q60,35 50,50 Q40,65 30,50 Q20,35 30,20 Z" fill="currentColor"/>
            <path d="M70,60 Q80,45 90,60 Q100,75 90,90 Q80,105 70,90 Q60,75 70,60 Z" fill="currentColor"/>
            <path d="M10,70 Q20,55 30,70 Q40,85 30,100 Q20,115 10,100 Q0,85 10,70 Z" fill="currentColor"/>
        </svg>
    )

    const WavesSVG = () => (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 Q25,40 50,20 Q75,0 100,20 L100,100 L0,100 Z" fill="currentColor"/>
        </svg>
    )

    const CirclesSVG = () => (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100"
             xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="15" fill="currentColor"/>
            <circle cx="70" cy="70" r="25" fill="currentColor"/>
            <circle cx="80" cy="10" r="10" fill="currentColor"/>
            <circle cx="10" cy="80" r="8" fill="currentColor"/>
            <circle cx="50" cy="50" r="5" fill="currentColor"/>
        </svg>
    )

    const DotsSVG = () => (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100"
             xmlns="http://www.w3.org/2000/svg">
            {Array.from({length: 10}).map((_, i) =>
                Array.from({length: 10}).map((_, j) => (
                    <circle key={`${i}-${j}`} cx={i * 10 + 5} cy={j * 10 + 5} r="1.5" fill="currentColor"/>
                ))
            )}
        </svg>
    )

    const ZigzagSVG = () => (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 L20,40 L40,20 L60,40 L80,20 L100,40 L100,100 L0,100 Z" fill="currentColor"/>
        </svg>
    )

    const getPatternSVG = (pattern: string) => {
        switch (pattern) {
            case 'beans-pattern':
                return <BeansSVG/>
            case 'waves-pattern':
                return <WavesSVG/>
            case 'circles-pattern':
                return <CirclesSVG/>
            case 'dots-pattern':
                return <DotsSVG/>
            case 'zigzag-pattern':
                return <ZigzagSVG/>
            default:
                return null
        }
    }

    return (
        <div className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mt-8">
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-coffee-800 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-coffee-700"/>
                        {activeFilter === 'all' ? 'All' : activeFilter === 'unlocked' ? 'Unlocked' : 'In Progress'} Achievements
                    </h2>
                    <div className="flex space-x-2">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className={cn(
                                "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                                activeFilter === "all"
                                    ? "bg-coffee-300 text-coffee-800"
                                    : "bg-coffee-100 hover:bg-coffee-200 text-coffee-700 dark:hover:bg-coffee-300",
                            )}
                            onClick={() => setActiveFilter("all")}
                        >
                            All
                        </motion.button>
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className={cn(
                                "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                                activeFilter === "unlocked"
                                    ? "bg-coffee-300 text-coffee-800"
                                    : "bg-coffee-100 hover:bg-coffee-200 text-coffee-700 dark:hover:bg-coffee-300",
                            )}
                            onClick={() => setActiveFilter("unlocked")}
                        >
                            Unlocked
                        </motion.button>
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className={cn(
                                "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                                activeFilter === "locked"
                                    ? "bg-coffee-300 text-coffee-800"
                                    : "bg-coffee-100 hover:bg-coffee-200 text-coffee-700 dark:hover:bg-coffee-300",
                            )}
                            onClick={() => setActiveFilter("locked")}
                        >
                            In Progress
                        </motion.button>
                    </div>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {filteredAchievements.map((achievement,index) => {
                            const pattern = getPatternForAchievement(achievement.achievement.requirement_type)
                            const isUnlocked = achievement.is_unlocked
                            const unlockDate = achievement.unlocked_at
                                ? new Date(achievement.unlocked_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })
                                : null

                            return (
                                <motion.div
                                    key={`${achievement.id}-${index}`}
                                    initial={{opacity: 0, scale: 0.9}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.9}}
                                    transition={{duration: 0.3}}
                                    className={cn(
                                        "rounded-lg border shadow-sm overflow-hidden relative",
                                        isUnlocked ? "border-coffee-400 dark:border-coffee-600/90 bg-white dark:bg-coffee-50/20" : "bg-coffee-50/60 dark:bg-coffee-50/60 border-coffee-200 dark:border-coffee-600/50",
                                    )}
                                    whileHover={{
                                        y: -5,
                                        boxShadow: "0 10px 15px -3px rgba(139, 69, 19, 0.1), 0 4px 6px -2px rgba(139, 69, 19, 0.05)",
                                    }}
                                >
                                    <div
                                        className={cn(
                                            "h-1.5 w-full",
                                            isUnlocked ? "bg-gradient-to-r from-coffee-500 to-coffee-700 dark:from-coffee-50/60 dark:to-coffee-50/50" : "bg-coffee-200 dark:bg-coffee-50/10",
                                        )}
                                    ></div>

                                    <div className="absolute inset-0 text-coffee-700 pointer-events-none">
                                        {getPatternSVG(pattern)}
                                    </div>

                                    <div className="p-4 relative z-10">
                                        <div className="flex items-start">
                                            <div
                                                className={cn(
                                                    "h-12 w-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                                                    isUnlocked
                                                        ? achievement.achievement.icon_bg
                                                        : "bg-gradient-to-br from-coffee-100 to-coffee-200 dark:from-coffee-50/60 dark:to-coffee-50/20",
                                                )}
                                            >
                                                <AchievementIcon iconName={achievement.achievement.icon_name} className={cn("h-6 w-6", isUnlocked ? achievement.achievement.icon_color : "text-coffee-600")} />
                                            </div>
                                            <div className="w-full">
                                                <div
                                                    className="font-medium text-coffee-800">{achievement.achievement.name}</div>
                                                <div
                                                    className="text-xs text-coffee-600 mb-2 line-clamp-2 min-h-8">{achievement.achievement.description}</div>

                                                {isUnlocked ? (
                                                    <div className="flex items-center text-xs text-green-600 dark:text-green-500">
                                                        <CheckCircle className="h-3.5 w-3.5 mr-1"/>
                                                        <span>Unlocked on {unlockDate}</span>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-1">
                                                        <div
                                                            className="flex justify-between items-center text-xs text-coffee-700">
                              <span>
                                Progress: {achievement.progress}/{achievement.achievement.requirement_value}
                              </span>
                                                            <span>{Math.round((achievement.progress / achievement.achievement.requirement_value) * 100)}%</span>
                                                        </div>
                                                        <div
                                                            className="relative h-1.5 bg-coffee-100 dark:bg-coffee-700/40 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-coffee-500 to-coffee-700"
                                                                initial={{width: 0}}
                                                                animate={{width: `${Math.round((achievement.progress / achievement.achievement.requirement_value) * 100)}%`}}
                                                                transition={{duration: 1, ease: "easeOut"}}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
};

export default AllAchievements;
