import React from 'react';
import {Award, ChevronRight, Settings, LogOut, Wallet, Link, Zap} from "lucide-react";

import {motion} from "framer-motion"
import {useState} from "react"
import {useRouter} from "next/navigation";
import { useDisconnect } from 'wagmi';

const QuickLinks = () => {
    const { disconnect } = useDisconnect();
    const router = useRouter();
    const [hoveredLink, setHoveredLink] = useState<number | null>(null)


    const links = [
        {id: 1, label: 'Account Settings', link: '/profile/settings', icon: Settings, danger: false},
        {id: 2, label: 'Wallet', link: '/profile/wallet', icon: Wallet, danger: false},
        {id: 3, label: 'Daily Activities', link: '/daily-activities', icon: Zap, danger: false},
        {id: 4, label: 'Achievements', link: '/profile/achievements', icon: Award, danger: false},
        {id: 5, label: 'Disconnect', link: '', icon: LogOut, danger: false},
    ]

    const toLink = async(url: string) => {
        if (url) return router.push(url)

        disconnect()
        router.prefetch('/')
    }

    return (
        <div className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 relative overflow-hidden"
        >
            <div className="relative z-10">
                <h3 className="font-bold text-coffee-900 mb-4 flex items-center text-lg">
                    <div className="bg-coffee-100 dark:bg-coffee-50/40 p-2 rounded-full mr-3">
                        <Link className="h-5 w-5 text-coffee-700"/>
                    </div>
                    Quick Links
                </h3>

                <nav className="space-y-2">
                    {links.map((link, index) => (
                        <motion.button
                            key={link.id}
                            initial={{x: -20, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{delay: 0.3 + index * 0.1}}
                            className={`w-full flex items-center justify-between p-3 rounded-lg 
                ${hoveredLink === link.id ? "bg-coffee-50" : "bg-card"} 
                ${link.danger ? "text-destructive hover:text-destructive" : "text-coffee-700 hover:text-coffee-800"} 
                border ${link.danger ? "border-destructive/20" : "border-coffee-200"}
                hover:border-coffee-300 dark:hover:bg-coffee-50/60
                transition-all duration-200 shadow-sm relative overflow-hidden dark:border-coffee-600/50`}
                            onMouseEnter={() => setHoveredLink(link.id)}
                            onMouseLeave={() => setHoveredLink(null)}
                            onClick={() => toLink(link.link)}
                        >
                            {hoveredLink === link.id && (
                                <motion.div
                                    initial={{x: "-100%"}}
                                    animate={{x: "100%"}}
                                    transition={{duration: 0.5}}
                                    className={`absolute inset-0 ${link.danger ? "bg-destructive/5" : "bg-coffee-50"} opacity-50`}
                                />
                            )}
                            <div className="flex items-center gap-3 relative z-10">
                                <div
                                    className={`p-2 rounded-full ${link.danger ? "bg-destructive/10" : "bg-coffee-100 dark:bg-coffee-300"}`}>
                                    <link.icon
                                        className={`h-4 w-4 ${link.danger ? "text-destructive" : "text-coffee-700"}`}/>
                                </div>
                                <span className="font-medium text-left">{link.label}</span>
                            </div>
                            <ChevronRight
                                className={`h-4 w-4 transition-transform duration-200 relative z-10 ${link.danger ? "text-destructive" : "text-coffee-600"}`}
                            />
                        </motion.button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default QuickLinks;
