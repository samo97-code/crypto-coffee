"use client"

import { useState } from "react"
import { Laugh, ArrowLeft, Share2, ThumbsUp, MessageSquare, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DailyJokePage() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(342)

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleCopyJoke = () => {
    navigator.clipboard.writeText(
      "Why did the blockchain go to therapy? It had too many trust issues! #CryptoCoffee #DailyJoke",
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/daily-activities" className="inline-flex items-center text-coffee-700 hover:text-coffee-900">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Activities
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
          <div className="p-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Laugh className="h-6 w-6 text-yellow-600" />
              </div>
              <h1 className="text-2xl font-bold text-coffee-900">Daily Crypto Joke</h1>
            </div>
            <p className="text-coffee-600">
              Start your day with a laugh! Reveal today's crypto-themed joke and share it with your friends.
            </p>
          </div>

          <div className="p-6">
            {isRevealed ? (
              <div className="bg-yellow-50 rounded-lg p-6 mb-6 border border-yellow-200">
                <h2 className="text-lg font-medium text-coffee-900 mb-4">Today's Joke:</h2>
                <div className="text-xl text-coffee-900 mb-6 font-medium">Why did the blockchain go to therapy?</div>
                <div className="text-xl text-coffee-900 mb-6 italic">It had too many trust issues!</div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="gap-2 border-yellow-200 hover:bg-yellow-100"
                    onClick={handleCopyJoke}
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Joke</span>
                  </Button>

                  <Button variant="outline" className="gap-2 border-yellow-200 hover:bg-yellow-100">
                    <Share2 className="h-4 w-4" />
                    <span>Share on Twitter</span>
                  </Button>

                  <Button
                    variant={isLiked ? "default" : "outline"}
                    className={`gap-2 ${isLiked ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "border-yellow-200 hover:bg-yellow-100"}`}
                    onClick={handleLike}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{likeCount}</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-coffee-50 rounded-lg p-6 mb-6 border border-coffee-200 text-center">
                <Laugh className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-lg font-medium text-coffee-900 mb-2">Today's Crypto Joke is Ready!</h2>
                <p className="text-coffee-600 mb-6">
                  Pay a small fee to reveal today's joke and brighten your day with some crypto humor.
                </p>
                <Button
                  onClick={() => setIsRevealed(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  size="lg"
                >
                  Reveal Joke • $0.045
                </Button>
              </div>
            )}

            {isRevealed && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Laugh className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Joke Revealed!</h3>
                    <p className="text-green-700 text-sm">
                      You've unlocked today's joke. Come back tomorrow for a fresh laugh!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-medium text-coffee-900 mb-4">How It Works</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium text-coffee-900">Pay to reveal</h3>
                <p className="text-coffee-600">
                  Pay a small fee of $0.045 (like a sip of coffee) to reveal the daily crypto joke.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-coffee-900">Enjoy and share</h3>
                <p className="text-coffee-600">Have a laugh and share the joke with your friends on social media.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-coffee-900">Build your collection</h3>
                <p className="text-coffee-600">Access your joke history and build a collection of crypto humor.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium text-coffee-900">Submit your own</h3>
                <p className="text-coffee-600">
                  Submit your own jokes for a chance to be featured in the daily selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

