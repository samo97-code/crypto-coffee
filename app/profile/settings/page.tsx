"use client"

import {useState} from "react"
import {User, Settings, ArrowLeft, Mail, Globe, ImageIcon, Save, Check} from "lucide-react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"

export default function SettingsPage() {
    const [isSaved, setIsSaved] = useState(false)

    const handleSave = () => {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 3000)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/profile" className="inline-flex items-center text-coffee-700 hover:text-coffee-900">
                    <ArrowLeft className="h-4 w-4 mr-1"/>
                    Back to Profile
                </Link>
            </div>

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-coffee-100 rounded-full">
                    <Settings className="h-6 w-6 text-coffee-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">Account Settings</h1>
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200 mb-8">
                <h2 className="text-xl font-semibold text-coffee-900 mb-6 flex items-center">
                    <User className="h-5 w-5 mr-2"/>
                    Profile Information
                </h2>

                <div className="space-y-8">
                    {/* Profile Picture */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div>
                            <Avatar className="h-24 w-24 border-4 border-coffee-50 shadow-md">
                                <AvatarImage src="/placeholder.svg?height=96&width=96"/>
                                <AvatarFallback className="bg-coffee-100 text-coffee-800 text-2xl">CC</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="flex-1">
                            <h3 className="font-medium text-coffee-900 mb-2">Profile Picture</h3>
                            <p className="text-coffee-700 text-sm mb-3">
                                Upload a new profile picture. Recommended size: 400x400 pixels.
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" className="border-coffee-200">
                                    <ImageIcon className="h-4 w-4 mr-2"/>
                                    Upload New Image
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-coffee-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input
                                id="displayName"
                                className="border-coffee-200 focus:border-coffee-500"
                                defaultValue="Coffee Enthusiast"
                            />
                            <p className="text-xs text-coffee-600">This is how your name will appear across Crypto
                                Coffee</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                className="border-coffee-200 focus:border-coffee-500"
                                defaultValue="coffee@example.com"
                            />
                            <p className="text-xs text-coffee-600">Used for notifications and account recovery</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            className="border-coffee-200 focus:border-coffee-500 min-h-[100px]"
                            defaultValue="Blockchain enthusiast and coffee lover. Supporting innovative projects one cup at a time."
                        />
                        <p className="text-xs text-coffee-600">Tell others a bit about yourself (max 160 characters)</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-coffee-500"/>
                                <Input
                                    id="website"
                                    className="border-coffee-200 focus:border-coffee-500 pl-10"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter/X Username</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-500">@</span>
                                <Input
                                    id="twitter"
                                    className="border-coffee-200 focus:border-coffee-500 pl-8"
                                    placeholder="username"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white px-8"
                >
                    {isSaved ? (
                        <>
                            <Check className="h-4 w-4 mr-2"/>
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2"/>
                            Save Changes
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
