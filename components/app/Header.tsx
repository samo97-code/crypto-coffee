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
import {randomAvatar} from "@/utils/utils";
import {setCookie, hasCookie} from 'cookies-next/client';
import {useAppSelector} from "@/store/hook";
import Image from "next/image";
import {checkAndUpdateAchievements} from "@/lib/acheivements-service";

const Header = () => {
    const dispatch = useDispatch();
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
        const {data} = await supabase
            .from('user_with_transaction_count')
            .select('*')
            .eq('wallet_address', wallet_address)
            .maybeSingle();

        if (data) return data;

        try {
            const {data: newUser, error: createError} = await supabase
                .from("users")
                .insert([
                    {
                        wallet_address,
                        level_id: 1,
                        avatar_url: randomAvatar(),
                    },
                ])
                .select()
                .single()

            if (createError) throw createError;

            await checkJoinDateAchievement(newUser.id)

            return {success: true, user: newUser, isNewUser: true}
        } catch (e) {
            console.error("Error in saveOrGetUser:", e)
            return {success: false, error: "Failed to process user"}
        }
    }

    const checkJoinDateAchievement = async (userId: string) => {
        const joinDate = new Date(user.created_at);
        const firstMonthEnd = new Date(LAUNCH_DATE);
        firstMonthEnd.setMonth(firstMonthEnd.getMonth() + 1);

        if (joinDate < firstMonthEnd) {
            await checkAndUpdateAchievements(userId, "join_date", 1);
            // Also insert initial achievements for the user
            await supabase.from("user_achievements").insert([
                {
                    user_id: userId,
                    achievement_id: 1, // Early Adopter achievement
                    progress: 100,
                    is_unlocked: true,
                    unlocked_at: new Date(),
                },
            ])
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
