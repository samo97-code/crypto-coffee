"use client"

import type React from "react"
import {useState, useEffect} from "react"
import {User, Save, Check} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {supabase} from "@/lib/supabase"
import {motion} from "framer-motion"
import {useAppSelector} from "@/store/hook";
import SettingsHeader from "@/components/profile/settings/SettingsHeader";
import ReactSelect from "react-select";
import {avatarsOptions} from "@/constants";
import {setAuthUser} from "@/store/slices/userSlice";
import {useDispatch} from "react-redux";
import useSelectCss from "@/hooks/useSelectCss";

const PageWrapper =()=> {
    const {customStyles} = useSelectCss()
    const dispatch = useDispatch();
    const {user} = useAppSelector(state => state.user);
    const [selectedImage, setSelectedImage] = useState<string>(user.avatar_url || '')
    const [formData, setFormData] = useState({
        display_name: user.display_name,
        email: user.email,
        bio: user.bio,
    })
    const [isSaved, setIsSaved] = useState(false)
    const [isSaving, setIsSaving] = useState(false)


    // Load user data into form
    useEffect(() => {
        if (user) {
            setFormData({
                display_name: user.display_name || "",
                email: user.email || "",
                bio: user.bio || "",
            })
        }
    }, [user])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target
        setFormData((prev) => ({...prev, [id]: value}))
    }

    const handleSave = async () => {
        setIsSaving(true)

        try {
            const data = {
                ...formData,
                avatar_url: selectedImage || user.avatar_url,
            }

            const {error} = await supabase.from("users").update(data).eq("id", user.id)
            if (error) throw error

            await updateUser()
            setIsSaved(true)
            setTimeout(() => setIsSaved(false), 3000)
        } catch (error) {
            console.error("Error saving settings:", error)
        } finally {
            setIsSaving(false)
        }
    }

    const updateUser = async () => {
        const {data: updatedUser} = await supabase
            .from('user_with_transaction_count')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();

        dispatch(setAuthUser(updatedUser))
    }

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-6">
                <SettingsHeader/>

                {/* Main Content */}
                <div className="">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="bg-card rounded-xl p-8 shadow-sm border border-coffee-100"
                    >
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-coffee-900 mb-6 flex items-center">
                                <User className="h-5 w-5 mr-2"/>
                                Profile Information
                            </h2>

                            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                                <div>
                                    <Avatar className="h-24 w-24 border-4 border-coffee-50 shadow-md">
                                        <AvatarImage
                                            src={selectedImage || user?.avatar_url || "/placeholder.svg?height=96&width=96"}
                                            alt={user?.display_name || "Profile"}
                                        />
                                        <AvatarFallback className="bg-coffee-100 text-coffee-800 text-2xl">
                                            {user?.display_name?.substring(0, 2) || "CC"}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-medium text-coffee-900 mb-2">Profile Picture</h3>
                                    <p className="text-coffee-700 text-sm mb-3">Select a new profile picture.</p>
                                    <div className="flex flex-col gap-2">
                                        <ReactSelect
                                            options={avatarsOptions}
                                            onChange={(e) => setSelectedImage(e?.value || '')}
                                            isSearchable
                                            placeholder="Select Image"
                                            styles={customStyles}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="display_name">Display Name</Label>
                                    <Input
                                        type="text"
                                        id="display_name"
                                        className="border-coffee-400 focus:border-coffee-600 dark:border-coffee-200"
                                        value={formData.display_name}
                                        onChange={handleChange}
                                    />
                                    <p className="text-xs text-coffee-600">This is how your name will appear across
                                        Crypto Coffee</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        className="border-coffee-400 focus:border-coffee-600 dark:border-coffee-200"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <p className="text-xs text-coffee-600">Used for notifications and account
                                        recovery</p>
                                </div>
                            </div>

                            <div className="space-y-2 mt-6">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    className="border-coffee-400 focus:border-coffee-600 min-h-[150px] resize-none dark:border-coffee-200"
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                                <p className="text-xs text-coffee-600">Tell others a bit about yourself (max 160
                                    characters)</p>
                            </div>

                            {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">*/}
                            {/*    <div className="space-y-2">*/}
                            {/*        <Label htmlFor="website_url">Website</Label>*/}
                            {/*        <div className="relative">*/}
                            {/*            <Globe*/}
                            {/*                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-coffee-500"/>*/}
                            {/*            <Input*/}
                            {/*                type="url"*/}
                            {/*                id="website_url"*/}
                            {/*                className="border-coffee-200 focus:border-coffee-500 pl-10"*/}
                            {/*                placeholder="https://yourwebsite.com"*/}
                            {/*                value={formData.website_url}*/}
                            {/*                onChange={handleChange}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}

                            {/*    <div className="space-y-2">*/}
                            {/*        <Label htmlFor="twitter_username">Twitter/X Username</Label>*/}
                            {/*        <div className="relative">*/}
                            {/*            <span*/}
                            {/*                className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-500">@</span>*/}
                            {/*            <Input*/}
                            {/*                type="text"*/}
                            {/*                id="twitter_username"*/}
                            {/*                className="border-coffee-200 focus:border-coffee-500 pl-8"*/}
                            {/*                placeholder="username"*/}
                            {/*                value={formData.twitter_username}*/}
                            {/*                onChange={handleChange}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </section>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5}}
                            className="flex justify-end"
                        >
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="bg-gradient-to-r from-coffee-500 to-coffee-700 dark:from-coffee-50/80 dark:to-coffee-50/50 hover:from-coffee-600 hover:to-coffee-800 text-white px-8"
                            >
                                {isSaved ? (
                                    <>
                                        <Check className="h-4 w-4 mr-2"/>
                                        Saved!
                                    </>
                                ) : isSaving ? (
                                    <>
                                    <span
                                        className="h-4 w-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2"/>
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default PageWrapper
