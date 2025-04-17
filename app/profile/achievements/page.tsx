"use client"
import {
    Coffee,
    Award,
    Heart,
    Edit,
    Droplets,
    Zap,
    Sparkles,
    Users,
    ArrowLeft,
    Trophy,
    Star,
    Flame,
} from "lucide-react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"

export default function AchievementsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/profile" className="inline-flex items-center text-coffee-700 hover:text-coffee-900">
                    <ArrowLeft className="h-4 w-4 mr-1"/>
                    Back to Profile
                </Link>
            </div>

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-coffee-100 rounded-full">
                    <Award className="h-6 w-6 text-coffee-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">Your Achievements</h1>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-coffee-100 rounded-full">
                            <Trophy className="h-5 w-5 text-coffee-700"/>
                        </div>
                        <h3 className="font-semibold text-coffee-900">Total Achievements</h3>
                    </div>
                    <div className="text-3xl font-bold text-coffee-900">15/30</div>
                    <div className="text-sm text-coffee-700 mt-1">50% completed</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-coffee-100 rounded-full">
                            <Star className="h-5 w-5 text-coffee-700"/>
                        </div>
                        <h3 className="font-semibold text-coffee-900">Rarest Achievement</h3>
                    </div>
                    <div className="text-xl font-bold text-coffee-900">SuperChain Explorer</div>
                    <div className="text-sm text-coffee-700 mt-1">Only 5% of users have this</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-coffee-100 rounded-full">
                            <Sparkles className="h-5 w-5 text-coffee-700"/>
                        </div>
                        <h3 className="font-semibold text-coffee-900">Latest Unlocked</h3>
                    </div>
                    <div className="text-xl font-bold text-coffee-900">Generous Brewer</div>
                    <div className="text-sm text-coffee-700 mt-1">Unlocked 3 days ago</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-coffee-100 rounded-full">
                            <Flame className="h-5 w-5 text-coffee-700"/>
                        </div>
                        <h3 className="font-semibold text-coffee-900">Next Achievement</h3>
                    </div>
                    <div className="text-xl font-bold text-coffee-900">Streak Master</div>
                    <div className="text-sm text-coffee-700 mt-1">33% progress</div>
                </div>
            </div>

            {/* Achievement Showcase */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-coffee-900">Achievement Showcase</h2>
                    <Button variant="outline" className="border-coffee-200">
                        <Edit className="h-4 w-4 mr-2"/>
                        Edit Showcase
                    </Button>
                </div>

                <div className="bg-gradient-to-br from-coffee-50 to-coffee-100 rounded-lg p-6 border border-coffee-200">
                    <div className="flex flex-wrap justify-center gap-6">
                        {achievements
                            .filter((a) => a.unlocked && a.featured)
                            .map((achievement, index) => (
                                <div
                                    key={index}
                                    className="w-32 h-32 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center p-3 border border-coffee-200 hover:shadow-md transition-shadow"
                                >
                                    <div
                                        className={`w-16 h-16 rounded-full ${achievement.iconBg} flex items-center justify-center mb-2`}
                                    >
                                        <achievement.icon className={`h-8 w-8 ${achievement.iconColor}`}/>
                                    </div>
                                    <div
                                        className="text-sm font-medium text-coffee-900 text-center">{achievement.name}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Level System */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-coffee-100 rounded-full">
                        <Trophy className="h-5 w-5 text-coffee-700"/>
                    </div>
                    <h2 className="text-xl font-semibold text-coffee-900">Supporter Level System</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="text-coffee-700">Current Level</div>
                        <Badge className="bg-gradient-to-r from-coffee-500 to-coffee-700 text-white border-none">Level
                            7</Badge>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span>Progress to Level 8</span>
                            <span>65%</span>
                        </div>
                        <div className="h-2 bg-coffee-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-coffee-500 to-coffee-700 w-[65%]"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {levels.map((level) => (
                            <div
                                key={level.level}
                                className={`border rounded-lg p-4 ${
                                    level.level <= 7 ? "border-coffee-200 bg-coffee-50/50" : "border-gray-200 bg-white opacity-70"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            level.level <= 7
                                                ? "bg-gradient-to-r from-coffee-500 to-coffee-700 text-white"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        <span className="font-bold">{level.level}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-coffee-900">{level.name}</h3>
                                        {level.level <= 7 && (
                                            <Badge
                                                className="bg-green-100 text-green-800 border-none text-xs">Unlocked</Badge>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-coffee-700 ml-13">{level.requirements}</p>
                                <div className="mt-2 space-y-1">
                                    {level.rewards.map((reward, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-sm">
                                            <div className="text-coffee-500 mt-0.5">•</div>
                                            <div className="text-coffee-800">{reward}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* All Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                <h2 className="text-xl font-semibold text-coffee-900 mb-6">All Achievements</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg p-4 ${
                                achievement.unlocked ? "border-coffee-200" : "border-gray-200 opacity-60"
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className={`w-12 h-12 rounded-full ${
                                        achievement.unlocked ? achievement.iconBg : "bg-gray-100"
                                    } flex items-center justify-center`}
                                >
                                    <achievement.icon
                                        className={`h-6 w-6 ${achievement.unlocked ? achievement.iconColor : "text-gray-400"}`}
                                    />
                                </div>

                                <div>
                                    <h4 className="font-medium text-coffee-900">{achievement.name}</h4>
                                    <p className="text-sm text-coffee-700 mt-1">{achievement.description}</p>

                                    {achievement.unlocked ? (
                                        <div className="flex items-center gap-1 text-green-600 text-sm mt-2">
                                            <Sparkles className="h-3 w-3"/>
                                            <span>Unlocked on {achievement.unlockedDate}</span>
                                        </div>
                                    ) : (
                                        <div className="mt-2">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-coffee-600">Progress</span>
                                                <span className="text-coffee-800">{achievement.progress}%</span>
                                            </div>
                                            <Progress value={achievement.progress} className="h-1.5"/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Sample data for the achievements page
const achievements = [
    {
        name: "Early Adopter",
        description: "Joined Crypto Coffee in the first month of launch",
        unlocked: true,
        unlockedDate: "Apr 5, 2025",
        icon: Award,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        featured: true,
        progress: 100,
    },
    {
        name: "Coffee Connoisseur",
        description: "Supported 50 different projects",
        unlocked: true,
        unlockedDate: "Apr 8, 2025",
        icon: Coffee,
        iconBg: "bg-coffee-100",
        iconColor: "text-coffee-700",
        featured: true,
        progress: 100,
    },
    {
        name: "Generous Brewer",
        description: "Contributed over $1,000 in total support",
        unlocked: true,
        unlockedDate: "Apr 10, 2025",
        icon: Droplets,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        featured: true,
        progress: 100,
    },
    {
        name: "Streak Master",
        description: "Maintained a 30-day support streak",
        unlocked: false,
        icon: Zap,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        featured: false,
        progress: 33,
    },
    {
        name: "SuperChain Explorer",
        description: "Supported projects on 10 different networks",
        unlocked: true,
        unlockedDate: "Apr 7, 2025",
        icon: Zap,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        featured: true,
        progress: 100,
    },
    {
        name: "Community Champion",
        description: "Referred 20 new users to the platform",
        unlocked: false,
        icon: Users,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        featured: false,
        progress: 45,
    },
    {
        name: "Daily Devotee",
        description: "Completed all daily activities in a single day",
        unlocked: true,
        unlockedDate: "Apr 9, 2025",
        icon: Star,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        featured: false,
        progress: 100,
    },
    {
        name: "Blockchain Bingo Master",
        description: "Won the Blockchain Bingo 5 times",
        unlocked: false,
        icon: Trophy,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        featured: false,
        progress: 60,
    },
    {
        name: "Crypto Pet Whisperer",
        description: "Raised your Crypto Pet to level 10",
        unlocked: true,
        unlockedDate: "Apr 6, 2025",
        icon: Heart,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        featured: false,
        progress: 100,
    },
]

// Level system data
const levels = [
    {
        level: 1,
        name: "Coffee Novice",
        requirements: "Join Crypto Coffee",
        rewards: ["Basic profile features", "Access to daily activities"],
    },
    {
        level: 2,
        name: "Coffee Apprentice",
        requirements: "Support 5 projects",
        rewards: ["Custom profile badge", "+5% chance in Gas Fee Lottery"],
    },
    {
        level: 3,
        name: "Coffee Enthusiast",
        requirements: "Support 10 projects and maintain a 7-day streak",
        rewards: ["Exclusive profile themes", "Daily activity bonus rewards"],
    },
    {
        level: 4,
        name: "Coffee Aficionado",
        requirements: "Support 20 projects and complete 15 daily activities",
        rewards: ["Special NFT collectible", "Reduced gas fees on selected networks"],
    },
    {
        level: 5,
        name: "Coffee Connoisseur",
        requirements: "Support 30 projects and maintain a 14-day streak",
        rewards: ["Early access to new features", "Exclusive Crypto Pet accessories"],
    },
    {
        level: 6,
        name: "Coffee Master",
        requirements: "Support 40 projects and unlock 10 achievements",
        rewards: ["Premium profile customization", "Double rewards on daily activities"],
    },
    {
        level: 7,
        name: "Coffee Virtuoso",
        requirements: "Support 50 projects and maintain a 21-day streak",
        rewards: ["Verified supporter badge", "Priority access to new projects"],
    },
    {
        level: 8,
        name: "Coffee Legend",
        requirements: "Support 75 projects and unlock 20 achievements",
        rewards: ["Legendary profile effects", "Ability to create custom badges"],
    },
    {
        level: 9,
        name: "Coffee Oracle",
        requirements: "Support 100 projects and maintain a 30-day streak",
        rewards: ["Oracle NFT collection", "Voting rights on platform features"],
    },
    {
        level: 10,
        name: "Coffee Deity",
        requirements: "Support 150 projects and unlock all achievements",
        rewards: ["Immortalized in the Coffee Hall of Fame", "Lifetime VIP benefits"],
    },
]
