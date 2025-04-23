"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Coffee,
    Flame,
    Trophy,
    Zap,
    CheckCircle,
    Award,
    Users,
    CupSoda,
    Droplet,
    Sparkles,
    Gift,
    Heart,
    ArrowLeft,
    Globe,
    Share2,
    Brain,
    Calendar,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/utils"
import Link from "next/link"

const MOCK_ACHIEVEMENTS = [
    {
        id: 1,
        title: "Early Adopter",
        description: "Joined Crypto Coffee in the first month of launch",
        category: "community",
        icon: Award,
        xp_reward: 50,
        unlocked: true,
        unlock_date: "Apr 3, 2025",
        progress: 100,
        bgPattern: "zigzag-pattern",
    },
    {
        id: 2,
        title: "Coffee Connoisseur",
        description: "Supported 50 different projects",
        category: "support",
        icon: Coffee,
        xp_reward: 100,
        unlocked: false,
        progress: 30,
        required: 50,
        current: 15,
        bgPattern: "beans-pattern",
    },
    {
        id: 3,
        title: "Generous Brewer",
        description: "Contributed over $1,000 in total support",
        category: "support",
        icon: Droplet,
        xp_reward: 150,
        unlocked: false,
        progress: 60,
        required: 1000,
        current: 600,
        bgPattern: "waves-pattern",
    },
    {
        id: 4,
        title: "Streak Master",
        description: "Maintained a 30-day support streak",
        category: "streak",
        icon: Zap,
        xp_reward: 200,
        unlocked: false,
        progress: 10,
        required: 30,
        current: 3,
        bgPattern: "circles-pattern",
    },
    {
        id: 5,
        title: "Chain Explorer",
        description: "Supported projects on 10 different networks",
        category: "explorer",
        icon: Globe,
        xp_reward: 250,
        unlocked: false,
        progress: 90,
        required: 10,
        current: 9,
        bgPattern: "dots-pattern",
    },
    {
        id: 6,
        title: "Daily Devotee",
        description: "Completed all daily activities for 7 consecutive days",
        category: "activity",
        icon: Calendar,
        xp_reward: 300,
        unlocked: false,
        progress: 20,
        required: 7,
        current: 1,
        bgPattern: "zigzag-pattern",
    },
    {
        id: 7,
        title: "Bean Baron",
        description: "Staked over 10,000 beans in coffee brews",
        category: "staking",
        icon: Coffee,
        xp_reward: 350,
        unlocked: false,
        progress: 50,
        required: 10000,
        current: 5000,
        bgPattern: "beans-pattern",
    },
    {
        id: 8,
        title: "Social Butterfly",
        description: "Connected your social media accounts",
        category: "social",
        icon: Share2,
        xp_reward: 400,
        unlocked: false,
        progress: 100,
        required: 3,
        current: 3,
        bgPattern: "waves-pattern",
    },
    {
        id: 9,
        title: "Crypto Trivia Master",
        description: "Answered 50 crypto trivia questions correctly",
        category: "trivia",
        icon: Brain,
        xp_reward: 450,
        unlocked: false,
        progress: 75,
        required: 50,
        current: 38,
        bgPattern: "circles-pattern",
    },
    {
        id: 10,
        title: "Gas Lottery Winner",
        description: "Won the gas fee lottery",
        category: "lottery",
        icon: Trophy,
        xp_reward: 500,
        unlocked: true,
        unlock_date: "Apr 18, 2025",
        progress: 100,
        bgPattern: "dots-pattern",
    },
]

const SUPPORTER_LEVELS = [
    {
        level: 1,
        title: "Coffee Novice",
        color: "bg-gradient-to-r from-coffee-100 to-coffee-200",
        textColor: "text-coffee-800",
        borderColor: "border-coffee-300",
        iconColor: "text-coffee-700",
        requirements: ["Join Crypto Coffee", "Basic profile features", "Access to daily activities"],
        icon: Coffee,
    },
    {
        level: 2,
        title: "Coffee Apprentice",
        color: "bg-gradient-to-r from-coffee-200 to-coffee-300",
        textColor: "text-coffee-800",
        borderColor: "border-coffee-400",
        iconColor: "text-coffee-700",
        requirements: ["Support 5 projects", "Customized profile", "+5% chance in Gas Fee Lottery"],
        icon: CupSoda,
    },
    {
        level: 3,
        title: "Coffee Enthusiast",
        color: "bg-gradient-to-r from-coffee-300 to-coffee-400",
        textColor: "text-coffee-900",
        borderColor: "border-coffee-500",
        iconColor: "text-coffee-800",
        requirements: [
            "Support 10 projects and maintain a 7-day streak",
            "Exclusive profile themes",
            "Daily activity bonus rewards",
        ],
        icon: Droplet,
    },
    {
        level: 4,
        title: "Coffee Aficionado",
        color: "bg-gradient-to-r from-coffee-400 to-coffee-500",
        textColor: "text-coffee-50",
        borderColor: "border-coffee-600",
        iconColor: "text-coffee-50",
        requirements: [
            "Support 20 projects and complete 15 daily activities",
            "Reduced fees on transactions",
            "Access to exclusive networks",
        ],
        icon: Sparkles,
    },
    {
        level: 5,
        title: "Coffee Connoisseur",
        color: "bg-gradient-to-r from-coffee-500 to-coffee-600",
        textColor: "text-coffee-50",
        borderColor: "border-coffee-700",
        iconColor: "text-coffee-50",
        requirements: [
            "Support 30 projects and maintain a 14-day streak",
            "Special coffee bean multipliers",
            "Custom avatar frames",
        ],
        icon: Gift,
    },
    {
        level: 6,
        title: "Coffee Master",
        color: "bg-gradient-to-r from-coffee-600 to-coffee-700",
        textColor: "text-coffee-50",
        borderColor: "border-coffee-800",
        iconColor: "text-coffee-50",
        requirements: ["Support 40 projects and unlock 10 achievements", "Priority support access", "Exclusive NFT drops"],
        icon: Heart,
    },
    {
        level: 7,
        title: "Coffee Virtuoso",
        color: "bg-gradient-to-r from-coffee-700 to-coffee-800",
        textColor: "text-coffee-50",
        borderColor: "border-coffee-900",
        iconColor: "text-coffee-50",
        requirements: [
            "Support 50 projects and maintain a 21-day streak",
            "Higher staking rewards",
            "Custom username colors",
        ],
        icon: Flame,
    },
    {
        level: 8,
        title: "Coffee Legend",
        color: "bg-gradient-to-r from-coffee-800 to-coffee-900",
        textColor: "text-coffee-50",
        borderColor: "border-coffee-950",
        iconColor: "text-coffee-50",
        requirements: ["Support 75 projects and unlock 20 achievements", "Beta feature access", "Governance voting rights"],
        icon: Users,
    },
    {
        level: 9,
        title: "Coffee Oracle",
        color: "bg-gradient-to-r from-coffee-900 to-coffee-950",
        textColor: "text-coffee-50",
        borderColor: "border-coffee-950",
        iconColor: "text-coffee-50",
        requirements: [
            "Support 100 projects and maintain a 30-day streak",
            "VIP community access",
            "Special mention on leaderboards",
        ],
        icon: Brain,
    },
    {
        level: 10,
        title: "Coffee Deity",
        color: "bg-gradient-to-r from-coffee-950 to-amber-500",
        textColor: "text-coffee-50",
        borderColor: "border-amber-600",
        iconColor: "text-coffee-50",
        requirements: [
            "Support 150 projects and unlock all achievements",
            "Lifetime premium status",
            "Exclusive merchandise",
        ],
        icon: Gift,
    },
]

// SVG Patterns for achievement backgrounds
const BeansSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,20 Q40,5 50,20 Q60,35 50,50 Q40,65 30,50 Q20,35 30,20 Z" fill="currentColor" />
        <path d="M70,60 Q80,45 90,60 Q100,75 90,90 Q80,105 70,90 Q60,75 70,60 Z" fill="currentColor" />
        <path d="M10,70 Q20,55 30,70 Q40,85 30,100 Q20,115 10,100 Q0,85 10,70 Z" fill="currentColor" />
    </svg>
)

const WavesSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,20 Q25,40 50,20 Q75,0 100,20 L100,100 L0,100 Z" fill="currentColor" />
    </svg>
)

const CirclesSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" fill="currentColor" />
        <circle cx="70" cy="70" r="25" fill="currentColor" />
        <circle cx="80" cy="10" r="10" fill="currentColor" />
        <circle cx="10" cy="80" r="8" fill="currentColor" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
)

const DotsSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 10 }).map((_, i) =>
            Array.from({ length: 10 }).map((_, j) => (
                <circle key={`${i}-${j}`} cx={i * 10 + 5} cy={j * 10 + 5} r="1.5" fill="currentColor" />
            )),
        )}
    </svg>
)

const ZigzagSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,20 L20,40 L40,20 L60,40 L80,20 L100,40 L100,100 L0,100 Z" fill="currentColor" />
    </svg>
)

const getPatternSVG = (pattern) => {
    switch (pattern) {
        case "beans-pattern":
            return <BeansSVG />
        case "waves-pattern":
            return <WavesSVG />
        case "circles-pattern":
            return <CirclesSVG />
        case "dots-pattern":
            return <DotsSVG />
        case "zigzag-pattern":
            return <ZigzagSVG />
        default:
            return null
    }
}

// Achievement Header component similar to WalletHeader
function AchievementsHeader() {
    return (
        <div className="mb-6">
            <Link href="/profile-demo" className="inline-flex items-center text-coffee-700 hover:text-coffee-800 mb-4 group">
                <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                <span>Back to Profile</span>
            </Link>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center">
                <div className="relative mr-3">
                    <div className="absolute inset-0 bg-coffee-200 rounded-md blur-sm opacity-50 animate-pulse-slow"></div>
                    <div className="relative bg-gradient-to-br from-coffee-600 to-coffee-800 p-2 rounded-md text-white">
                        <Trophy className="h-6 w-6" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-coffee-900">Achievements & Rewards</h1>
            </motion.div>
        </div>
    )
}

// Achievement Stats component
function AchievementStats({ unlockedAchievements, totalAchievements, achievementPercentage }) {
    return (
        <Card className="bg-coffee-50/90 backdrop-blur-sm shadow-md border border-coffee-200 overflow-hidden mb-6">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-coffee-500 via-coffee-600 to-coffee-700"></div>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 p-6 pb-4">
                <div>
                    <CardTitle className="text-xl font-bold text-coffee-900">Achievement Progress</CardTitle>
                    <CardDescription className="text-coffee-600 mt-1">Track your journey and unlock rewards</CardDescription>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <div className="text-coffee-600 font-medium">
                        <span className="text-2xl font-bold text-coffee-800">{unlockedAchievements}</span> / {totalAchievements}{" "}
                        Completed
                    </div>
                    <div className="w-full sm:w-48 relative">
                        <div className="absolute inset-0 rounded-full bg-coffee-100 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-coffee-500 to-coffee-700"
                                initial={{ width: 0 }}
                                animate={{ width: `${achievementPercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <Progress value={achievementPercentage} className="h-3 bg-transparent" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-coffee-100 to-coffee-200 rounded-lg border border-coffee-300 shadow-sm overflow-hidden relative"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <BeansSVG />
                        </div>
                        <div className="p-4 relative z-10">
                            <h3 className="text-sm font-medium text-coffee-700 mb-1">Total Achievements</h3>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-coffee-800">{unlockedAchievements}</span>
                                <span className="text-sm text-coffee-600 ml-1">/{totalAchievements} completed</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-coffee-100 to-coffee-200 rounded-lg border border-coffee-300 shadow-sm overflow-hidden relative"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <WavesSVG />
                        </div>
                        <div className="p-4 relative z-10">
                            <h3 className="text-sm font-medium text-coffee-700 mb-1">Latest Achievement</h3>
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-coffee-300 flex items-center justify-center mr-2">
                                    <Trophy className="h-4 w-4 text-coffee-700" />
                                </div>
                                <div>
                                    <div className="font-medium text-coffee-800">Generous Tipper</div>
                                    <div className="text-xs text-coffee-600">Unlocked 3 days ago</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-coffee-100 to-coffee-200 rounded-lg border border-coffee-300 shadow-sm overflow-hidden relative"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <CirclesSVG />
                        </div>
                        <div className="p-4 relative z-10">
                            <h3 className="text-sm font-medium text-coffee-700 mb-1">SuperCoin Explorer</h3>
                            <div className="flex flex-col">
                                <div className="font-medium text-coffee-800">80% of goal reached</div>
                                <div className="text-xs text-coffee-600 mb-1">4/5 projects explored</div>
                                <div className="relative h-2 bg-coffee-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-coffee-500 to-coffee-700 origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 0.8 }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-coffee-100 to-coffee-200 rounded-lg border border-coffee-300 shadow-sm overflow-hidden relative"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <DotsSVG />
                        </div>
                        <div className="p-4 relative z-10">
                            <h3 className="text-sm font-medium text-coffee-700 mb-1">Bean Master</h3>
                            <div className="flex flex-col">
                                <div className="font-medium text-coffee-800">Level 3/5</div>
                                <div className="text-xs text-coffee-600 mb-1">250 XP needed</div>
                                <div className="relative h-2 bg-coffee-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-coffee-500 to-coffee-700 origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 0.6 }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </CardContent>
        </Card>
    )
}

// Achievement Showcase component
function AchievementShowcase({ achievements }) {
    const unlockedAchievements = achievements.filter((a) => a.unlocked)

    return (
        <Card className="bg-coffee-50/90 backdrop-blur-sm shadow-md border border-coffee-200 overflow-hidden mb-6">
            <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold text-coffee-800 flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-coffee-700" />
                        Achievement Showcase
                    </CardTitle>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs font-medium px-3 py-1 bg-coffee-200 hover:bg-coffee-300 text-coffee-800 rounded-full transition-colors"
                    >
                        Edit Showcase
                    </motion.button>
                </div>
                <CardDescription className="text-coffee-600">Display your favorite achievements and milestones</CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-0">
                <div className="border border-coffee-300 bg-coffee-50 p-4 relative overflow-hidden rounded-lg">
                    {/* Coffee cup handle decoration */}
                    <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-32 h-32 border-l-8 border-t-8 border-b-8 rounded-l-full border-coffee-200 opacity-20"></div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                        {unlockedAchievements.slice(0, 4).map((achievement) => (
                            <motion.div
                                key={achievement.id}
                                className="bg-card rounded-lg p-4 border border-coffee-200 hover:shadow-md transition-all duration-200 flex flex-col items-center relative overflow-hidden"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 15px -3px rgba(139, 69, 19, 0.1), 0 4px 6px -2px rgba(139, 69, 19, 0.05)",
                                }}
                            >
                                <div className="absolute inset-0 text-coffee-700">{getPatternSVG(achievement.bgPattern)}</div>
                                <motion.div
                                    className="flex items-center justify-center h-14 w-14 mb-3 rounded-full bg-gradient-to-br from-coffee-200 to-coffee-300 shadow-sm relative z-10"
                                    whileHover={{ rotate: 10 }}
                                >
                                    <achievement.icon className="h-7 w-7 text-coffee-700" />
                                </motion.div>
                                <p className="text-center text-sm font-medium text-coffee-800 relative z-10">{achievement.title}</p>
                                <p className="text-center text-xs text-coffee-600 mt-1 relative z-10">{achievement.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Supporter Level System component
function SupporterLevelSystem({ currentLevel, levelProgress, supporterLevels }) {
    return (
        <Card className="bg-coffee-50/90 backdrop-blur-sm shadow-md border border-coffee-200 overflow-hidden mb-6">
            <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold text-coffee-800 flex items-center">
                        <Coffee className="h-5 w-5 mr-2 text-coffee-700" />
                        Supporter Level System
                    </CardTitle>
                    <div className="text-sm text-coffee-600">
                        <span className="font-medium">Current Level: </span>
                        <span className="font-bold text-coffee-700">{currentLevel}</span>
                    </div>
                </div>
                <CardDescription className="text-coffee-600">
                    Advance through levels by supporting projects and completing activities
                </CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-0">
                <div className="border border-coffee-300 bg-coffee-50 p-4 mb-6 relative overflow-hidden rounded-lg">
                    {/* Coffee bean decoration */}
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 text-coffee-300 opacity-10 transform rotate-45">
                        <BeansSVG />
                    </div>

                    <div className="flex flex-col space-y-2 relative z-10">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <motion.div
                                    className="h-12 w-12 rounded-full bg-gradient-to-br from-coffee-400 to-coffee-500 flex items-center justify-center mr-3 shadow-md"
                                    animate={{
                                        boxShadow: [
                                            "0 0 0 0 rgba(139, 69, 19, 0.2)",
                                            "0 0 0 10px rgba(139, 69, 19, 0)",
                                            "0 0 0 0 rgba(139, 69, 19, 0)",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "loop",
                                    }}
                                >
                                    <Droplet className="h-6 w-6 text-coffee-50" />
                                </motion.div>
                                <div>
                                    <div className="font-medium text-coffee-800">Coffee Enthusiast</div>
                                    <div className="text-xs text-coffee-600">Level {currentLevel}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-coffee-800">{levelProgress}%</div>
                                <div className="text-xs text-coffee-600">to Level {currentLevel + 1}</div>
                            </div>
                        </div>
                        <div className="relative h-3 bg-coffee-100 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-coffee-500 to-coffee-700"
                                initial={{ width: 0 }}
                                animate={{ width: `${levelProgress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                            {/* Coffee drop markers */}
                            {[20, 40, 60, 80].map((position) => (
                                <div
                                    key={position}
                                    className="absolute top-0 bottom-0 w-1 bg-coffee-50"
                                    style={{ left: `${position}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Level cards with 3D effect */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {supporterLevels.map((level) => (
                        <motion.div
                            key={level.level}
                            className={cn(
                                "rounded-lg border shadow-sm relative overflow-hidden",
                                level.color,
                                level.borderColor,
                                level.level <= currentLevel ? "opacity-100" : "opacity-70",
                            )}
                            whileHover={{
                                scale: 1.02,
                                rotateY: 5,
                                rotateX: -5,
                                z: 10,
                            }}
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                            }}
                        >
                            {/* Level indicator */}
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-coffee-50/80 flex items-center justify-center text-xs font-bold text-coffee-800">
                                {level.level}
                            </div>

                            <div className="p-4 relative z-10">
                                <div className="flex items-center mb-3">
                                    <div
                                        className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center mr-2 shadow-sm",
                                            level.level <= currentLevel ? "bg-coffee-50/30" : "bg-coffee-50/20",
                                        )}
                                    >
                                        <level.icon className={cn("h-5 w-5", level.iconColor)} />
                                    </div>
                                    <div>
                                        <div className={cn("font-medium", level.textColor)}>{level.title}</div>
                                        <div className={cn("text-xs opacity-80", level.textColor)}>Level {level.level}</div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    {level.requirements.map((req, idx) => (
                                        <p key={idx} className={cn("text-xs flex items-start", level.textColor)}>
                                            <CheckCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                                            <span>{req}</span>
                                        </p>
                                    ))}
                                </div>

                                {/* Level completion indicator */}
                                {level.level <= currentLevel && (
                                    <div className="mt-2 flex items-center text-xs">
                                        <CheckCircle className={cn("h-3.5 w-3.5 mr-1", level.iconColor)} />
                                        <span className={level.textColor}>Level completed</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// All Achievements component
function AllAchievements({
                             achievements,
                             activeFilter,
                             setActiveFilter,
                             hoveredAchievement,
                             setHoveredAchievement,
                             showTooltip,
                         }) {
    const filteredAchievements =
        activeFilter === "all"
            ? achievements
            : activeFilter === "unlocked"
                ? achievements.filter((a) => a.unlocked)
                : achievements.filter((a) => !a.unlocked)

    return (
        <Card className="bg-coffee-50/90 backdrop-blur-sm shadow-md border border-coffee-200 overflow-hidden">
            <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold text-coffee-800 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-coffee-700" />
                        All Achievements
                    </CardTitle>
                    <div className="flex space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                                activeFilter === "all"
                                    ? "bg-coffee-300 text-coffee-800"
                                    : "bg-coffee-100 hover:bg-coffee-200 text-coffee-700",
                            )}
                            onClick={() => setActiveFilter("all")}
                        >
                            All
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                                activeFilter === "unlocked"
                                    ? "bg-coffee-300 text-coffee-800"
                                    : "bg-coffee-100 hover:bg-coffee-200 text-coffee-700",
                            )}
                            onClick={() => setActiveFilter("unlocked")}
                        >
                            Unlocked
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                                activeFilter === "locked"
                                    ? "bg-coffee-300 text-coffee-800"
                                    : "bg-coffee-100 hover:bg-coffee-200 text-coffee-700",
                            )}
                            onClick={() => setActiveFilter("locked")}
                        >
                            In Progress
                        </motion.button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {filteredAchievements.map((achievement) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                    "bg-card rounded-lg border shadow-sm overflow-hidden relative",
                                    achievement.unlocked ? "border-coffee-400" : "border-coffee-200",
                                )}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 15px -3px rgba(139, 69, 19, 0.1), 0 4px 6px -2px rgba(139, 69, 19, 0.05)",
                                }}
                                onMouseEnter={() => setHoveredAchievement(achievement.id)}
                                onMouseLeave={() => setHoveredAchievement(null)}
                            >
                                <div
                                    className={cn(
                                        "h-1.5 w-full",
                                        achievement.unlocked ? "bg-gradient-to-r from-coffee-500 to-coffee-700" : "bg-coffee-200",
                                    )}
                                ></div>

                                <div className="absolute inset-0 text-coffee-700 pointer-events-none">
                                    {getPatternSVG(achievement.bgPattern)}
                                </div>

                                <div className="p-4 relative z-10">
                                    <div className="flex items-start">
                                        <div
                                            className={cn(
                                                "h-12 w-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                                                achievement.unlocked
                                                    ? "bg-gradient-to-br from-coffee-300 to-coffee-400"
                                                    : "bg-gradient-to-br from-coffee-100 to-coffee-200",
                                            )}
                                        >
                                            <achievement.icon
                                                className={cn("h-6 w-6", achievement.unlocked ? "text-coffee-800" : "text-coffee-600")}
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium text-coffee-800">{achievement.title}</div>
                                            <div className="text-xs text-coffee-600 mb-2">{achievement.description}</div>

                                            {achievement.unlocked ? (
                                                <div className="flex items-center text-xs text-green-600">
                                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                                    <span>Unlocked on {achievement.unlock_date}</span>
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-center text-xs text-coffee-700">
                            <span>
                              Progress: {achievement.current}/{achievement.required}
                            </span>
                                                        <span>{achievement.progress}%</span>
                                                    </div>
                                                    <div className="relative h-1.5 bg-coffee-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-r from-coffee-500 to-coffee-700"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${achievement.progress}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                        />
                                                    </div>
                                                    <div className="text-xs text-coffee-600">{achievement.xp_reward} XP Reward</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tooltip on hover */}
                                <AnimatePresence>
                                    {showTooltip && hoveredAchievement === achievement.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-coffee-800 text-coffee-50 px-3 py-2 rounded-lg text-xs shadow-lg z-20 w-48 text-center"
                                        >
                                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-coffee-800"></div>
                                            {achievement.unlocked
                                                ? `Earned ${achievement.xp_reward} XP on ${achievement.unlock_date}`
                                                : `Complete this achievement to earn ${achievement.xp_reward} XP`}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AchievementsDemoPage() {
    const [achievements, setAchievements] = useState(MOCK_ACHIEVEMENTS)
    const [currentLevel, setCurrentLevel] = useState(3)
    const [levelProgress, setLevelProgress] = useState(65)
    const [activeFilter, setActiveFilter] = useState("all")
    const [hoveredAchievement, setHoveredAchievement] = useState(null)
    const [showTooltip, setShowTooltip] = useState(false)

    const totalAchievements = achievements.length
    const unlockedAchievements = achievements.filter((a) => a.unlocked).length
    const achievementPercentage = Math.round((unlockedAchievements / totalAchievements) * 100)

    useEffect(() => {
        if (hoveredAchievement !== null) {
            const timer = setTimeout(() => {
                setShowTooltip(true)
            }, 500)
            return () => clearTimeout(timer)
        } else {
            setShowTooltip(false)
        }
    }, [hoveredAchievement])

    return (
        <div className="min-h-screen bg-coffee-50 py-12 relative overflow-hidden">
            {/* Decorative coffee beans */}
            <div className="absolute top-20 left-10 w-32 h-32 text-coffee-300 opacity-10 transform -rotate-12">
                <BeansSVG />
            </div>
            <div className="absolute bottom-40 right-10 w-48 h-48 text-coffee-300 opacity-10 transform rotate-45">
                <BeansSVG />
            </div>

            <div className="container mx-auto max-w-5xl px-4 relative z-10">
                {/* Header similar to WalletHeader */}
                <AchievementsHeader />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    {/* Coffee cup steam animation */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 pointer-events-none">
                        <motion.div
                            className="w-2 h-10 bg-coffee-200 rounded-full absolute left-4 opacity-0"
                            animate={{
                                y: [-10, -40],
                                opacity: [0, 0.5, 0],
                                scale: [0.8, 1.2, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                delay: 0.2,
                            }}
                        />
                        <motion.div
                            className="w-2 h-10 bg-coffee-200 rounded-full absolute left-8 opacity-0"
                            animate={{
                                y: [-10, -50],
                                opacity: [0, 0.7, 0],
                                scale: [0.8, 1.5, 0.5],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                delay: 0.5,
                            }}
                        />
                        <motion.div
                            className="w-2 h-10 bg-coffee-200 rounded-full absolute left-12 opacity-0"
                            animate={{
                                y: [-10, -40],
                                opacity: [0, 0.5, 0],
                                scale: [0.8, 1.2, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                delay: 0.8,
                            }}
                        />
                    </div>

                    {/* Achievement Stats Card */}
                    <AchievementStats
                        unlockedAchievements={unlockedAchievements}
                        totalAchievements={totalAchievements}
                        achievementPercentage={achievementPercentage}
                    />

                    {/* Achievement Showcase Card */}
                    <AchievementShowcase achievements={achievements} />

                    {/* Supporter Level System Card */}
                    <SupporterLevelSystem
                        currentLevel={currentLevel}
                        levelProgress={levelProgress}
                        supporterLevels={SUPPORTER_LEVELS}
                    />

                    {/* All Achievements Card */}
                    <AllAchievements
                        achievements={achievements}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        hoveredAchievement={hoveredAchievement}
                        setHoveredAchievement={setHoveredAchievement}
                        showTooltip={showTooltip}
                    />
                </motion.div>
            </div>
        </div>
    )
}
