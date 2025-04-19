'use client'

import React from 'react';
import {Brain, Cat, Coffee, Dice1Icon as Dice, Hand, Laugh, Ticket} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import ActivityHeader from "@/components/activities/ActivityHeader";

const Wrapper = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-coffee-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%238B4513' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                ></div>
            </div>

            {/* Floating Coffee Beans */}
            <div className="max-w-7xl mx-auto absolute inset-0 z-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse-slow text-coffee-300 opacity-10"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `pulse ${2 + Math.random() * 3}s infinite`,
                            transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
                        }}
                    >
                        <Coffee size={40}/>
                    </div>
                ))}
            </div>

            <div className="max-w-5xl relative z-10 mx-auto px-4 py-12">
                {/* Left-aligned header section */}
                <ActivityHeader/>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Gas Fee Lottery */}
                    <Card
                        className="group relative h-full overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div
                            className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-1000"></div>
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-coffee-100/80 to-coffee-50/50 opacity-50"></div>
                        <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
                            <div
                                className="absolute right-0 top-0 h-8 w-8 origin-bottom-left rotate-45 transform bg-coffee-700"></div>
                        </div>
                        <CardHeader className="relative pb-2 h-[86px]">
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 p-3 shadow-md">
                                    <Ticket className="h-7 w-7 animate-pulse-slow text-purple-600"/>
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-coffee-900">Gas Fee Lottery</CardTitle>
                                    <CardDescription className="mt-1 text-coffee-700">
                                        Pay a fixed fee and get a chance to win
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative pt-2">
                            <div
                                className="absolute -right-2 -top-6 rounded-full bg-coffee-100 px-3 py-1 text-xs font-medium text-coffee-800 shadow-sm">
                                $0.045
                            </div>
                            <p className="text-sm text-coffee-700">
                                Pay a fixed fee and get a chance to win accumulated rewards or a special NFT.
                            </p>
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-coffee-50 p-3 text-sm">
                                <span className="font-medium text-coffee-800">Reward:</span>
                                <span className="text-coffee-700">Daily prize pool or NFT</span>
                            </div>
                        </CardContent>
                        <CardFooter className="relative">
                            <Button
                                className="w-full bg-gradient-to-r from-coffee-700 to-coffee-800 text-white shadow-md transition-all hover:from-coffee-800 hover:to-coffee-900 hover:shadow-lg">
                                Enter Lottery
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Crypto Trivia */}
                    <Card
                        className="group relative h-full overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div
                            className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-1000"></div>
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-blue-100/80 to-blue-50/50 opacity-50"></div>
                        <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
                            <div
                                className="absolute right-0 top-0 h-8 w-8 origin-bottom-left rotate-45 transform bg-blue-500"></div>
                        </div>
                        <CardHeader className="relative pb-2 h-[86px]">
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 p-3 shadow-md">
                                    <Brain className="h-7 w-7 animate-pulse-slow text-blue-600"/>
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-coffee-900">Crypto Trivia</CardTitle>
                                    <CardDescription className="mt-1 text-coffee-700">Test your crypto
                                        knowledge</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative pt-2">
                            <div
                                className="absolute -right-2 -top-6 rounded-full bg-coffee-100 px-3 py-1 text-xs font-medium text-coffee-800 shadow-sm">
                                $0.045
                            </div>
                            <p className="text-sm text-coffee-700">
                                Answer a daily crypto question correctly to earn badges or points.
                            </p>
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-coffee-50 p-3 text-sm">
                                <span className="font-medium text-coffee-800">Reward:</span>
                                <span className="text-coffee-700">Badges & Points</span>
                            </div>
                        </CardContent>
                        <CardFooter className="relative">
                            <Button
                                className="w-full bg-gradient-to-r from-coffee-700 to-coffee-800 text-white shadow-md transition-all hover:from-coffee-800 hover:to-coffee-900 hover:shadow-lg">
                                Answer Question
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Daily Crypto Joke */}
                    <Card
                        className="group relative h-full overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div
                            className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-1000"></div>
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-yellow-100/80 to-yellow-50/50 opacity-50"></div>
                        <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
                            <div
                                className="absolute right-0 top-0 h-8 w-8 origin-bottom-left rotate-45 transform bg-yellow-500"></div>
                        </div>
                        <CardHeader className="relative pb-2 h-[86px]">
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 p-3 shadow-md">
                                    <Laugh className="h-7 w-7 animate-pulse-slow text-yellow-600"/>
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-coffee-900">Daily Crypto
                                        Joke</CardTitle>
                                    <CardDescription className="mt-1 text-coffee-700">Get your daily dose of
                                        humor</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative pt-2">
                            <div
                                className="absolute -right-2 -top-6 rounded-full bg-coffee-100 px-3 py-1 text-xs font-medium text-coffee-800 shadow-sm">
                                $0.045
                            </div>
                            <p className="text-sm text-coffee-700">
                                Reveal a daily crypto-themed joke that you can share on social media.
                            </p>
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-coffee-50 p-3 text-sm">
                                <span className="font-medium text-coffee-800">Reward:</span>
                                <span className="text-coffee-700">Shareable content</span>
                            </div>
                        </CardContent>
                        <CardFooter className="relative">
                            <Button
                                className="w-full bg-gradient-to-r from-coffee-700 to-coffee-800 text-white shadow-md transition-all hover:from-coffee-800 hover:to-coffee-900 hover:shadow-lg">
                                Reveal Joke
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Blockchain Bingo */}
                    <Card
                        className="group relative h-full overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div
                            className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-1000"></div>
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-green-100/80 to-green-50/50 opacity-50"></div>
                        <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
                            <div
                                className="absolute right-0 top-0 h-8 w-8 origin-bottom-left rotate-45 transform bg-green-500"></div>
                        </div>
                        <CardHeader className="relative pb-2 h-[86px]">
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 p-3 shadow-md">
                                    <Dice className="h-7 w-7 animate-pulse-slow text-green-600"/>
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-coffee-900">Blockchain
                                        Bingo</CardTitle>
                                    <CardDescription className="mt-1 text-coffee-700">Play bingo with blockchain
                                        numbers</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative pt-2">
                            <div
                                className="absolute -right-2 -top-6 rounded-full bg-coffee-100 px-3 py-1 text-xs font-medium text-coffee-800 shadow-sm">
                                $0.045
                            </div>
                            <p className="text-sm text-coffee-700">
                                Get daily bingo numbers and win rewards for completed rows or cards.
                            </p>
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-coffee-50 p-3 text-sm">
                                <span className="font-medium text-coffee-800">Reward:</span>
                                <span className="text-coffee-700">Weekly/monthly prizes</span>
                            </div>
                        </CardContent>
                        <CardFooter className="relative">
                            <Button
                                className="w-full bg-gradient-to-r from-coffee-700 to-coffee-800 text-white shadow-md transition-all hover:from-coffee-800 hover:to-coffee-900 hover:shadow-lg">
                                Play Bingo
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Crypto Pet */}
                    <Card
                        className="group relative h-full overflow-hidden rounded-xl border-0 bg-red-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div
                            className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-1000"></div>
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-orange-100/80 to-orange-50/50 opacity-50"></div>
                        <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
                            <div
                                className="absolute right-0 top-0 h-8 w-8 origin-bottom-left rotate-45 transform bg-orange-500"></div>
                        </div>
                        <CardHeader className="relative pb-2 h-[86px]">
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 p-3 shadow-md">
                                    <Cat className="h-7 w-7 animate-pulse-slow text-orange-600"/>
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-coffee-900">Crypto Pet</CardTitle>
                                    <CardDescription className="mt-1 text-coffee-700">Take care of your virtual
                                        pet</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative pt-2">
                            <div
                                className="absolute -right-2 -top-6 rounded-full bg-coffee-100 px-3 py-1 text-xs font-medium text-coffee-800 shadow-sm">
                                $0.045
                            </div>
                            <p className="text-sm text-coffee-700">
                                Feed your virtual Crypto Cat daily and watch it grow and evolve.
                            </p>
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-coffee-50 p-3 text-sm">
                                <span className="font-medium text-coffee-800">Reward:</span>
                                <span className="text-coffee-700">Pet collectibles</span>
                            </div>
                        </CardContent>
                        <CardFooter className="relative">
                            <Button
                                className="w-full bg-gradient-to-r from-coffee-700 to-coffee-800 text-white shadow-md transition-all hover:from-coffee-800 hover:to-coffee-900 hover:shadow-lg">
                                Feed Pet
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Rock Paper Scissors - NEW ACTIVITY */}
                    <Card
                        className="group relative h-full overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div
                            className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-1000"></div>
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-teal-100/80 to-teal-50/50 opacity-50"></div>
                        <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
                            <div
                                className="absolute right-0 top-0 h-8 w-8 origin-bottom-left rotate-45 transform bg-teal-500"></div>
                        </div>
                        <CardHeader className="relative pb-2 h-[86px]">
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 p-3 shadow-md">
                                    <Hand className="h-7 w-7 animate-pulse-slow text-teal-600"/>
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-coffee-900">Rock Paper
                                        Scissors</CardTitle>
                                    <CardDescription className="mt-1 text-coffee-700">Challenge the blockchain to a
                                        game</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative pt-2">
                            <div
                                className="absolute -right-2 -top-6 rounded-full bg-coffee-100 px-3 py-1 text-xs font-medium text-coffee-800 shadow-sm">
                                $0.045
                            </div>
                            <p className="text-sm text-coffee-700">
                                Play rock paper scissors against the blockchain and win crypto rewards.
                            </p>
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-coffee-50 p-3 text-sm">
                                <span className="font-medium text-coffee-800">Reward:</span>
                                <span className="text-coffee-700">Double your bet</span>
                            </div>
                        </CardContent>
                        <CardFooter className="relative">
                            <Button
                                className="w-full bg-gradient-to-r from-coffee-700 to-coffee-800 text-white shadow-md transition-all hover:from-coffee-800 hover:to-coffee-900 hover:shadow-lg">
                                Play Now
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default Wrapper;
