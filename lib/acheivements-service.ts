import {supabase} from "@/lib/supabase"

import {
    IAchievement,
    IBadge,
    ILevelDetail,
    IUser,
    IUserAchievement,
    IUserLevelProgress
} from "@/types";
import {REQUIREMENT_TYPES} from "@/constants";


/**
 * Gets featured achievements for a user (for showcase)
 * @param userId The user's ID
 * @returns The user's featured achievements
 */
export async function getFeaturedAchievements(userId: string): Promise<IUserAchievement[]> {
    if (!userId) return []

    const {data, error} = await supabase
        .from("user_achievements")
        .select(`
      *,
      achievement:achievements(*)
    `)
        .eq("user_id", userId)
        .eq("is_unlocked", true)
        .eq("achievement.is_featured", true)
        .order("id", {ascending: true})

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
 * @param achievementData
 * @returns The user's badges
 */
export async function getUserBadges(userId: string, currentStreak = 0, achievementData: IUserAchievement[]): Promise<IBadge[]> {
    if (!userId) return []

    // Convert achievements to badges
    const achievementBadges: IBadge[] = (achievementData || []).map((item) => ({
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
export async function getUserStats(userId: string): Promise<{ achievementsCount: number }> {
    if (!userId) {
        return {
            achievementsCount: 0,
        }
    }
    // Get count of unlocked achievements
    const {count: achievementsCount, error: achievementsError} = await supabase
        .from("user_achievements")
        .select("id", {count: "exact", head: true})
        .eq("user_id", userId)
        .eq("is_unlocked", true)

    if (achievementsError) {
        console.error("Error fetching achievements count:", achievementsError)
    }

    return {
        achievementsCount: achievementsCount || 0,
    }
}

export async function getTotalAchievements(): Promise<{ totalAchievements: number }> {
    // Get total number of achievements in the system
    const {count: totalAchievements, error: totalAchievementsError} = await supabase
        .from("achievements")
        .select("id", {count: "exact", head: true})

    if (totalAchievementsError) {
        console.error("Error fetching total achievements:", totalAchievementsError)
    }

    return {totalAchievements: totalAchievements || 10}
}


/**
 * Updates achievement progress for a user
 * @param userId The user's ID
 * @param achievementId The achievement ID
 * @param progress The new progress value
 * @returns Success status
 */
export async function updateAchievementProgress(
    userId: string,
    achievementId: number,
    progress: number
): Promise<boolean> {
    if (!userId || !achievementId) return false

    try {
        // Get the current user achievement
        const {data: userAchievement, error: fetchError} = await supabase
            .from("user_achievements")
            .select("*")
            .eq("user_id", userId)
            .eq("achievement_id", achievementId)
            .single()

        // console.log(userAchievement, 'userAchievement')

        if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Error fetching user achievement:", fetchError)
            return false
        }

        // If the user achievement doesn't exist, create it
        if (!userAchievement) {
            console.log('is creating')
            // Get the achievement details
            const {data: achievement, error: achievementError} = await supabase
                .from("achievements")
                .select("requirement_value")
                .eq("id", achievementId)
                .single()

            if (achievementError) {
                console.error("Error fetching achievement:", achievementError)
                return false
            }

            // Check if the achievement is completed
            const isUnlocked = progress >= achievement.requirement_value
            const unlockedAt = isUnlocked ? new Date().toISOString() : null

            // Create the user achievement
            const {error: insertError} = await supabase.from("user_achievements").insert({
                user_id: userId,
                achievement_id: achievementId,
                progress,
                is_unlocked: isUnlocked,
                unlocked_at: unlockedAt
            })

            if (insertError) {
                console.error("Error creating user achievement:", insertError)
                return false
            }

            // If the achievement was unlocked, update user XP
            if (isUnlocked) {
                await updateUserXP(userId, achievementId)
            }

            return true
        }

        // Get the achievement details
        const {data: achievement, error: achievementError} = await supabase
            .from("achievements")
            .select("requirement_value")
            .eq("id", achievementId)
            .single()

        if (achievementError) {
            console.error("Error fetching achievement:", achievementError)
            return false
        }

        // Check if the achievement is now completed
        const wasUnlocked = userAchievement.is_unlocked
        const isUnlocked = progress >= achievement.requirement_value
        const unlockedAt = isUnlocked && !wasUnlocked ? new Date().toISOString() : userAchievement.unlocked_at

        if (!userAchievement?.id) {
            console.error("Missing userAchievement.id, can't update");
            return false;
        }

        console.log(typeof userAchievement.id, userAchievement.id, "type check");

        console.log("Updating achievement:", {
            id: userAchievement.id,
            updateFields: {
                progress,
                is_unlocked: isUnlocked,
                unlocked_at: unlockedAt
            }
        });

        // Update the user achievement
        const {error: updateError} = await supabase
            .from("user_achievements")
            .update({
                progress,
                is_unlocked: isUnlocked,
                unlocked_at: unlockedAt
            })
            .eq("id", userAchievement.id)

        console.log(updateError, 'updateError')

        if (updateError) {
            console.log(updateError, 'updateError')
            console.error("Error updating user achievement:", updateError)
            return false
        }

        // If the achievement was just unlocked, update user XP
        if (isUnlocked && !wasUnlocked) {
            await updateUserXP(userId, achievementId)
        }

        return true
    } catch (error) {
        console.error("Error updating achievement progress:", error)
        return false
    }
}

/**
 * Updates user XP when an achievement is unlocked
 * @param userId The user's ID
 * @param achievementId The achievement ID
 * @returns Success status
 */
async function updateUserXP(userId: string, achievementId: number): Promise<boolean> {
    try {
        // Get the achievement XP reward
        const {data: achievement, error: achievementError} = await supabase
            .from("achievements")
            .select("xp_reward")
            .eq("id", achievementId)
            .single()

        if (achievementError) {
            console.error("Error fetching achievement XP:", achievementError)
            return false
        }

        const xpReward = achievement.xp_reward || 0

        // Get the current user XP
        const {data: user, error: userError} = await supabase
            .from("users")
            .select("experience_points, level_id")
            .eq("id", userId)
            .single()

        if (userError) {
            console.error("Error fetching user XP:", userError)
            return false
        }

        const currentXP = user.experience_points || 0
        const currentLevelId = user.level_id || 1
        const newXP = currentXP + xpReward

        // Check if the user should level up
        const {data: nextLevel, error: nextLevelError} = await supabase
            .from("levels")
            .select("id, experience_required")
            .eq("id", currentLevelId + 1)
            .single()

        if (nextLevelError && nextLevelError.code !== "PGRST116") {
            console.error("Error fetching next level:", nextLevelError)
        }

        // Determine if user should level up
        let newLevelId = currentLevelId
        if (nextLevel && newXP >= nextLevel.experience_required) {
            newLevelId = nextLevel.id
        }

        // Update the user XP and level
        const {error: updateError} = await supabase
            .from("users")
            .update({
                experience_points: newXP,
                level_id: newLevelId
            })
            .eq("id", userId)

        if (updateError) {
            console.error("Error updating user XP:", updateError)
            return false
        }

        return true
    } catch (error) {
        console.error("Error updating user XP:", error)
        return false
    }
}

/**
 * Checks and updates achievements based on a specific action
 * @param userId The user's ID
 * @param actions
 * @returns Success status
 */
export async function checkAndUpdateAchievements(
    userId: string,
    actions: { type: string; value: number }[]
): Promise<boolean> {
    if (!userId || actions.length === 0) return false;

    try {
        const actionTypes = actions.map(a => a.type);

        const {data: achievements, error: achievementsError} = await supabase
            .from('achievements')
            .select('id, requirement_type, requirement_value')
            .in('requirement_type', actionTypes);

        if (achievementsError || !achievements) {
            console.error('Error fetching achievements:', achievementsError);
            return false;
        }

        const achievementIds = achievements.map(a => a.id);

        const {data: userAchievements, error: userAchievementsError} = await supabase
            .from('user_achievements')
            .select('id, achievement_id, progress, is_unlocked, unlocked_at')
            .eq('user_id', userId)
            .in('achievement_id', achievementIds);

        if (userAchievementsError) {
            console.error('Error fetching user achievements:', userAchievementsError);
            return false;
        }

        const userAchievementMap = new Map();
        if (userAchievements) {
            userAchievements.forEach(ua => userAchievementMap.set(ua.achievement_id, ua));
        }

        const updates = [];

        for (const achievement of achievements) {
            const matchingAction = actions.find(a => a.type === achievement.requirement_type);
            if (!matchingAction) continue;

            const userAchievement = userAchievementMap.get(achievement.id);
            if (userAchievement && userAchievement.is_unlocked) continue;

            let newProgress = matchingAction.value;

            if (userAchievement) {
                if (Object.values(REQUIREMENT_TYPES).includes(matchingAction.type)) {
                    newProgress = (userAchievement.progress || 0) + matchingAction.value;
                } else if (['streak_days', 'streak'].includes(matchingAction.type)) {
                    newProgress = Math.max(userAchievement.progress || 0, matchingAction.value);
                }
            }

            const isUnlocked = newProgress >= achievement.requirement_value;
            const unlockedAt = isUnlocked && !(userAchievement?.is_unlocked) ? new Date().toISOString() : userAchievement?.unlocked_at || null;

            updates.push({
                user_id: userId,
                achievement_id: achievement.id,
                progress: newProgress,
                is_unlocked: isUnlocked,
                unlocked_at: unlockedAt,
            });

            if (isUnlocked) {
                await updateUserXP(userId, achievement.id)
            }
        }

        if (updates.length > 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await batchUpdateAchievements(updates);
        }

        return true;
    } catch (error) {
        console.error('Error checking and updating achievements:', error);
        return false;
    }
}


async function batchUpdateAchievements(updates: never[]): Promise<boolean> {
    try {
        const {error} = await supabase
            .from('user_achievements')
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .upsert(updates, {onConflict: ['user_id', 'achievement_id']});

        if (error) {
            console.error('Batch achievement update error:', error);
            return false;
        }

        console.log('Achievements batch updated!');
        return true;
    } catch (error) {
        console.error('Error during batch achievement update:', error);
        return false;
    }
}


/**
 * Gets the next achievements a user should focus on
 * @param userId The user's ID
 * @param limit The number of achievements to return
 * @returns The next achievements to focus on
 */
export async function getNextAchievements(
    userId: string,
    limit: number = 3
): Promise<IUserAchievement[]> {
    if (!userId) return []

    try {
        // Get user achievements that are not unlocked
        const {data, error} = await supabase
            .from("user_achievements")
            .select(`
        *,
        achievement:achievements(*)
      `)
            .eq("user_id", userId)
            .eq("is_unlocked", false)
            .order("progress", {ascending: false})
            .limit(limit)

        if (error) {
            console.error("Error fetching next achievements:", error)
            return []
        }

        return data || []
    } catch (error) {
        console.error("Error getting next achievements:", error)
        return []
    }
}

/**
 * Gets all achievement data
 * @returns List of all achievements
 */
export async function getAllAchievements(): Promise<IAchievement[]> {
    try {
        const {data, error} = await supabase
            .from("achievements")
            .select("*")
            .order("id");

        if (error) {
            console.error("Error fetching achievements:", error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Error getting all achievements:", error);
        return [];
    }
}

/**
 * Gets user achievements with progress
 * @param userId The user's ID
 * @returns List of user achievements with details
 */
export async function getUserAchievements(userId: string): Promise<IUserAchievement[]> {
    if (!userId) return [];

    try {
        // Get all achievements
        const {data: achievements, error: achievementsError} = await supabase
            .from("achievements")
            .select("*")
            .eq('is_show', true)
            .order("id");

        if (achievementsError) {
            console.error("Error fetching achievements:", achievementsError);
            return [];
        }

        // Get user's achievement progress
        const {data: userAchievements, error: userAchievementsError} = await supabase
            .from("user_achievements")
            .select("*")
            .eq("user_id", userId);

        if (userAchievementsError) {
            console.error("Error fetching user achievements:", userAchievementsError);
            return [];
        }

        // Create a map of user achievements by achievement_id
        const userAchievementMap = new Map();
        userAchievements?.forEach(ua => {
            userAchievementMap.set(ua.achievement_id, ua);
        });

        // Combine achievement data with user progress
        const result: IUserAchievement[] = achievements.map(achievement => {
            const userAchievement = userAchievementMap.get(achievement.id) || {
                id: 0,
                user_id: userId,
                achievement_id: achievement.id,
                progress: 0,
                is_unlocked: false,
                unlocked_at: null
            };

            return {
                ...userAchievement,
                achievement
            };
        });

        return result;
    } catch (error) {
        console.error("Error getting user achievements:", error);
        return [];
    }
}

/**
 * Gets all level details
 * @returns List of all levels with details
 */
export async function getAllLevels(): Promise<ILevelDetail[]> {
    try {
        const {data, error} = await supabase
            .from("levels")
            .select("*")
            .order("level_number");

        if (error) {
            console.error("Error fetching levels:", error);
            return [];
        }

        // Add icons to the level data
        const levelDetails: ILevelDetail[] = data.map(level => ({
            ...level,
            icon: getLevelIcon(level.level_number)
        }));

        return levelDetails;
    } catch (error) {
        console.error("Error getting all levels:", error);
        return [];
    }
}

/**
 * Gets user's level progress information
 * @param userId The user's ID
 * @returns User level progress details
 */
export async function getUserLevelProgress(userId: string): Promise<IUserLevelProgress | null> {
    if (!userId) return null;

    try {
        // Get user basic info
        const {data: user, error: userError} = await supabase
            .from("users")
            .select("id, experience_points, level_id")
            .eq("id", userId)
            .single();

        if (userError) {
            console.error("Error fetching user:", userError);
            return null;
        }

        // Get all levels
        const allLevels = await getAllLevels();
        if (allLevels.length === 0) return null;

        // Find current and next level
        const currentLevel = allLevels.find(level => level.id === user.level_id);
        const nextLevelIndex = allLevels.findIndex(level => level.id === user.level_id) + 1;
        const nextLevel = nextLevelIndex < allLevels.length ? allLevels[nextLevelIndex] : null;

        if (!currentLevel) return null;

        // Calculate progress percentage
        const currentXP = user.experience_points;
        const currentLevelXP = currentLevel.experience_required;
        const nextLevelXP = nextLevel ? nextLevel.experience_required : currentLevelXP * 1.5;
        const xpForCurrentLevel = currentXP - currentLevelXP;
        const xpRequiredForNextLevel = nextLevelXP - currentLevelXP;
        const progressPercent = Math.min(100, Math.round((xpForCurrentLevel / xpRequiredForNextLevel) * 100));

        // Determine completed levels
        const completedLevels = allLevels
            .filter(level => level.level_number < currentLevel.level_number)
            .map(level => level.level_number);

        return {
            currentLevel: currentLevel.level_number,
            currentLevelName: currentLevel.name,
            nextLevel: nextLevel ? nextLevel.level_number : currentLevel.level_number,
            nextLevelName: nextLevel ? nextLevel.name : currentLevel.name,
            progressPercent,
            currentXP,
            requiredXP: nextLevelXP,
            allLevels,
            completedLevels
        };
    } catch (error) {
        console.error("Error getting user level progress:", error);
        return null;
    }
}

/**
 * Helper function to get level icon based on level number
 * @param levelNumber The level number
 * @returns Icon name for the level
 */
function getLevelIcon(levelNumber: number): string {
    // Map level numbers to appropriate icons
    // You can customize these based on your preference
    const iconMap: Record<number, string> = {
        1: "Coffee",
        2: "CupSoda",
        3: "Brain",
        4: "Calendar",
        5: "Globe",
        6: "Activity",
        7: "Coffee",
        8: "Fuel",
        9: "Brain",
        10: "Coffee",
        11: "Zap",
        12: "Link",
        13: "Grid",
        14: "Brain",
        15: "Fuel",
        16: "HandRock",
        17: "Calendar",
        18: "Coffee",
        19: "Brain",
        20: "Coffee",
        21: "Brain",
        22: "HandRock",
        23: "Grid",
        24: "Trophy",
        25: "Coffee",
        26: "HandRock",
        27: "Calendar",
        28: "Brain",
        29: "Award",
        30: "Crown"
    };

    return iconMap[levelNumber] || "Coffee";
}


/**
 * Grants 25 XP to the user after any valid activity (buy-coffee, trivia, bingo, etc.)
 * @param user
 * @param amount Optional custom XP amount (defaults to 25)
 */
export async function addXpForTransaction(user: IUser, amount: number = 10): Promise<boolean> {
    try {
        const newXP = (user.experience_points || 0) + amount;
        let newLevelId = user.level_id;

        // Check next level
        const {data: nextLevel} = await supabase
            .from("levels")
            .select("id, experience_required")
            .gt("id", user.level_id)
            .order("id", {ascending: true})
            .limit(1)
            .single();

        if (nextLevel && newXP >= nextLevel.experience_required) {
            newLevelId = nextLevel.id;
        }

        // Update user XP and level
        const {error: updateError} = await supabase
            .from("users")
            .update({
                experience_points: newXP,
                level_id: newLevelId,
            })
            .eq("id", user.id);

        if (updateError) {
            console.error("Error updating XP after transaction:", updateError);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Unexpected error adding XP for transaction:", error);
        return false;
    }
}
