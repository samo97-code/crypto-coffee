import { Coffee } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface CoffeeBrewCardProps {
  name: string
  apy: string
  duration: string
  beans: number
  progress: number
}

export function CoffeeBrewCard({ name, apy, duration, beans, progress }: CoffeeBrewCardProps) {
  return (
    <Card className="bg-coffee-900/50 border-[#493429] text-coffee-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-coffee-800">
              <Coffee className="h-4 w-4 text-[#E6C992]" />
            </div>
            <h3 className="font-bold">{name}</h3>
          </div>
          <div className="text-[#E6C992] font-bold">{apy} APY</div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-coffee-600">Duration:</span>
            <span>{duration}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-coffee-600">Beans Staked:</span>
            <span>{beans} BEAN</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-coffee-600">Brewing Progress:</span>
              <span>{progress}%</span>
            </div>
            {/*<Progress value={progress} className="h-2 bg-[#493429]" indicatorClassName="bg-[#E6C992]" />*/}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-2">
        <Button variant="outline" className="w-full border-[#6F4E37] text-coffee-200 hover:bg-[#493429]">
          Manage Brew
        </Button>
      </CardFooter>
    </Card>
  )
}

