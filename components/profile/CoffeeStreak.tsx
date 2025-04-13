"use client"

import {FC, useState, useEffect} from "react"
import {Coffee, Sparkles, AlertTriangle} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Progress} from "@/components/ui/progress"
import {getTimeUntilStreakLost, getStreakRewards} from "@/lib/streak-service"
import {IStreakInfo} from "@/types";

interface CoffeeStreakProps {
    streak: IStreakInfo
}

const CoffeeStreak: FC<CoffeeStreakProps> = ({streak}) => {
    const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number } | null>(null)
    const [rewards, setRewards] = useState<{ tokens: number; badges: string[] }>({tokens: 0, badges: []})

    console.log(streak, 'streak')

    // Calculate time remaining and rewards
    useEffect(() => {
        if (streak) {
            setTimeRemaining(getTimeUntilStreakLost(streak.last_activity_date))
            setRewards(getStreakRewards(streak.current_streak))
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
    const last14Days = Array.from({ length: 14 }).map((_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        // Format as YYYY-MM-DD using local time
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    }).reverse()


    // Check if streak is at risk (less than 6 hours remaining)
    const streakAtRisk = timeRemaining && timeRemaining.hours < 6

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
            <h3 className="font-semibold text-coffee-900 mb-4 flex items-center">
                <Coffee className="h-5 w-5 mr-2"/>
                Coffee Streak
            </h3>

            {/* Streak Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-coffee-50 rounded-lg p-4">
                    <div className="text-coffee-700 text-sm">Current Streak</div>
                    <div className="text-2xl font-bold text-coffee-900 flex items-center gap-2">
                        {streak.current_streak} {streak.current_streak > 0 &&
                        <Coffee className="h-5 w-5 text-coffee-700"/>}
                    </div>
                    <div className="text-coffee-600 text-sm">consecutive days</div>
                </div>

                <div className="bg-coffee-50 rounded-lg p-4">
                    <div className="text-coffee-700 text-sm">Longest Streak</div>
                    <div className="text-2xl font-bold text-coffee-900">{streak.longest_streak}</div>
                    <div className="text-coffee-600 text-sm">days</div>
                </div>
            </div>

            {/* Streak Calendar */}
            <div className="flex flex-wrap gap-2 mb-4">
                {last14Days.map((date) => {
                    const hasActivity = streak.streak_dates.includes(date)
                    return (
                        <div
                            key={date}
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
                        </div>
                    )
                })}
            </div>

            {/* Time Remaining */}
            {streak.current_streak > 0 && timeRemaining && streakAtRisk && (
                <div className="p-4 rounded-lg flex items-center gap-3 bg-red-50 border border-red-100 mb-4">
                    <div className="p-2 rounded-full bg-red-100 text-red-600">
                        <AlertTriangle className="h-5 w-5"/>
                    </div>
                    <div>
                        <div className="font-medium text-red-800">Streak at risk!</div>
                        <p className="text-sm text-red-700">
                            Only {timeRemaining.hours}h {timeRemaining.minutes}m remaining. Support a project soon!
                        </p>
                    </div>
                </div>
            )}

            {/*/!* Streak Bonus *!/*/}
            {streak.current_streak >= 7 && (
                <div className="bg-coffee-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-coffee-100 rounded-full">
                            <Sparkles className="h-5 w-5 text-coffee-700"/>
                        </div>
                        <div>
                            <div className="font-medium text-coffee-900">{streak.current_streak}-Day Streak Bonus!</div>
                            <p className="text-sm text-coffee-700">
                                You've supported projects for {streak.current_streak} days in a row. Keep it up to earn
                                special rewards!
                            </p>
                        </div>
                    </div>

                    {rewards.tokens > 1 && (
                        <div className="mt-3 pt-3 border-t border-coffee-200">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-coffee-700">Daily Bonus Tokens</span>
                                <span className="font-medium text-coffee-900">{rewards.tokens}x multiplier</span>
                            </div>
                            <Progress value={Math.min(100, streak.current_streak * 3)} className="h-2 mt-2"/>
                        </div>
                    )}

                    {streak.current_streak >= 10 && (
                        <div className="mt-3">
                            <Button
                                className="w-full bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white">
                                Claim Streak Rewards
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CoffeeStreak
