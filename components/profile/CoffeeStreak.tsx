"use client"

import {FC, useState, useEffect} from "react"
import {Coffee, Calendar, Award, AlertTriangle} from "lucide-react"
import {getTimeUntilStreakLost} from "@/lib/streak-service"
import {IStreakInfo} from "@/types";
import {motion} from "framer-motion"

interface CoffeeStreakProps {
    streak: IStreakInfo
}

const CoffeeStreak: FC<CoffeeStreakProps> = ({streak}) => {
    console.log(streak, 'streak')

    const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number } | null>(null)
    // Calculate time remaining and rewards
    useEffect(() => {
        if (streak) {
            setTimeRemaining(getTimeUntilStreakLost(streak.last_activity_date))
        }
    }, [streak])

    // Update time remaining every minute
    useEffect(() => {
        const interval = setInterval(() => {
            if (streak?.last_activity_date) {
                setTimeRemaining(getTimeUntilStreakLost(streak.last_activity_date))
            }
        }, 60000)

        return () => clearInterval(interval)
    }, [streak])

    // Generate dates for the last 14 days
    const last14Days = Array.from({length: 14}).map((_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        // Format as YYYY-MM-DD using local time
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    }).reverse()


    // Check if streak is at risk (less than 6 hours remaining)
    const streakAtRisk = timeRemaining && timeRemaining.hours < 6

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-coffee-200 relative overflow-hidden"
        >
            {/* Coffee bean pattern background */}
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
                    <div className="bg-coffee-100 p-2 rounded-full mr-3">
                        <Calendar className="h-5 w-5 text-coffee-700"/>
                    </div>
                    Coffee Streak
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <motion.div
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{delay: 0.3}}
                        className="bg-coffee-50 p-4 rounded-lg shadow-sm border border-coffee-200 relative overflow-hidden"
                    >
                        <div className="relative">
                            <div className="text-coffee-600 text-sm mb-1">Current Streak</div>
                            <div className="font-bold text-coffee-900 text-2xl flex items-center">
                                {streak.current_streak} <Coffee className="inline-block h-5 w-5 ml-1 text-coffee-700"/>
                            </div>
                            <div className="text-coffee-600 text-xs mt-1">consecutive days</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{delay: 0.4}}
                        className="bg-coffee-50 p-4 rounded-lg shadow-sm border border-coffee-200 relative overflow-hidden"
                    >
                        <div className="relative">
                            <div className="text-coffee-600 text-sm mb-1">Longest Streak</div>
                            <div className="font-bold text-coffee-900 text-2xl flex items-center">
                                {streak.longest_streak} <Award className="inline-block h-5 w-5 ml-1 text-coffee-700"/>
                            </div>
                            <div className="text-coffee-600 text-xs mt-1">days</div>
                        </div>
                    </motion.div>
                </div>

                <div className="bg-coffee-50 p-4 rounded-lg shadow-sm border border-coffee-200">
                    <div className="text-coffee-800 font-medium mb-3">Streak Calendar</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {last14Days.map((date, index) => {
                            const hasActivity = streak.streak_dates.includes(date)
                            return (
                                <motion.div
                                    key={date}
                                    initial={{scale: 0.5, opacity: 0}}
                                    animate={{scale: 1, opacity: 1}}
                                    transition={{delay: 0.2 + index * 0.03}}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        hasActivity
                                            ? "bg-gradient-to-br from-coffee-500 to-coffee-700 text-white"
                                            : "bg-coffee-100 text-coffee-300"
                                    }`}
                                    title={new Date(date).toLocaleDateString()}
                                >
                                    {hasActivity ? (
                                        <Coffee className="h-5 w-5"/>
                                    ) : (
                                        <span className="text-lg font-medium">{new Date(date).getDate()}</span>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {streak?.current_streak > 0 && timeRemaining && streakAtRisk && (
                <div className="p-4 rounded-lg flex items-center gap-3 bg-red-50 border border-red-100 mt-4">
                    <div className="p-2 rounded-full bg-red-100 text-red-600">
                        <AlertTriangle className="h-5 w-5"/>
                    </div>
                    <div>
                        <div className="font-medium text-red-800">Streak at risk!</div>
                        <p className="text-sm text-red-700">
                            Only {timeRemaining.hours}h {timeRemaining.minutes}m remaining. Buy coffee asap!
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CoffeeStreak
