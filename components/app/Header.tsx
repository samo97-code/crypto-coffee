import React, {useEffect} from 'react';
import { Coffee, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";
import {supabase} from "@/utils/supabase";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";

const Header = () => {
    const {address, isConnected} = useAccount();

    useEffect(() => {
        if (isConnected && address) {
            (async () => {
                try {
                    const user = await createOrGetUser(address);
                    console.log('User from Supabase:', user);
                } catch (error) {
                    console.error('Supabase Error:', error);
                }
            })();
        }
    }, [address, isConnected]);

    const createOrGetUser = async (wallet_address: string) => {
        const {data} = await supabase
            .from('User')
            .select('*')
            .eq('wallet_address', wallet_address)
            .maybeSingle();

        if (data) return data;

        try {
            const {data: newUser, error: createError} = await supabase
                .from('User')
                .insert({wallet_address})
                .single();

            if (createError) throw createError;

            return newUser;
        } catch (e) {
            console.log(e, 'e')
        }
    }


    return (
        <header className="border-b border-coffee-200 bg-white shadow-sm backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-coffee-800 font-bold text-xl">
                        <Coffee className="h-6 w-6"/>
                        <span>Crypto Coffee ☕️</span>
                    </div>

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
                </div>
            </div>
        </header>
    );
};

export default Header;
