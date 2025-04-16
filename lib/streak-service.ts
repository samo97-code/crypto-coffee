import { supabase } from "@/lib/supabase"
import {IUser} from "@/types";

export interface StreakInfo {
    currentStreak: number
    longestStreak: number
    lastActivityDate: string | null
    streakDates: string[]
}

/**
 * Formats a date as YYYY-MM-DD using local time
 * @param date The date to format
 * @returns The formatted date string
 */
function formatLocalDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

/**
 * Validates if a string is a valid UUID
 * @param uuid The string to validate
 * @returns Whether the string is a valid UUID
 */
function isValidUUID(uuid: string): boolean {
    if (!uuid) return false
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
}

/**
 * Gets the user's streak information
 * @returns The user's streak information
 * @param user
 */
export async function getUserStreak(user: IUser): Promise<StreakInfo> {
    const userId = user.id
    const userData = user

    // Check if userId is valid
    if (!userId || !isValidUUID(userId)) {
        console.error("Invalid user ID:", userId)
        return {
            currentStreak: 0,
            longestStreak: 0,
            lastActivityDate: null,
            streakDates: [],
        }
    }

    // Get streak dates for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: streakData, error: streakError } = await supabase
        .from("user_streaks")
        .select("streak_date, created_at")
        .eq("user_id", userId)
        .gte("streak_date", formatLocalDate(thirtyDaysAgo))
        .order("streak_date", { ascending: false })

    if (streakError) {
        console.error("Error fetching streak dates:", streakError)
        return {
            currentStreak: userData.current_streak_days || 0,
            longestStreak: userData.longest_streak_days || 0,
            lastActivityDate: null,
            streakDates: [],
        }
    }

    const lastActivity = streakData && streakData.length > 0 ? streakData[0].created_at : null
    const streakDates = streakData ? streakData.map((streak) => streak.streak_date) : []

    return {
        currentStreak: userData.current_streak_days || 0,
        longestStreak: userData.longest_streak_days || 0,
        lastActivityDate: lastActivity,
        streakDates,
    }
}

/**
 * Calculates the current streak based on streak dates
 * @param streakDates Array of streak dates
 * @returns The current streak count
 */
async function calculateCurrentStreak(userId: string): Promise<number> {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Format dates as YYYY-MM-DD
    const todayStr = formatLocalDate(today)
    const yesterdayStr = formatLocalDate(yesterday)

    // Get all streak dates for this user, ordered by date descending
    const { data, error } = await supabase
        .from("user_streaks")
        .select("streak_date")
        .eq("user_id", userId)
        .order("streak_date", { ascending: false })

    if (error || !data || data.length === 0) {
        return 0
    }

    // Check if the user has a streak today or yesterday
    const hasToday = data.some((item) => item.streak_date === todayStr)
    const hasYesterday = data.some((item) => item.streak_date === yesterdayStr)

    if (!hasToday && !hasYesterday) {
        // If neither today nor yesterday has activity, streak is broken
        return 0
    }

    // Sort dates in descending order (newest first)
    const sortedDates = data.map((item) => item.streak_date).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    let currentStreak = 1 // Start with 1 for today/yesterday
    let previousDate = hasToday ? todayStr : yesterdayStr

    // Loop through the rest of the dates
    for (let i = 0; i < sortedDates.length; i++) {
        const currentDate = sortedDates[i]

        // Skip if we've already counted today/yesterday
        if ((hasToday && currentDate === todayStr) || (!hasToday && hasYesterday && currentDate === yesterdayStr)) {
            continue
        }

        // Calculate the difference in days
        const current = new Date(currentDate)
        const previous = new Date(previousDate)
        const diffDays = Math.round((previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24))

        // If the difference is 1 day, increment streak
        if (diffDays === 1) {
            currentStreak++
            previousDate = currentDate
        } else {
            // Break in the streak
            break
        }
    }

    return currentStreak
}

/**
 * Records a streak activity for the user
 * @param userId The user's ID
 * @returns Whether the streak was successfully recorded
 */
export async function recordStreakActivity(userId: string): Promise<boolean> {
    // Check if userId is valid
    if (!userId || !isValidUUID(userId)) {
        console.error("Invalid user ID for streak activity:", userId)
        return false
    }

    const today = formatLocalDate(new Date())

    // Check if we already have a streak for today
    const { data: existingStreaks, error: checkError } = await supabase
        .from("user_streaks")
        .select("id")
        .eq("user_id", userId)
        .eq("streak_date", today)

    if (checkError) {
        console.error("Error checking existing streak:", checkError)
        return false
    }

    // If we already have a streak for today, don't record another one
    if (existingStreaks && existingStreaks.length > 0) {
        return true
    }

    // Record the streak activity
    const { error: insertError } = await supabase.from("user_streaks").insert({
        user_id: userId,
        streak_date: today,
    })

    if (insertError) {
        console.error("Error recording streak activity:", insertError)
        return false
    }

    // Calculate the current streak
    const currentStreak = await calculateCurrentStreak(userId)

    // Get the user's current longest streak
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("longest_streak_days")
        .eq("id", userId)
        .single()

    if (userError) {
        console.error("Error fetching user data:", userError)
        return false
    }

    // Calculate the new longest streak
    const longestStreak = Math.max(currentStreak, userData?.longest_streak_days || 0)

    // Update the user's streak information
    const { error: updateError } = await supabase
        .from("users")
        .update({
            current_streak_days: currentStreak,
            longest_streak_days: longestStreak,
            updated_at: new Date(),
        })
        .eq("id", userId)

    if (updateError) {
        console.error("Error updating user streak:", updateError)
        return false
    }

    return true
}

/**
 * Calculates time remaining until streak is lost
 * @param lastActivityDate The date of the user's last activity
 * @returns Hours and minutes remaining until streak is lost
 */
export function getTimeUntilStreakLost(lastActivityDate: string | null): { hours: number; minutes: number } | null {
    if (!lastActivityDate) return null

    const now = new Date()
    const lastActivity = new Date(lastActivityDate)

    // Set to the end of the day after last activity
    const deadlineDate = new Date(lastActivity)
    deadlineDate.setDate(deadlineDate.getDate() + 1)
    deadlineDate.setHours(23, 59, 59, 999)

    const timeRemaining = deadlineDate.getTime() - now.getTime()

    // If deadline has passed
    if (timeRemaining <= 0) return { hours: 0, minutes: 0 }

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

    return { hours, minutes }
}

/**
 * Determines rewards based on streak milestones
 * @param currentStreak The user's current streak
 * @returns Reward information
 */
export function getStreakRewards(currentStreak: number): { tokens: number; badges: string[] } {
    const rewards = {
        tokens: 0,
        badges: [] as string[],
    }

    // Daily tokens based on streak length
    if (currentStreak >= 30) {
        rewards.tokens = 10 // 10 tokens per day for 30+ day streak
    } else if (currentStreak >= 7) {
        rewards.tokens = 5 // 5 tokens per day for 7+ day streak
    } else {
        rewards.tokens = 1 // 1 token per day for regular streak
    }

    // Milestone badges
    if (currentStreak >= 365) {
        rewards.badges.push("coffee-master")
    } else if (currentStreak >= 100) {
        rewards.badges.push("coffee-enthusiast")
    } else if (currentStreak >= 30) {
        rewards.badges.push("coffee-lover")
    } else if (currentStreak >= 7) {
        rewards.badges.push("coffee-friend")
    }

    return rewards
}
