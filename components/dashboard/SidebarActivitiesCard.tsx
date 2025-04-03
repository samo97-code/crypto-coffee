import { Ticket, Brain, Laugh, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SidebarActivitiesCard =()=> {
    const activities = [
        {
            title: "Gas Fee Lottery",
            description: "Win daily prizes",
            icon: Ticket,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            href: "/daily-activities/gas-lottery",
        },
        {
            title: "Crypto Trivia",
            description: "Test your knowledge",
            icon: Brain,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            href: "/daily-activities/crypto-trivia",
        },
        {
            title: "Daily Joke",
            description: "Start with a laugh",
            icon: Laugh,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
            href: "/daily-activities/daily-joke",
        },
    ]

    return (
        <div className="bg-white shadow-sm border border-coffee-200 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-coffee-200">
                <h3 className="font-semibold text-amber-900">Daily Activities</h3>
            </div>
            <div className="p-4 space-y-4">
                {activities.map((activity) => (
                    <Link key={activity.title} href={activity.href}>
                        <div className="flex items-center gap-3 hover:bg-coffee-100 p-2 rounded-md transition-colors">
                            <div className={`${activity.bgColor} w-10 h-10 rounded-full flex items-center justify-center`}>
                                <activity.icon className={`h-5 w-5 ${activity.color}`} />
                            </div>
                            <div>
                                <div className="font-medium text-amber-950">{activity.title}</div>
                                <div className="text-xs text-amber-700">{activity.description}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="p-4 pt-0">
                <Link href="/daily-activities">
                    <Button variant="outline" className="w-full border-coffee-200 hover:bg-coffee-200">
                        View All Activities
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SidebarActivitiesCard

