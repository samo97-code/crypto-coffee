import { Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SupportersCard() {
  return (
    <Card className="bg-white border-coffee-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-coffee-800">Today's Supporters</CardTitle>
        <div className="flex items-center gap-1 text-coffee-800 font-medium">
          <Coffee className="h-4 w-4" />
          <span>1,234</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex -space-x-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Avatar key={i} className="border-2 border-white w-8 h-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                <AvatarFallback className="bg-coffee-200 text-coffee-800 text-xs">{`U${i}`}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-coffee-50 text-coffee-800 text-xs font-medium">
              +1.2k
            </div>
          </div>

          <div className="text-sm text-coffee-600">
            <p>Over 1,200 people have bought coffee today to support their favorite projects!</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-coffee-600">Your streak:</span>
            <div className="flex items-center gap-1 font-medium text-coffee-800">
              <Coffee className="h-3 w-3" />
              <span>42 days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

