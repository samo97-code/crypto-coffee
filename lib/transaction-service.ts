import {supabase} from "@/lib/supabase"
import {recordStreakActivity} from "./streak-service"
import {ITransaction} from "@/types";


/**
 * Creates a support transaction and updates the user's streak
 * @returns The created transaction
 * @param userId
 */
export async function updateTxTotalAmount(userId:string) {
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
