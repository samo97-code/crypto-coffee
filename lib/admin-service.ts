import {supabase} from "@/lib/supabase";

export async function getUserWinPercentages(activityId: number) {
    try {
        const {data, error} = await supabase
            .rpc('calculate_win_percentages', {
                activity_id_param: activityId
            });

        if (error) {
            console.error('Batch achievement update error:', error);
            return false;
        }

        return data;
    } catch (error) {
        console.error('Error during batch achievement update:', error);
        return false;
    }
}
