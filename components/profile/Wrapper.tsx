'use client'

import React, {FC, useEffect, useState} from 'react';
import CreativeCoverImage from "@/components/profile/CreativeCoverImage";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Copy, Gift, Sparkles, Wallet} from "lucide-react";
import {shortenAddress} from "@/utils/utils";
import {Button} from "@/components/ui/button";
import ProfileBadges from "@/components/profile/ProfileBadges";
import CoffeeStats from "@/components/profile/CoffeeStats";
import QuickLinks from "@/components/profile/QuickLinks";
import RecentActivitySection from "@/components/profile/RecentActivitySection";
import CoffeeStreak from "@/components/profile/CoffeeStreak";
import {useAccount} from "wagmi";
import {WriteContractData} from "@wagmi/core/query";
import {useAppSelector} from "@/store/hook"
import {IActivity, IBadge, IProfileStates, IStreakInfo, IUserAchievement} from "@/types";
import {useRouter} from "next/navigation";

interface IProps {
    streak: IStreakInfo,
    stats: IProfileStates,
    achievements: IUserAchievement[],
    badges: IBadge[],
    activities: IActivity[],
}

const Wrapper: FC<IProps> = ({streak, stats, achievements, badges, activities}) => {
    const router = useRouter()
    const {address} = useAccount();
    const {user} = useAppSelector(state => state.user);
    const displayName = user?.display_name || user?.username || "Coffee Enthusiast"
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address as WriteContractData)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 pb-8">
            {/*/!* Profile Header *!/*/}
            <div className="relative mb-8">
                {/* Cover Image */}
                <CreativeCoverImage
                    username={displayName}
                    subtitle="Supporting Blockchain Projects One Cup at a Time"
                    onEdit={() => alert("Edit cover image")}
                />

                {/* Profile Info */}
                <div
                    className=" flex flex-col md:flex-row gap-6 items-start mt-0 px-4 md:px-8 relative">
                    <Avatar className="absolute -top-[60px] h-32 w-32 border-4 border-coffee-50 shadow-lg">
                        <AvatarImage src={`${user?.avatar_url}?height=128&width=128`}/>
                        <AvatarFallback
                            className="bg-coffee-100 text-coffee-800 text-4xl">CC</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 mt-2 ml-[150px]">
                        <div className="flex flex-row items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-coffee-700">
                                    <Wallet className="h-4 w-4"/>
                                    <div className="flex items-center">
                                        <span>{shortenAddress(address)}</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 ml-1"
                                                onClick={copyToClipboard}>
                                            {isCopied ? <Sparkles className="h-4 w-4 text-coffee-500"/> :
                                                <Copy className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={() => router.push('/profile/referrals')}
                                        className="bg-gradient-to-r from-coffee-500 to-coffee-700 dark:from-coffee-100/80 dark:to-coffee-100/50 hover:from-coffee-600 hover:to-coffee-800 text-white">
                                    <Gift className="h-4 w-4"/>
                                    Your Referrals
                                </Button>
                            </div>
                        </div>

                        <ProfileBadges badges={badges}/>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Stats Card */}
                    <CoffeeStats stats={stats} streak={streak} levelProgress={stats.levelProgress}/>

                    {/* Quick Links */}
                    <QuickLinks/>
                </div>

                {/* Main Content */}

                <div className="lg:col-span-3">
                    <CoffeeStreak streak={streak}/>

                    <RecentActivitySection
                        activities={activities}
                        achievements={achievements}
                    />
                </div>
            </div>
        </div>
    );
};

export default Wrapper;
