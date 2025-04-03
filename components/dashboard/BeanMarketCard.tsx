import { Coffee, Droplets, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tokens = [
  {
    name: "Bean Token",
    price: "$4.20",
    change: "+12.5%",
    icon: Coffee,
    iconColor: "text-coffee-800",
    isPositive: true,
  },
  {
    name: "Arabica",
    price: "$2.80",
    change: "-3.2%",
    icon: Droplets,
    iconColor: "text-blue-500",
    isPositive: false,
  },
  {
    name: "Robusta",
    price: "$1.95",
    change: "+5.7%",
    icon: Flame,
    iconColor: "text-orange-500",
    isPositive: true,
  },
]

export function BeanMarketCard() {
  return (
    <Card className="bg-white border-coffee-200">
      <CardHeader>
        <CardTitle className="text-coffee-800">Bean Market</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tokens.map((token) => (
          <div key={token.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <token.icon className={`h-5 w-5 ${token.iconColor}`} />
              <div className="font-medium text-coffee-900">{token.name}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-coffee-900">{token.price}</div>
              <div className={token.isPositive ? "text-green-600 text-sm" : "text-red-500 text-sm"}>{token.change}</div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-coffee-200 hover:bg-coffee-50">
          View All Markets
        </Button>
      </CardFooter>
    </Card>
  )
}

