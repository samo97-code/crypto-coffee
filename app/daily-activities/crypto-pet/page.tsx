"use client"

import { useState } from "react"
import { Cat, ArrowLeft, Heart, Coffee, Award, Droplets, Utensils, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function CryptoPetPage() {
  const [isFed, setIsFed] = useState(false)
  const [happiness, setHappiness] = useState(75)
  const [energy, setEnergy] = useState(40)
  const [level, setLevel] = useState(3)

  const handleFeed = () => {
    if (!isFed) {
      setIsFed(true)
      setHappiness(Math.min(happiness + 15, 100))
      setEnergy(Math.min(energy + 30, 100))
    }
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
              <div className="p-3 bg-orange-100 rounded-full">
                <Cat className="h-6 w-6 text-orange-600" />
              </div>
              <h1 className="text-2xl font-bold text-coffee-900">Crypto Pet</h1>
            </div>
            <p className="text-coffee-600">
              Take care of your virtual Crypto Cat by feeding it daily. Watch it grow and evolve as you nurture it!
            </p>
          </div>

          <div className="p-6">
            <div className="bg-orange-50 rounded-lg p-6 mb-6 border border-orange-200 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Cat className="h-16 w-16 text-orange-600" />
              </div>

              <h2 className="text-xl font-bold text-coffee-900 mb-1">Satoshi</h2>
              <div className="text-coffee-600 mb-4">Level {level} Crypto Cat</div>

              <div className="space-y-3 mb-6">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-600">Happiness:</span>
                    <span className="text-coffee-900">{happiness}%</span>
                  </div>
                  <Progress value={happiness} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-600">Energy:</span>
                    <span className="text-coffee-900">{energy}%</span>
                  </div>
                  <Progress value={energy} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-600">Level Progress:</span>
                    <span className="text-coffee-900">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>

              <Button
                onClick={handleFeed}
                disabled={isFed}
                className={`w-full ${
                  isFed
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-100 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
                size="lg"
              >
                {isFed ? (
                  <>
                    <Coffee className="h-4 w-4 mr-2" />
                    Fed Today • Come back tomorrow!
                  </>
                ) : (
                  <>
                    <Utensils className="h-4 w-4 mr-2" />
                    Feed Pet • $0.045
                  </>
                )}
              </Button>
            </div>

            {isFed && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Pet Fed Successfully!</h3>
                    <p className="text-green-700 text-sm">
                      Satoshi is happy and energized. You've earned 10 Pet Points and increased your bond!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-medium text-coffee-900">Pet Achievements</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-coffee-200">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-coffee-900">Loyal Companion</div>
                  <div className="text-sm text-coffee-600">Fed your pet for 7 days in a row</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-3 border-b border-coffee-200">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-coffee-900">Level Up Master</div>
                  <div className="text-sm text-coffee-600">Reached Level 3 with your pet</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Gift className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-coffee-900 opacity-50">Perfect Bond</div>
                  <div className="text-sm text-coffee-600">Reach 100% happiness for 3 days</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-medium text-coffee-900">Pet Items</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-coffee-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Coffee className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-coffee-900">Premium Coffee</div>
                    <div className="text-sm text-coffee-600">+25% Energy boost</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-coffee-200">
                  Use
                </Button>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-coffee-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-coffee-900">Grooming Kit</div>
                    <div className="text-sm text-coffee-600">+15% Happiness</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-coffee-200">
                  Use
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Gift className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium text-coffee-900 opacity-50">Mystery Box</div>
                    <div className="text-sm text-coffee-600">Unlock at Level 5</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-coffee-200" disabled>
                  Locked
                </Button>
              </div>
            </div>
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
                <h3 className="font-medium text-coffee-900">Feed your pet daily</h3>
                <p className="text-coffee-600">
                  Pay a small fee of $0.045 (like a sip of coffee) to feed your Crypto Pet each day.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-coffee-900">Watch it grow</h3>
                <p className="text-coffee-600">
                  Your pet gains experience and levels up as you care for it consistently.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-coffee-900">Earn collectibles</h3>
                <p className="text-coffee-600">
                  Unlock special pet collectibles, accessories, and NFTs as your pet evolves.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium text-coffee-900">Complete achievements</h3>
                <p className="text-coffee-600">
                  Earn badges and rewards by completing pet care achievements and milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

