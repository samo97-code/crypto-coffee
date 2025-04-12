'use client'

import React, {FC} from "react";
import {WriteContractData} from "@wagmi/core/query";
import Image from "next/image"
import BuyButton from "@/components/dashboard/card/BuyButton";
import {Badge} from "@/components/ui/badge"
import {INetworkCard} from "@/types";

interface IProps {
    ethPrice: number
    project: INetworkCard
    setShowSuccessModal: (b: boolean) => void
    setCurrentBuyedCoffee: (b: { explorerUrl: string; name: string; amount: string ,hash: WriteContractData }) => void,
}

const NetworkCard: FC<IProps> = ({ethPrice,project,setShowSuccessModal, setCurrentBuyedCoffee}) => {
    return (
        <>
            <div
                className="bg-white border border-coffee-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">

                <div className='p-5'>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative min-w-10 min-h-10">
                            <Image src={project.icon || "/placeholder.svg"} alt={project.name} fill
                                   className="rounded-full"/>
                        </div>
                        <div>
                            <div className="flex items-center gap-4">
                                <h3 className="font-bold text-lg text-coffee-900 truncate">{project.name}</h3>
                                {project.isNew && (
                                    <Badge variant="secondary" className="bg-coffee-200 text-[10px] px-1.5 py-0.5">
                                        New
                                    </Badge>
                                )}
                            </div>
                            {project.description &&
                                <div className="text-xs text-coffee-600 font-medium truncate">{project.description}</div>}
                        </div>
                    </div>

                    <BuyButton
                        ethPrice={ethPrice}
                        project={project}
                        setShowSuccessModal={setShowSuccessModal}
                        setCurrentBuyedCoffee={setCurrentBuyedCoffee}
                    />
                </div>
            </div>

        </>
    )
}

export default NetworkCard
