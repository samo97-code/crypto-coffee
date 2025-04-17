export const revalidate = 300; // ✅ cache page for 5 minutes

import React from 'react';
import PageWrapper from "@/components/profile/wallet/PageWrapper";

export const metadata = {
    title: 'Crypto Coffee | Wallet',
    description: 'Track your daily blockchain support, activity streaks, and rewards.',
};

const WalletPage = () => {
    return (
        <PageWrapper/>
    );
};

export default WalletPage;
