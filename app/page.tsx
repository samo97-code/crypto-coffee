export const revalidate = 300; // ✅ cache page for 5 minutes
import React from "react";
import {supabase} from "@/lib/supabase";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata = {
    title: 'Crypto Coffee',
    description: 'Track your daily blockchain support, activity streaks, and rewards.',
};

const DashboardPage = async () => {
    const {projects} = await fetchProjects() as never

    return (
        <Dashboard projects={projects}/>
    )
}

export default DashboardPage


async function fetchProjects() {
    try {
        const {data: projects} = await supabase.from('projects').select('*, blockchain_networks(chain_id, chain_key,explorer_url, type)').order('name', {ascending: true})
        return {projects: projects};
    } catch (err) {
        console.error('Fetch Error:', err);
        return null; // Fallback clearly
    }
}


