import React, {useEffect, useState} from 'react';
import {Coffee, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";
import {supabase} from "@/lib/supabase";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {setAuthUser} from "@/store/slices/userSlice";
import {useDispatch} from "react-redux";
import {randomAvatar} from "@/utils/utils";

const Header = () => {
    const dispatch = useDispatch();
    const {address, isConnected} = useAccount();
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
        if (isConnected && address) {
            (async () => {
                try {
                    const user = await createOrGetUser(address);
                    dispatch(setAuthUser(user))

                    // await getUserCoffeeActivity(address)
                    // console.log('User from Supabase:', user);
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

        // console.log(data, 'data')

        setUserAvatar(data.avatar_url)
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

            setUserAvatar(newUser.avatar_url)

            if (createError) throw createError;

            // Also insert initial achievements for the user
            const {error: achievementError} = await supabase.from("user_achievements").insert([
                {
                    user_id: newUser.id,
                    achievement_id: 1, // Early Adopter achievement
                    progress: 100,
                    is_unlocked: true,
                    unlocked_at: new Date(),
                },
            ])

            if (achievementError) {
                console.error("Error creating initial achievements:", achievementError)
                // Continue anyway, not critical
            }

            return {success: true, user: newUser, isNewUser: true}
        } catch (e) {
            console.error("Error in saveOrGetUser:", e)
            return {success: false, error: "Failed to process user"}
        }
    }

    // const getUserCoffeeActivity = async (wallet: string) => {
    //     try {
    //         const {data, error} = await supabase
    //             .from('coffee_activity')
    //             .select('chain_id, timestamp')
    //             .eq('wallet_address', wallet);
    //
    //         if (error) {
    //             console.error('Error fetching coffee activity:', error);
    //             return [];
    //         }
    //
    //         console.log(data, 'data')
    //
    //         return data; // returns array of { chain_id, timestamp }
    //     } catch (e) {
    //         console.log(e, 'e')
    //     }
    // }


    return (
        <header className="border-b border-coffee-200 bg-white shadow-sm backdrop-blur-sm sticky top-0 z-[11]">
            <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 text-coffee-800 font-bold text-xl">
                        <div
                            className="p-3 bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-2xl shadow-md transform -rotate-3">
                            <div className="relative">
                                <div
                                    className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-white/70 blur-[1px]"></div>
                                <Coffee className="h-5 w-5 text-white"/>
                            </div>
                        </div>
                        <span>Crypto Coffee</span>
                    </Link>

                    <div className="relative hidden md:block w-64">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-coffee-600"/>
                        <Input placeholder="Search projects..." className="pl-8 bg-white border-coffee-200"/>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/*<Button variant="outline" className="gap-2 border-coffee-200">*/}
                    {/*    <Coffee className="h-4 w-4"/>*/}
                    {/*    <span>{projects.length} Coffee Chains</span>*/}
                    {/*</Button>*/}

                    <AnnouncementCard/>

                    <div className="min-w-[143px]">
                        <ConnectButton accountStatus="full"/>
                    </div>

                    {isConnected &&
                        <Link href="/profile" className="flex items-center gap-2 text-coffee-800 font-bold text-xl">
                          <Avatar className="h-10 w-10 border-4 border-coffee-50 shadow-lg">
                            <AvatarImage src={`${userAvatar}?height=128&width=128`}/>
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
