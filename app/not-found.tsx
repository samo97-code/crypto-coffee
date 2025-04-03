"use client"

import {useState, useEffect} from "react"
import {Coffee, Home, Droplets} from "lucide-react"
import {Button} from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
    const [drops, setDrops] = useState<Array<{ id: number; x: number; delay: number }>>([])
    const [isBrewingAgain, setIsBrewingAgain] = useState(false)

    // Generate coffee drops
    useEffect(() => {
        const newDrops = Array.from({length: 15}, (_, i) => ({
            id: i,
            x: Math.random() * 80 + 10, // position between 10% and 90%
            delay: Math.random() * 2, // random delay for animation
        }))
        setDrops(newDrops)
    }, [isBrewingAgain])

    const handleBrewAgain = () => {
        setIsBrewingAgain(true)
        setTimeout(() => setIsBrewingAgain(false), 100)
    }

    return (
        <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                <div className="relative mb-8 mx-auto w-64 h-64">
                    {/* Coffee cup */}
                    <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 transition-transform duration-500 ${
                            isBrewingAgain ? "rotate-0" : "-rotate-[20deg]"
                        }`}
                    >
                        <div className="relative">
                            {/* Cup */}
                            <div
                                className="w-40 h-32 bg-white rounded-b-full border-4 border-amber-900 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-amber-800/20"></div>
                                <div
                                    className="absolute bottom-0 left-0 w-full h-1/2 bg-amber-800/40 rounded-b-full"></div>
                            </div>

                            {/* Handle */}
                            <div
                                className="absolute top-6 -right-8 w-12 h-16 border-4 border-amber-900 rounded-r-full"></div>

                            {/* Cup top */}
                            <div
                                className="absolute -top-4 left-0 w-40 h-8 bg-amber-50 border-4 border-amber-900 rounded-full">
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-2 bg-amber-800/20 rounded-full"></div>
                            </div>

                            {/* 404 text in coffee */}
                            <div
                                className="absolute top-8 left-1/2 -translate-x-1/2 text-3xl font-bold text-amber-900/80">404
                            </div>
                        </div>
                    </div>

                    {/* Coffee drops */}
                    {drops.map((drop) => (
                        <div
                            key={drop.id}
                            className="absolute top-32 animate-fall opacity-0"
                            style={{
                                left: `${drop.x}%`,
                                animationDelay: `${drop.delay}s`,
                                animationDuration: "2s",
                            }}
                        >
                            <Droplets className="h-4 w-4 text-amber-800"/>
                        </div>
                    ))}

                    {/* Broken blockchain */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center">
                        <div
                            className="w-12 h-12 bg-amber-200 rounded-lg border-2 border-amber-900 flex items-center justify-center animate-wobble-left">
                            <div className="text-amber-900 font-mono font-bold">01</div>
                        </div>

                        <div className="h-1 bg-red-500 mx-1 animate-shrink-grow" style={{width: "40px"}}></div>

                        <div
                            className="w-12 h-12 bg-amber-200 rounded-lg border-2 border-amber-900 flex items-center justify-center animate-wobble-right">
                            <div className="text-amber-900 font-mono font-bold">10</div>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 animate-fade-in">
                    Oops! The Brew Overflowed
                </h1>

                <p className="text-lg text-amber-800 mb-8 animate-fade-in animation-delay-200">
                    Looks like our blockchain spilled the coffee beans! The page you&#39;re looking for has been brewed away
                    or never
                    existed.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="animate-fade-in-scale animation-delay-400">
                        <Link href="/public">
                            <Button size="lg" className="bg-amber-900 hover:bg-amber-800 text-white">
                                <Home className="mr-2 h-5 w-5"/>
                                Back to Homepage
                            </Button>
                        </Link>
                    </div>

                    <div className="animate-fade-in-scale animation-delay-600">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-amber-900 text-amber-900 hover:bg-amber-100"
                            onClick={handleBrewAgain}
                        >
                            <Coffee className="mr-2 h-5 w-5"/>
                            Brew Again
                        </Button>
                    </div>
                </div>

                <div className="mt-12 text-amber-700 text-sm animate-fade-in animation-delay-800">
                    <p>Error Code: COFFEE_CHAIN_DISCONNECTED</p>
                </div>
            </div>
        </div>
    )
}

