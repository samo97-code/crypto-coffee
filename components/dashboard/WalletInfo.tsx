'use client'

import React, {useMemo} from "react";
import {useAccount} from 'wagmi';
import {projects} from "@/constants";
import Image from "next/image";

export function WalletInfo() {
    const account = useAccount();

    const currentChain = useMemo(() => {
        return projects.find((item) => item.chainId === account.chainId)
    }, [account?.chainId])

    return (
        <div className="bg-white shadow-sm border border-coffee-200 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-coffee-200">
                <h3 className="font-semibold text-amber-900">Your Wallet</h3>
            </div>
            <div className="p-4 space-y-4">
                <div className="flex items-center gap-3 p-2 rounded-md transition-colors mb-1">
                    <div className={`${account.isConnected ? 'bg-green-600' : 'bg-red-600'} w-2 h-2 rounded-full bg-green-600 animate-pulse-slow`}/>
                    <span className={`${account.isConnected ? 'text-green-600' : 'text-red-600'}`}>{account.isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>

                {/*<div className="space-y-2">*/}
                {/*    <div className="text-sm text-coffee-600">Your Wallet Referral Link</div>*/}
                {/*    <div className="flex gap-2">*/}
                {/*        <div*/}
                {/*            className="p-2 bg-coffee-200/20 rounded text-sm flex-1 truncate">https://cryptocoffee.com/ref/0x4A*/}
                {/*        </div>*/}
                {/*        <Button size="icon" variant="ghost">*/}
                {/*            <Copy className="h-4 w-4"/>*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {
                    account?.chain?.name && <div className="space-y-2 flex flex-col gap-3 p-2 rounded-md transition-colors">
                      <div className="text-sm text-coffee-600 mb-0">Current Network</div>
                      <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6">
                          <Image src={currentChain?.icon || "/placeholder.svg"} alt={currentChain?.name || 'chain-img'} fill
                                 className="rounded-full"/>
                        </div>
                        <span>{account?.chain?.name}</span>
                      </div>
                    </div>
                }

            </div>
        </div>
    )
}

