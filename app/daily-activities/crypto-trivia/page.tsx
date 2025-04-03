"use client"

// import {useState} from "react"
// import {Brain, ArrowLeft, Award, CheckCircle2, XCircle, HelpCircle, BarChart3} from "lucide-react"
import {ArrowLeft} from "lucide-react"
// import {Button} from "@/components/ui/button"
import Link from "next/link"
// import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
// import {Label} from "@/components/ui/label"

export default function CryptoTriviaPage() {
    // const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    // const [hasSubmitted, setHasSubmitted] = useState(false)
    // const correctAnswer = "b" // For this example

    // const handleSubmit = () => {
    //     if (selectedAnswer) {
    //         setHasSubmitted(true)
    //     }
    // }

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

                {/*<div className="bg-card border border-border rounded-lg overflow-hidden mb-8">*/}
                {/*    <div className="p-6 pb-4 border-b border-border">*/}
                {/*        <div className="flex items-center gap-3 mb-4">*/}
                {/*            <div className="p-3 bg-blue-100 rounded-full">*/}
                {/*                <Brain className="h-6 w-6 text-blue-600"/>*/}
                {/*            </div>*/}
                {/*            <h1 className="text-2xl font-bold text-coffee-900">Crypto Trivia</h1>*/}
                {/*        </div>*/}
                {/*        <p className="text-coffee-600">*/}
                {/*            Test your crypto knowledge with a daily trivia question. Answer correctly to earn badges and*/}
                {/*            points!*/}
                {/*        </p>*/}
                {/*    </div>*/}

                {/*    <div className="p-6">*/}
                {/*        <div className="bg-coffee-50 rounded-lg p-6 mb-6">*/}
                {/*            <h2 className="text-lg font-medium text-coffee-900 mb-4">Today&#39;s Question:</h2>*/}
                {/*            <p className="text-coffee-900 mb-6">What was the first cryptocurrency to implement smart*/}
                {/*                contracts?</p>*/}

                {/*            <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}*/}
                {/*                        disabled={hasSubmitted}>*/}
                {/*                <div className="space-y-3">*/}
                {/*                    <div*/}
                {/*                        className={`flex items-center space-x-2 rounded-lg border p-3 ${*/}
                {/*                            hasSubmitted && "a" === correctAnswer*/}
                {/*                                ? "bg-green-50 border-green-200"*/}
                {/*                                : hasSubmitted && selectedAnswer === "a"*/}
                {/*                                    ? "bg-red-50 border-red-200"*/}
                {/*                                    : "border-coffee-200"*/}
                {/*                        }`}*/}
                {/*                    >*/}
                {/*                        <RadioGroupItem value="a" id="a"/>*/}
                {/*                        <Label htmlFor="a" className="flex-1 cursor-pointer">*/}
                {/*                            Bitcoin*/}
                {/*                        </Label>*/}
                {/*                        {hasSubmitted && "a" === correctAnswer &&*/}
                {/*                            <CheckCircle2 className="h-5 w-5 text-green-600"/>}*/}
                {/*                        {hasSubmitted && selectedAnswer === "a" && "a" !== correctAnswer && (*/}
                {/*                            <XCircle className="h-5 w-5 text-red-500"/>*/}
                {/*                        )}*/}
                {/*                    </div>*/}

                {/*                    <div*/}
                {/*                        className={`flex items-center space-x-2 rounded-lg border p-3 ${*/}
                {/*                            hasSubmitted && "b" === correctAnswer*/}
                {/*                                ? "bg-green-50 border-green-200"*/}
                {/*                                : hasSubmitted && selectedAnswer === "b"*/}
                {/*                                    ? "bg-red-50 border-red-200"*/}
                {/*                                    : "border-coffee-200"*/}
                {/*                        }`}*/}
                {/*                    >*/}
                {/*                        <RadioGroupItem value="b" id="b"/>*/}
                {/*                        <Label htmlFor="b" className="flex-1 cursor-pointer">*/}
                {/*                            Ethereum*/}
                {/*                        </Label>*/}
                {/*                        {hasSubmitted && "b" === correctAnswer &&*/}
                {/*                            <CheckCircle2 className="h-5 w-5 text-green-600"/>}*/}
                {/*                        {hasSubmitted && selectedAnswer === "b" && "b" !== correctAnswer && (*/}
                {/*                            <XCircle className="h-5 w-5 text-red-500"/>*/}
                {/*                        )}*/}
                {/*                    </div>*/}

                {/*                    <div*/}
                {/*                        className={`flex items-center space-x-2 rounded-lg border p-3 ${*/}
                {/*                            hasSubmitted && "c" === correctAnswer*/}
                {/*                                ? "bg-green-50 border-green-200"*/}
                {/*                                : hasSubmitted && selectedAnswer === "c"*/}
                {/*                                    ? "bg-red-50 border-red-200"*/}
                {/*                                    : "border-coffee-200"*/}
                {/*                        }`}*/}
                {/*                    >*/}
                {/*                        <RadioGroupItem value="c" id="c"/>*/}
                {/*                        <Label htmlFor="c" className="flex-1 cursor-pointer">*/}
                {/*                            Litecoin*/}
                {/*                        </Label>*/}
                {/*                        {hasSubmitted && "c" === correctAnswer &&*/}
                {/*                            <CheckCircle2 className="h-5 w-5 text-green-600"/>}*/}
                {/*                        {hasSubmitted && selectedAnswer === "c" && "c" !== correctAnswer && (*/}
                {/*                            <XCircle className="h-5 w-5 text-red-500"/>*/}
                {/*                        )}*/}
                {/*                    </div>*/}

                {/*                    <div*/}
                {/*                        className={`flex items-center space-x-2 rounded-lg border p-3 ${*/}
                {/*                            hasSubmitted && "d" === correctAnswer*/}
                {/*                                ? "bg-green-50 border-green-200"*/}
                {/*                                : hasSubmitted && selectedAnswer === "d"*/}
                {/*                                    ? "bg-red-50 border-red-200"*/}
                {/*                                    : "border-coffee-200"*/}
                {/*                        }`}*/}
                {/*                    >*/}
                {/*                        <RadioGroupItem value="d" id="d"/>*/}
                {/*                        <Label htmlFor="d" className="flex-1 cursor-pointer">*/}
                {/*                            Ripple*/}
                {/*                        </Label>*/}
                {/*                        {hasSubmitted && "d" === correctAnswer &&*/}
                {/*                            <CheckCircle2 className="h-5 w-5 text-green-600"/>}*/}
                {/*                        {hasSubmitted && selectedAnswer === "d" && "d" !== correctAnswer && (*/}
                {/*                            <XCircle className="h-5 w-5 text-red-500"/>*/}
                {/*                        )}*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </RadioGroup>*/}
                {/*        </div>*/}

                {/*        {hasSubmitted ? (*/}
                {/*            <div*/}
                {/*                className={`p-4 rounded-lg ${*/}
                {/*                    selectedAnswer === correctAnswer*/}
                {/*                        ? "bg-green-50 border border-green-200"*/}
                {/*                        : "bg-red-50 border border-red-200"*/}
                {/*                }`}*/}
                {/*            >*/}
                {/*                <div className="flex items-start gap-3">*/}
                {/*                    {selectedAnswer === correctAnswer ? (*/}
                {/*                        <>*/}
                {/*                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5"/>*/}
                {/*                            <div>*/}
                {/*                                <h3 className="font-medium text-green-800">Correct!</h3>*/}
                {/*                                <p className="text-green-700 text-sm">*/}
                {/*                                    Ethereum was the first cryptocurrency to implement smart contracts,*/}
                {/*                                    which are self-executing*/}
                {/*                                    contracts with the terms directly written into code.*/}
                {/*                                </p>*/}
                {/*                            </div>*/}
                {/*                        </>*/}
                {/*                    ) : (*/}
                {/*                        <>*/}
                {/*                            <XCircle className="h-5 w-5 text-red-500 mt-0.5"/>*/}
                {/*                            <div>*/}
                {/*                                <h3 className="font-medium text-red-800">Incorrect</h3>*/}
                {/*                                <p className="text-red-700 text-sm">*/}
                {/*                                    The correct answer is Ethereum. It was the first cryptocurrency to*/}
                {/*                                    implement smart contracts,*/}
                {/*                                    which are self-executing contracts with the terms directly written*/}
                {/*                                    into code.*/}
                {/*                                </p>*/}
                {/*                            </div>*/}
                {/*                        </>*/}
                {/*                    )}*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ) : (*/}
                {/*            <Button*/}
                {/*                onClick={handleSubmit}*/}
                {/*                disabled={!selectedAnswer}*/}
                {/*                className="w-full bg-blue-600 hover:bg-blue-700 text-white"*/}
                {/*                size="lg"*/}
                {/*            >*/}
                {/*                Submit Answer • $0.045*/}
                {/*            </Button>*/}
                {/*        )}*/}

                {/*        {hasSubmitted && selectedAnswer === correctAnswer && (*/}
                {/*            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">*/}
                {/*                <div className="flex items-center gap-3 mb-3">*/}
                {/*                    <Award className="h-5 w-5 text-blue-600"/>*/}
                {/*                    <h3 className="font-medium text-blue-800">Rewards Earned</h3>*/}
                {/*                </div>*/}
                {/*                <div className="grid grid-cols-2 gap-4">*/}
                {/*                    <div className="flex items-center gap-2">*/}
                {/*                        <div*/}
                {/*                            className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">*/}
                {/*                            <Award className="h-5 w-5 text-blue-600"/>*/}
                {/*                        </div>*/}
                {/*                        <div>*/}
                {/*                            <div className="font-medium text-coffee-900">Trivia Master Badge</div>*/}
                {/*                            <div className="text-sm text-coffee-600">+1 correct answer</div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="flex items-center gap-2">*/}
                {/*                        <div*/}
                {/*                            className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">*/}
                {/*                            <Brain className="h-5 w-5 text-blue-600"/>*/}
                {/*                        </div>*/}
                {/*                        <div>*/}
                {/*                            <div className="font-medium text-coffee-900">Knowledge Points</div>*/}
                {/*                            <div className="text-sm text-coffee-600">+50 points</div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">*/}
                {/*    <div className="bg-card border border-border rounded-lg p-6">*/}
                {/*        <div className="flex items-center gap-3 mb-4">*/}
                {/*            <Award className="h-5 w-5 text-yellow-500"/>*/}
                {/*            <h2 className="text-lg font-medium text-coffee-900">Your Badges</h2>*/}
                {/*        </div>*/}

                {/*        <div className="grid grid-cols-2 gap-4">*/}
                {/*            <div className="flex items-center gap-2">*/}
                {/*                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">*/}
                {/*                    <Award className="h-5 w-5 text-yellow-500"/>*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <div className="font-medium text-coffee-900">Trivia Novice</div>*/}
                {/*                    <div className="text-sm text-coffee-600">5 correct answers</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="flex items-center gap-2">*/}
                {/*                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">*/}
                {/*                    <Brain className="h-5 w-5 text-blue-600"/>*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <div className="font-medium text-coffee-900">Crypto Expert</div>*/}
                {/*                    <div className="text-sm text-coffee-600">20 correct answers</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="flex items-center gap-2">*/}
                {/*                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">*/}
                {/*                    <CheckCircle2 className="h-5 w-5 text-green-600"/>*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <div className="font-medium text-coffee-900">Perfect Week</div>*/}
                {/*                    <div className="text-sm text-coffee-600">7 days streak</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="flex items-center gap-2">*/}
                {/*                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">*/}
                {/*                    <HelpCircle className="h-5 w-5 text-purple-600"/>*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <div className="font-medium text-coffee-900">Curious Mind</div>*/}
                {/*                    <div className="text-sm text-coffee-600">50 questions</div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="bg-card border border-border rounded-lg p-6">*/}
                {/*        <div className="flex items-center gap-3 mb-4">*/}
                {/*            <BarChart3 className="h-5 w-5 text-blue-600"/>*/}
                {/*            <h2 className="text-lg font-medium text-coffee-900">Your Stats</h2>*/}
                {/*        </div>*/}

                {/*        <div className="space-y-4">*/}
                {/*            <div className="flex justify-between items-center">*/}
                {/*                <div className="text-coffee-600">Total Questions</div>*/}
                {/*                <div className="font-medium text-coffee-900">42</div>*/}
                {/*            </div>*/}
                {/*            <div className="flex justify-between items-center">*/}
                {/*                <div className="text-coffee-600">Correct Answers</div>*/}
                {/*                <div className="font-medium text-coffee-900">36 (85%)</div>*/}
                {/*            </div>*/}
                {/*            <div className="flex justify-between items-center">*/}
                {/*                <div className="text-coffee-600">Current Streak</div>*/}
                {/*                <div className="font-medium text-coffee-900">7 days</div>*/}
                {/*            </div>*/}
                {/*            <div className="flex justify-between items-center">*/}
                {/*                <div className="text-coffee-600">Total Points</div>*/}
                {/*                <div className="font-medium text-coffee-900">1,850</div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="bg-card border border-border rounded-lg p-6">*/}
                {/*    <h2 className="text-lg font-medium text-coffee-900 mb-4">How It Works</h2>*/}

                {/*    <div className="space-y-4">*/}
                {/*        <div className="flex gap-3">*/}
                {/*            <div*/}
                {/*                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">*/}
                {/*                1*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <h3 className="font-medium text-coffee-900">Pay to play</h3>*/}
                {/*                <p className="text-coffee-600">*/}
                {/*                    Pay a small fee of $0.045 (like a sip of coffee) to answer the daily trivia*/}
                {/*                    question.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <div className="flex gap-3">*/}
                {/*            <div*/}
                {/*                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">*/}
                {/*                2*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <h3 className="font-medium text-coffee-900">Answer the question</h3>*/}
                {/*                <p className="text-coffee-600">Test your crypto knowledge with a new question every*/}
                {/*                    day.</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <div className="flex gap-3">*/}
                {/*            <div*/}
                {/*                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">*/}
                {/*                3*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <h3 className="font-medium text-coffee-900">Earn rewards</h3>*/}
                {/*                <p className="text-coffee-600">*/}
                {/*                    Correct answers earn you badges, points, and special NFTs that showcase your*/}
                {/*                    knowledge.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <div className="flex gap-3">*/}
                {/*            <div*/}
                {/*                className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">*/}
                {/*                4*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <h3 className="font-medium text-coffee-900">Build your streak</h3>*/}
                {/*                <p className="text-coffee-600">*/}
                {/*                    Answer correctly multiple days in a row to earn streak bonuses and exclusive*/}
                {/*                    rewards.*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </main>
        </div>
    )
}

