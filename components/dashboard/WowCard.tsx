"use client"

import type React from "react"

import {FC, useState, useEffect, useRef } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Droplets, Activity } from "lucide-react"
import { cn } from "@/utils/utils"
import {IProject} from "@/types";
import {WriteContractData} from "@wagmi/core/query";
import Image from "next/image";
import BuyButton from "@/components/dashboard/card/BuyButton";

interface IProps {
    ethPrice: number
    project: IProject
    setShowSuccessModal: (b: boolean) => void
    setCurrentBuyedCoffee: (b: { explorerUrl: string; name: string; amount: string ,hash: WriteContractData }) => void,
}

const WowCard:FC<IProps>=({ethPrice,project,setShowSuccessModal, setCurrentBuyedCoffee})=> {
    const [isHovering, setIsHovering] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const buttonControls = useAnimation()

    // Mouse position for 3D effect and particles
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Transform mouse position to rotation values
    const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
    const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

    // Handle mouse movement for 3D effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        mouseX.set(x)
        mouseY.set(y)
    }

    // Reset card position when mouse leaves
    const handleMouseLeave = () => {
        setIsHovering(false)
        mouseX.set(0)
        mouseY.set(0)
    }

    // Animate button on hover
    useEffect(() => {
        if (isHovering) {
            buttonControls.start({
                scale: [1, 1.05, 1],
                transition: {
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                },
            })
        } else {
            buttonControls.stop()
            buttonControls.set({ scale: 1 })
        }
    }, [isHovering, buttonControls])

    return (
        <div className="relative perspective-1000 w-full max-w-xs mx-auto">
            {/* Ambient glow effect */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-r from-coffee-700/30 via-amber-500/20 dark:from-coffee-50 dark:via-coffee-50 dark:to-coffee-50 to-coffee-500/30 rounded-2xl blur-xl transition-all duration-700",
                    isHovering ? "opacity-70 scale-110" : "opacity-0 scale-100",
                )}
            />

            {/* Main card - REDUCED HEIGHT by removing coffee cup */}
            <motion.div
                ref={cardRef}
                className="relative bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-700 dark:from-coffee-50 dark:via-coffee-100 dark:to-coffee-50 rounded-2xl p-[20px] shadow-2xl border border-coffee-600/50 overflow-hidden group"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Crypto+Coffee background - 70% crypto, 30% coffee */}
                <div className="absolute inset-0 bg-[url('/crypto-coffee-bg.jpg')] bg-cover opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
                {/*crypto-coffee-bg.jpg*/}

                <div className="absolute inset-0 bg-gradient-to-br from-coffee-800/80 via-transparent to-coffee-700/80 dark:from-coffee-100/30 dark:via-transparent dark:to-coffee-200/20" />

                {/* Animated gradient overlay */}
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-br from-coffee-600/10 via-coffee-500/5 to-coffee-400/10 transition-all duration-700 animate-gradient-shift",
                        isHovering ? "opacity-40" : "opacity-0",
                    )}
                />

                {/* Card content wrapper - for 3D effect */}
                <div className="relative" style={{ transform: "translateZ(50px)" }}>
                    {/* Header section */}
                    <div className="relative mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            {/* Ethereum logo with glow */}
                            <div className="relative mr-3">
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-amber-500/50 rounded-full blur-xl scale-150 transition-opacity duration-700",
                                        isHovering ? "opacity-70" : "opacity-0",
                                    )}
                                />
                                <div
                                    className="bg-gradient-to-br from-coffee-700 to-coffee-800 p-1 rounded-xl shadow-lg relative">
                                    <div className="relative min-w-10 min-h-10">
                                        <Image src={project.icon_url || "/placeholder.svg"} alt={project.name} fill
                                               className="rounded-full"/>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <h3 className="truncate text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-coffee-200 to-amber-300">
                                        {project.name}
                                    </h3>
                                    {
                                        project.is_new && <div
                                            className="ml-2 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-coffee-500 text-white text-xs font-bold rounded-full shadow-lg">
                                          New
                                        </div>
                                    }

                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center">
                                            <Activity className="w-4 h-4 text-amber-400 mr-1.5" />
                                            <span className="text-xs font-medium text-coffee-300 dark:text-coffee-700">Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NEW MIDDLE SECTION WITH STATS */}
                    <div className="mb-4 gap-3" style={{transform: "translateZ(40px)"}}>
                        <div className="bg-coffee-800/50 dark:bg-coffee-600/50 backdrop-blur-sm rounded-xl p-1.5 px-2.5 border border-coffee-600/30 min-h-[46px]">
                            <p className="text-coffee-400 dark:text-coffee-200 text-xs text-ellipsis line-clamp-2">{project.description}</p>
                        </div>
                    </div>


                    {/* Button with advanced hover effects */}
                    <BuyButton
                        isHovering={isHovering}
                        buttonControls={buttonControls}
                        ethPrice={ethPrice}
                        project={project}
                        setShowSuccessModal={setShowSuccessModal}
                        setCurrentBuyedCoffee={setCurrentBuyedCoffee}
                    />

                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2" style={{transform: "translateZ(30px)"}}>
                        <motion.div
                            animate={{
                                rotate: [0, 15, -15, 0],
                                scale: [1, 1.1, 0.9, 1],
                            }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 5,
                                ease: "easeInOut",
                            }}
                        >
                            <Droplets className="w-5 h-5 text-coffee-400" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default WowCard
