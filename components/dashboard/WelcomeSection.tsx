"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Coffee, TrendingUp, Users } from "lucide-react"

export function WelcomeSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const controls = useAnimation()

    // For coffee beans animation
    const [coffeeBeans, setCoffeeBeans] = useState<
        Array<{
            id: number
            x: number
            y: number
            size: number
            rotation: number
            delay: number
        }>
    >([])

    // For steam animation
    const [steamParticles, setSteamParticles] = useState<
        Array<{
            id: number
            x: number
            delay: number
        }>
    >([])

    // Generate coffee beans and steam particles
    useEffect(() => {
        // Generate coffee beans
        const beans = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 16 + 8,
            rotation: Math.random() * 360,
            delay: Math.random() * 5,
        }))
        setCoffeeBeans(beans)

        // Generate steam particles
        const steam = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: 30 + Math.random() * 40, // Position steam in the middle area
            delay: Math.random() * 3,
        }))
        setSteamParticles(steam)

        // Start background animation
        controls.start({
            backgroundPosition: ["0% 0%", "100% 100%"],
            transition: {
                duration: 20,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
            },
        })
    }, [controls])

    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return

        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setMousePosition({ x, y })
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    return (
        <div className="space-y-8">
            {/* Welcome Card with creative cover image */}
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden rounded-2xl shadow-lg"
            >
                {/* Creative Cover Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    {/* Base gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-coffee-800 via-coffee-700 to-coffee-600"></div>

                    {/* Animated coffee pattern overlay */}
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0zm0 53.8c-13.1 0-23.8-10.7-23.8-23.8S16.9 6.2 30 6.2 53.8 16.9 53.8 30 43.1 53.8 30 53.8z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                            backgroundSize: "60px 60px",
                        }}
                    />

                    {/* Animated coffee beans */}
                    {coffeeBeans.map((bean) => (
                        <motion.div
                            key={bean.id}
                            className="absolute"
                            style={{
                                left: `${bean.x}%`,
                                top: `${bean.y}%`,
                                width: `${bean.size}px`,
                                height: `${bean.size / 2}px`,
                            }}
                            initial={{ opacity: 0, rotate: bean.rotation }}
                            animate={{
                                opacity: [0, 0.4, 0.4, 0],
                                rotate: bean.rotation + 360,
                                y: [0, -20, -40],
                            }}
                            transition={{
                                duration: 10 + Math.random() * 5,
                                delay: bean.delay,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-full h-full rounded-full border-2 border-coffee-100/50 transform rotate-45"></div>
                        </motion.div>
                    ))}

                    {/* Animated coffee cup with liquid */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                        <motion.div
                            className="relative w-40 h-40"
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Cup */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-coffee-900/80 rounded-b-full border-2 border-coffee-200/70 overflow-hidden">
                                {/* Coffee liquid */}
                                <motion.div
                                    className="absolute w-full h-16 bg-coffee-600"
                                    style={{ top: "20%" }}
                                    animate={{
                                        y: [-2, 2, -2],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {/* Coffee surface details */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-2 bg-coffee-500/50"
                                        animate={{
                                            x: [-5, 5, -5],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </motion.div>
                            </div>

                            {/* Cup handle */}
                            <div className="absolute bottom-8 -right-6 w-8 h-14 border-2 border-coffee-200/70 rounded-r-full"></div>

                            {/* Cup top */}
                            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-coffee-900/80 border-2 border-coffee-200/70 rounded-full"></div>

                            {/* Steam */}
                            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
                                {steamParticles.map((particle) => (
                                    <motion.div
                                        key={particle.id}
                                        className="absolute bottom-0 w-3 h-3"
                                        style={{
                                            left: `${(particle.x - 30) / 2}px`,
                                        }}
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{
                                            opacity: [0, 0.7, 0],
                                            y: [-10, -60, -100],
                                            x: [0, Math.sin(particle.id) * 15],
                                        }}
                                        transition={{
                                            duration: 4,
                                            delay: particle.delay,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <div className="w-full h-full rounded-full bg-white/80 blur-sm"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative coffee beans scattered around */}
                    <div className="absolute inset-0">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={`bean-large-${i}`}
                                className="absolute w-16 h-8 rounded-full"
                                style={{
                                    top: `${15 + i * 15}%`,
                                    left: `${10 + i * 20}%`,
                                    transform: `rotate(${i * 45}deg)`,
                                    opacity: 0.15,
                                    border: "2px solid rgba(255, 255, 255, 0.3)",
                                }}
                                animate={{
                                    rotate: 360 + i * 45,
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </div>

                    {/* Animated coffee splashes */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <g filter="url(#glow)">
                            <motion.path
                                d="M0,50 Q50,0 100,50 T200,50 T300,50 T400,50"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="2"
                                initial={{ pathLength: 0, pathOffset: 0 }}
                                animate={{ pathLength: 1, pathOffset: 1 }}
                                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            <motion.path
                                d="M0,70 Q50,20 100,70 T200,70 T300,70 T400,70"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.15)"
                                strokeWidth="2"
                                initial={{ pathLength: 0, pathOffset: 0 }}
                                animate={{ pathLength: 1, pathOffset: 1 }}
                                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 2 }}
                            />
                        </g>
                    </svg>

                    {/* Floating coffee particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute rounded-full bg-coffee-200/30"
                            style={{
                                width: 2 + Math.random() * 4,
                                height: 2 + Math.random() * 4,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20 - Math.random() * 30],
                                opacity: [0, 0.8, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}

                    {/* Overlay text */}
                    <div
                        className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 bg-gradient-to-t from-coffee-900/80 via-coffee-800/50 to-transparent">
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Bitcoin Price */}
                                <motion.div
                                    className="group bg-coffee-50 p-6 rounded-xl border border-coffee-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5, delay: 0.3}}
                                    whileHover={{scale: 1.02}}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-coffee-100 rounded-full">
                                                <svg
                                                    className="h-5 w-5 text-coffee-800"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9.5 2C9.5 1.44772 9.94772 1 10.5 1H13.5C14.0523 1 14.5 1.44772 14.5 2V3.5H9.5V2Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M7.5 4C7.5 3.44772 7.94772 3 8.5 3H15.5C16.0523 3 16.5 3.44772 16.5 4V5.5H7.5V4Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M14.5 14C14.5 15.1046 13.6046 16 12.5 16C11.3954 16 10.5 15.1046 10.5 14C10.5 12.8954 11.3954 12 12.5 12C13.6046 12 14.5 12.8954 14.5 14Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.5 8C4.5 6.34315 5.84315 5 7.5 5H16.5C18.1569 5 19.5 6.34315 19.5 8V18C19.5 19.6569 18.1569 21 16.5 21H7.5C5.84315 21 4.5 19.6569 4.5 18V8ZM7.5 8C7.5 7.44772 7.94772 7 8.5 7H16.5C17.0523 7 17.5 7.44772 17.5 8V18C17.5 18.5523 17.0523 19 16.5 19H7.5C6.94772 19 6.5 18.5523 6.5 18V8Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-coffee-800 font-medium">Bitcoin Price</div>
                                        </div>
                                        <div
                                            className="text-xs font-medium px-2 py-1 bg-coffee-100 rounded-full text-coffee-800">24h
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <motion.div
                                            className="text-3xl font-bold text-coffee-900 group-hover:scale-105 transition-transform"
                                            initial={{scale: 0.8}}
                                            animate={{scale: 1}}
                                            transition={{duration: 0.5, delay: 0.5}}
                                        >
                                            $82,247
                                        </motion.div>
                                        <div className="flex items-center text-red-500 text-sm font-medium">
                                            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4L4 12H9V20H15V12H20L12 4Z" fill="currentColor"
                                                      transform="rotate(180 12 12)"/>
                                            </svg>
                                            <span>-4.93% today</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-red-500 to-red-400"
                                            initial={{width: "0%"}}
                                            animate={{width: "30%"}}
                                            transition={{duration: 1, delay: 0.7}}
                                        ></motion.div>
                                    </div>
                                </motion.div>

                                {/* Coffee Chains */}
                                <motion.div
                                    className="group bg-coffee-50 p-6 rounded-xl border border-coffee-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5, delay: 0.4}}
                                    whileHover={{scale: 1.02}}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-coffee-100 rounded-full">
                                                <Coffee className="h-5 w-5 text-coffee-800"/>
                                            </div>
                                            <div className="text-coffee-800 font-medium">Coffee Chains</div>
                                        </div>
                                        <div
                                            className="text-xs font-medium px-2 py-1 bg-coffee-100 rounded-full text-coffee-800">Networks
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <motion.div
                                            className="text-3xl font-bold text-coffee-900 group-hover:scale-105 transition-transform"
                                            initial={{scale: 0.8}}
                                            animate={{scale: 1}}
                                            transition={{duration: 0.5, delay: 0.6}}
                                        >
                                            18
                                        </motion.div>
                                        <div className="flex items-center text-coffee-700 text-sm font-medium">
                                            <Coffee className="h-4 w-4 mr-1"/>
                                            <span>Soon more</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex -space-x-2">
                                        <AnimatePresence>
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-6 h-6 rounded-full bg-gradient-to-br from-coffee-400 to-coffee-600 border border-white flex items-center justify-center text-[10px] text-white font-bold"
                                                    initial={{opacity: 0, x: -10}}
                                                    animate={{opacity: 1, x: 0}}
                                                    transition={{duration: 0.3, delay: 0.8 + i * 0.1}}
                                                >
                                                    {String.fromCharCode(65 + i)}
                                                </motion.div>
                                            ))}
                                            <motion.div
                                                className="w-6 h-6 rounded-full bg-coffee-100 border border-white flex items-center justify-center text-[10px] text-coffee-800 font-bold"
                                                initial={{opacity: 0, x: -10}}
                                                animate={{opacity: 1, x: 0}}
                                                transition={{duration: 0.3, delay: 1.3}}
                                            >
                                                +13
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </motion.div>

                                {/* Daily Supporters */}
                                <motion.div
                                    className="group bg-coffee-50 p-6 rounded-xl border border-coffee-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5, delay: 0.5}}
                                    whileHover={{scale: 1.02}}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-coffee-100 rounded-full">
                                                <Users className="h-5 w-5 text-coffee-800"/>
                                            </div>
                                            <div className="text-coffee-800 font-medium">Daily Supporters</div>
                                        </div>
                                        <div
                                            className="text-xs font-medium px-2 py-1 bg-coffee-100 rounded-full text-coffee-800">Active
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <motion.div
                                            className="text-3xl font-bold text-coffee-900 group-hover:scale-105 transition-transform"
                                            initial={{scale: 0.8}}
                                            animate={{scale: 1}}
                                            transition={{duration: 0.5, delay: 0.7}}
                                        >
                                            1,234
                                        </motion.div>
                                        <div className="flex items-center text-green-600 text-sm font-medium">
                                            <TrendingUp className="h-4 w-4 mr-1"/>
                                            <span>+42 today</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex -space-x-2 overflow-hidden">
                                        <AnimatePresence>
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-8 h-8 rounded-full bg-coffee-100 border-2 border-white flex items-center justify-center text-xs text-coffee-800 font-medium"
                                                    initial={{opacity: 0, x: -10}}
                                                    animate={{opacity: 1, x: 0}}
                                                    transition={{duration: 0.3, delay: 0.9 + i * 0.1}}
                                                >
                                                    {`U${i + 1}`}
                                                </motion.div>
                                            ))}
                                            <motion.div
                                                className="w-8 h-8 rounded-full bg-coffee-50 border-2 border-white flex items-center justify-center text-xs text-coffee-800 font-medium"
                                                initial={{opacity: 0, x: -10}}
                                                animate={{opacity: 1, x: 0}}
                                                transition={{duration: 0.3, delay: 1.5}}
                                            >
                                                +1.2k
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </div>

                            {/* CTA Button */}
                            <div className="flex justify-center md:justify-start">
                                <motion.button
                                    className="relative overflow-hidden group bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5, delay: 0.8}}
                                >
                                    <motion.div
                                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-coffee-400 to-coffee-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"
                                        initial={{scaleX: 0}}
                                        whileHover={{scaleX: 1}}
                                        transition={{duration: 0.3}}
                                    ></motion.div>
                                    <span className="relative flex items-center">
                <Coffee className="mr-2 h-5 w-5"/>
                Brew More Support
                <motion.svg
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{x: 0}}
                    whileHover={{x: 5}}
                    transition={{duration: 0.3}}
                >
                  <path
                      d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z"
                      fill="currentColor"
                  />
                </motion.svg>
              </span>
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Decorative coffee rings */}
                    <div className="absolute bottom-5 right-5">
                        <motion.div
                            className="w-16 h-16 rounded-full border-2 border-coffee-200/20"
                            initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 0.3}}
                            transition={{duration: 1, delay: 1}}
                        />
                    </div>
                    <div className="absolute top-10 left-10">
                        <motion.div
                            className="w-20 h-20 rounded-full border-2 border-coffee-200/20"
                            initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 0.2}}
                            transition={{duration: 1, delay: 1.5}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
