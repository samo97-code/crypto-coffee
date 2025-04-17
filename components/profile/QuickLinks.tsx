import React from 'react';
import {Award, ChevronRight, Settings, LogOut, Wallet, Coffee} from "lucide-react";

import {motion} from "framer-motion"
import {useState} from "react"
import {useRouter} from "next/navigation";

const QuickLinks = () => {
    const router = useRouter();
    const [hoveredLink, setHoveredLink] = useState<number | null>(null)


    const links = [
        {id: 1, label: 'Account Settings', link: '/profile/settings', icon: Settings, danger: false},
        {id: 2, label: 'Wallet & Payments', link: '/profile/wallet', icon: Wallet, danger: false},
        {id: 3, label: 'Achievements', link: '/profile/achievements', icon: Award, danger: false},
        {id: 4, label: 'Disconnect', link: '', icon: LogOut, danger: false},
    ]

    const toLink = (url: string) => {
        if (url) return router.push(url)
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-coffee-200 relative overflow-hidden"
        >
            <div className="relative z-10">
                <h3 className="font-bold text-coffee-900 mb-4 flex items-center text-lg">
                    <div className="bg-coffee-100 p-2 rounded-full mr-3">
                        <Coffee className="h-5 w-5 text-coffee-700"/>
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
                ${hoveredLink === link.id ? "bg-coffee-50" : "bg-white"} 
                ${link.danger ? "text-destructive hover:text-destructive" : "text-coffee-700 hover:text-coffee-800"} 
                border ${link.danger ? "border-destructive/20" : "border-coffee-200"}
                hover:border-coffee-300
                transition-all duration-200 shadow-sm relative overflow-hidden`}
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
                                    className={`p-2 rounded-full ${link.danger ? "bg-destructive/10" : "bg-coffee-100"}`}>
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

        // <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
        //     <h3 className="font-semibold text-coffee-900 mb-4">Quick Links</h3>
        //
        //     <nav className="space-y-1">
        //         {
        //             links.map((item) => {
        //                 return <Link
        //                     key={item.id}
        //                     href={item.link}
        //                     className="flex items-center justify-between p-3 rounded-lg hover:bg-coffee-50 text-coffee-700 hover:text-coffee-900"
        //                 >
        //                     <div className="flex items-center gap-3">
        //                         <item.icon className="h-5 w-5"/>
        //                         <span>{item.label}</span>
        //                     </div>
        //                     <ChevronRight className="h-4 w-4"/>
        //                 </Link>
        //             })
        //         }
        //
        //         {/*TODO need add Disconnect*/}
        //         <button
        //             className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700">
        //             <div className="flex items-center gap-3">
        //                 <LogOut className="h-5 w-5"/>
        //                 <span>Disconnect Wallet</span>
        //             </div>
        //             <ChevronRight className="h-4 w-4"/>
        //         </button>
        //     </nav>
        // </div>
    );
};

export default QuickLinks;
