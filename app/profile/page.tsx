export const revalidate = 300; // ✅ cache page for 5 minutes
import React from 'react';
import PageWrapper from "@/components/profile/PageWrapper";

export const metadata = {
    title: 'Crypto Coffee | Profile',
    description: 'Track your daily blockchain support, activity streaks, and rewards.',
};

const ProfilePage = () => {
    return (
        <PageWrapper/>
    );
};

export default ProfilePage;
