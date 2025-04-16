'use client'
import React from "react"
import {motion} from "framer-motion"
import {Ticket, Brain, SmilePlus, ArrowRight, Zap} from "lucide-react"
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
            id: "gas-lottery",
            title: "Gas Fee Lottery",
            description: "Win daily prizes",
            icon: <Ticket className="h-5 w-5"/>,
            color: "bg-purple-500",
            progress: 75,
            completed: false,
        },
        {
            id: "crypto-trivia",
            title: "Crypto Trivia",
            description: "Test your knowledge",
            icon: <Brain className="h-5 w-5"/>,
            color: "bg-blue-500",
            progress: 100,
            completed: true,
        },
        {
            id: "daily-joke",
            title: "Daily Joke",
            description: "Start with a laugh",
            icon: <SmilePlus className="h-5 w-5"/>,
            color: "bg-yellow-500",
            progress: 0,
            completed: false,
        },
    ]

    return (
        <div className="relative w-full max-w-sm overflow-hidden shadow-lg rounded-xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-coffee-100">
                <div className="absolute inset-0 bg-[url('/activities-pattern.svg')] bg-repeat opacity-20"></div>
            </div>

            {/* Card container with glass effect */}
            <div
                className="relative backdrop-blur-sm bg-white/80 rounded-xl overflow-hidden border border-coffee-200 shadow-lg"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-coffee-100">
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
                                "cursor-pointer relative overflow-hidden rounded-lg border border-coffee-100 transition-all duration-300 bg-white hover:bg-coffee-50",
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
                        className="w-full flex items-center justify-center space-x-2 py-2.5 bg-white border border-coffee-200 text-coffee-800 rounded-lg text-sm font-medium hover:bg-coffee-50 transition-colors"
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
        // <div className="bg-white shadow-sm border border-coffee-200 backdrop-blur-sm rounded-lg overflow-hidden">
        //     <div className="p-4 border-b border-coffee-200">
        //         <h3 className="font-semibold text-amber-900">Daily Activities</h3>
        //     </div>
        //     <div className="p-4 space-y-4">
        //         {activities.map((activity) => (
        //             <Link key={activity.title} href={activity.href}>
        //                 <div className="flex items-center gap-3 hover:bg-coffee-100 p-2 rounded-md transition-colors">
        //                     <div className={`${activity.bgColor} w-10 h-10 rounded-full flex items-center justify-center`}>
        //                         <activity.icon className={`h-5 w-5 ${activity.color}`} />
        //                     </div>
        //                     <div>
        //                         <div className="font-medium text-amber-950">{activity.title}</div>
        //                         <div className="text-xs text-coffee-700">{activity.description}</div>
        //                     </div>
        //                 </div>
        //             </Link>
        //         ))}
        //     </div>
        //     <div className="p-4 pt-0">
        //         <Link href="/daily-activities">
        //             <Button variant="outline" className="w-full border-coffee-400 hover:bg-coffee-100 transition-all">
        //                 <span className="text-coffee-800">View All Activities</span>
        //                 <ArrowRight className="ml-2 h-4 w-4 text-coffee-800" />
        //             </Button>
        //         </Link>
        //     </div>
        // </div>
    )
}

export default SidebarActivitiesCard

