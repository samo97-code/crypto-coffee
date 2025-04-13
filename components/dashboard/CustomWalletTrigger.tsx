'use client';

import React, {FC} from 'react';
import {useConnectModal} from '@rainbow-me/rainbowkit';
import {Button} from "@/components/ui/button";

interface IProps {
    color: string
}

const CustomWalletTrigger: FC<IProps> = ({color}) => {
    const {openConnectModal} = useConnectModal();

    const handleConnect = () => {
        if (openConnectModal) openConnectModal();
    };

    return (
        <div>
            <Button onClick={handleConnect} className={`min-h-10 w-full text-white ${color} `}>
                Connect Wallet
            </Button>
        </div>
    );
}

export default CustomWalletTrigger
