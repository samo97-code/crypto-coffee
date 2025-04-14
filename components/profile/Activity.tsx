import React, {FC} from 'react';
import {Coffee, History, Award} from "lucide-react";
import {Button} from "@/components/ui/button";
import {IActivity} from "@/types";
import { formatRelativeTime } from "@/lib/activity-service"
import {useRouter} from "next/navigation";

interface IProps {
    activities: IActivity[]
}

// Mock icons for testing purposes
const Brain = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 17.75a6 6 0 0 0-8 0"></path>
        <rect x="2" y="7" width="20" height="10" rx="2"></rect>
        <path d="M7 7a5 5 0 0 1 10 0"></path>
        <path d="M12 17v5"></path>
    </svg>
)
const Ticket = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9z"></path>
        <line x1="15" y1="9" x2="15" y2="15"></line>
    </svg>
)
const Laugh = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
)
const Dice1Icon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <circle cx="9" cy="9" r="1"></circle>
    </svg>
)
const Cat = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 8a2 2 0 0 0-2-2c-1.33 0-2.67 0-4 0a2 2 0 0 0-2 2"></path>
        <path d="M12 14V2"></path>
        <path d="M2 10l3 8v3h14v-3l3-8"></path>
        <line x1="6" y1="10" x2="6" y2="18"></line>
        <line x1="18" y1="10" x2="18" y2="18"></line>
    </svg>
)

const Activity: FC<IProps> = ({activities}) => {
    const router = useRouter()

    const getIconComponent = (iconName: string) => {
        const iconMap: Record<string, any> = {
            Coffee: Coffee,
            Award,
            History: History,
            Brain: Brain,
            Ticket: Ticket,
            Laugh: Laugh,
            Dice: Dice1Icon,
            Cat: Cat,
        }
        return iconMap[iconName] || Coffee
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
            <h3 className="font-semibold text-coffee-900 mb-6 flex items-center">
                <History className="h-5 w-5 mr-2"/>
                Recent Activity
            </h3>

            <div className="space-y-6">
                {
                    activities.length ? (
                        activities.map((activity, index) => {
                            // Map icon string to Lucide icon component
                            const IconComponent = getIconComponent(activity.icon)

                            return (
                                <div key={index} className="flex gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-full ${activity.icon_bg} flex items-center justify-center shrink-0`}
                                    >
                                        <IconComponent className={`h-5 w-5 ${activity.icon_color}`}/>
                                    </div>

                                    <div className="flex-1 border-b border-coffee-100 pb-6 last:border-0 last:pb-0">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium text-coffee-900">{activity.title}</h4>
                                            <div className="flex items-center text-coffee-600 text-sm">
                                                <History className="h-3 w-3 mr-1"/>
                                                {formatRelativeTime(activity.timestamp)}
                                            </div>
                                        </div>
                                        <p className="text-coffee-700">{activity.description}</p>

                                        {activity.project_name && (
                                            <div className="mt-2 flex items-center gap-2 bg-coffee-50 p-2 rounded-lg">
                                                <div
                                                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                                    {activity.project_icon ? (
                                                        <img
                                                            src={activity.project_icon || "/placeholder.svg"}
                                                            alt={activity.project_name}
                                                            className="w-5 h-5"
                                                        />
                                                    ) : (
                                                        <Coffee className="h-4 w-4 text-coffee-700"/>
                                                    )}
                                                </div>
                                                <div className="text-sm">
                                                    <div
                                                        className="font-medium text-coffee-900">{activity.project_name}</div>
                                                    <div
                                                        className="text-coffee-600 text-xs">{activity.project_chain}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        // Empty state when no activities
                        <div className="text-center py-8 text-coffee-700">
                            <History className="h-12 w-12 mx-auto mb-4 text-coffee-300"/>
                            <p>No recent activity yet. Start buying coffee to see your activity here!</p>
                            <Button className="mt-4 bg-coffee-700 hover:bg-coffee-800 text-white" onClick={()=>router.push('/')}>Discover
                                Projects</Button>
                        </div>
                    )
                }
            </div>

            {
                activities.length ? <div className="mt-4 text-center">
                    <Button variant="outline" className="border-coffee-200" onClick={()=>router.push('/profile/wallet')}>
                        View All Activity
                    </Button>
                </div> : ''
            }
        </div>
    );
};

export default Activity;
