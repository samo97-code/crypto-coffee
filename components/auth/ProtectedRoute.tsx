// components/auth/ProtectedRoute.tsx
'use client'

import React, {FC, useEffect} from 'react';
import {useAccount} from 'wagmi';
import {useAdmin} from '@/hooks/useAdmin';
import {usePathname, useRouter} from 'next/navigation';

// import CustomWalletTrigger from '@/components/dashboard/CustomWalletTrigger';

interface IProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: FC<IProps> = ({children, requireAdmin = false}) => {
    const {isConnected} = useAccount();
    const {isAdmin} = useAdmin();
    const router = useRouter();
    const path = usePathname()

    const whiteList = ['/daily-activities']


    useEffect(() => {
        // For admin pages, check if user is admin
        if (requireAdmin && !isAdmin) {
            router.push('/');
            return;
        }

        // For protected pages, check if wallet is connected
        if (!isConnected && !whiteList.includes(path)) {
            router.push('/');
        }
    }, [isConnected, isAdmin, requireAdmin, router]);

    return <>{children}</>;
}

export default ProtectedRoute
