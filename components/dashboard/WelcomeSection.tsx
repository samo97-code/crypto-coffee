"use client"

import {useEffect, useState} from "react"
import {Coffee, TrendingDown, TrendingUp, Clock, Database} from "lucide-react"
import {projects} from "@/constants";
import CircleLoader from "@/components/re-usable/CircleLoader";
import {getWebsiteTxStats} from "@/lib/transaction-service";


const WelcomeSection = () => {
    const [price, setPrice] = useState<number>(0);
    const [change24h, setChange24h] = useState<number>(0);
    const [stats, setStats] = useState({
        totalTx: 0,
        dailyTx: 0,
    })

    // Floating animation for decorative elements
    useEffect(() => {
        const floatingElements = document.querySelectorAll(".floating-element")

        floatingElements.forEach((element, index) => {
            const delay = index * 0.5
            const htmlElement = element as HTMLElement
            htmlElement.style.animation = `float 3s ease-in-out ${delay}s infinite`
        })

        getTxStats()
        fetchBitcoinPrice()
        const interval = setInterval(fetchBitcoinPrice, 180000); // update every 3m
        return () => clearInterval(interval);
    }, [])

    const getTxStats = async () => {
        try {
            const {totalTx, dailyTx} = await getWebsiteTxStats();
            setStats({
                totalTx: totalTx,
                dailyTx: dailyTx,
            })
        } catch (error) {
            console.error('Error in getDailySupportersStats:', error);
            return null;
        }
    }

    const fetchBitcoinPrice = async () => {
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',);

            if (!res.ok) {
                throw new Error(`API response error: ${res.status}`);
            }

            const data = await res.json();
            setPrice(data.bitcoin.usd);
            setChange24h(Number(data.bitcoin.usd_24h_change.toFixed(2)));
            // setPrice(10);
            // setChange24h(10);
        } catch (err) {
            console.error('Fetch Error:', err);
            return null; // Fallback clearly
        }
    }


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
        <div
            className="relative bg-gradient-to-br from-coffee-50 to-coffee-100 rounded-xl p-6 shadow-lg border border-coffee-200 dark:border-coffee-600/50 overflow-hidden transition-all duration-300 ease-out"
            style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.1s ease-out",
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 floating-element opacity-20">
                <div className="w-16 h-16 rounded-full border-2 border-coffee-300"></div>
            </div>
            <div className="absolute bottom-20 left-10 floating-element opacity-20">
                <div className="w-8 h-8 rounded-full border-2 border-coffee-300"></div>
            </div>
            <div className="absolute top-40 left-40 floating-element opacity-10">
                <div className="w-24 h-24 rounded-full border-2 border-coffee-300"></div>
            </div>

            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-5 bg-repeat"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23805ad5' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            ></div>

            {/* Header */}
            <div className="relative mb-6 flex items-center" style={{transform: "translateZ(20px)"}}>
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-coffee-800 to-coffee-600 bg-clip-text text-transparent">
                        Morning Start With Crypto Coffee!
                    </h2>
                    <p className="text-coffee-700 text-lg">Power your portfolio with coffee</p>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{transform: "translateZ(10px)"}}>
                {/* Bitcoin Price */}
                <div
                    className="min-h-[118px] bg-card rounded-lg p-4 shadow-md border border-coffee-100 dark:border-coffee-300 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-medium text-coffee-800">Bitcoin Price</div>
                        <div
                            className="text-xs font-medium px-2 py-1 bg-coffee-100 dark:bg-coffee-300 rounded-full text-coffee-800 flex items-center">
                            <Clock className="h-3 w-3 mr-1"/>
                            24h
                        </div>
                    </div>

                    {
                        price ? <>
                                <div className="flex items-end justify-between">
                                    <div className="text-3xl font-bold text-coffee-900">${convertTotal(price)}</div>

                                    <div
                                        className={`${+change24h > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'} flex items-center text-sm font-medium`}>
                                        {+change24h > 0 ? <TrendingUp className="h-4 w-4 mr-1"/> :
                                            <TrendingDown className="h-4 w-4 mr-1"/>}
                                        <span>{change24h}% today</span>
                                    </div>
                                </div>
                                <div className="mt-2 h-2 bg-red-100 rounded-full overflow-hidden">
                                    <div
                                        className={`${+change24h > 0 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'} h-full`}
                                        style={{width: `${(price / 100000 * 100).toFixed(0)}%`}}>
                                    </div>
                                </div>
                            </>
                            : <div className="flex justify-center"><CircleLoader/></div>
                    }
                </div>

                {/* Coffee Chains */}
                <div
                    className="min-h-[118px] bg-card rounded-lg p-4 shadow-md border border-coffee-100 dark:border-coffee-300 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-medium text-coffee-800">Coffee Chains</div>
                        <div
                            className="text-xs font-medium px-2 py-1 bg-coffee-100 dark:bg-coffee-300 rounded-full text-coffee-800 flex items-center">
                            <Database className="h-3 w-3 mr-1"/>
                            Networks
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-coffee-900">{projects.length}</div>
                        <div className="flex items-center text-coffee-600 dark:text-coffee-900 text-sm font-medium">
                            <Coffee className="h-4 w-4 mr-1"/>
                            <span>Soon more</span>
                        </div>
                    </div>
                </div>

                {/* Daily Users */}
                <div
                    className="min-h-[118px] bg-card rounded-lg p-4 shadow-md border border-coffee-100 dark:border-coffee-300 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-medium text-coffee-800">Transactions</div>
                        <div
                            className="text-xs font-medium px-2 py-1 bg-coffee-100 dark:bg-coffee-300 rounded-full text-coffee-800 flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                            Active
                        </div>
                    </div>
                    {
                        stats.totalTx ? <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold text-coffee-900">{stats.totalTx}</div>
                            <div className="flex items-center text-green-600 dark:text-green-500 text-sm font-medium">
                                <TrendingUp className="h-4 w-4 mr-1"/>
                                <span>+{stats.dailyTx} today</span>
                            </div>
                        </div> : <div className="flex justify-center"><CircleLoader/></div>
                    }
                </div>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-coffee-300 opacity-50"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite alternate`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default WelcomeSection
