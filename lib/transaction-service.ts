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
            usd_value: 0.05, // USD value per coffee (or it must be static 0.05$ or token price * token amount.)
            type: "support",
            activity_type: "Bought Coffee",
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
 * Creates a support transaction and updates the user's streak
 * @param userId The user's ID
 * @param projectId The project being supported
 * @param networkName The network name
 * @param hash The tx hash
 * @param amount The amount of the transaction
 * @param usd_value
 * @param type
 * @param activity_type
 * @param status
 * @returns The created transaction
 */
export async function createActivityTransaction(
    userId: string,
    projectId: number | undefined,
    networkName: string,
    hash: string,
    amount: string,
    usd_value: number,
    type: string,
    activity_type: string,
    status: string,
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
            usd_value: usd_value, // USD value per coffee (or it must be static 0.05$ or token price * token amount.)
            type: type,
            activity_type: activity_type,
            status: status, // For demo purposes, we'll mark it as completed immediately
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
 * Creates a support transaction and updates the user's streak
 * @returns The created transaction
 * @param transactionId
 * @param updateData
 */
export async function updateActivityTransaction(
    transactionId: number, // The ID of the transaction to update
    updateData: {
        network_name?: string,
        transaction_hash?: string,
        amount?: string,
        usd_value?: number,
        type?: string,
        status?: string,
    }
) {
    await supabase.rpc('update_transaction_status', {
        tx_id: transactionId,
        new_status: updateData.status
    })
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


export const recordGameOutcome = async (userId: string, activityId: number, result: number, transactionId: number | null) => {
    try {
        // Map the game result to the database outcome type
        const outcomeType = result === 1 ? "win" : result === 2 ? 'lose' : 'tie';

        // Record in the activity_completions table
        const {error} = await supabase
            .from('activity_completions')
            .insert({
                user_id: userId,
                activity_id: activityId, // Define this constant
                status: 'completed',
                outcome_type: outcomeType,
                transaction_id: transactionId
            });

        if (error) throw error;

        // Additional logic like updating streaks, awarding points, etc.
    } catch (err) {
        console.error('Failed to record game outcome:', err);
    }
};

/**
 * Handles post-transaction logic such as achievements and streaks
 * @param userId
 * @param transaction
 */
export async function handlePostTransactionUpdate(userId: string, transaction: ITransaction) {
    if (!userId || !transaction) return;

    if (!userId || !transaction) return;

    const {usd_value} = transaction;

    // Trigger achievements
    await checkAndUpdateAchievements(userId, [
        {type: 'total_support', value: usd_value},
        {type: 'projects_supported', value: 1},

        //TODO they not working correct
        {type: 'repeat_support', value: 1},
        {type: 'single_support', value: usd_value},
        {type: 'networks_supported', value: 1},
        {type: 'unique_chains', value: 1},
    ]);
}

/**
 * Tracks trivia interaction
 */
// export async function handleTriviaAnswer(userId: string, isCorrect: boolean) {
//     if (!userId) return;
//
//     if (isCorrect) {
//         await checkAndUpdateAchievements(userId, "trivia_correct", 1);
//         await checkAndUpdateAchievements(userId, "trivia_streak", 1);
//     } else {
//         // Optional: reset trivia streak
//     }
// }

/**
 * Tracks daily login or activity interaction
 */
// export async function handleDailyActivity(userId: string) {
//     if (!userId) return;
//
//     await checkAndUpdateAchievements(userId, "daily_streak", 1);
//     await checkAndUpdateAchievements(userId, "daily_activities", 1);
//
//     // Optional: for logging in to reveal the joke
//     await checkAndUpdateAchievements(userId, "jokes_revealed", 1);
// }

export async function getWebsiteTxStats() {
    // Get all transactions
    const {data, error} = await supabase
        .from('transactions')
        .select('*')
        .eq('status', 'completed')
        .order('created_at', {ascending: false});

    if (error) {
        console.error("Error fetching transactions:", error)
        throw error;
    }

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentTxs = data.filter(tx => {
        const txDate = new Date(tx.created_at);
        return txDate >= oneDayAgo;
    });

    return {
        totalTx: data.length || 0,
        dailyTx: recentTxs.length || 0,
    };
}
