import React from 'react';
import Link from "next/link";
import {Award, ChevronRight, LogOut, Settings, Wallet} from "lucide-react";

const QuickLinks = () => {
    const links = [
        {id: 1, label: 'Account Settings', link: '/profile/settings', icon: Settings},
        {id: 2, label: 'Wallet & Payments', link: '/profile/wallet', icon: Wallet},
        {id: 3, label: 'Achievements', link: '/profile/achievements', icon: Award},
    ]

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
            <h3 className="font-semibold text-coffee-900 mb-4">Quick Links</h3>

            <nav className="space-y-1">
                {
                    links.map((item) => {
                        return <Link
                            key={item.id}
                            href={item.link}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-coffee-50 text-coffee-700 hover:text-coffee-900"
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="h-5 w-5"/>
                                <span>{item.label}</span>
                            </div>
                            <ChevronRight className="h-4 w-4"/>
                        </Link>
                    })
                }

                {/*TODO need add Disconnect*/}
                <button
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700">
                    <div className="flex items-center gap-3">
                        <LogOut className="h-5 w-5"/>
                        <span>Disconnect Wallet</span>
                    </div>
                    <ChevronRight className="h-4 w-4"/>
                </button>
            </nav>
        </div>
    );
};

export default QuickLinks;
