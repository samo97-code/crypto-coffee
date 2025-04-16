'use client'

import React, {FC} from "react";
import {ArrowUpRight, ArrowDownRight, Coffee} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {projects} from "@/constants";


interface IProps {
    dailySupporters: number
    totalSupporters: number
    price: number
    change24h: string
}

const WelcomeSection1: FC<IProps> = ({price, change24h, dailySupporters, totalSupporters}) => {
    const convertTotal = (count: number) => {
        const value = count.toLocaleString()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    return (
        <div className="space-y-8">
            {/* Welcome Card */}
            <div
                className="relative overflow-hidden bg-gradient-to-br from-coffee--50 to-coffee-100 border border-coffee-200 rounded-lg shadow-sm">
                {/* Decorative elements */}
                <div
                    className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-amber-300/20 to-orange-400/20 blur-3xl"></div>
                <div
                    className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-tl from-amber-300/20 to-orange-400/20 blur-3xl"></div>

                {/* Coffee beans scattered around */}
                <div
                    className="absolute top-10 right-10 w-12 h-6 rounded-full border-2 border-amber-800/20 rotate-45"></div>
                <div
                    className="absolute top-20 right-32 w-8 h-4 rounded-full border-2 border-amber-800/20 -rotate-12"></div>
                <div
                    className="absolute bottom-12 left-20 w-10 h-5 rounded-full border-2 border-amber-800/20 rotate-30"></div>
                <div
                    className="absolute bottom-24 right-40 w-6 h-3 rounded-full border-2 border-amber-800/20 -rotate-15"></div>

                <div className="relative p-8">
                    {/* Header section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-amber-900 leading-tight">
                                    Morning Start With Crypto Coffee!
                                </h1>
                                <p className="text-coffee-700 text-lg">Power your portfolio with coffee</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Bitcoin Price */}
                        <div
                            className="group bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-coffee-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="text-amber-900 font-medium">Bitcoin Price</div>
                                </div>
                                <div
                                    className="text-xs font-medium px-2 py-1 bg-coffee-100 rounded-full text-coffee-800">24h
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="text-3xl font-bold text-amber-900 transition-transform">
                                    ${convertTotal(price)}
                                </div>
                                <div className="flex items-center text-red-500 text-sm font-medium">
                                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4L4 12H9V20H15V12H20L12 4Z" fill="currentColor"
                                              transform="rotate(180 12 12)"/>
                                    </svg>
                                    <span>{change24h}% today</span>
                                </div>
                            </div>
                            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-red-500 to-red-400 w-[30%]"></div>
                            </div>
                        </div>

                        {/* Coffee Chains */}
                        <div
                            className="group bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-coffee-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="text-amber-900 font-medium">Coffee Chains</div>
                                </div>
                                <div
                                    className="text-xs font-medium px-2 py-1 bg-coffee-100 rounded-full text-coffee-800">Networks
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div
                                    className="text-3xl font-bold text-amber-900 transition-transform">{projects.length}
                                </div>
                                <div className="flex items-center text-coffee-700 text-sm font-medium">
                                    <Coffee className="h-4 w-4 mr-1"/>
                                    <span>Soon more</span>
                                </div>
                            </div>
                        </div>

                        {/* Daily Supporters */}
                        <div
                            className="group bg-white/80 backdrop-blur-sm p-6 rounded-sm border border-coffee-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="text-amber-900 font-medium">Daily Users</div>
                                </div>
                                <div
                                    className="text-xs font-medium px-2 py-1 bg-coffee-100 rounded-full text-coffee-800">Active
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div
                                    className="text-3xl font-bold text-amber-900 transition-transform">
                                    {totalSupporters}
                                </div>
                                <div className="flex items-center text-green-600 text-sm font-medium">
                                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4L4 12H9V20H15V12H20L12 4Z" fill="currentColor"/>
                                    </svg>
                                    <span>+{dailySupporters} today</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="space-y-8">
        //     <Card className="bg-white border-coffee-200 py-0">
        //         <CardContent className="p-6">
        //             <div className="space-y-2 mb-6">
        //                 <h1 className="text-2xl font-bold text-coffee-700 capitalize">Crypto mornings start with coffee!
        //                     ☕️</h1>
        //                 <p className="text-coffee-500">Power your portfolio with coffee</p>
        //             </div>
        //
        //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        //                 <div>
        //                     <div className="text-coffee-500">Bitcoin Price</div>
        //                     {
        //                         price && <>
        //                           <div className="text-2xl font-bold text-coffee-900">${convertTotal(price)}</div>
        //                             {
        //                                 +change24h > 0 ? <div className="flex items-center text-green-600 text-sm">
        //                                     <ArrowUpRight className="h-4 w-4"/>
        //                                     <span>{change24h}% today</span>
        //                                 </div> : <div className="flex items-center text-red-400 text-sm">
        //                                     <ArrowDownRight className="h-4 w-4"/>
        //                                     <span>{change24h}% today</span>
        //                                 </div>
        //                             }
        //                         </>
        //                     }
        //                 </div>
        //
        //                 <div>
        //                     <div className="text-coffee-500">Coffee Chains</div>
        //                     <div className="text-2xl font-bold text-coffee-900">{projects.length}</div>
        //                     <div className="flex items-center text-coffee-500 text-sm">
        //                         <Coffee className="h-4 w-4 mr-1"/>
        //                         <span>Soon more</span>
        //                     </div>
        //                 </div>
        //
        //                 <div>
        //                     <div className="text-coffee-500">Projects Supported</div>
        //                     <div className="text-2xl font-bold text-coffee-900">24</div>
        //                     <div className="flex items-center text-green-600 text-sm">
        //                         <Coffee className="h-4 w-4 mr-1"/>
        //                         <span>5 today</span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </CardContent>
        //     </Card>
        // </div>
    )
}

export default WelcomeSection1

