import { Ticket, Brain, Laugh, Dice1Icon as Dice, Cat, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DailyActivitiesSection() {
  const activities = [
    {
      title: "Gas Fee Lottery",
      icon: Ticket,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Crypto Trivia",
      icon: Brain,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Daily Joke",
      icon: Laugh,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Blockchain Bingo",
      icon: Dice,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Crypto Pet",
      icon: Cat,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-coffee-900 mb-1">Daily Activities</h2>
          <p className="text-coffee-600">Support projects while having fun with daily micro-activities</p>
        </div>
        <Link href="/daily-activities">
          <Button className="mt-4 md:mt-0 bg-coffee-700 hover:bg-coffee-800 text-white">
            View All Activities
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {activities.map((activity) => (
          <Link key={activity.title} href="/daily-activities" className="block">
            <div className="bg-card border border-coffee-200 rounded-lg p-4 text-center hover:border-coffee-300 hover:shadow-sm transition-all">
              <div
                className={`${activity.bgColor} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <activity.icon className={`h-6 w-6 ${activity.color}`} />
              </div>
              <div className="font-medium text-coffee-900 text-sm">{activity.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

