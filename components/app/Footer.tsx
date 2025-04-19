"use client"

import {useState, useEffect} from "react"
import Link from "next/link"
import {Coffee, Twitter, ExternalLink, Heart, ChevronUp} from "lucide-react"
import {Button} from "@/components/ui/button"

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false)

    const quickLinks = [
        {id: 1, label: 'Home +', link: '/'},
        // {id: 2, label: 'Daily Activities +', link: '/daily-activities'},
        {id: 3, label: 'How It Works +', link: '/how-it-works'},
        {id: 4, label: 'FAQ', link: '/faq'},
    ]

    const resources = [
        // {name: "Documentation", icon: ExternalLink, link: '/documentation'},
        // {name: "Support", icon: Heart, link: '/support'},
        {name: "Terms of Service +", icon: ExternalLink, link: '/terms-of-service'},
        {name: "Privacy Policy +", icon: ExternalLink, link: '/privacy-policy'},
    ]

    // Check scroll position to show/hide scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    return (
        <footer className="relative overflow-hidden">
            {/* Decorative coffee beans background */}
            <div className="absolute inset-0 -z-10 opacity-5">
                <div
                    className="absolute top-10 left-1/4 w-20 h-20 rounded-full border-4 border-coffee-300 rotate-12"></div>
                <div
                    className="absolute top-40 left-1/3 w-12 h-12 rounded-full border-4 border-coffee-300 -rotate-12"></div>
                <div
                    className="absolute top-20 right-1/4 w-16 h-16 rounded-full border-4 border-coffee-300 rotate-45"></div>
                <div
                    className="absolute bottom-10 left-1/5 w-14 h-14 rounded-full border-4 border-coffee-300 -rotate-20"></div>
                <div
                    className="absolute bottom-30 right-1/3 w-10 h-10 rounded-full border-4 border-coffee-300 rotate-30"></div>
            </div>

            {/* Scroll to top button */}
            <div className="max-w-7xl mx-auto px-4 relative">
                <div
                    className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
                        showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <Button
                        onClick={scrollToTop}
                        size="icon"
                        className="rounded-full bg-gradient-to-br from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 shadow-lg h-10 w-10 transition-all"
                    >
                        <ChevronUp className="h-8 w-8 text-white"/>
                    </Button>
                </div>
            </div>

            {/* Main footer content */}
            <div className="bg-coffee-100 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo and about section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div
                                    className="p-3 bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-2xl shadow-md transform -rotate-3">
                                    <div className="relative">
                                        <div
                                            className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-white/70 blur-[1px]"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="lucide lucide-coffee h-5 w-5 text-white">
                                            <path d="M10 2v2"></path>
                                            <path d="M14 2v2"></path>
                                            <path
                                                d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path>
                                            <path d="M6 2v2"></path>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-coffee-900">Crypto Coffee</h3>
                            </div>
                            <p className="text-amber-800">
                                Power up Web3, one coffee at a time. Support your favorite projects and be part of the
                                decentralized future.
                            </p>
                        </div>

                        {/* Quick links */}
                        <div>
                            <h4 className="font-semibold text-coffee-900 mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {quickLinks.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={item.link}
                                            className="text-coffee-700 hover:text-coffee-900 hover:underline inline-flex items-center gap-1"
                                        >
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="font-semibold text-coffee-900 mb-4">Resources</h4>
                            <ul className="space-y-2">
                                {resources.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.link}
                                            className="text-coffee-700 hover:text-coffee-900 hover:underline inline-flex items-center gap-1"
                                        >
                                            <item.icon className="h-3.5 w-3.5"/>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="font-semibold text-coffee-900 mb-4">Connect With Us</h4>
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                className="inline-flex items-center gap-2 bg-gradient-to-br from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white px-4 py-2 rounded-lg transition-all"
                            >
                                <Twitter className="h-5 w-5"/>
                                <span>Follow on Twitter</span>
                            </Link>
                        </div>
                    </div>

                    {/* Bottom bar with copyright */}
                    <div
                        className="mt-12 pt-6 border-t border-coffee-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-coffee-700 text-sm">
                            © {new Date().getFullYear()} Crypto Coffee. All rights reserved.
                        </div>

                        <div className="flex items-center gap-2 text-coffee-700 text-sm">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                            <span>and</span>
                            <Coffee className="h-4 w-4 text-amber-800"/>
                        </div>

                        <div className="flex gap-4">

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

