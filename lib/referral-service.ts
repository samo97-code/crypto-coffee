import {supabase} from "@/lib/supabase";
import {IUser} from "@/types";


/**
 * Gets recent activities for a user
 * @param limit The maximum number of activities to return
 * @returns The user's recent activities
 */
export async function getTopReferrers(limit = 10) {
    const {data, error} = await supabase
        .from("users")
        .select(`
      id,
      wallet_address,
      referrals:referrals!referrals_inviter_id_fkey(id)
    `);

    if (error) {
        console.error("Error fetching top referrers:", error);
        return [];
    }

    return (data || [])
        .map(user => ({
            id: user.id,
            wallet_address: user.wallet_address,
            total_referrals: user.referrals?.length || 0
        }))
        .filter(user => user.total_referrals > 0)
        .sort((a, b) => b.total_referrals - a.total_referrals)
        .slice(0, limit);
}


/**
 * Gets recent activities for a user
 * @returns The user's recent activities
 * @param wallet
 */
export async function getCurrentUserReferrers(wallet: string) {
    const {data:user, error} = await supabase
        .from("users")
        .select(`
      id,
      wallet_address,
      referrals:referrals!referrals_inviter_id_fkey(id)
    `)
        .eq("wallet_address", wallet)
        .single()

    if (error) {
        console.error("Error fetching top referrers:", error);
        return [];
    }

    return {
        id: user.id,
        wallet_address: user.wallet_address,
        total_referrals: user.referrals?.length || 0
    }
}


/**
 * Gets recent activities for a user
 * @returns The user's recent activities
 * @param user
 * @param earningAmount
 */
export async function saveReferrerEarnings(user: IUser, earningAmount: number) {
    await supabase.from("referral_earnings").insert({
        referrer_id: user.referred_by,
        referred_user_id: user.id,
        amount_earned: earningAmount
    });
}

/**
 * Gets recent activities for a user
 * @returns The user's recent activities
 * @param inviterId
 */
export async function getReferralEarnings(inviterId: string): Promise<number> {
    // fetch all earnings rows for this inviter
    const { data, error } = await supabase
        .from("referral_earnings")
        .select("amount_earned")
        .eq("referrer_id", inviterId);

    if (error) {
        console.error("Error loading referral earnings:", error);
        return 0;
    }

    // sum them on the client
    return data
        .map((row) => parseFloat(String(row.amount_earned as number)) || 0)
        .reduce((acc, v) => acc + v, 0);
}


/**
 * Gets recent activities for a user
 * @returns The user's recent activities
 * @param userId
 * @param page
 * @param pageSize
 */
export async function getUserWithdrawals(userId: string,  page: number = 1, pageSize: number = 5) {
    try {
        const offset = (page - 1) * pageSize

        const { data, error } = await supabase
            .from('withdrawals')
            .select('*')
            .eq('user_id', userId)
            .order('processed_at', { ascending: false })
            .range(offset, offset + pageSize - 1)

        if (error) {
            console.error('Error fetching withdrawals:', error);
            throw error;
        }

        // Get total count for pagination
        const countQuery = supabase
            .from('withdrawals')
            .select('*', {count: 'exact', head: true})
            .eq('user_id', userId)

        const {count, error: countError} = await countQuery

        if (countError) throw countError

        return {
            withdrawals: data,
            pagination: {
                total: count || 0,
                page,
                pageSize,
                totalPages: Math.ceil((count || 0) / pageSize)
            }
        };
    } catch (error) {
        console.error('Failed to fetch withdrawals:', error);
        throw error;
    }
}
