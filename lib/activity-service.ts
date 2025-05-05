import {supabase} from "@/lib/supabase"
import {IActivity, IActivityCompletion, IDailyActivity, ITransaction} from "@/types";


export async function getAllActivities(): Promise<IDailyActivity[]> {
    try {
        const {data, error} = await supabase
            .from("daily_activities")
            .select("*")
            .eq("is_active", true)
            .order("id", {ascending: true})

        if (error) {
            console.error("Error fetching achievements:", error)
            return []
        }

        return data
    } catch (error) {
        console.error("Error in getUserRecentActivities:", error)
        return []
    }
}


/**
 * Gets recent activities for a user
 * @param userId The user's ID
 * @param limit The maximum number of activities to return
 * @returns The user's recent activities
 */
export async function getUserRecentActivities(userId: string, limit = 5): Promise<IActivity[]> {
    if (!userId) return []

    try {
        // Fetch recent transactions (support activities)
        const {data: transactions, error: transactionsError} = await supabase
            .from("transactions")
            .select(`
        id,
        type,
        amount,
        status,
        created_at,
        transaction_hash,
        projects (
          id,
          name,
          chain,
          icon_url,
          blockchain_networks (
            explorer_url,
            chain_key
          )
        )
        )
      `)
            .eq("user_id", userId)
            .eq("status", "completed")
            .order("created_at", {ascending: false})
            .limit(limit)

        if (transactionsError) {
            console.error("Error fetching transactions:", transactionsError)
            return []
        }

        // Fetch recent activity completions
        const {data: activities, error: activitiesError} = await supabase
            .from("activity_completions")
            .select(`
        id,
        completed_at,
        activity:daily_activities (
          id,
          name,
          icon_name,
          icon_bg,
          icon_color
        )
      `)
            .eq("user_id", userId)
            .order("completed_at", {ascending: false})
            .limit(limit)

        if (activitiesError) {
            console.error("Error fetching activity completions:", activitiesError)
            return []
        }

        // Transform transactions into activities
        const transactionActivities: IActivity[] = (transactions as unknown as ITransaction[] || []).map((transaction) => ({
            id: transaction.id,
            type: transaction.type,
            title: transaction.type === 'support' ? "Bought Coffee" : transaction.type === 'activity' ? 'Completed Daily Activity' : transaction.type === 'claim_reward' ? 'Claimed Activity Reward' : '',
            description: transaction.type === 'support' ? `You bought a crypto coffee with ${transaction.amount} ${transaction.projects?.blockchain_networks[0].chain_key} in ${transaction.projects?.name}.` : transaction.type === 'activity' ? `Game played with ${transaction.amount.toFixed(6)} ${transaction.projects?.blockchain_networks[0].chain_key} in ${transaction.projects?.name}` : transaction.type === 'claim_reward' ? `Reward claimed ${transaction.amount} ${transaction.projects?.blockchain_networks[0].chain_key} in ${transaction.projects?.name}` : '',
            icon: transaction.type === 'support' ? "Coffee" : transaction.type === 'activity' ? 'Gamepad' : transaction.type === 'claim_reward' ? 'Award' : '',
            icon_bg: "bg-gradient-to-r from-coffee-500 to-coffee-700 dark:from-coffee-200/30 dark:to-coffee-100/50",
            icon_color: "text-white",
            amount: +transaction.amount.toFixed(6),
            chain_key: transaction.projects?.blockchain_networks[0].chain_key,
            explorer_url: transaction.projects?.blockchain_networks[0].explorer_url + `/tx/${transaction.transaction_hash}`,
            hash: transaction.transaction_hash,
            timestamp: transaction.created_at,
            project_id: transaction.projects?.id,
            project_name: transaction.projects?.name,
            project_chain: transaction.projects?.chain,
            project_icon: transaction.projects?.icon_url,
        }))

        // Transform activity completions into activities
        // const activityCompletionActivities: IActivity[] = (activities as unknown as IActivityCompletion[] || [])
        //     .filter((a) => a.activity && a.completed_at)
        //     .map((activity) => ({
        //         id: activity.id,
        //         type: "activity",
        //         title: "Completed Daily Activity",
        //         description: `You played the ${activity.activity?.name}.`,
        //         icon: activity.activity?.icon_name || "Zap",
        //         icon_bg: activity.activity?.icon_bg || "bg-gradient-to-r from-purple-500 to-violet-500",
        //         icon_color: activity.activity?.icon_color || "text-white",
        //         timestamp: activity.completed_at || "",
        //         project_id: undefined,
        //         project_name: undefined,
        //         project_chain: undefined,
        //         project_icon: undefined,
        //     }))

        // Combine all activities and sort by timestamp
        const allActivities = [...transactionActivities].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )

        // Return the most recent activities
        return allActivities.slice(0, limit)
    } catch (error) {
        console.error("Error in getUserRecentActivities:", error)
        return []
    }
}

/**
 * Format a timestamp into a human-readable relative time
 * @param timestamp The timestamp to format
 * @returns A human-readable relative time string
 */
export function formatRelativeTime(timestamp: string): string {
    const now = new Date()
    const date = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
        return "just now"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) {
        return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`
    }

    const diffInYears = Math.floor(diffInDays / 365)
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`
}
