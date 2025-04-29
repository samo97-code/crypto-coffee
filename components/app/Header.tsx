'use client'

import React, {useEffect} from 'react';
import DarkMode from "@/components/re-usable/DarkMode";
import HeaderSearch from "@/components/app/HeaderSearch";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";
import {supabase} from "@/lib/supabase";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {setAuthUser} from "@/store/slices/userSlice";
import {useDispatch} from "react-redux";
import {randomAvatar, randomRefCode} from "@/utils/utils";
import {setCookie, hasCookie} from 'cookies-next/client';
import {useAppSelector} from "@/store/hook";
import Image from "next/image";
import {checkAndUpdateAchievements} from "@/lib/acheivements-service";
import {useRouter, useSearchParams} from 'next/navigation'

const Header = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams()
    const referrerCode = searchParams.get("ref")
    const router = useRouter()

    const {user} = useAppSelector(state => state.user);
    const {address, isConnected} = useAccount();
    const LAUNCH_DATE = new Date("2025-04-23");

    useEffect(() => {
        if (isConnected && address) {
            (async () => {
                try {
                    const user = await createOrGetUser(address);
                    dispatch(setAuthUser(user))
                    if (!hasCookie('userId')) setCookie('userId', user.id)
                } catch (error) {
                    console.error('Supabase Error:', error);
                }
            })();
        }
    }, [address, isConnected]);

    const createOrGetUser = async (wallet_address: string) => {
        const {data: currentUser} = await supabase
            .from('users')
            .select('*')
            .eq('wallet_address', wallet_address)
            .maybeSingle();

        if (currentUser) return currentUser;

        try {
            // Get the inviter user if a referral code was provided
            const {data: currentInvitedUser} = await supabase
                .from('users')
                .select('*')
                .eq('referral_code', referrerCode)
                .maybeSingle();

            const {data: newUser, error: createError} = await supabase
                .from("users")
                .insert([
                    {
                        wallet_address,
                        level_id: 1,
                        avatar_url: randomAvatar(),
                        referral_code: randomRefCode(),
                        referred_by: referrerCode ? currentInvitedUser.id : null,
                    },
                ])
                .select()
                .single()

            if (createError) throw createError;

            if (referrerCode && currentInvitedUser) {
                await supabase
                    .from("referrals")
                    .insert({
                        inviter_id: currentInvitedUser?.id, // who invited
                        invited_user_id: newUser.id,   // new user
                    });


                const {count, error: countError} = await supabase
                    .from("referrals")
                    .select('*', {count: 'exact', head: true})
                    .eq('inviter_id', currentInvitedUser.id);

                if (countError) {
                    console.error("Error counting referrals:", countError);
                } else {
                    // Award XP based on milestone thresholds
                    await handleReferralMilestone(currentInvitedUser.id, count || 0);
                }
            }

            await checkJoinDateAchievement(newUser.id)
            router.push('/')

            return newUser
        } catch (e) {
            console.error("Error in saveOrGetUser:", e)
            return {success: false, error: "Failed to process user"}
        }
    }

    // Function to handle referral milestone rewards
    const handleReferralMilestone = async(inviterId:string, referralCount: number) => {
        // Define the milestones
        const milestones = [
            {threshold: 3, xp: 250, discount: 0},
            {threshold: 5, xp: 500, discount: 0},
            {threshold: 10, xp: 750, discount: 0},
            {threshold: 20, xp: 1000, discount: 3},
            {threshold: 30, xp: 1500, discount: 5}
        ];

        // Find the highest milestone achieved
        let xpToAward = 0;
        let discountPercentage = 0;

        for (const milestone of milestones) {
            if (referralCount === milestone.threshold) {
                xpToAward = milestone.xp;
                discountPercentage = milestone.discount;
                break;
            }
        }

        if (xpToAward > 0) {
            // Award XP to the inviter
            const {data: user, error: userError} = await supabase
                .from('users')
                .select('experience_points')
                .eq('id', inviterId)
                .single();

            if (!userError) {
                const currentXp = user.experience_points || 0;
                const newXp = currentXp + xpToAward;

                // Update user's XP
                await supabase
                    .from('users')
                    .update({
                        experience_points: newXp,
                        discount_percentage: discountPercentage > 0 ? discountPercentage : 0,
                    })
                    .eq('id', inviterId);
            }
        }
    }

    const checkJoinDateAchievement = async (userId: string) => {
        const joinDate = new Date();
        const firstMonthEnd = new Date(LAUNCH_DATE);
        firstMonthEnd.setMonth(firstMonthEnd.getMonth() + 1);

        if (joinDate < firstMonthEnd) {
            await checkAndUpdateAchievements(userId, [{type: 'join_date', value: 1}]);
        }
    }

    return (
        <header
            className="border-b border-coffee-200 bg-coffee-100 shadow-sm backdrop-blur-xl sticky top-0 z-[11] h-[98px] py-2">
            <div className="max-w-[1440px] h-full mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 text-coffee-800 font-bold text-xl">
                        <div className="relative">
                            <Image src={"/crypto-coffee-logo1.png"} alt="logo" width={120} height={82}/>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <HeaderSearch/>

                    <AnnouncementCard/>

                    <DarkMode/>

                    <div className="min-w-[143px]">
                        <ConnectButton accountStatus="full"/>
                    </div>

                    {isConnected &&
                        <Link href="/profile" className="flex items-center gap-2 text-coffee-800 font-bold text-xl">
                          <Avatar className="h-10 w-10 border-4 border-coffee-50 shadow-lg">
                            <AvatarImage src={`${user?.avatar_url}?height=128&width=128`}/>
                            <AvatarFallback
                                className="bg-coffee-100 text-coffee-800 text-xs">CC</AvatarFallback>
                          </Avatar>
                        </Link>}
                </div>
            </div>
        </header>
    );
};

export default Header;
