'use client'

import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {motion} from 'framer-motion'
import AchievementsHeader from "@/components/profile/achievements/AchievementsHeader";
import AchievementStats from "@/components/profile/achievements/AchievementStats";
import AllAchievements from "@/components/profile/achievements/AllAchievements";
import LevelsSystem from "@/components/profile/achievements/LevelsSystem";
import {IUserAchievement, IUserLevelProgress} from "@/types";
import {useAppSelector} from "@/store/hook";
import {getUserAchievements, getUserLevelProgress} from "@/lib/acheivements-service";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";


const Wrapper = () => {
    const user = useAppSelector(state => state.user.user);
    const router = useRouter()
    const [levelProgress, setLevelProgress] = useState<IUserLevelProgress>({
        "currentLevel": 1,
        "currentLevelName": "Coffee Novice",
        "nextLevel": 2,
        "nextLevelName": "Coffee Sipper",
        "progressPercent": 40,
        "currentXP": 0,
        "requiredXP": 50,
        "completedLevels": [],
        "allLevels": []
    })
    const [achievements, setAchievements] = useState<IUserAchievement[]>([])
    const [loading, setLoading] = useState(true)
    const totalAchievements = achievements.length
    const unlockedAchievements = achievements.filter(a => a.is_unlocked).length
    const achievementPercentage = Math.round((unlockedAchievements / totalAchievements) * 100) || 0


    useEffect(() => {
        if (user.id) {
            fetchAchievements()
        }
    }, [user, router])

    const fetchAchievements = async () => {
        if (!user?.id) {
            router.push('/login')
            return
        }

        try {
            setLoading(true)
            const [achievements, levelProgress] = await Promise.all([
                getUserAchievements(user.id),
                getUserLevelProgress(user.id)
            ])

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setLevelProgress(levelProgress)
            setAchievements(achievements || [])
        } catch (error) {
            console.error('Error fetching achievements:', error)
        } finally {
            setLoading(false)
        }
    }


    if (loading) return <CoffeeLoader/>

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <AchievementsHeader/>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="relative"
                >

                    {/* Achievement Stats Card */}
                    <AchievementStats
                        unlockedAchievements={unlockedAchievements}
                        totalAchievements={totalAchievements}
                        achievementPercentage={achievementPercentage}
                    />

                    <LevelsSystem levelProgress={levelProgress}/>

                    <AllAchievements achievements={achievements}/>
                </motion.div>
            </div>
        </div>
    )
}

export default Wrapper
