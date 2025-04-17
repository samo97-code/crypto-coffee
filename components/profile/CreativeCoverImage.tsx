"use client"

import type React from "react"

import {useState, useEffect} from "react"
import {motion, AnimatePresence} from "framer-motion"

interface CreativeCoverImageProps {
    username?: string
    subtitle?: string
    onEdit?: () => void
}

const CreativeCoverImage = ({username = "Coffee Enthusiast"}: CreativeCoverImageProps) => {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
    const [isHovering, setIsHovering] = useState(false)
    const [activeBeans, setActiveBeans] = useState<number[]>([])

    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const {currentTarget, clientX, clientY} = e
        const {left, top, width, height} = currentTarget.getBoundingClientRect()

        const x = (clientX - left) / width
        const y = (clientY - top) / height

        setMousePosition({x, y})
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    // Randomly activate coffee beans
    useEffect(() => {
        const interval = setInterval(() => {
            const randomBean = Math.floor(Math.random() * 8)
            setActiveBeans((prev) => {
                // Add the bean if not already active
                if (!prev.includes(randomBean)) {
                    return [...prev, randomBean]
                }
                return prev
            })

            // Remove beans after animation
            setTimeout(() => {
                setActiveBeans((prev) => prev.filter((bean) => bean !== randomBean))
            }, 3000)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="relative h-64 rounded-xl overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-coffee-700 via-coffee-600 to-coffee-500"></div>

            {/* Animated coffee pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="coffee-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path
                            d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zm0 36c-8.8 0-16-7.2-16-16S11.2 4 20 4s16 7.2 16 16-7.2 16-16 16z"
                            fill="#fff"
                        />
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#coffee-pattern)"/>
                </svg>
            </div>

            {/* Parallax coffee beans */}
            <div
                className="absolute inset-0"
                style={{
                    transform: isHovering
                        ? `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`
                        : "",
                    transition: isHovering ? "none" : "transform 0.5s ease-out",
                }}
            >
                {/* Coffee beans scattered around */}
                {[...Array(8)].map((_, i) => {
                    const isActive = activeBeans.includes(i)
                    const positions = [
                        {top: "15%", left: "10%", rotate: "25deg", delay: 0},
                        {top: "65%", left: "15%", rotate: "-15deg", delay: 0.1},
                        {top: "30%", left: "25%", rotate: "40deg", delay: 0.2},
                        {top: "70%", left: "40%", rotate: "-30deg", delay: 0.3},
                        {top: "20%", left: "60%", rotate: "15deg", delay: 0.4},
                        {top: "50%", left: "70%", rotate: "-20deg", delay: 0.5},
                        {top: "25%", left: "85%", rotate: "35deg", delay: 0.6},
                        {top: "75%", left: "90%", rotate: "-10deg", delay: 0.7},
                    ]

                    return (
                        <motion.div
                            key={i}
                            className={`absolute w-12 h-6 rounded-full border-4 ${isActive ? "border-coffee-200" : "border-white/20"}`}
                            style={{
                                top: positions[i].top,
                                left: positions[i].left,
                                transform: `rotate(${positions[i].rotate})`,
                            }}
                            animate={
                                isActive
                                    ? {
                                        scale: [1, 1.2, 1],
                                        opacity: [0.2, 0.8, 0.2],
                                    }
                                    : {}
                            }
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                                delay: positions[i].delay,
                            }}
                        />
                    )
                })}
            </div>

            {/* Steam effect */}
            <div className="absolute left-1/4 bottom-0">
                <AnimatePresence>
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bottom-0 w-4 h-4 rounded-full bg-white/10"
                            initial={{y: 0, opacity: 0}}
                            animate={{
                                y: [-20, -60 - i * 15],
                                opacity: [0, 0.6, 0],
                                x: [0, (i - 1) * 10],
                            }}
                            transition={{
                                duration: 3,
                                ease: "easeOut",
                                delay: i * 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 1,
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Sparkles */}
            <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-coffee-100 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            delay: Math.random() * 5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            {/* User info overlay - improved visibility with more space */}
            <div
                className="absolute bottom-0 left-0 h-[137px] right-0 pt-10 pb-6 px-6 bg-gradient-to-t from-coffee-900/95 via-coffee-900/80 to-transparent backdrop-blur-[2px]">
                <h2 className="text-3xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{username}</h2>
            </div>

            {/* Edit button */}
            {/*<Button*/}
            {/*    onClick={onEdit}*/}
            {/*    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"*/}
            {/*>*/}
            {/*    <Edit className="h-4 w-4 mr-2"/>*/}
            {/*    Edit Cover*/}
            {/*</Button>*/}
        </div>
    )
}

export default CreativeCoverImage
