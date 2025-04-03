import React from "react";
import {WalletInfo} from "@/components/dashboard/WalletInfo"
import {TimerCard} from "@/components/dashboard/TimerCard"
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import SidebarActivitiesCard from "@/components/dashboard/SidebarActivitiesCard";
import ProjectsSection from "@/components/dashboard/ProjectsSection";


const Dashboard = async() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {price, change24h} = await fetchBitcoinPrice();

    return (
        <main className="max-w-[1440px] mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <WelcomeSection price={price} change24h={change24h}/>
                    <ProjectsSection/>
                </div>

                <div className="w-full lg:w-80 space-y-6">
                    <WalletInfo/>
                    <SidebarActivitiesCard/>
                    <TimerCard/>
                </div>
            </div>
        </main>
    )
}

export default Dashboard


async function fetchBitcoinPrice() {
    try {
        const res = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
            {
                next: { revalidate: 60 }, // clearly cache response for 60 seconds
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


