'use client'
import React, {FC} from 'react';
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import ProjectsSection from "@/components/dashboard/ProjectsSection";
import WalletInfo from "@/components/dashboard/WalletInfo";
import SidebarActivitiesCard from "@/components/dashboard/SidebarActivitiesCard";
import {IProject} from "@/types";

interface IProps {
    projects: IProject[];
}

const Dashboard: FC<IProps> = ({projects}) => {
    return (
        <main className="max-w-[1440px] mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <WelcomeSection />
                    <ProjectsSection projects={projects}/>
                </div>

                <div className="w-full lg:w-80 space-y-6 sticky top-5">
                    <WalletInfo projects={projects}/>
                    <SidebarActivitiesCard/>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
