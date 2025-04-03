"use client"

import {useState} from "react"
import {Ticket, Trophy, ArrowLeft, Gift} from "lucide-react"
import {Button} from "@/components/ui/button"
import Link from "next/link"

export default function GasLotteryPage() {
    const [hasEntered, setHasEntered] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-3xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/daily-activities"
                          className="inline-flex items-center text-coffee-700 hover:text-coffee-900">
                        <ArrowLeft className="h-4 w-4 mr-1"/>
                        Back to Activities
                    </Link>
                </div>

                <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
                    <div className="p-6 pb-4 border-b border-border">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-purple-100 rounded-full">
                                <Ticket className="h-6 w-6 text-purple-600"/>
                            </div>
                            <h1 className="text-2xl font-bold text-coffee-900">Gas Fee Lottery</h1>
                        </div>
                        <p className="text-coffee-600">
                            Pay a small fixed fee ($0.045) daily for a chance to win accumulated rewards or a special
                            NFT. The more
                            people participate, the bigger the prize pool grows!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                        <div className="bg-coffee-50 rounded-lg p-4 text-center">
                            <div className="text-coffee-600 text-sm mb-1">Today&#39;s Prize Pool</div>
                            <div className="text-2xl font-bold text-coffee-900">$245.67</div>
                            <div className="text-coffee-600 text-sm">From 5,459 entries</div>
                        </div>

                        <div className="bg-coffee-50 rounded-lg p-4 text-center">
                            <div className="text-coffee-600 text-sm mb-1">Your Entries</div>
                            <div className="text-2xl font-bold text-coffee-900">12</div>
                            <div className="text-coffee-600 text-sm">Lifetime entries</div>
                        </div>

                        <div className="bg-coffee-50 rounded-lg p-4 text-center">
                            <div className="text-coffee-600 text-sm mb-1">Next Draw</div>
                            <div className="text-2xl font-bold text-coffee-900">12:34:56</div>
                            <div className="text-coffee-600 text-sm">Hours remaining</div>
                        </div>
                    </div>

                    <div className="p-6 pt-0">
                        <Button
                            onClick={() => setHasEntered(!hasEntered)}
                            className={`w-full ${
                                hasEntered
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                    : "bg-purple-600 hover:bg-purple-700 text-white"
                            }`}
                            size="lg"
                        >
                            {hasEntered ? "Entered Today • Good Luck!" : "Enter Today's Lottery • $0.045"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-card border border-border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Trophy className="h-5 w-5 text-yellow-500"/>
                            <h2 className="text-lg font-medium text-coffee-900">Previous Winners</h2>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between pb-3 border-b border-coffee-200 last:border-0 last:pb-0"
                                >
                                    <div>
                                        <div className="font-medium text-coffee-900">0x4A...cD9e</div>
                                        <div className="text-sm text-coffee-600">May {10 - i}, 2024</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-coffee-900">$198.45</div>
                                        <div className="text-sm text-coffee-600">4,410 entries</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Gift className="h-5 w-5 text-pink-500"/>
                            <h2 className="text-lg font-medium text-coffee-900">Special NFT Prizes</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b border-coffee-200">
                                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                                    <Gift className="h-6 w-6 text-pink-500"/>
                                </div>
                                <div>
                                    <div className="font-medium text-coffee-900">Golden Ticket NFT</div>
                                    <div className="text-sm text-coffee-600">1 in 1,000 chance • Special access to
                                        premium features
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pb-3 border-b border-coffee-200">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Ticket className="h-6 w-6 text-purple-600"/>
                                </div>
                                <div>
                                    <div className="font-medium text-coffee-900">Lottery Winner Badge</div>
                                    <div className="text-sm text-coffee-600">For all winners • Displayed on your
                                        profile
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Trophy className="h-6 w-6 text-blue-600"/>
                                </div>
                                <div>
                                    <div className="font-medium text-coffee-900">Jackpot Winner NFT</div>
                                    <div className="text-sm text-coffee-600">Monthly special draw • Exclusive community
                                        benefits
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-lg font-medium text-coffee-900 mb-4">How It Works</h2>

                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div
                                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="font-medium text-coffee-900">Enter the lottery</h3>
                                <p className="text-coffee-600">
                                    Pay a small fee of $0.045 (like a sip of coffee) to enter the daily lottery.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div
                                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="font-medium text-coffee-900">Daily draw</h3>
                                <p className="text-coffee-600">
                                    Every day at midnight UTC, a winner is randomly selected from all entries.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div
                                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="font-medium text-coffee-900">Claim your prize</h3>
                                <p className="text-coffee-600">
                                    If you win, the prize is automatically sent to your wallet. No action needed!
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div
                                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                                4
                            </div>
                            <div>
                                <h3 className="font-medium text-coffee-900">Special NFT chances</h3>
                                <p className="text-coffee-600">
                                    Each entry also gives you a chance to win special NFTs with unique benefits.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

