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
