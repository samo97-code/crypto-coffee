import {FC, useState, useEffect} from "react"
import {motion} from "framer-motion"
import {Coffee, Zap, HandIcon as HandRock, Sparkles} from 'lucide-react'
import {cn} from "@/utils/utils"

interface IProps {
    startNewGame: () => void
}


const CreativeGameButton: FC<IProps> = ({startNewGame}) => {
    const [isHovering, setIsHovering] = useState(false)
    const [sparklePositions, setSparklePositions] = useState<Array<{
        x: number;
        y: number;
        size: number;
        delay: number
    }>>([])

    // Generate random sparkle positions
    useEffect(() => {
        if (isHovering) {
            const newPositions = Array.from({length: 12}, () => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 0.5 + 0.5,
                delay: Math.random() * 0.5,
            }))
            setSparklePositions(newPositions)
        }
    }, [isHovering])

    return (
        <div className="my-8 flex justify-center">
            <div className="relative">
                {/* Glow effect */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-full blur-xl transition-opacity duration-1000",
                        "bg-gradient-to-r from-coffee-400/40 via-amber-400/40 to-coffee-600/40",
                        isHovering ? "opacity-100" : "opacity-0"
                    )}
                />

                {/* Sparkles */}
                {isHovering &&
                    sparklePositions.map((pos, i) => (
                        <motion.div
                            key={i}
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: [0, 1, 0], scale: [0, pos.size, 0]}}
                            transition={{
                                duration: 1.5,
                                delay: pos.delay,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 2,
                            }}
                            className="absolute text-amber-300"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                zIndex: 1,
                            }}
                        >
                            <Sparkles className="h-3 w-3"/>
                        </motion.div>
                    ))}

                {/* Main button */}
                <motion.button
                    className={cn(
                        "relative z-10 group flex items-center justify-center gap-2 px-4 py-2",
                        "bg-gradient-to-br from-coffee-400 via-coffee-500 to-coffee-600 dark:from-coffee-50 dark:via-coffee-100 dark:to-coffee-100",
                        "rounded-full text-white font-bold text-lg shadow-xl",
                        "border-2 border-coffee-600/50",
                        "transition-all duration-300 overflow-hidden"
                    )}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{scale: 0.98}}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                    onClick={() => startNewGame()}
                >
                    {/* Background beans animation */}
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="absolute h-8 w-8 rounded-full border-2 border-white top-0 left-[10%] animate-float-slow"/>
                        <div
                            className="absolute h-6 w-6 rounded-full border-2 border-white bottom-0 right-[20%] animate-float-slow animation-delay-300"/>
                        <div
                            className="absolute h-5 w-5 rounded-full border-2 border-white top-[20%] right-[10%] animate-float-slow animation-delay-700"/>
                    </div>

                    {/* Button content */}
                    <div className="relative flex items-center gap-3">
                        {/* Icon container with animations */}
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{opacity: 1, rotateY: 0}}
                                animate={isHovering ? {opacity: 0, rotateY: 90} : {opacity: 1, rotateY: 0}}
                                transition={{duration: 0.3}}
                            >
                                <Coffee className="h-6 w-6"/>
                            </motion.div>
                            <motion.div
                                className="flex items-center justify-center"
                                initial={{opacity: 0, rotateY: -90}}
                                animate={isHovering ? {opacity: 1, rotateY: 0} : {opacity: 0, rotateY: -90}}
                                transition={{duration: 0.3}}
                            >
                                <HandRock className="h-6 w-6"/>
                            </motion.div>
                        </div>

                        {/* Text with slide-up effect */}
                        <div className="overflow-hidden h-7">
                            <motion.div
                                initial={{y: 0}}
                                animate={isHovering ? {y: -30} : {y: 0}}
                                transition={{duration: 0.3, ease: "easeInOut"}}
                                className="flex flex-col items-start"
                            >
                                <span>Start Game</span>
                                <span className="flex items-center gap-1 text-amber-200">
                  Let&#39;s Play <Zap className="h-4 w-4"/>
                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Shine effect */}
                    <div
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
                </motion.button>

                {/* Bottom glow reflection */}
                <div
                    className={cn(
                        "absolute h-1.5 w-[80%] mx-auto left-0 right-0 bottom-0",
                        "bg-gradient-to-r from-coffee-400/0 via-amber-400/50 to-coffee-600/0",
                        "rounded-full blur-sm transition-opacity duration-500",
                        isHovering ? "opacity-100" : "opacity-0"
                    )}
                />
            </div>
        </div>
    )
}

export default CreativeGameButton
