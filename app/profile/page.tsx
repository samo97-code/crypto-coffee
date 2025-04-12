"use client"

import {useState} from "react"
import {Wallet, Edit, Sparkles, Copy} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import CreativeCoverImage from "@/components/dashboard/profile/CreativeCoverImage";
import {useAccount} from "wagmi";
import {WriteContractData} from "@wagmi/core/query";
import {shortenAddress} from "@/lib/utils";
import QuickLinks from "@/components/dashboard/profile/QuickLinks";
import CoffeeStats from "@/components/dashboard/profile/CoffeeStats";
import CoffeeStreak from "@/components/dashboard/profile/CoffeeStreak";
import Activity from "@/components/dashboard/profile/Activity";
import Achievements from "@/components/dashboard/profile/Achievements";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";
import ProfileBadges from "@/components/dashboard/profile/ProfileBadges";

export default function ProfilePage() {
    const {address} = useAccount();

    const [loading, setLoading] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address as WriteContractData)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

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
                            username="Crypto Brew Master"
                            subtitle="Supporting Blockchain Projects One Cup at a Time"
                            onEdit={() => alert("Edit cover image")}
                        />

                        {/* Profile Info */}
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-12 px-4 md:px-8">
                            <Avatar className="h-32 w-32 border-4 border-coffee-50 shadow-lg">
                                <AvatarImage src="/placeholder.svg?height=128&width=128"/>
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
                                        <Button
                                            className="bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white">
                                            <Edit className="h-4 w-4 mr-2"/>
                                            Edit Profile
                                        </Button>
                                    </div>
                                </div>

                                <ProfileBadges />
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* User Stats Card */}
                            <CoffeeStats/>

                            {/* Quick Links */}
                            <QuickLinks/>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <CoffeeStreak/>

                            <Tabs defaultValue="activity" className="w-full mt-8">
                                <TabsList className="bg-white border border-coffee-200 mb-6">
                                    <TabsTrigger value="activity">Activity</TabsTrigger>
                                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                                </TabsList>

                                <TabsContent value="activity" className="space-y-6">
                                    {/* Recent Activity */}
                                    <Activity/>
                                </TabsContent>

                                <TabsContent value="achievements" className="space-y-6">
                                    {/* Achievements */}
                                    <Achievements/>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
