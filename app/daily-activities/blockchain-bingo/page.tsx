"use client"

import {useState} from "react"
import {Dice1Icon as Dice, ArrowLeft, Grid, Trophy, Clock, CheckCircle2} from "lucide-react"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {Badge} from "@/components/ui/badge"

export default function BlockchainBingoPage() {
    const [isRevealed, setIsRevealed] = useState(false)
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

    const handleNumberClick = (number: number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number))
        } else {
            setSelectedNumbers([...selectedNumbers, number])
        }
    }

    // Today's bingo numbers
    const todayNumbers = [7, 15, 32, 48, 59]

    // Check if a number is one of today's numbers
    const isMatchingNumber = (number: number) => todayNumbers.includes(number)

    // Check if a number is selected by the user
    const isSelected = (number: number) => selectedNumbers.includes(number)

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
                            <div className="p-3 bg-green-100 rounded-full">
                                <Dice className="h-6 w-6 text-green-600"/>
                            </div>
                            <h1 className="text-2xl font-bold text-coffee-900">Blockchain Bingo</h1>
                        </div>
                        <p className="text-coffee-600">
                            Play daily bingo for a chance to win weekly and monthly rewards. Mark your card and match
                            today&#39;s numbers!
                        </p>
                    </div>

                    <div className="p-6">
                        {isRevealed ? (
                            <div className="space-y-6">
                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <h2 className="text-lg font-medium text-coffee-900 mb-3">Today&#39;s Numbers:</h2>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {todayNumbers.map((number) => (
                                            <div
                                                key={number}
                                                className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg"
                                            >
                                                {number}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-medium text-coffee-900 mb-3">Your Bingo Card:</h2>
                                    <div className="grid grid-cols-5 gap-2 mb-4">
                                        {Array.from({length: 25}, (_, i) => {
                                            const number = i + 1
                                            const isMatching = isMatchingNumber(number)
                                            const selected = isSelected(number)

                                            return (
                                                <button
                                                    key={number}
                                                    onClick={() => handleNumberClick(number)}
                                                    className={`
                            aspect-square rounded-md flex items-center justify-center font-medium text-lg relative
                            ${isMatching && selected ? "bg-green-600 text-white" : ""}
                            ${isMatching && !selected ? "bg-green-100 text-green-800 border-2 border-green-300" : ""}
                            ${!isMatching && selected ? "bg-coffee-200 text-coffee-800" : ""}
                            ${!isMatching && !selected ? "bg-coffee-50 text-coffee-900 border border-coffee-200" : ""}
                          `}
                                                >
                                                    {number}
                                                    {isMatching && selected && (
                                                        <CheckCircle2
                                                            className="absolute top-1 right-1 h-4 w-4 text-white"/>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-coffee-600">
                                            Matched: {selectedNumbers.filter((n) => todayNumbers.includes(n)).length}/{todayNumbers.length}
                                        </div>
                                        <Button variant="outline" className="border-coffee-200"
                                                onClick={() => setSelectedNumbers([])}>
                                            Clear Selection
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-coffee-50 rounded-lg p-4 border border-coffee-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="h-4 w-4 text-coffee-700"/>
                                        <h3 className="font-medium text-coffee-900">Weekly Prize Drawing:</h3>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-coffee-600">Next drawing in:</div>
                                        <div className="font-medium text-coffee-900">2 days, 14 hours</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-coffee-50 rounded-lg p-6 mb-6 border border-coffee-200 text-center">
                                <Dice className="h-16 w-16 text-green-600 mx-auto mb-4"/>
                                <h2 className="text-lg font-medium text-coffee-900 mb-2">Today&#39;s Bingo Numbers are
                                    Ready!</h2>
                                <p className="text-coffee-600 mb-6">
                                    Pay a small fee to reveal today&#39;s bingo numbers and play for a chance to win weekly
                                    and monthly
                                    prizes.
                                </p>
                                <Button
                                    onClick={() => setIsRevealed(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    size="lg"
                                >
                                    Play Bingo • $0.045
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-card border border-border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Trophy className="h-5 w-5 text-yellow-500"/>
                            <h2 className="text-lg font-medium text-coffee-900">Prizes & Rewards</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-coffee-200">
                                <div>
                                    <div className="font-medium text-coffee-900">Daily Match</div>
                                    <div className="text-sm text-coffee-600">Match all 5 numbers</div>
                                </div>
                                <Badge className="bg-green-100 text-green-800 border-none">50 BEAN Tokens</Badge>
                            </div>

                            <div className="flex items-center justify-between pb-3 border-b border-coffee-200">
                                <div>
                                    <div className="font-medium text-coffee-900">Weekly Draw</div>
                                    <div className="text-sm text-coffee-600">Complete at least 3 days</div>
                                </div>
                                <Badge className="bg-blue-100 text-blue-800 border-none">200 BEAN Tokens</Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-coffee-900">Monthly Jackpot</div>
                                    <div className="text-sm text-coffee-600">Complete 20+ days</div>
                                </div>
                                <Badge className="bg-purple-100 text-purple-800 border-none">1,000 BEAN + NFT</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Grid className="h-5 w-5 text-green-600"/>
                            <h2 className="text-lg font-medium text-coffee-900">Your Progress</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-coffee-200">
                                <div className="text-coffee-600">This Week:</div>
                                <div className="font-medium text-coffee-900">3/7 days completed</div>
                            </div>

                            <div className="flex items-center justify-between pb-3 border-b border-coffee-200">
                                <div className="text-coffee-600">This Month:</div>
                                <div className="font-medium text-coffee-900">12/30 days completed</div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-coffee-600">Total Matches:</div>
                                <div className="font-medium text-coffee-900">37 numbers matched</div>
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
                                <h3 className="font-medium text-coffee-900">Pay to play</h3>
                                <p className="text-coffee-600">
                                    Pay a small fee of $0.045 (like a sip of coffee) to reveal today&#39;s bingo numbers.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div
                                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="font-medium text-coffee-900">Mark your card</h3>
                                <p className="text-coffee-600">
                                    Select the matching numbers on your bingo card to track your progress.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div
                                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="font-medium text-coffee-900">Daily rewards</h3>
                                <p className="text-coffee-600">
                                    Match all of today&#39;s numbers to earn daily rewards and qualify for bigger prizes.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div
                                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                                4
                            </div>
                            <div>
                                <h3 className="font-medium text-coffee-900">Weekly & monthly prizes</h3>
                                <p className="text-coffee-600">
                                    Play consistently to qualify for weekly draws and the monthly jackpot with bigger
                                    rewards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

