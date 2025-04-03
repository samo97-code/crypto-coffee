"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Coffee, Twitter, Github, ExternalLink, Heart, ChevronUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer =()=> {
    const [showScrollTop, setShowScrollTop] = useState(false)
    const [coffeeCount, setCoffeeCount] = useState(0)

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
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Increment coffee count when clicked
    const handleCoffeeClick = () => {
        setCoffeeCount((prev) => prev + 1)
        // Add a little animation effect
        const coffee = document.getElementById("footer-coffee-icon")
        if (coffee) {
            coffee.classList.add("animate-bounce")
            setTimeout(() => coffee.classList.remove("animate-bounce"), 1000)
        }
    }

    return (
        <footer className="relative mt-20 overflow-hidden">
            {/* Decorative coffee beans background */}
            <div className="absolute inset-0 -z-10 opacity-5">
                <div className="absolute top-10 left-1/4 w-20 h-20 rounded-full border-4 border-coffee-300 rotate-12"></div>
                <div className="absolute top-40 left-1/3 w-12 h-12 rounded-full border-4 border-coffee-300 -rotate-12"></div>
                <div className="absolute top-20 right-1/4 w-16 h-16 rounded-full border-4 border-coffee-300 rotate-45"></div>
                <div className="absolute bottom-10 left-1/5 w-14 h-14 rounded-full border-4 border-coffee-300 -rotate-20"></div>
                <div className="absolute bottom-30 right-1/3 w-10 h-10 rounded-full border-4 border-coffee-300 rotate-30"></div>
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
                        className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg h-12 w-12"
                    >
                        <ChevronUp className="h-6 w-6 text-white" />
                    </Button>
                </div>
            </div>

            {/* Wave divider */}
            <div className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-coffee-100">
                    <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Main footer content */}
            <div className="bg-coffee-100 pt-4 pb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo and about section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div
                                    id="footer-coffee-icon"
                                    className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg cursor-pointer"
                                    onClick={handleCoffeeClick}
                                >
                                    <Coffee className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-amber-900">Crypto Coffee</h3>
                            </div>
                            <p className="text-amber-800">
                                Supporting blockchain projects one coffee at a time. Join our community of supporters and help projects
                                grow.
                            </p>
                            {coffeeCount > 0 && (
                                <div className="flex items-center gap-2 text-amber-700">
                                    <Sparkles className="h-4 w-4" />
                                    <span>You've brewed {coffeeCount} virtual coffees!</span>
                                </div>
                            )}
                        </div>

                        {/* Quick links */}
                        <div>
                            <h4 className="font-semibold text-amber-900 mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {["Home", "Projects", "Daily Activities", "How It Works", "FAQ"].map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-amber-700 hover:text-amber-900 hover:underline flex items-center gap-1"
                                        >
                                            <span>{link}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="font-semibold text-amber-900 mb-4">Resources</h4>
                            <ul className="space-y-2">
                                {[
                                    { name: "Documentation", icon: ExternalLink },
                                    { name: "GitHub", icon: Github },
                                    { name: "Support", icon: Heart },
                                    { name: "Terms of Service", icon: ExternalLink },
                                    { name: "Privacy Policy", icon: ExternalLink },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href="#"
                                            className="text-amber-700 hover:text-amber-900 hover:underline flex items-center gap-1"
                                        >
                                            <item.icon className="h-3.5 w-3.5" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="font-semibold text-amber-900 mb-4">Connect With Us</h4>
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg transition-all"
                                >
                                    <Twitter className="h-5 w-5" />
                                    <span>Follow on Twitter</span>
                                </Link>

                                <div className="bg-white p-4 rounded-lg border border-amber-200">
                                    <h5 className="font-medium text-amber-900 mb-2">Join Our Newsletter</h5>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            className="w-[150px] px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        <Button className="h-[42px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                                            Subscribe
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar with copyright */}
                    <div className="mt-12 pt-6 border-t border-amber-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-amber-700 text-sm">
                            © {new Date().getFullYear()} Crypto Coffee. All rights reserved.
                        </div>

                        <div className="flex items-center gap-2 text-amber-700 text-sm">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                            <span>and</span>
                            <Coffee className="h-4 w-4 text-amber-800" />
                        </div>

                        <div className="flex gap-4">
                            <Link href="#" className="text-amber-700 hover:text-amber-900 text-sm hover:underline">
                                Cookies
                            </Link>
                            <Link href="#" className="text-amber-700 hover:text-amber-900 text-sm hover:underline">
                                Legal
                            </Link>
                            <Link href="#" className="text-amber-700 hover:text-amber-900 text-sm hover:underline">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

