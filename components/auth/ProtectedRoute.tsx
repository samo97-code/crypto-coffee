// components/auth/ProtectedRoute.tsx
'use client'

import React, {FC, useEffect} from 'react';
import {useAccount} from 'wagmi';
import {useAdmin} from '@/hooks/useAdmin';
import {usePathname, useRouter} from 'next/navigation';
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";

// import CustomWalletTrigger from '@/components/dashboard/CustomWalletTrigger';

interface IProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: FC<IProps> = ({children, requireAdmin = false}) => {
    const {isConnected, address} = useAccount();
    const {isAdmin} = useAdmin();
    const router = useRouter();
    const path = usePathname()
    const adminWallet = '0xCEE870Bd19008D5C3A230C2803c0A94E92803a34'

    const whiteList = ['/daily-activities']


    useEffect(() => {
        console.log(address,'address')

        // For admin pages, check if user is admin
        if (address !== adminWallet) {
            return router.push('/');
        }

        // For protected pages, check if wallet is connected
        if (!isConnected && !whiteList.includes(path)) {
            router.push('/');
        }
    }, [isConnected, isAdmin, requireAdmin, router]);

    if (!isConnected) return <CoffeeLoader />

    return <>{children}</>;
}

export default ProtectedRoute
