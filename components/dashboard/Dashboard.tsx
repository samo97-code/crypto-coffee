'use client'
import React, {FC, useEffect, useState} from 'react';
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import ProjectsSection from "@/components/dashboard/ProjectsSection";
import WalletInfo from "@/components/dashboard/WalletInfo";
import SidebarActivitiesCard from "@/components/dashboard/SidebarActivitiesCard";
import {IProject} from "@/types";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";

interface IProps {
    projects: IProject[];
    dailySupporters: number
    totalSupporters: number
    price: number
    change24h: string
}

const Dashboard: FC<IProps> = ({projects, price, change24h, dailySupporters, totalSupporters}) => {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 0)
    }, []);

    return (
        <>
            {
                loader ? <CoffeeLoader/> :
                    <main className="max-w-[1440px] mx-auto px-4 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1">
                                <WelcomeSection
                                    price={price}
                                    change24h={change24h}
                                    dailySupporters={dailySupporters}
                                    totalSupporters={totalSupporters}
                                />
                                {/*<WelcomeSection1*/}
                                {/*    price={price}*/}
                                {/*    change24h={change24h}*/}
                                {/*    dailySupporters={dailySupporters}*/}
                                {/*    totalSupporters={totalSupporters}*/}
                                {/*/>*/}
                                <ProjectsSection projects={projects}/>
                            </div>

                            <div className="w-full lg:w-80 space-y-6 sticky top-5">
                                <WalletInfo projects={projects}/>
                                <SidebarActivitiesCard/>
                                {/*<TimerCard/>*/}
                            </div>
                        </div>
                    </main>
            }
        </>
    );
};

export default Dashboard;
