import RockPaperScissorsWrapper from "@/components/activities/games/RockPaperScissorsWrapper";
import {supabase} from "@/lib/supabase";


const RockPaperScissorsGame = async () => {
    const {projects} = await fetchProjects() as never

    return (
        <RockPaperScissorsWrapper projects={projects}/>
    )
}

export default RockPaperScissorsGame


async function fetchProjects() {
    try {
        const {data: projects} = await supabase.from('projects')
            .select('*, blockchain_networks(chain_id, chain_key,explorer_url, type)')
            .in('name', ["Arbitrum", "Optimism"])
            .order('name', {ascending: true})
        return {projects: projects};
    } catch (err) {
        console.error('Fetch Error:', err);
        return null; // Fallback clearly
    }
}
