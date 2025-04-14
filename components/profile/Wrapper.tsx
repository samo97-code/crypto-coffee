'use client'

import React, {useEffect, useState} from 'react';
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";
import CreativeCoverImage from "@/components/profile/CreativeCoverImage";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Copy, Edit, Sparkles, Wallet} from "lucide-react";
import {camelToSnake, shortenAddress} from "@/utils/utils";
import {Button} from "@/components/ui/button";
import ProfileBadges from "@/components/profile/ProfileBadges";
import CoffeeStats from "@/components/profile/CoffeeStats";
import QuickLinks from "@/components/profile/QuickLinks";
import CoffeeStreak from "@/components/profile/CoffeeStreak";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Activity from "@/components/profile/Activity";
import Achievements from "@/components/profile/Achievements";
import {useAccount} from "wagmi";
import {WriteContractData} from "@wagmi/core/query";
import {getUserStreak} from "@/lib/streak-service";
import {useSelector} from "react-redux";
import {IActivity, IBadge, IProfileStates, IStreakInfo, IUserAchievement} from "@/types";
import {getUserAchievements, getUserBadges, getUserStats, getUserLevelProgress} from "@/lib/acheivements-service";
import {useRouter} from "next/navigation";
import {getUserTransactions} from "@/lib/transaction-service";

// Import the activity service
import { getUserRecentActivities } from "@/lib/activity-service"


const Wrapper = () => {
    const router = useRouter()
    const {address} = useAccount();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {user} = useSelector(state => state.user);
    const displayName = user?.display_name || user?.username || "Coffee Enthusiast"

    const [loading, setLoading] = useState(true)
    const [isCopied, setIsCopied] = useState(false)
    const [streak, setStreak] = useState<IStreakInfo>({
        current_streak: 0,
        longest_streak: 0,
        last_activity_date: '',
        streak_dates: []
    })

    const [achievements, setAchievements] = useState<IUserAchievement[]>([])
    const [badges, setBadges] = useState<IBadge[]>([])
    const [stats, setStats] = useState<IProfileStates>({
        boughtCoffee: 0,
        achievementsCount: 0,
        totalAchievements: 30,
        levelProgress: 0,
    })

    // Add state for activities in the component
    const [activities, setActivities] = useState<IActivity[]>([])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address as WriteContractData)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    useEffect(() => {
        if (user.id) {
            setLoading(true)
            Promise.all([fetchUserStreak(), fetchUserData(), fetchStats()]).then((values) => {
                console.log(values);
            }).finally(() => {
                setLoading(false)
            });
        }
    }, [user.id])

    const fetchUserStreak = async () => {
        try {
            const streakInfo = await getUserStreak(user.id)
            setStreak(camelToSnake(streakInfo))
        } catch (e) {
            console.error("Error in saveOrGetUser:", e)
        }
    }


    const fetchUserData = async () => {
        if (!user) return

        try {
            // Fetch achievements
            const userAchievements = await getUserAchievements(user.id)
            setAchievements(userAchievements)

            // Fetch badges
            const userBadges = await getUserBadges(user.id, streak?.current_streak || 0)
            setBadges(userBadges)

            // Fetch recent activities
            const recentActivities = await getUserRecentActivities(user.id, 5)
            setActivities(recentActivities)
        } catch (error) {
            console.error("Error fetching profile data:", error)
        }
    }

    const fetchStats = async ()=> {
        try {
            // Fetch user stats
            // Fetch stats
            const userStats = await getUserStats(user.id)

            // Get transaction count
            const transactions = await getUserTransactions(user.id)
            const coffeeCount = transactions.length

            // Get level progress
            const levelProgress = await getUserLevelProgress(user.id)

            setStats({
                boughtCoffee: coffeeCount,
                achievementsCount: userStats.achievementsCount,
                totalAchievements: userStats.totalAchievements,
                levelProgress: levelProgress || 0,
            })
        } catch (error) {
            console.error("Error fetching coffee stats:", error)
        }
    }

    console.log(user,'user')

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {loading ? (
                <CoffeeLoader/>
            ) : (
                <>
                    {/*/!* Profile Header *!/*/}
                    <div className="relative mb-8">
                        {/* Cover Image */}
                        <CreativeCoverImage
                            username={displayName}
                            subtitle="Supporting Blockchain Projects One Cup at a Time"
                            onEdit={() => alert("Edit cover image")}
                        />

                        {/* Profile Info */}
                        <div
                            className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-12 px-4 md:px-8">
                            <Avatar className="h-32 w-32 border-4 border-coffee-50 shadow-lg">
                                <AvatarImage src={`${user?.avatar_url}?height=128&width=128`}/>
                                <AvatarFallback
                                    className="bg-coffee-100 text-coffee-800 text-4xl">CC</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-coffee-700">
                                            <Wallet className="h-4 w-4"/>
                                            <div className="flex items-center">
                                                <span>{shortenAddress(address)}</span>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 ml-1"
                                                        onClick={copyToClipboard}>
                                                    {isCopied ? <Sparkles className="h-4 w-4 text-coffee-500"/> :
                                                        <Copy className="h-4 w-4"/>}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button onClick={()=>router.push('/profile/settings')}
                                            className="bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white">
                                            <Edit className="h-4 w-4 mr-2"/>
                                            Edit Profile
                                        </Button>
                                    </div>
                                </div>

                                <ProfileBadges badges={badges}/>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* User Stats Card */}
                            <CoffeeStats stats={stats} streak={streak} level={user?.level_id || 1}/>

                            {/* Quick Links */}
                            <QuickLinks/>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <CoffeeStreak streak={streak}/>

                            <Tabs defaultValue="activity" className="w-full mt-8">
                                <TabsList className="bg-white border border-coffee-200 mb-6">
                                    <TabsTrigger value="activity">Activity</TabsTrigger>
                                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                                </TabsList>

                                <TabsContent value="activity" className="space-y-6">
                                    {/* Recent Activity */}
                                    <Activity activities={activities}/>
                                </TabsContent>

                                <TabsContent value="achievements" className="space-y-6">
                                    {/* Achievements */}
                                    <Achievements achievements={achievements}/>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Wrapper;
