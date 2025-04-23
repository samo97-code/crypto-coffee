import React, {useEffect, useRef, useState} from "react";
import {mockAnnouncements } from "@/constants";
import {Award, Bell, Sparkles, Zap} from "lucide-react"

const AnnouncementCard = () => {
    const [showNotifications, setShowNotifications] = useState(false)
    const [announcements, setAnnouncements] = useState(mockAnnouncements)
    const [unreadCount, setUnreadCount] = useState(2)
    const notificationRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Add the float and slide animations keyframes to the document
        const style = document.createElement("style")
        style.textContent = `
   @keyframes float {
     0%, 100% { transform: translateY(0); }
     50% { transform: translateY(-10px); }
   }
   @keyframes slide {
     0% { transform: translateX(-100%); }
     100% { transform: translateX(100%); }
   }
   @keyframes bellRing {
     0%, 100% { transform: rotate(0); }
     10% { transform: rotate(10deg); }
     20% { transform: rotate(-8deg); }
     30% { transform: rotate(6deg); }
     40% { transform: rotate(-4deg); }
     50% { transform: rotate(2deg); }
     60% { transform: rotate(0); }
   }
   @keyframes dropIn {
     0% { opacity: 0; transform: translateY(-10px); }
     100% { opacity: 1; transform: translateY(0); }
   }
   @keyframes pulse {
     0%, 100% { transform: scale(1); }
     50% { transform: scale(1.05); }
   }
 `

        document.head.appendChild(style)
    },[])


    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications)
        if (unreadCount > 0 && !showNotifications) {
            // Mark as read when opening
            setUnreadCount(0)
            setAnnouncements((prev) =>
                prev.map((announcement) => ({
                    ...announcement,
                    isNew: false,
                })),
            )
        }
    }

    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case "Sparkles":
                return <Sparkles className="h-4 w-4" />
            case "Zap":
                return <Zap className="h-4 w-4" />
            case "Award":
                return <Award className="h-4 w-4" />
            default:
                return <Bell className="h-4 w-4" />
        }
    }

    return (

        <div className="relative" ref={notificationRef}>
            <button
                onClick={handleNotificationClick}
                className="relative p-2 rounded-full bg-gradient-to-r from-coffee-100 to-coffee-200 dark:from-coffee-500 dark:to-coffee-700 hover:from-coffee-200 hover:to-coffee-300 dark:hover:from-coffee-600 dark:hover:to-coffee-700 shadow-md transition-colors duration-300 group"
                style={{animation: showNotifications ? "none" : unreadCount > 0 ? "bellRing 2s infinite" : "none"}}
            >
                <Bell className="h-5 w-5 text-coffee-700 dark:text-coffee-100 group-hover:text-coffee-800 transition-colors"/>

                {unreadCount > 0 && (
                    <span
                        className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
                  {unreadCount}
                </span>
                )}

            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
                <div
                    className="absolute right-0 mt-2 w-80 rounded-lg bg-card shadow-xl border border-coffee-200 overflow-hidden z-50"
                    style={{animation: "dropIn 0.3s ease-out forwards"}}
                >
                    <div className="bg-gradient-to-r from-coffee-50 to-orange-50 dark:from-coffee-50 dark:to-coffee-100 px-4 py-3 border-b border-coffee-200">
                        <h3 className="font-semibold text-coffee-900">Announcements</h3>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {announcements.map((announcement) => (
                            <div
                                key={announcement.id}
                                className={`px-4 py-3 border-b border-coffee-100 dark:border-coffee-800 hover:bg-coffee-50/50 transition-colors ${
                                    announcement.isNew ? "bg-amber-50/30" : ""
                                }`}
                                style={{
                                    animation: announcement.isNew ? "pulse 2s infinite" : "none",
                                }}
                            >
                                <div className="flex items-start">
                                    <div
                                        className={`flex-shrink-0 mr-3 mt-0.5 rounded-full p-1.5 ${
                                            announcement.isNew ? "bg-amber-100" : "bg-gray-100 dark:bg-coffee-400"
                                        }`}
                                    >
                                        {getIconComponent(announcement.icon)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="text-sm font-medium text-coffee-900">{announcement.title}</h4>
                                            <span className="text-xs text-coffee-500">{announcement.date}</span>
                                        </div>
                                        <p className="text-sm text-coffee-700">{announcement.content}</p>
                                    </div>
                                </div>
                                {announcement.isNew && (
                                    <div className="mt-2 ml-8">
                          <span className="inline-block px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">
                            New
                          </span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {announcements.length === 0 && (
                            <div className="px-4 py-6 text-center text-coffee-500">
                                <p>No announcements yet</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

)
}

export default AnnouncementCard

