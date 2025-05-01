'use client'
import React from "react"
import {motion} from "framer-motion"
import {Ticket, Brain, SmilePlus, ArrowRight, Zap, Hand} from "lucide-react"
import {cn} from "@/utils/utils"
import {useRouter} from "next/navigation";

type Activity = {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    color: string
    progress: number
    completed: boolean
}

const SidebarActivitiesCard = () => {
    const router = useRouter()
    const activities: Activity[] = [
        {
            id: "rock-paper-scissors",
            title: "Rock Paper Scissors",
            description: "Play rock paper scissors against the blockchain and win crypto rewards.",
            icon: <Hand className="h-5 w-5"/>,
            color: "bg-teal-500",
            progress: 75,
            completed: false,
        },
        // {
        //     id: "gas-lottery",
        //     title: "Gas Fee Lottery",
        //     description: "Win daily prizes",
        //     icon: <Ticket className="h-5 w-5"/>,
        //     color: "bg-purple-500",
        //     progress: 75,
        //     completed: false,
        // },
        // {
        //     id: "crypto-trivia",
        //     title: "Crypto Trivia",
        //     description: "Test your knowledge",
        //     icon: <Brain className="h-5 w-5"/>,
        //     color: "bg-blue-500",
        //     progress: 100,
        //     completed: true,
        // },
        // {
        //     id: "daily-joke",
        //     title: "Daily Joke",
        //     description: "Start with a laugh",
        //     icon: <SmilePlus className="h-5 w-5"/>,
        //     color: "bg-yellow-500",
        //     progress: 0,
        //     completed: false,
        // },
    ]

    return (
        <div className="relative w-full max-w-sm overflow-hidden shadow-lg rounded-xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-coffee-100">
                <div className="absolute inset-0 bg-[url('/activities-pattern.svg')] bg-repeat opacity-20"></div>
            </div>

            {/* Card container with glass effect */}
            <div
                className="relative backdrop-blur-sm bg-card/80 rounded-xl overflow-hidden border border-coffee-200 dark:border-coffee-600/50 shadow-lg"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-coffee-100 dark:border-coffee-300">
                    <div className="flex items-center space-x-2">
                        <motion.div
                            animate={{rotate: [0, 10, 0]}}
                            transition={{repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut"}}
                        >
                            <Zap className="h-5 w-5 text-coffee-700"/>
                        </motion.div>
                        <h3 className="font-bold text-coffee-900 bg-gradient-to-r from-coffee-800 to-coffee-600 bg-clip-text text-transparent">
                            Daily Activities
                        </h3>
                    </div>
                </div>

                {/* Activities list */}
                <div className="p-4 space-y-3">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className={cn(
                                "cursor-pointer relative overflow-hidden rounded-lg border border-coffee-100 dark:border-coffee-300 transition-colors duration-300 bg-card hover:bg-coffee-50 dark:hover:bg-coffee-50/60",
                            )}
                        >
                            <div className="p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={cn("p-2 rounded-full text-white", activity.color)}>{activity.icon}</div>
                                        <div>
                                            <h4 className="font-medium text-coffee-800">{activity.title}</h4>
                                            <p className="text-xs text-coffee-500">{activity.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View all button */}
                <div className="p-4 pt-0">
                    <motion.button
                        onClick={() => router.push("/daily-activities")}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className="w-full flex items-center justify-center space-x-2 py-2.5 bg-card border border-coffee-200 text-coffee-800 rounded-lg text-sm font-medium hover:bg-coffee-50 dark:hover:bg-coffee-50/60 transition-colors"
                    >
                        <span>View All Activities</span>
                        <motion.div
                            animate={{x: [0, 4, 0]}}
                            transition={{repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut"}}
                        >
                            <ArrowRight className="h-3.5 w-3.5"/>
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Decorative elements */}
            <div
                className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-yellow-200 rounded-full blur-3xl opacity-20"></div>
            <div
                className="absolute bottom-0 left-0 -ml-4 -mb-4 h-24 w-24 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
        </div>
    )
}

export default SidebarActivitiesCard

