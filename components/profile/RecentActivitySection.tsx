"use client"

import React, {FC, useState} from "react"
import {Clock, Coffee, ExternalLink, Award, Droplets, Zap, Users, Sparkles, ArrowRight, Gamepad} from "lucide-react"
import {motion} from "framer-motion"
import {IActivity, IUserAchievement} from "@/types";
import {formatRelativeTime} from "@/lib/activity-service";
import {useRouter} from "next/navigation";
import {Progress} from "@/components/ui/progress";

interface IProps {
    activities: IActivity[]
    achievements: IUserAchievement[]
}

const RecentActivitySection: FC<IProps> = ({activities, achievements}) => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("activity")
    const [expandedActivity, setExpandedActivity] = useState<number | null>(null)

    // Map icon names to Lucide icons
    const getIconComponent = (iconName: string) => {
        const iconMap = {
            Award: Award,
            Gamepad: Gamepad,
            Coffee: Coffee,
            Droplets: Droplets,
            Zap: Zap,
            Users: Users,
            Sparkles: Sparkles,
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return iconMap[iconName] || Award
    }

    const shortenTxHash = (hash: string | undefined) => {
        if (!hash) return ''

        return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`
    }

    const toLink = (url: string | undefined) => {
        if (!url) return ''

        window.open(url)
    }

    return (
        <div className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 relative overflow-hidden mt-8">
            {/* Coffee bean pattern background */}

            <div className="relative z-10">
                <h3 className="font-bold text-coffee-900 mb-4 flex items-center text-lg">
                    <div className="bg-coffee-100 dark:bg-coffee-50/40 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-coffee-700"/>
                    </div>
                    Activity Feed
                </h3>

                <div className="flex mb-4 border-b border-coffee-200 dark:border-coffee-600/50">
                    <button
                        onClick={() => setActiveTab("activity")}
                        className={`px-4 py-2 font-medium text-sm relative ${
                            activeTab === "activity" ? "text-coffee-800" : "text-coffee-500 hover:text-coffee-700"
                        }`}
                    >
                        Activity
                        {activeTab === "activity" && (
                            <motion.div layoutId="tab-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-coffee-700"/>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("achievements")}
                        className={`px-4 py-2 font-medium text-sm relative ${
                            activeTab === "achievements" ? "text-coffee-800" : "text-coffee-500 hover:text-coffee-700"
                        }`}
                    >
                        Achievements
                        {activeTab === "achievements" && (
                            <motion.div layoutId="tab-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-coffee-700"/>
                        )}
                    </button>
                </div>

                {activeTab === "activity" ? (
                    <div className="space-y-3 p-3">
                        {activities.map((activity, index) => {
                            const IconComponent = getIconComponent(activity.icon)

                            return <motion.div
                                key={activity.id}
                                initial={{x: 0, opacity: 0}}
                                animate={{x: 0, opacity: 1}}
                                transition={{delay: 0.2 + index * 0.1}}
                                className={`bg-coffee-50 dark:bg-coffee-50/40 rounded-lg shadow-sm border border-coffee-200 dark:border-coffee-600/50
                  hover:border-coffee-300 transition-all duration-300 overflow-hidden
                  ${expandedActivity === activity.id ? "scale-[1.02]" : ""}`}
                            >
                                <div className="p-3">
                                    <div className={`${activity.type === 'support' ? 'cursor-pointer' : ''} flex items-start gap-2`}
                                         onClick={() => activity.type === 'support' ? setExpandedActivity(expandedActivity === activity.id ? null : activity.id) : null}>
                                        <div
                                            className={`${activity.type === 'support' ? 'bg-gradient-to-r from-coffee-500 to-coffee-700 dark:from-coffee-200/30 dark:to-coffee-100/50' : `${activity.icon_bg} opacity-80`} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
                                        >
                                            <IconComponent className={`h-5 w-5 ${activity.icon_color}`}/>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div
                                                    className="text-sm font-medium text-coffee-900">{activity.title}</div>
                                                <div
                                                    className="text-xs text-coffee-600">{formatRelativeTime(activity.timestamp)}</div>
                                            </div>
                                            <div className="text-xs text-coffee-700 mt-1">{activity.description}</div>
                                        </div>
                                    </div>

                                    {expandedActivity === activity.id && (
                                        <div
                                            className="mt-3 pt-3 border-t border-coffee-200 dark:border-coffee-600/50"
                                        >
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="bg-card p-2 rounded border border-coffee-200 dark:border-coffee-600/50">
                                                    <div className="text-coffee-600 mb-1">Network</div>

                                                    <div className="flex items-center gap-1">
                                                        <img
                                                            src={activity.project_icon || "/placeholder.svg"}
                                                            alt={activity.project_name}
                                                            className="w-5 h-5 rounded-full"
                                                        />
                                                        <div
                                                            className="font-medium text-coffee-800">{activity.project_name}</div>
                                                    </div>
                                                </div>
                                                <div className="bg-card p-2 rounded border border-coffee-200 dark:border-coffee-600/50">
                                                    <div className="text-coffee-600 mb-1">Amount</div>
                                                    <div
                                                        className="font-medium text-coffee-800">{activity.amount} {activity.chain_key}
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={() => toLink(activity?.explorer_url)}
                                                    className="cursor-pointer col-span-2 bg-card p-2 rounded border border-coffee-200 dark:border-coffee-600/50 flex justify-between items-center">
                                                    <div>
                                                        <div className="text-coffee-600 mb-1">Transaction</div>
                                                        <div
                                                            className="font-medium text-coffee-800 truncate w-40">{shortenTxHash(activity?.hash)}
                                                        </div>
                                                    </div>

                                                    <ExternalLink className="h-4 w-4 text-coffee-600"/>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {expandedActivity !== activity.id && (
                                    <div
                                        className="h-1 w-full bg-gradient-to-r from-coffee-200 via-coffee-400 to-coffee-200 dark:border-coffee-600/50 opacity-50 animate-gradient-shift"></div>
                                )}
                            </motion.div>
                        })}

                        {
                            activities.length ? <div className="w-full flex items-center justify-center mt-8">
                                <motion.button
                                    onClick={() => router.push("/profile/wallet")}
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-card border border-coffee-200 dark:border-coffee-600/50 text-coffee-800 rounded-lg text-sm font-medium hover:bg-coffee-50 dark:hover:bg-coffee-50/60 transition-colors"
                                >
                                    <span>View All Activities</span>
                                    <motion.div
                                        animate={{x: [0, 4, 0]}}
                                        transition={{
                                            repeat: Number.POSITIVE_INFINITY,
                                            duration: 1.5,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <ArrowRight className="h-3.5 w-3.5"/>
                                    </motion.div>
                                </motion.button>
                            </div> : ''
                        }
                    </div>
                ) : (
                    <div className="bg-coffee-50 dark:bg-coffee-50/40 p-3 rounded-lg shadow-sm text-center">
                        <h4 className="text-coffee-900 font-medium text-2xl">Achievements</h4>
                        <p className="text-coffee-700 text-sm mt-1">Keep buying coffee to unlock special
                            achievements!</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {achievements.slice(0, 4).map((achievement, index) => {
                                    const IconComponent = getIconComponent(achievement.achievement.icon_name)
                                    const isUnlocked = achievement.is_unlocked

                                    return <div
                                        key={index}
                                        className={`border rounded-lg p-4 bg-card ${
                                            isUnlocked ? "border-coffee-200 dark:border-coffee-600/50" : "border-gray-200 opacity-60"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`min-w-12 min-h-12 rounded-full ${
                                                    isUnlocked ? achievement.achievement.icon_bg : "bg-gray-100"
                                                } flex items-center justify-center`}
                                            >
                                                <IconComponent
                                                    className={`h-6 w-6 ${isUnlocked ? achievement.achievement.icon_color : "text-gray-400"}`}
                                                />
                                            </div>

                                            <div>
                                                <h4 className="font-medium text-coffee-900 text-left">{achievement.achievement.name}</h4>
                                                <p className="text-sm text-coffee-700 mt-1 text-left">{achievement.achievement.description}</p>

                                                {isUnlocked ? (
                                                    <div
                                                        className="flex items-center gap-1 text-green-600 dark:text-green-500 text-sm mt-2">
                                                        <Sparkles className="h-3 w-3"/>
                                                        <span>
                                                  Unlocked on {new Date(achievement.unlocked_at || "").toLocaleDateString()}
                                                </span>
                                                    </div>
                                                ) : (
                                                    <div className="mt-2">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span className="text-coffee-600">Progress</span>
                                                            <span
                                                                className="text-coffee-800">
                                                        {Math.round(
                                                            (achievement.progress / achievement.achievement.requirement_value) * 100,
                                                        )}
                                                                %
                                                    </span>
                                                        </div>
                                                        <Progress value={Math.round(
                                                            (achievement.progress / achievement.achievement.requirement_value) * 100,
                                                        )} className="h-1.5"/>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                }
                            )}
                        </div>

                        {
                            activities.length ? <div className="w-full flex items-center justify-center mt-8">
                                <motion.button
                                    onClick={() => router.push("/profile/achievements")}
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-card border border-coffee-200 dark:border-coffee-600/50 text-coffee-800 rounded-lg text-sm font-medium hover:bg-coffee-50 dark:hover:bg-coffee-50/60 transition-colors"
                                >
                                    <span>View All Achievements</span>
                                    <motion.div
                                        animate={{x: [0, 4, 0]}}
                                        transition={{
                                            repeat: Number.POSITIVE_INFINITY,
                                            duration: 1.5,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <ArrowRight className="h-3.5 w-3.5"/>
                                    </motion.div>
                                </motion.button>
                            </div> : ''
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentActivitySection
