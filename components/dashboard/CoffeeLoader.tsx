'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Zap, Bitcoin, } from 'lucide-react'

const CoffeeLoader =()=> {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('Preparing your dashboard...')

    const messages = [
        'Preparing your dashboard...',
        'Connecting to network...',
        'Buying your coffee...',
        'Checking daily activities...',
        'Mining blockchain blocks...',
        'Validating transactions...',
    ]

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => setIsComplete(true), 500)
                    return 100
                }
                return prev + 1
            })
        }, 50)

        // Rotate loading messages
        const messageInterval = setInterval(() => {
            setLoadingMessage(messages[Math.floor(Math.random() * messages.length)])
        }, 2000)

        return () => {
            clearInterval(interval)
            clearInterval(messageInterval)
        }
    }, [])

    return (
        <div className="inset-0 h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-coffee-900/90 via-coffee-800/90 to-coffee-900/90 z-50">
            <div className="relative w-full max-w-md aspect-square">
                {/* Background particles */}
                <div className="absolute inset-0">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-coffee-300/20"
                            style={{
                                width: Math.random() * 10 + 5,
                                height: Math.random() * 10 + 5,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: [0, Math.random() * 50 - 25],
                                y: [0, Math.random() * 50 - 25],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </div>

                {/* Light rays */}
                <div className="absolute inset-0 overflow-hidden opacity-30">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 h-[500px] w-[40px] bg-gradient-to-t from-coffee-200 to-transparent origin-bottom"
                            style={{
                                rotate: `${i * 45}deg`,
                                translateX: '-50%',
                                translateY: '-100%',
                            }}
                            animate={{
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>

                {/* Coffee cup container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        {/* Coffee cup */}
                        <motion.div
                            className="absolute w-40 h-40 bg-coffee-200 rounded-b-full rounded-t-lg border-4 border-coffee-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Coffee liquid */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-coffee-600 to-coffee-700"
                                style={{ height: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Coffee surface */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-2 bg-coffee-500 opacity-80"
                                    animate={{
                                        y: [0, -2, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Cup handle */}
                        <motion.div
                            className="absolute w-10 h-16 border-4 border-coffee-300 rounded-r-full right-1 top-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        />

                        {/* Steam */}
                        <AnimatePresence>
                            {progress > 30 && (
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-20 overflow-hidden">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute bottom-0 left-1/2 w-4 h-16 bg-gradient-to-t from-coffee-100/0 via-coffee-100/40 to-coffee-100/0"
                                            style={{
                                                x: `${(i - 1) * 10}px`,
                                                translateX: '-50%',
                                                borderRadius: '50%',
                                            }}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{
                                                y: -80,
                                                opacity: [0, 0.8, 0],
                                                scale: [0.8, 1.2, 0.5],
                                                x: [0, (i - 1) * 15, (i - 1) * 20],
                                            }}
                                            transition={{
                                                duration: 2 + i * 0.5,
                                                repeat: Infinity,
                                                repeatType: "loop",
                                                delay: i * 0.3,
                                            }}
                                            exit={{ opacity: 0 }}
                                        />
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Floating crypto icons */}
                <div className="absolute inset-0">
                    {[Bitcoin, Zap].map((Icon, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${30 + i * 40}%`,
                                top: `${20 + i * 50}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: i * 2,
                            }}
                        >
                            <Icon className="text-coffee-200/60 w-8 h-8" />
                        </motion.div>
                    ))}
                </div>

                {/* Coffee beans */}
                <div className="absolute inset-0">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-6 h-4 bg-coffee-700 rounded-full"
                            style={{
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 80 + 10}%`,
                            }}
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                                x: [0, Math.random() * 40 - 20, 0],
                                y: [0, Math.random() * 40 - 20, 0],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            <div className="absolute inset-0 bg-coffee-800 rounded-full scale-[0.6] transform-gpu" />
                        </motion.div>
                    ))}
                </div>

                {/* Loading text and progress */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center mb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={loadingMessage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-coffee-100 text-lg font-medium mb-3"
                        >
                            {loadingMessage}
                        </motion.div>
                    </AnimatePresence>

                    <div className="w-64 h-2 bg-coffee-700/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-coffee-400 to-coffee-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <motion.div
                        className="text-coffee-200 mt-2 font-mono"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {progress}%
                    </motion.div>
                </div>

                {/* Completion animation */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-coffee-900/80 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="flex flex-col items-center"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <motion.div
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-coffee-400 to-coffee-600 flex items-center justify-center mb-4"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        boxShadow: [
                                            "0 0 0 0 rgba(180, 83, 9, 0.4)",
                                            "0 0 0 20px rgba(180, 83, 9, 0)",
                                            "0 0 0 0 rgba(180, 83, 9, 0)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Coffee className="w-10 h-10 text-white" />
                                </motion.div>
                                <motion.h2
                                    className="text-2xl font-bold text-coffee-100 mb-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Ready to Start!
                                </motion.h2>
                                <motion.p
                                    className="text-coffee-200 text-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Your crypto coffee experience awaits
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default CoffeeLoader
