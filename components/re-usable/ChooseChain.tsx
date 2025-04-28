import React, {FC} from 'react';
import Image from "next/image";
import {IProject} from "@/types";
import {useAccount} from "wagmi";
import {useSwitchChain} from "wagmi";

interface IProps {
    projects: IProject[]
}

const ChooseChain: FC<IProps> = ({projects}) => {
    const {chainId} = useAccount();
    const {switchChain} = useSwitchChain();

    const changeChain = (item: IProject) => {
        switchChain({chainId: item?.blockchain_networks[0].chain_id});
    }

    return (
        <div className="mb-2">
            <h3 className="text-coffee-700 font-medium mb-0.5">Choose chain</h3>
            <ul className="flex items-center gap-2">
                {projects.map((project) => {
                    return <li key={project.id}
                               onClick={() => changeChain(project)}
                               className={`${project.blockchain_networks[0].chain_id === chainId ? 'bg-coffee-800 dark:bg-coffee-50/50' : ''} flex items-center gap-1 cursor-pointer border border-coffee-200 dark:border-coffee-600/50 rounded-md px-2 py-1`}
                    >
                        <div className="relative rounded-full min-w-5 min-h-5">
                            <Image src={project.icon_url || "/placeholder.svg"} alt={project.name} fill
                                   className="rounded-full"/>
                        </div>
                        <span
                            className={`${project.blockchain_networks[0].chain_id === chainId ? 'text-white' : 'text-coffee-900'} text-sm `}>{project.name}</span>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default ChooseChain;
