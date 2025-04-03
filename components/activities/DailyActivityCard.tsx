"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: string
  title: string
  description: string
  icon: any
  iconBg: string
  iconColor: string
  fee: string
  reward: string
  category: string
  actionText: string
  completedText: string
}

interface DailyActivityCardProps {
  activity: Activity
  isCompleted: boolean
}

export function DailyActivityCard({ activity, isCompleted }: DailyActivityCardProps) {
  const { title, description, icon: Icon, iconBg, iconColor, fee, reward, actionText, completedText } = activity

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-full ${iconBg}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-coffee-900">{title}</h3>
              <Badge variant="outline" className="bg-coffee-50 text-coffee-700 border-coffee-200">
                {fee}
              </Badge>
            </div>
            <p className="text-coffee-600 text-sm mt-1">{description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="text-coffee-600">Reward:</div>
          <div className="font-medium text-coffee-900">{reward}</div>
        </div>

        <div
          className={`w-full py-2 px-4 rounded-md text-center ${
            isCompleted ? "bg-coffee-100 text-coffee-700" : "bg-coffee-700 text-white"
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2 inline-block" />
              {completedText}
            </>
          ) : (
            actionText
          )}
        </div>
      </div>

      {isCompleted && (
        <div className="bg-coffee-100 p-3 border-t border-coffee-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-coffee-700">Completed today at 9:45 AM</div>
            <Button
              variant="ghost"
              size="sm"
              className="text-coffee-700 hover:text-coffee-900 hover:bg-coffee-200 p-1 h-auto"
            >
              View Details
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

