import {supabase} from "@/lib/supabase"
import {recordStreakActivity} from "./streak-service"
import {ITransaction} from "@/types";
import {checkAndUpdateAchievements} from "@/lib/acheivements-service";


/**
 * Creates a support transaction and updates the user's streak
 * @returns The created transaction
 * @param userId
 */
export async function updateTxTotalAmount(userId: string) {
    const {data: totalRes} = await supabase
        .from('transactions')
        .select('usd_value')
        .eq('user_id', userId)
        .eq('status', 'completed');

    const totalUsd = totalRes?.reduce((sum, tx) => sum + Number(tx.usd_value || 0), 0) || 0;

    await supabase
        .from('users')
        .update({total_supported_amount: totalUsd.toFixed(3)})
        .eq('id', userId);
}


/**
 * Creates a support transaction and updates the user's streak
 * @param userId The user's ID
 * @param projectId The project being supported
 * @param networkName The network name
 * @param hash The tx hash
 * @param amount The amount of the transaction
 * @returns The created transaction
 */
export async function createSupportTransaction(
    userId: string,
    projectId: number,
    networkName: string,
    hash: string,
    amount: string,
): Promise<ITransaction | null> {
    // Create the transaction
    const {data, error} = await supabase
        .from("transactions")
        .insert({
            user_id: userId,
            project_id: projectId,
            network_name: networkName,
            transaction_hash: hash,
            amount,
            usd_value: 0.045, // USD value per coffee (or it must be static 0.045$ or token price * token amount.)
            type: "support",
            status: "completed", // For demo purposes, we'll mark it as completed immediately
        })
        .select()
        .single()

    if (error) {
        console.error("Error creating transaction:", error)
        return null
    }

    // Record the streak activity
    await recordStreakActivity(userId)

    return data
}

/**
 * Gets the user's transaction history
 * @param userId The user's ID
 * @param limit The maximum number of transactions to return
 * @returns The user's transaction history
 */
export async function getUserTransactions(userId: string, limit = 10): Promise<ITransaction[]> {
    const {data, error} = await supabase
        .from("transactions")
        .select(`
      *,
      projects (
        name,
        icon_url
      )
    `)
        .eq("user_id", userId)
        .order("created_at", {ascending: false})
        .limit(limit)

    if (error) {
        console.error("Error fetching transactions:", error)
        return []
    }

    return data || []
}

/**
 * Handles post-transaction logic such as achievements and streaks
 * @param userId
 * @param transaction
 */
export async function handlePostTransactionUpdate(userId: string, transaction: ITransaction) {
    if (!userId || !transaction) return;

    // const { usd_value, project_id, network_name } = transaction;
    const {usd_value} = transaction;

    // Total spent in USD
    await checkAndUpdateAchievements(userId, "total_support", usd_value);

    // Number of times coffee was bought
    await checkAndUpdateAchievements(userId, "projects_supported", 1);

    // Buying on new chain (assume unique check inside the function)
    await checkAndUpdateAchievements(userId, "networks_supported", 1);
    await checkAndUpdateAchievements(userId, "unique_chains", 1);

    // Single transaction value check (e.g., $50+)
    await checkAndUpdateAchievements(userId, "single_support", usd_value);

    // Track repeat support (e.g., same chain streaks)
    await checkAndUpdateAchievements(userId, "repeat_support", 1);

    // Streak activity update
    await recordStreakActivity(userId);
}

/**
 * Tracks trivia interaction
 */
export async function handleTriviaAnswer(userId: string, isCorrect: boolean) {
    if (!userId) return;

    if (isCorrect) {
        await checkAndUpdateAchievements(userId, "trivia_correct", 1);
        await checkAndUpdateAchievements(userId, "trivia_streak", 1);
    } else {
        // Optional: reset trivia streak
    }
}

/**
 * Tracks daily login or activity interaction
 */
export async function handleDailyActivity(userId: string) {
    if (!userId) return;

    await checkAndUpdateAchievements(userId, "daily_streak", 1);
    await checkAndUpdateAchievements(userId, "daily_activities", 1);

    // Optional: for logging in to reveal the joke
    await checkAndUpdateAchievements(userId, "jokes_revealed", 1);
}
