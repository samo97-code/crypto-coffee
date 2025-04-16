export const dynamic = 'force-dynamic';
import React from "react";
import {supabase} from "@/lib/supabase";
import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage = async () => {
    const {price, change24h} = await fetchBitcoinPrice() as never;

    const {projects} = await fetchProjects() as never

    const {dailySupporters, totalSupporters} = await getDailySupportersStats()

    return (
        <Dashboard
            price={price}
            change24h={change24h}
            projects={projects}
            dailySupporters={dailySupporters}
            totalSupporters={totalSupporters}
        />
    )
}

export default DashboardPage

async function getDailySupportersStats() {
    try {
        // Single query using our custom RPC function
        const {data, error} = await supabase.rpc('get_supporters_stats');

        if (error) {
            console.error('Error fetching supporter stats:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getDailySupportersStats:', error);
        return null;
    }
}


async function fetchProjects() {
    try {
        const {data: projects} = await supabase.from('projects').select('*, blockchain_networks(chain_id, chain_key,explorer_url, type)').order('name', {ascending: true})
        return {projects: projects};
    } catch (err) {
        console.error('Fetch Error:', err);
        return null; // Fallback clearly
    }
}

async function fetchBitcoinPrice() {
    try {
        const res = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
            {
                next: {revalidate: 60}, // clearly cache response for 60 seconds
            }
        );

        if (!res.ok) {
            throw new Error(`API response error: ${res.status}`);
        }

        const data = await res.json();
        return {
            price: data.bitcoin.usd,
            change24h: data.bitcoin.usd_24h_change.toFixed(2),
        };
    } catch (err) {
        console.error('Fetch Error:', err);
        return null; // Fallback clearly
    }
}


