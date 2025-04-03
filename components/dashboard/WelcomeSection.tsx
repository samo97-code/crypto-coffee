'use client'

import React, {FC} from "react";
import {ArrowUpRight, ArrowDownRight, Coffee} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {projects} from "@/constants";


interface IProps {
    price: number
    change24h: string
}

const WelcomeSection:FC<IProps> = ({price, change24h}) => {
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
            <Card className="bg-white border-coffee-200 py-0">
                <CardContent className="p-6">
                    <div className="space-y-2 mb-6">
                        <h1 className="text-2xl font-bold text-coffee-700 capitalize">Crypto mornings start with coffee!
                            ☕️</h1>
                        <p className="text-coffee-500">Power your portfolio with coffee</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <div className="text-coffee-500">Bitcoin Price</div>
                            {
                                price && <>
                                  <div className="text-2xl font-bold text-coffee-900">${convertTotal(price)}</div>
                                    {
                                        +change24h > 0 ? <div className="flex items-center text-green-600 text-sm">
                                            <ArrowUpRight className="h-4 w-4"/>
                                            <span>{change24h}% today</span>
                                        </div> : <div className="flex items-center text-red-400 text-sm">
                                            <ArrowDownRight className="h-4 w-4"/>
                                            <span>{change24h}% today</span>
                                        </div>
                                    }
                                </>
                            }
                        </div>

                        <div>
                            <div className="text-coffee-500">Coffee Chains</div>
                            <div className="text-2xl font-bold text-coffee-900">{projects.length}</div>
                            <div className="flex items-center text-coffee-500 text-sm">
                                <Coffee className="h-4 w-4 mr-1"/>
                                <span>Soon more</span>
                            </div>
                        </div>

                        <div>
                            <div className="text-coffee-500">Projects Supported</div>
                            <div className="text-2xl font-bold text-coffee-900">24</div>
                            <div className="flex items-center text-green-600 text-sm">
                                <Coffee className="h-4 w-4 mr-1"/>
                                <span>5 today</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default WelcomeSection

