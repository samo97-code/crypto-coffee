"use client"

import {useState} from "react"
import {ArrowLeft, Ticket, Brain, Laugh, Dice1Icon as Dice, Cat, Calendar} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import {DailyActivityCard} from "@/components/activities/DailyActivityCard";
import Link from "next/link"

export default function DailyActivitiesPage() {
    const [completedActivities,] = useState<string[]>([])

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-coffee-700 hover:text-coffee-900">
                    <ArrowLeft className="h-4 w-4 mr-1"/>
                    Back to Dashboard
                </Link>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-coffee-900 mb-2">Daily Activities</h1>
                <p className="text-coffee-600">
                    Support the project while having fun with these daily activities. Each activity costs just $0.045
                    (like a
                    sip of coffee).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <Tabs defaultValue="all" className="mb-8">
                        <TabsList className="bg-card mb-6">
                            <TabsTrigger value="all">All Activities</TabsTrigger>
                            <TabsTrigger value="games">Games</TabsTrigger>
                            <TabsTrigger value="fun">Fun</TabsTrigger>
                            <TabsTrigger value="rewards">Rewards</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {dailyActivities.map((activity) => (
                                    <Link key={activity.id} href={`/daily-activities/${activity.id}`}>
                                        <DailyActivityCard activity={activity}
                                                           isCompleted={completedActivities.includes(activity.id)}/>
                                    </Link>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="games" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {dailyActivities
                                    .filter((activity) => activity.category === "games")
                                    .map((activity) => (
                                        <Link key={activity.id} href={`/daily-activities/${activity.id}`}>
                                            <DailyActivityCard
                                                key={activity.id}
                                                activity={activity}
                                                isCompleted={completedActivities.includes(activity.id)}
                                            />
                                        </Link>
                                    ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="fun" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {dailyActivities
                                    .filter((activity) => activity.category === "fun")
                                    .map((activity) => (
                                        <Link key={activity.id} href={`/daily-activities/${activity.id}`}>
                                            <DailyActivityCard
                                                key={activity.id}
                                                activity={activity}
                                                isCompleted={completedActivities.includes(activity.id)}
                                            />
                                        </Link>
                                    ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="rewards" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {dailyActivities
                                    .filter((activity) => activity.category === "rewards")
                                    .map((activity) => (
                                        <Link key={activity.id} href={`/daily-activities/${activity.id}`}>
                                            <DailyActivityCard
                                                key={activity.id}
                                                activity={activity}
                                                isCompleted={completedActivities.includes(activity.id)}
                                            />
                                        </Link>
                                    ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-coffee-100 rounded-full">
                        <Calendar className="h-6 w-6 text-coffee-700"/>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-coffee-900 mb-1">Your Daily Streak</h3>
                        <p className="text-coffee-600 mb-3">
                            You&#39;ve completed at least one activity for 7 days in a row! Keep it up to earn bonus
                            rewards.
                        </p>
                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                <div
                                    key={day}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        day <= 7 ? "bg-coffee-700 text-white" : "bg-coffee-200 text-coffee-600"
                                    }`}
                                >
                                    {day}
                                </div>
                            ))}
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-coffee-200 text-coffee-600">
                                8
                            </div>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-coffee-200 text-coffee-600">
                                9
                            </div>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-coffee-200 text-coffee-600">
                                10
                            </div>
                        </div>
                        <Button className="bg-coffee-700 hover:bg-coffee-800 text-white">View Streak Rewards</Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

const dailyActivities = [
    {
        id: "gas-lottery",
        title: "Gas Fee Lottery",
        description: "Pay a fixed fee and get a chance to win accumulated rewards or a special NFT.",
        icon: Ticket,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        fee: "$0.045",
        reward: "Daily prize pool or NFT",
        category: "rewards",
        actionText: "Enter Lottery",
        completedText: "Entered Today",
    },
    {
        id: "crypto-trivia",
        title: "Crypto Trivia",
        description: "Answer a daily crypto question correctly to earn badges or points.",
        icon: Brain,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        fee: "$0.045",
        reward: "Badges & Points",
        category: "games",
        actionText: "Answer Question",
        completedText: "Answered Today",
    },
    {
        id: "daily-joke",
        title: "Daily Crypto Joke",
        description: "Reveal a daily crypto-themed joke that you can share on social media.",
        icon: Laugh,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        fee: "$0.045",
        reward: "Shareable content",
        category: "fun",
        actionText: "Reveal Joke",
        completedText: "Joke Revealed",
    },
    {
        id: "blockchain-bingo",
        title: "Blockchain Bingo",
        description: "Get daily bingo numbers and win rewards for completed rows or cards.",
        icon: Dice,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        fee: "$0.045",
        reward: "Weekly/monthly prizes",
        category: "games",
        actionText: "Play Bingo",
        completedText: "Played Today",
    },
    {
        id: "crypto-pet",
        title: "Crypto Pet",
        description: "Feed your virtual Crypto Cat daily and watch it grow and evolve.",
        icon: Cat,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        fee: "$0.045",
        reward: "Pet collectibles",
        category: "fun",
        actionText: "Feed Pet",
        completedText: "Pet Fed Today",
    },
]

