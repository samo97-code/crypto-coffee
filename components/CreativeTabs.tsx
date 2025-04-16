"use client"

import { useState, useEffect } from "react"
import { Coffee, Zap, Beaker } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NetworkTabsProps {
    counts: {
        all: number
        mainnet: number
        testnet: number
    }
    onTabChange?: (tab: string) => void
    initialTab?: string
}

export function CreativeNetworkTabs({
                                        counts = { all: 18, mainnet: 16, testnet: 2 },
                                        onTabChange,
                                        initialTab = "all",
                                    }: NetworkTabsProps) {
    const [activeTab, setActiveTab] = useState(initialTab)
    const [hoverTab, setHoverTab] = useState<string | null>(null)

    // Particle animation for the active tab
    const [particles, setParticles] = useState<
        Array<{ x: number; y: number; size: number; speed: number; opacity: number }>
    >([])

    useEffect(() => {
        // Generate particles for animation
        const newParticles = Array.from({ length: 12 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 3,
            speed: 0.2 + Math.random() * 0.5,
            opacity: 0.3 + Math.random() * 0.7,
        }))
        setParticles(newParticles)

        // Animate particles
        const interval = setInterval(() => {
            setParticles((prev) =>
                prev
                    .map((particle) => ({
                        ...particle,
                        y: particle.y - particle.speed,
                        opacity: particle.y < 10 ? particle.opacity * 0.95 : particle.opacity,
                        x: particle.x + (Math.random() - 0.5) * 0.5,
                    }))
                    .filter((p) => p.opacity > 0.05),
            )
        }, 50)

        return () => clearInterval(interval)
    }, [activeTab])

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        if (onTabChange) {
            onTabChange(tab)
        }

        // Regenerate particles on tab change
        const newParticles = Array.from({ length: 12 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 3,
            speed: 0.2 + Math.random() * 0.5,
            opacity: 0.3 + Math.random() * 0.7,
        }))
        setParticles(newParticles)
    }

    const tabs = [
        {
            id: "all",
            label: "All",
            icon: Coffee,
            count: counts.all,
            gradient: "from-coffee-600 to-coffee-800",
            hoverGradient: "from-coffee-500 to-coffee-700",
            bgLight: "bg-coffee-50",
            bgDark: "bg-coffee-100",
        },
        {
            id: "mainnet",
            label: "Mainnet",
            icon: Zap,
            count: counts.mainnet,
            gradient: "from-blue-600 to-indigo-700",
            hoverGradient: "from-blue-500 to-indigo-600",
            bgLight: "bg-blue-50",
            bgDark: "bg-blue-100",
        },
        {
            id: "testnet",
            label: "Testnet",
            icon: Beaker,
            count: counts.testnet,
            gradient: "from-rose-600 to-pink-700",
            hoverGradient: "from-rose-500 to-pink-600",
            bgLight: "bg-rose-50",
            bgDark: "bg-rose-100",
        },
    ]

    return (
        <div className="relative mb-8 z-10">
            <div className="flex justify-center">
                <div className="inline-flex p-1.5 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-coffee-100">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        const isHovered = hoverTab === tab.id

                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                onMouseEnter={() => setHoverTab(tab.id)}
                                onMouseLeave={() => setHoverTab(null)}
                                className={`relative flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 ${
                                    isActive ? "text-white" : "text-coffee-800 hover:text-coffee-900"
                                } ${isActive ? "" : "hover:bg-coffee-50"}`}
                            >
                                {/* Background gradient for active tab */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabBackground"
                                        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${tab.gradient}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                {/* Particles for active tab */}
                                {isActive && (
                                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                                        {particles.map((particle, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute rounded-full bg-white"
                                                style={{
                                                    width: `${particle.size}px`,
                                                    height: `${particle.size}px`,
                                                    left: `${particle.x}%`,
                                                    top: `${particle.y}%`,
                                                    opacity: particle.opacity,
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: particle.opacity }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Icon and label */}
                                <div className="relative flex items-center">
                                    <tab.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-coffee-700"} mr-2`} />
                                    <span className="font-medium">{tab.label}</span>

                                    {/* Count badge */}
                                    <div
                                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                                            isActive ? "bg-white/20 text-white" : `${tab.bgDark} text-coffee-800`
                                        }`}
                                    >
                                        {tab.count}
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <AnimatePresence>
                                    {isHovered && !isActive && (
                                        <motion.div
                                            className="absolute inset-0 rounded-lg opacity-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.07 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                background: `linear-gradient(to bottom right, var(--coffee-300), var(--coffee-400))`,
                                            }}
                                        />
                                    )}
                                </AnimatePresence>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-coffee-100/50 blur-sm" />
            <div className="absolute -bottom-3 -left-1 w-4 h-4 rounded-full bg-coffee-100/30 blur-sm" />
        </div>
    )
}
