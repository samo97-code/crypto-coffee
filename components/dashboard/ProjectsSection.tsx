'use client'

import React, {FC, useEffect, useMemo, useState} from 'react';
import CoffeeSuccessModal from "@/components/modal/CoffeeSuccessModal";
import {IProject} from "@/types";
import WowCard from "@/components/dashboard/WowCard";
import {CreativeNetworkTabs} from "@/components/CreativeTabs";
import {useAppSelector} from "@/store/hook";

interface IProps {
    projects: IProject[]
}

const ProjectSection: FC<IProps> = ({projects}) => {
    const {searchedProject} = useAppSelector(state => state.project);
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

    const filteredProjects = useMemo(() => {
        let result = projects;

        // 1. Filter by active tab
        if (activeTab !== 'all') {
            result = result.filter(
                (item) => item.blockchain_networks[0].type === activeTab
            );
        }

        // 2. Filter by search term
        if (searchedProject) {
            result = result.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchedProject.toLowerCase())
            );
        }

        return result;
    }, [projects, activeTab, searchedProject]);


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
                            <CreativeNetworkTabs counts={{all: 18, mainnet: 16, testnet: 2}}
                                                 onTabChange={setActiveTab}/>
                        </div>
                    </div>

                    <div
                        className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"/>
                </div>
            </div>

            {filteredProjects.length ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {filteredProjects.map((project: IProject) => {
                        return <div key={project.id}>
                            <WowCard
                                ethPrice={ethPrice}
                                project={project}
                                setShowSuccessModal={setShowSuccessModal}
                                setCurrentBuyedCoffee={setCurrentBuyedCoffee}
                            />
                        </div>
                    })}
                </div>
                : <p className="flex justify-center text-coffee-800 font-semibold text-xl capitalize">Your search burned more gas than results.</p>
            }

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
