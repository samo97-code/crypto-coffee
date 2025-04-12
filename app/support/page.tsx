"use client"

import { Coffee, LifeBuoy, Mail, MessageSquare, Phone, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SupportPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 rounded-full">
                    <LifeBuoy className="h-6 w-6 text-amber-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">Support Center</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-amber-100">
                        <h2 className="text-2xl font-semibold text-coffee-900 mb-6">Get in Touch</h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-amber-800 font-medium">
                                        Your Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        className="border-amber-200 focus:border-amber-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-amber-800 font-medium">
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="border-amber-200 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-amber-800 font-medium">
                                    Subject
                                </label>
                                <Input
                                    id="subject"
                                    placeholder="What's your inquiry about?"
                                    className="border-amber-200 focus:border-amber-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-amber-800 font-medium">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Please describe your issue or question in detail..."
                                    className="border-amber-200 focus:border-amber-500 min-h-[150px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="wallet" className="text-amber-800 font-medium">
                                    Wallet Address (Optional)
                                </label>
                                <Input
                                    id="wallet"
                                    placeholder="If your inquiry is related to a specific transaction"
                                    className="border-amber-200 focus:border-amber-500"
                                />
                            </div>

                            <Button
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                                Submit Support Request
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Support Info */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-amber-100 mb-8">
                        <h2 className="text-xl font-semibold text-coffee-900 mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-amber-100 rounded-full">
                                    <Mail className="h-5 w-5 text-coffee-700"/>
                                </div>
                                <div>
                                    <h3 className="font-medium text-amber-800">Email Support</h3>
                                    <p className="text-coffee-700 mt-1">
                                        <a href="mailto:support@cryptocoffee.com" className="hover:underline">
                                            support@cryptocoffee.com
                                        </a>
                                    </p>
                                    <p className="text-sm text-amber-600 mt-1">We typically respond within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-amber-100 rounded-full">
                                    <MessageSquare className="h-5 w-5 text-coffee-700"/>
                                </div>
                                <div>
                                    <h3 className="font-medium text-amber-800">Live Chat</h3>
                                    <p className="text-coffee-700 mt-1">Available Monday-Friday</p>
                                    <p className="text-sm text-amber-600 mt-1">9:00 AM - 5:00 PM UTC</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-amber-100 rounded-full">
                                    <Phone className="h-5 w-5 text-coffee-700"/>
                                </div>
                                <div>
                                    <h3 className="font-medium text-amber-800">Phone Support</h3>
                                    <p className="text-coffee-700 mt-1">+1 (555) 123-4567</p>
                                    <p className="text-sm text-amber-600 mt-1">For premium support subscribers only</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-sm border border-amber-100">
                        <h2 className="text-xl font-semibold text-coffee-900 mb-6">Quick Help</h2>

                        <div className="space-y-4">
                            <Link
                                href="/faq"
                                className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                            >
                                <HelpCircle className="h-5 w-5 text-coffee-700"/>
                                <span className="text-amber-800 font-medium">Frequently Asked Questions</span>
                            </Link>

                            <Link
                                href="/documentation"
                                className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                            >
                                <Coffee className="h-5 w-5 text-coffee-700"/>
                                <span className="text-amber-800 font-medium">Platform Documentation</span>
                            </Link>

                            <Link
                                href="/how-it-works"
                                className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                            >
                                <Coffee className="h-5 w-5 text-coffee-700"/>
                                <span className="text-amber-800 font-medium">How It Works</span>
                            </Link>
                        </div>

                        <div className="mt-6 pt-6 border-t border-amber-100">
                            <h3 className="font-medium text-amber-800 mb-3">Community Support</h3>
                            <p className="text-coffee-700 text-sm">
                                Join our Discord community for peer-to-peer support and to connect with other Crypto
                                Coffee users.
                            </p>
                            <Button variant="outline" className="mt-3 w-full border-amber-200">
                                Join Discord Community
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

