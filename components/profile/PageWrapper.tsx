"use client"

import Wrapper from "@/components/profile/Wrapper";
import {supabase} from "@/lib/supabase";
import {getUserStreak} from "@/lib/streak-service";
import {camelToSnake} from "@/utils/utils";
import {getUserAchievements, getUserBadges, getUserLevelProgress, getUserStats} from "@/lib/acheivements-service";
import {getUserRecentActivities} from "@/lib/activity-service";
import {IActivity, IBadge, IProfileStates, IStreakInfo, IUser, IUserAchievement} from "@/types";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/store/hook";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";

interface IData {
    streak: IStreakInfo,
    stats: IProfileStates,
    achievements: IUserAchievement[],
    badges: IBadge[],
    activities: IActivity[],
}

const PageWrapper = () => {
    const authUser = useAppSelector(state => state.user.user);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<IData>({
        streak: {
            current_streak: 0,
            longest_streak: 0,
            last_activity_date: '',
            streak_dates: []
        },
        stats: {
            boughtCoffee: 0,
            achievementsCount: 0,
            totalAchievements: 0,
            levelProgress: 0,
        },
        achievements: [],
        badges: [],
        activities: [],
    });


    useEffect(() => {
        if (authUser.id) {
            fetchData(authUser.id)
        }
    }, [authUser.id]);


    const fetchData = async (userId: string) => {
        try {
            const {data: user} = await supabase
                .from('user_with_transaction_count')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            const streak = await fetchUserStreak(user)
            const [userData, dataStats] = await Promise.all([fetchUserData(userId, streak?.currentStreak), fetchStats(user, userId)])

            setProfileData({
                streak: camelToSnake(streak) as IStreakInfo,
                stats: dataStats as IProfileStates,
                achievements: userData?.userAchievements as IUserAchievement[],
                badges: userData?.userBadges as IBadge[],
                activities: userData?.recentActivities as IActivity[],

            })
        } catch (err) {
            console.error('Fetch Error:', err);
            return null; // Fallback clearly
        } finally {
            setLoading(false)
        }
    }

    const fetchUserStreak = async (user: IUser) => {
        try {
            return await getUserStreak(user)
        } catch (e) {
            console.error("Error in saveOrGetUser:", e)
        }
    }

    const fetchUserData = async (userId: string, currentStreak: number | undefined) => {
        try {
            // Fetch achievements
            const userAchievements = await getUserAchievements(userId)
            // Fetch badges
            const userBadges = await getUserBadges(userId, currentStreak || 0, userAchievements)
            // Fetch recent activities
            const recentActivities = await getUserRecentActivities(userId, 5)

            return {
                userAchievements, userBadges, recentActivities
            }
        } catch (error) {
            console.error("Error fetching profile data:", error)
        }
    }

    const fetchStats = async (user: IUser, userId: string) => {
        try {
            // Get level Achievements
            const userStats = await getUserStats(userId)
            // Get level progress
            const levelProgress = await getUserLevelProgress(user)

            return {
                boughtCoffee: user.transaction_count,
                achievementsCount: userStats.achievementsCount,
                totalAchievements: 10,
                levelProgress: levelProgress || 0,
            }
        } catch (error) {
            console.error("Error fetching coffee stats:", error)
        }
    }

    if (loading) return <CoffeeLoader/>

    return (
        <Wrapper
            streak={profileData.streak}
            stats={profileData.stats}
            achievements={profileData.achievements}
            badges={profileData.badges}
            activities={profileData.activities}
        />
    )
}

export default PageWrapper;
