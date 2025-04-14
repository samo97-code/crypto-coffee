import { supabase } from "@/lib/supabase"

import {IUserAchievement, IBadge} from "@/types";


/**
 * Gets all achievements for a user
 * @param userId The user's ID
 * @returns The user's achievements with progress
 */
export async function getUserAchievements(userId: string): Promise<IUserAchievement[]> {
    if (!userId) return []

    const { data, error } = await supabase
        .from("user_achievements")
        .select(`
      *,
      achievement:achievements(*)
    `)
        .eq("user_id", userId)
        .order("id", { ascending: true })

    if (error) {
        console.error("Error fetching user achievements:", error)
        return []
    }

    return data || []
}

/**
 * Gets featured achievements for a user (for showcase)
 * @param userId The user's ID
 * @returns The user's featured achievements
 */
export async function getFeaturedAchievements(userId: string): Promise<IUserAchievement[]> {
    if (!userId) return []

    const { data, error } = await supabase
        .from("user_achievements")
        .select(`
      *,
      achievement:achievements(*)
    `)
        .eq("user_id", userId)
        .eq("is_unlocked", true)
        .eq("achievement.is_featured", true)
        .order("id", { ascending: true })

    if (error) {
        console.error("Error fetching featured achievements:", error)
        return []
    }

    return data || []
}

/**
 * Gets user badges based on achievements and streaks
 * @param userId The user's ID
 * @param currentStreak The user's current streak
 * @returns The user's badges
 */
export async function getUserBadges(userId: string, currentStreak = 0): Promise<IBadge[]> {
    if (!userId) return []

    // Get unlocked achievements
    const { data: achievementData, error: achievementError } = await supabase
        .from("user_achievements")
        .select(`
      achievement:achievements(name, description, icon_name, icon_bg, icon_color)
    `)
        .eq("user_id", userId)
        .eq("is_unlocked", true)

    if (achievementError) {
        console.error("Error fetching achievement badges:", achievementError)
        return []
    }

    // Convert achievements to badges
    const achievementBadges: IBadge[] = (achievementData as unknown as IUserAchievement[] || []).map((item) => ({
        id: `achievement-${item.achievement.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: item.achievement.name,
        description: item.achievement.description,
        icon: item.achievement.icon_name,
        bg_color: item.achievement.icon_bg,
        text_color: item.achievement.icon_color,
    }))

    // Add streak badges
    const streakBadges: IBadge[] = []

    if (currentStreak >= 7) {
        streakBadges.push({
            id: "streak-7",
            name: "Coffee Friend",
            description: "7+ day streak",
            icon: "Coffee",
            bg_color: "bg-coffee-100",
            text_color: "text-coffee-800",
        })
    }

    if (currentStreak >= 30) {
        streakBadges.push({
            id: "streak-30",
            name: "Coffee Lover",
            description: "30+ day streak",
            icon: "Coffee",
            bg_color: "bg-coffee-100",
            text_color: "text-coffee-800",
        })
    }

    if (currentStreak >= 100) {
        streakBadges.push({
            id: "streak-100",
            name: "Coffee Enthusiast",
            description: "100+ day streak",
            icon: "Coffee",
            bg_color: "bg-coffee-100",
            text_color: "text-coffee-800",
        })
    }

    if (currentStreak >= 365) {
        streakBadges.push({
            id: "streak-365",
            name: "Coffee Master",
            description: "365+ day streak",
            icon: "Coffee",
            bg_color: "bg-coffee-100",
            text_color: "text-coffee-800",
        })
    }

    // Combine all badges
    return [...achievementBadges, ...streakBadges]
}

/**
 * Gets user stats for the profile page
 * @param userId The user's ID
 * @returns The user's stats
 */
export async function getUserStats(userId: string): Promise<{
    totalSupported: number
    projectsSupported: number
    achievementsCount: number
    totalAchievements: number
}> {
    if (!userId) {
        return {
            totalSupported: 0,
            projectsSupported: 0,
            achievementsCount: 0,
            totalAchievements: 30, // Default total achievements in the system
        }
    }

    // Get total supported amount
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("total_supported_amount")
        .eq("id", userId)
        .single()

    if (userError) {
        console.error("Error fetching user stats:", userError)
    }

    // Get count of unique projects supported
    const { count: projectsCount, error: projectsError } = await supabase
        .from("transactions")
        .select("project_id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("type", "support")

    if (projectsError) {
        console.error("Error fetching projects count:", projectsError)
    }

    // Get count of unlocked achievements
    const { count: achievementsCount, error: achievementsError } = await supabase
        .from("user_achievements")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_unlocked", true)

    if (achievementsError) {
        console.error("Error fetching achievements count:", achievementsError)
    }

    // Get total number of achievements in the system
    const { count: totalAchievements, error: totalAchievementsError } = await supabase
        .from("achievements")
        .select("id", { count: "exact", head: true })

    if (totalAchievementsError) {
        console.error("Error fetching total achievements:", totalAchievementsError)
    }

    return {
        totalSupported: userData?.total_supported_amount || 0,
        projectsSupported: projectsCount || 0,
        achievementsCount: achievementsCount || 0,
        totalAchievements: totalAchievements || 30,
    }
}

/**
 * Gets the user's level progress
 * @param userId The user's ID
 * @returns The user's level progress as a percentage
 */
export async function getUserLevelProgress(userId: string): Promise<number> {
    if (!userId) return 0

    try {
        // Get user's current level and XP
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("level_id, experience_points")
            .eq("id", userId)
            .single()

        if (userError) {
            console.error("Error fetching user level data:", userError)
            return 0 // Default to 0% if we can't get data
        }

        const currentLevelId = userData?.level_id || 1
        const currentXP = userData?.experience_points || 0

        // Get current level XP requirement
        const { data: currentLevelData, error: currentLevelError } = await supabase
            .from("levels")
            .select("experience_required")
            .eq("id", currentLevelId)
            .single()

        if (currentLevelError) {
            console.error("Error fetching current level data:", currentLevelError)
            return 0 // Default to 0% if we can't get data
        }

        // Get next level XP requirement
        const { data: nextLevelData, error: nextLevelError } = await supabase
            .from("levels")
            .select("experience_required")
            .eq("id", currentLevelId + 1)
            .single()

        if (nextLevelError && nextLevelError.code !== "PGRST116") {
            // PGRST116 means no rows returned, which is fine if user is at max level
            console.error("Error fetching next level data:", nextLevelError)
            return 100 // If at max level, show 100%
        }

        const currentLevelXP = currentLevelData?.experience_required || 0
        const nextLevelXP = nextLevelData?.experience_required || currentLevelXP * 2

        // Calculate progress percentage
        const xpForNextLevel = nextLevelXP - currentLevelXP
        const xpProgress = currentXP - currentLevelXP
        const progressPercentage = Math.min(100, Math.round((xpProgress / xpForNextLevel) * 100))

        return progressPercentage
    } catch (error) {
        console.error("Error calculating level progress:", error)
        return 0 // Default to 0% if there's an error
    }
}
