import Wrapper from "@/components/profile/Wrapper";
import {supabase} from "@/lib/supabase";
import {getUserStreak} from "@/lib/streak-service";
import {camelToSnake} from "@/utils/utils";
import {getUserAchievements, getUserBadges, getUserLevelProgress, getUserStats} from "@/lib/acheivements-service";
import {getUserRecentActivities} from "@/lib/activity-service";
import {cookies} from "next/headers";
import {IUser} from "@/types";

const ProfilePage = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {streak, stats, achievements, badges, activities} = await fetchData()

    return (
        <Wrapper
            streak={streak}
            stats={stats}
            achievements={achievements}
            badges={badges}
            activities={activities}
        />
    )
}

async function fetchData() {
    try {
        const cookieStore = await cookies()
        const userIdCookie = cookieStore.get('userId')
        const userId = userIdCookie?.value || '00000000-0000-0000-0000-000000000001' // Fallback to sample user

        const {data: user} = await supabase
            .from('user_with_transaction_count')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

        const streak = await fetchUserStreak(user)
        const [userData, dataStats] = await Promise.all([fetchUserData(userId, streak?.currentStreak), fetchStats(user, userId)])

        return {
            streak: camelToSnake(streak),
            stats: dataStats,
            achievements: userData?.userAchievements,
            badges: userData?.userBadges,
            activities: userData?.recentActivities,

        };
    } catch (err) {
        console.error('Fetch Error:', err);
        return null; // Fallback clearly
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

export default ProfilePage;
