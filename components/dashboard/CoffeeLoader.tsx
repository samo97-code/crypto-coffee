"use client"

import { useEffect, useState } from "react"
import { Coffee, Droplets } from "lucide-react"
import { cn } from "@/utils/utils"

const CoffeeLoader =({ className }: { className?: string }) =>{
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 0
                }
                return prev + 5
            })
        }, 200)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-[calc(100vh-584px)] flex items-center justify-center bg-coffee-50/80 backdrop-blur-sm z-2">
            <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
                <div className="relative">
                    {/* Coffee cup */}
                    <div
                        className="relative h-32 w-28 rounded-b-3xl border-4 border-coffee-800 bg-coffee-100 dark:bg-coffee-900">
                        {/* Coffee liquid filling animation */}
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-coffee-600 transition-all duration-500 ease-in-out rounded-b-2xl"
                            style={{height: `${progress}%`}}
                        />

                        {/* Steam animation */}
                        <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 space-x-2">
                            <div
                                className="animate-steam h-6 w-2 origin-bottom rounded-full bg-coffee-200 opacity-70 dark:bg-coffee-300"/>
                            <div
                                className="animate-steam2 h-8 w-2 origin-bottom rounded-full bg-coffee-200 opacity-70 dark:bg-coffee-300"
                                style={{animationDelay: "200ms"}}
                            />
                            <div
                                className="animate-steam3 h-7 w-2 origin-bottom rounded-full bg-coffee-200 opacity-70 dark:bg-coffee-300"
                                style={{animationDelay: "400ms"}}
                            />
                        </div>

                        {/* Cup handle */}
                        <div className="absolute -right-8 top-5 h-14 w-6 rounded-r-full border-4 border-coffee-800"/>

                        {/* Coffee beans falling animation */}
                        <div className="absolute -left-10 top-0 animate-fallSpin">
                            <Coffee className="h-6 w-6 text-coffee-800"/>
                        </div>
                        <div className="absolute -left-6 -top-12 animate-fallSpin2" style={{animationDelay: "600ms"}}>
                            <Coffee className="h-5 w-5 text-coffee-800"/>
                        </div>
                        <div className="absolute -left-2 -top-8 animate-fallSpin3" style={{animationDelay: "300ms"}}>
                            <Coffee className="h-4 w-4 text-coffee-800"/>
                        </div>

                        {/* Droplets */}
                        <div className="absolute -right-12 top-10 animate-bounce" style={{animationDelay: "200ms"}}>
                            <Droplets className="h-4 w-4 text-coffee-500"/>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-xl font-bold text-coffee-800 dark:text-coffee-200">Loading...</p>
                    <div className="h-2 w-48 overflow-hidden rounded-full bg-coffee-200 dark:bg-coffee-800">
                        <div
                            className="h-full bg-coffee-600 transition-all duration-300 ease-in-out"
                            style={{width: `${progress}%`}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoffeeLoader
