"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Coffee, Home, Zap, Bitcoin, ArrowRight, Droplets, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()
    const [gameActive, setGameActive] = useState(false)
    const [gameScore, setGameScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [coffeeBeans, setCoffeeBeans] = useState<Array<{ id: number; x: number; y: number; rotation: number }>>([])
    const [cryptoCoins, setCryptoCoins] = useState<Array<{ id: number; x: number; y: number; type: string }>>([])
    const [cupPosition, setCupPosition] = useState(50)
    const [errorMessages, setErrorMessages] = useState<string[]>([
        "404: PAGE_NOT_FOUND",
        "COFFEE_CHAIN_DISCONNECTED",
        "VALIDATION_FAILED",
        "BLOCKCHAIN_OVERFLOW",
    ])
    const [currentMessage, setCurrentMessage] = useState(0)
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const [clickCount, setClickCount] = useState(0)
    const [raindrops, setRaindrops] = useState<Array<{ id: number; x: number; y: number; speed: number }>>([])
    const [showPortal, setShowPortal] = useState(false)
    const [portalEnergy, setPortalEnergy] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const gameIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const raindropIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 })
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 })
    const rotateX = useTransform(smoothMouseY, [0, 1000], [10, -10])
    const rotateY = useTransform(smoothMouseX, [0, 1000], [-10, 10])
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [secretCode, setSecretCode] = useState<string[]>([])
    const konami = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ]

    // Track mouse position for 3D effect
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return

        const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
        }
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)

        // Update cup position for game
        if (gameActive) {
            const newPosition = ((e.clientX - left) / width) * 100
            setCupPosition(Math.max(10, Math.min(90, newPosition)))
        }
    }

    // Initialize dimensions
    useEffect(() => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            })
        }

        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                })
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Keyboard listener for secret code
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setSecretCode((prev) => {
                const newCode = [...prev, e.key]
                if (newCode.length > konami.length) {
                    newCode.shift()
                }

                // Check if code matches konami
                if (newCode.join("") === konami.join("")) {
                    setShowEasterEgg(true)
                    return []
                }

                return newCode
            })
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Initialize coffee rain
    useEffect(() => {
        if (!gameActive) {
            const createRaindrop = () => {
                const newDrops = Array.from({ length: 2 }, (_, i) => ({
                    id: Date.now() + i,
                    x: Math.random() * 100,
                    y: -10,
                    speed: Math.random() * 2 + 1,
                }))

                setRaindrops((prev) => [...prev, ...newDrops])
            }

            raindropIntervalRef.current = setInterval(createRaindrop, 300)

            return () => {
                if (raindropIntervalRef.current) {
                    clearInterval(raindropIntervalRef.current)
                }
            }
        }
    }, [gameActive])

    // Animate raindrops
    useEffect(() => {
        if (!gameActive && raindrops.length > 0) {
            const interval = setInterval(() => {
                setRaindrops((prev) =>
                    prev
                        .map((drop) => ({
                            ...drop,
                            y: drop.y + drop.speed,
                        }))
                        .filter((drop) => drop.y < 110),
                )
            }, 50)

            return () => clearInterval(interval)
        }
    }, [raindrops, gameActive])

    // Game logic
    useEffect(() => {
        if (gameActive && !gameOver) {
            // Create falling objects
            const createFallingObjects = () => {
                // Create coffee beans
                if (Math.random() > 0.7) {
                    const newBean = {
                        id: Date.now(),
                        x: Math.random() * 80 + 10,
                        y: -10,
                        rotation: Math.random() * 360,
                    }
                    setCoffeeBeans((prev) => [...prev, newBean])
                }

                // Create crypto coins
                if (Math.random() > 0.85) {
                    const newCoin = {
                        id: Date.now() + 1000,
                        x: Math.random() * 80 + 10,
                        y: -10,
                        type: Math.random() > 0.5 ? "bitcoin" : "ethereum",
                    }
                    setCryptoCoins((prev) => [...prev, newCoin])
                }
            }

            // Move falling objects
            const moveFallingObjects = () => {
                // Move beans
                setCoffeeBeans((prev) =>
                    prev
                        .map((bean) => ({
                            ...bean,
                            y: bean.y + 2,
                            rotation: bean.rotation + 5,
                        }))
                        .filter((bean) => {
                            // Check if bean is caught
                            if (bean.y > 80 && bean.y < 90 && bean.x > cupPosition - 10 && bean.x < cupPosition + 10) {
                                setGameScore((score) => score + 1)
                                return false
                            }

                            // Remove if out of screen
                            return bean.y < 110
                        }),
                )

                // Move coins
                setCryptoCoins((prev) =>
                    prev
                        .map((coin) => ({
                            ...coin,
                            y: coin.y + 3,
                        }))
                        .filter((coin) => {
                            // Check if coin is caught
                            if (coin.y > 80 && coin.y < 90 && coin.x > cupPosition - 10 && coin.x < cupPosition + 10) {
                                setGameScore((score) => score + 5)
                                setPortalEnergy((energy) => Math.min(100, energy + 10))
                                return false
                            }

                            // Remove if out of screen
                            return coin.y < 110
                        }),
                )
            }

            // Game loop
            gameIntervalRef.current = setInterval(() => {
                createFallingObjects()
                moveFallingObjects()

                // End game after 30 seconds
                if (gameScore > 50) {
                    setShowPortal(true)
                }
            }, 100)

            return () => {
                if (gameIntervalRef.current) {
                    clearInterval(gameIntervalRef.current)
                }
            }
        }
    }, [gameActive, gameOver, cupPosition, gameScore])

    // Handle portal activation
    useEffect(() => {
        if (portalEnergy >= 100) {
            setShowPortal(true)
        }
    }, [portalEnergy])

    // Handle title click for easter egg
    const handleTitleClick = () => {
        setClickCount((prev) => prev + 1)
        if (clickCount >= 4) {
            setShowEasterEgg(true)
        }

        // Cycle error messages
        setCurrentMessage((prev) => (prev + 1) % errorMessages.length)
    }

    // Start the game
    const startGame = () => {
        setGameActive(true)
        setGameScore(0)
        setGameOver(false)
        setCoffeeBeans([])
        setCryptoCoins([])
        setPortalEnergy(0)
        setShowPortal(false)
    }

    // Enter portal
    const enterPortal = () => {
        router.push("/")
    }

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 flex flex-col items-center justify-center p-4 overflow-hidden relative"
            onMouseMove={handleMouseMove}
        >
            {/* 3D Card */}
            <div
                className="relative max-w-3xl w-full bg-coffee-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-coffee-700/50 shadow-2xl"
            >
                {/* Glowing edges */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-coffee-500/20 via-transparent to-coffee-300/20 opacity-50" />

                {/* Content */}
                <div className="relative p-8 md:p-12">
                    {/* 404 Title */}
                    <motion.div className="mb-8 text-center" onClick={handleTitleClick}>
                        <motion.div
                            className="cursor-pointer inline-block text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-coffee-300 via-amber-200 to-coffee-300"
                            animate={{
                                textShadow: [
                                    "0 0 20px rgba(193, 154, 107, 0.5)",
                                    "0 0 40px rgba(193, 154, 107, 0.3)",
                                    "0 0 20px rgba(193, 154, 107, 0.5)",
                                ],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                            404
                        </motion.div>

                        <motion.div
                            className="text-xl text-coffee-300/80 font-mono mt-2"
                            animate={{
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        >
                            {errorMessages[currentMessage]}
                        </motion.div>
                    </motion.div>

                    {/* Main content */}
                    {!gameActive ? (
                        <div className="text-center">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-coffee-100 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Blockchain Interrupted
                            </motion.h2>

                            <motion.p
                                className="text-coffee-200 text-lg mb-8 max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Looks like our blockchain spilled the coffee beans! The page you're looking for has been brewed away or
                                never existed in the first place.
                            </motion.p>

                            <motion.p
                                className="text-coffee-200 text-lg mb-8 max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                It's a place to buy coffee not tea :)
                            </motion.p>

                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                    <Link href="/">
                                        <motion.button
                                            className="px-6 py-3 bg-gradient-to-r from-coffee-600 to-coffee-500 text-white rounded-lg font-medium flex items-center gap-2 group"
                                            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Home className="h-5 w-5" />
                                            Return Home
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
                                                className="inline-block"
                                            >
                                                <ArrowRight className="h-4 w-4" />
                                            </motion.span>
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Coffee cup illustration */}
                            <motion.div
                                className="relative w-40 h-40 mx-auto"
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            >
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                                    {/* Cup */}
                                    <div className="absolute w-32 h-24 bg-coffee-200 rounded-b-full border-4 border-coffee-400 overflow-hidden">
                                        {/* Coffee liquid */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-coffee-600 to-coffee-700"
                                            style={{ height: "60%" }}
                                            animate={{
                                                height: ["60%", "65%", "60%"],
                                            }}
                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                        >
                                            {/* 404 text in coffee */}
                                            <motion.div
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-coffee-900/60"
                                                animate={{
                                                    y: [0, -2, 0],
                                                }}
                                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                            >
                                                404
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Handle */}
                                    <div className="absolute top-4 -right-6 w-8 h-12 border-4 border-coffee-400 rounded-r-full" />

                                    {/* Steam */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-10 overflow-hidden">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute bottom-0 left-1/2 w-3 h-12 bg-gradient-to-t from-coffee-100/0 via-coffee-100/30 to-coffee-100/0"
                                                style={{
                                                    x: `${(i - 1) * 8}px`,
                                                    translateX: "-50%",
                                                    borderRadius: "50%",
                                                }}
                                                animate={{
                                                    y: [-40, -80],
                                                    opacity: [0, 0.7, 0],
                                                    scale: [0.8, 1.2, 0.5],
                                                }}
                                                transition={{
                                                    duration: 2 + i * 0.5,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="text-center">
                            {/* Game UI */}
                            <div className="mb-4 flex justify-between items-center">
                                <div className="text-coffee-100">
                                    <span className="text-sm">Score:</span>
                                    <motion.span
                                        className="text-xl font-bold ml-2"
                                        key={gameScore}
                                        initial={{ scale: 1 }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {gameScore}
                                    </motion.span>
                                </div>

                                <motion.button
                                    className="p-2 rounded-full bg-coffee-700/50 text-coffee-100"
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(120, 80, 40, 0.7)" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setGameActive(false)}
                                >
                                    <X size={20} />
                                </motion.button>

                                <div className="text-coffee-100">
                                    <span className="text-sm">Portal Energy:</span>
                                    <div className="w-24 h-3 bg-coffee-700/50 rounded-full overflow-hidden ml-2">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-amber-400 to-amber-300"
                                            style={{ width: `${portalEnergy}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Game area */}
                            <div className="relative h-80 border-2 border-coffee-600/30 rounded-lg bg-coffee-900/30 overflow-hidden">
                                {/* Falling coffee beans */}
                                {coffeeBeans.map((bean) => (
                                    <motion.div
                                        key={bean.id}
                                        className="absolute w-6 h-4 bg-coffee-400 rounded-full"
                                        style={{
                                            left: `${bean.x}%`,
                                            top: `${bean.y}%`,
                                            rotate: `${bean.rotation}deg`,
                                            borderRadius: "50% 50% 50% 0",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-coffee-600 rounded-full scale-[0.6] transform-gpu" />
                                    </motion.div>
                                ))}

                                {/* Falling crypto coins */}
                                {cryptoCoins.map((coin) => (
                                    <motion.div
                                        key={coin.id}
                                        className="absolute w-6 h-6 flex items-center justify-center"
                                        style={{
                                            left: `${coin.x}%`,
                                            top: `${coin.y}%`,
                                        }}
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    >
                                        {coin.type === "bitcoin" ? (
                                            <Bitcoin className="text-amber-400" size={24} />
                                        ) : (
                                            <div className="text-blue-400">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2L5 12L12 16L19 12L12 2Z" fill="currentColor" />
                                                    <path d="M12 16L5 12L12 22L19 12L12 16Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Player's coffee cup */}
                                <motion.div
                                    className="absolute bottom-4 w-16 h-16"
                                    style={{ left: `calc(${cupPosition}% - 32px)` }}
                                    animate={{ rotate: [0, cupPosition > 50 ? 5 : -5, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="relative w-full h-full">
                                        {/* Cup */}
                                        <div className="absolute w-16 h-12 bg-coffee-200 rounded-b-full border-2 border-coffee-400 overflow-hidden">
                                            {/* Coffee liquid */}
                                            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-b from-coffee-600 to-coffee-700" />
                                        </div>

                                        {/* Handle */}
                                        <div className="absolute top-2 -right-3 w-4 h-6 border-2 border-coffee-400 rounded-r-full" />
                                    </div>
                                </motion.div>

                                {/* Portal */}
                                <AnimatePresence>
                                    {showPortal && (
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1, rotate: [0, 360] }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ duration: 1 }}
                                        >
                                            <div className="relative w-full h-full">
                                                {/* Portal rings */}
                                                {Array.from({ length: 3 }).map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-amber-400/80"
                                                        style={{ width: `${100 - i * 20}%`, height: `${100 - i * 20}%` }}
                                                        animate={{
                                                            rotate: [0, 360],
                                                            scale: [1, 1.1, 1],
                                                        }}
                                                        transition={{
                                                            rotate: { duration: 10 - i * 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                                                            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                                                        }}
                                                    />
                                                ))}

                                                {/* Portal center */}
                                                <motion.div
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full flex items-center justify-center cursor-pointer"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={enterPortal}
                                                >
                                                    <Home className="text-white" size={24} />
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Game instructions */}
                                {gameScore === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-coffee-900/70 backdrop-blur-sm">
                                        <div className="text-center p-6 bg-coffee-800/80 rounded-lg max-w-xs">
                                            <h3 className="text-xl font-bold text-coffee-100 mb-4">Collect Coffee & Crypto</h3>
                                            <p className="text-coffee-200 mb-4">
                                                Move your coffee cup with your mouse to catch falling coffee beans and crypto coins.
                                            </p>
                                            <p className="text-coffee-200 mb-4">Fill the portal energy to escape this 404 dimension!</p>
                                            <motion.button
                                                className="px-4 py-2 bg-coffee-600 text-white rounded-md"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setGameScore(1)}
                                            >
                                                Start Collecting
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Easter egg */}
                    <AnimatePresence>
                        {showEasterEgg && (
                            <motion.div
                                className="absolute inset-0 bg-coffee-900/90 backdrop-blur-md flex items-center justify-center z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="text-center p-8 max-w-md"
                                    initial={{ scale: 0.8, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.8, y: 20 }}
                                >
                                    <motion.div
                                        className="w-24 h-24 mx-auto mb-6 relative"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    >
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-20 animate-ping" />
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                                            <Coffee className="text-white" size={32} />
                                        </div>
                                    </motion.div>

                                    <h3 className="text-2xl font-bold text-amber-400 mb-4">Secret Developer Mode Unlocked!</h3>
                                    <p className="text-coffee-200 mb-6">
                                        You've discovered the hidden developer easter egg! As a reward, here's a special message from the
                                        Crypto Coffee team.
                                    </p>

                                    <div className="p-4 bg-coffee-800/50 rounded-lg border border-coffee-700/50 font-mono text-sm text-amber-300 mb-6">
                                        <p>// The best developers know that even 404 pages can be fun</p>
                                        <p>// Thanks for exploring our code!</p>
                                        <p className="mt-2">console.log("Hello, fellow developer!");</p>
                                    </div>

                                    <motion.button
                                        className="px-4 py-2 bg-amber-600 text-white rounded-md"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowEasterEgg(false)}
                                    >
                                        Continue Exploring
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="mt-8 text-center text-coffee-400/60 text-xs">
                        <p>Try the Konami code or click the 404 title multiple times for surprises</p>
                        <p>It's a place to buy coffee not tea :)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
