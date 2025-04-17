export const revalidate = 300; // ✅ cache page for 5 minutes

import React from 'react';
import PageWrapper from "@/components/profile/settings/PageWrapper";

export const metadata = {
    title: 'Crypto Coffee | Settings',
    description: 'Track your daily blockchain support, activity streaks, and rewards.',
};

const AccountSettingsPage = () => {
    return (
        <PageWrapper/>
    );
};

export default AccountSettingsPage;
