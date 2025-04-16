'use client'

import React, {FC, useEffect, useMemo, useState} from 'react';
import CoffeeSuccessModal from "@/components/modal/CoffeeSuccessModal";
import {IProject} from "@/types";
import WowCard from "@/components/dashboard/WowCard";
import {CreativeNetworkTabs} from "@/components/CreativeTabs";

interface IProps {
    projects: IProject[]
}

const ProjectSection: FC<IProps> = ({projects}) => {
    const [ethPrice, setEthPrice] = useState(0);
    const [activeTab, setActiveTab] = useState("all");
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [currentBuyedCoffee, setCurrentBuyedCoffee] = useState({
        name: '',
        amount: '',
        explorerUrl: '',
        hash: ''
    })

    useEffect(() => {
        fetchEthPrice()
    }, []);

    const currentProjects = useMemo(() => {
        if (activeTab === 'all') return projects

        return projects.filter((item:IProject) => item.blockchain_networks[0].type === activeTab)
    }, [activeTab]);


    const fetchEthPrice = async () => {
        try {
            const res = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
                {cache: 'no-store'}
            );

            if (!res.ok) {
                throw new Error('Failed to fetch ETH price');
            }

            const data = await res.json();
            setEthPrice(data.ethereum.usd)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="mt-12">
            <div className="mb-8">
                <div className="relative">
                    <div className="flex justify-center overflow-x-auto pb-2 hide-scrollbar mt-6">
                        <div className="flex space-x-2 px-1">
                            <CreativeNetworkTabs counts={{ all: 18, mainnet: 16, testnet: 2 }} onTabChange={setActiveTab} />

                            {/*{dashboardTabs.map((tab) => (*/}
                            {/*    <button*/}
                            {/*        key={tab.value}*/}
                            {/*        onClick={() => setActiveTab(tab.value)}*/}
                            {/*        className={`relative group flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${*/}
                            {/*            activeTab === tab.value*/}
                            {/*                ? "text-white shadow-lg scale-105"*/}
                            {/*                : "text-amber-900 bg-white hover:bg-amber-50"*/}
                            {/*        }`}*/}
                            {/*    >*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <tab.icon*/}
                            {/*                className={`h-5 w-5 ${activeTab === tab.value ? "text-coffee-900" : "text-coffee-800"}`}/>*/}
                            {/*            <span*/}
                            {/*                className="text-coffee-800 ml-2 font-medium text-lg whitespace-nowrap">{tab.label}</span>*/}
                            {/*        </div>*/}

                            {/*        <div*/}
                            {/*            className={`ml-2 px-2 py-0.5 rounded-full text-sm font-medium ${*/}
                            {/*                activeTab === tab.value ? "bg-coffee-400 text-coffee-900" : "bg-coffee-200 text-coffee-800"*/}
                            {/*            }`}*/}
                            {/*        >*/}
                            {/*            {tab.count}*/}
                            {/*        </div>*/}

                            {/*    </button>*/}
                            {/*))}*/}
                        </div>
                    </div>

                    <div
                        className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-50 to-transparent pointer-events-none"/>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {currentProjects.map((project: IProject) => {
                    return <div key={project.id}>
                        <WowCard
                            ethPrice={ethPrice}
                            project={project}
                            setShowSuccessModal={setShowSuccessModal}
                            setCurrentBuyedCoffee={setCurrentBuyedCoffee}
                        />
                        {/*<NetworkCard*/}
                        {/*    ethPrice={ethPrice}*/}
                        {/*    project={project}*/}
                        {/*    setShowSuccessModal={setShowSuccessModal}*/}
                        {/*    setCurrentBuyedCoffee={setCurrentBuyedCoffee}*/}
                        {/*/>*/}
                    </div>
                })}
            </div>

            <CoffeeSuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                projectName={currentBuyedCoffee.name}
                amount={currentBuyedCoffee.amount}
                txHash={currentBuyedCoffee.hash}
                explorerUrl={`${currentBuyedCoffee.explorerUrl}tx/${currentBuyedCoffee.hash}`}
            />
        </div>
    );
};

export default ProjectSection;
