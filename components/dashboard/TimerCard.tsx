import { Timer, Coffee } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const timers = [
  {
    network: "Optimism",
    time: "09h 28m 39s",
    icon: "/placeholder.svg",
  },
  {
    network: "Monad Testnet",
    time: "22h 17m 36s",
    icon: "/placeholder.svg",
  },
]

export function TimerCard() {
  return (
    <Card className="bg-white border-coffee-200">
      <CardHeader className="flex flex-row items-center gap-2">
        <Timer className="h-5 w-5" />
        <h3 className="font-semibold">Next Support Timers</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timers.map((timer) => (
            <div key={timer.network} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-coffee-200" />
                <span>{timer.network}</span>
              </div>
              <span className="text-coffee-800 font-medium">{timer.time}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-coffee-200 text-sm text-coffee-600">
          <div className="flex items-center gap-1">
            <Coffee className="h-3 w-3" />
            <span>Coffee resets after 24 hours</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

