"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {Coffee, Twitter, Github, ArrowUpCircle, MessageCircle, ChevronUp, Heart} from "lucide-react"
import {Button} from "@/components/ui/button";

export function CreativeFooter() {
    const [showScrollTop, setShowScrollTop] = useState(false)
    const [year] = useState(new Date().getFullYear())

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


    return (
        <footer className="relative">
            {/* Coffee cup shape divider */}
            <div className="relative h-24">
                <svg viewBox="0 0 1440 96" className="absolute bottom-0 w-full h-auto fill-coffee-600 dark:fill--coffee-50/80">
                    <path d="M0,96L120,90.7C240,85,480,75,720,74.7C960,75,1200,85,1320,90.7L1440,96L1440,96L1320,96C1200,96,960,96,720,96C480,96,240,96,120,96L0,96Z"></path>
                </svg>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-16 bg-[#E99C20] rounded-t-full"></div>
            </div>

            {/* Main footer content */}
            <div className="bg-coffee-200 dark:bg-coffee-50/90 pt-16 pb-8 relative overflow-hidden">
                {/* Coffee bean decorations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-10 left-10 w-20 h-40 rounded-full border-4 border-[#E18A00]/20 rotate-45"></div>
                    <div className="absolute top-40 right-20 w-16 h-32 rounded-full border-4 border-[#E18A00]/20 -rotate-45"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-24 rounded-full border-4 border-[#E18A00]/20 rotate-12"></div>
                    <div className="absolute bottom-40 right-1/3 w-14 h-28 rounded-full border-4 border-[#E18A00]/20 -rotate-12"></div>
                </div>

                <div className="container mx-auto px-4">
                    {/* Logo and links in a unique layout */}
                    <div className="flex flex-col items-center">
                        {/* Logo in a coffee cup shape */}
                        <div className="relative mb-12">
                            <div className="w-64 h-64 bg-coffee-400 dark:bg-[#6F4E37] rounded-full flex items-center justify-center p-6 shadow-xl">
                                <Image
                                    src="/crypto-coffee-logo-footer.png"
                                    alt="Crypto Coffee"
                                    width={200}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>
                            {/* Coffee steam effect */}
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                <div className="w-3 h-12 bg-[#E18A00]/20 rounded-full animate-steam"></div>
                                <div className="w-3 h-16 bg-[#E18A00]/20 rounded-full animate-steam2 delay-150"></div>
                                <div className="w-3 h-10 bg-[#E18A00]/20 rounded-full animate-steam3 delay-300"></div>
                            </div>
                        </div>

                        {/* Links in a circular pattern */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16">
                            {/* Quick Links */}
                            <div className="bg-coffee-600 dark:bg-coffee-100/80 p-6 rounded-2xl transform hover:scale-105 transition-transform">
                                <h3 className="text-coffee-50 dark:text-coffee-900 font-bold text-xl mb-4 text-center">Quick Links</h3>
                                <ul className="space-y-3">
                                    {[
                                        { name: "Home", href: "/" },
                                        { name: "How It Works", href: "/how-it-works" },
                                        { name: "FAQ", href: "/faq" },
                                    ].map((link) => (
                                        <li key={link.name} className="text-center">
                                            <Link
                                                href={link.href}
                                                className="text-white hover:text-coffee-300 transition-colors inline-block py-1 px-4 rounded-full border border-transparent"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resources */}
                            <div className="bg-coffee-600 dark:bg-coffee-100/80 p-6 rounded-2xl transform hover:scale-105 transition-transform">
                                <h3 className="text-coffee-50 dark:text-coffee-900 font-bold text-xl mb-4 text-center">Resources</h3>
                                <ul className="space-y-3">
                                    {[
                                        { name: "Terms of Service", href: "/terms-of-service" },
                                        { name: "Privacy Policy", href: "/privacy-policy" },
                                    ].map((link) => (
                                        <li key={link.name} className="text-center">
                                            <Link
                                                href={link.href}
                                                className="text-white hover:text-coffee-300 transition-colors inline-block py-1 px-4 rounded-full border border-transparent"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Connect */}
                            <div
                                className="bg-coffee-600 dark:bg-coffee-100/80 p-6 rounded-2xl transform hover:scale-105 transition-transform">
                                <h3 className="text-coffee-50 dark:text-coffee-900 font-bold text-xl mb-4 text-center">Connect</h3>
                                <div className="flex justify-center">
                                    <Link
                                        href="https://twitter.com"
                                        target="_blank"
                                        className="bg-coffee-400 text-white px-6 py-3 rounded-full hover:bg-white hover:text-coffee-800 dark:hover:text-coffee-50/80 transition-colors flex items-center gap-2"
                                    >
                                        <Twitter className="h-5 w-5"/>
                                        <span className="font-medium">Follow on Twitter</span>
                                    </Link>
                                </div>
                            </div>
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

                        {/* Copyright */}
                        <div className="text-coffee-900 font-medium text-center">
                            <p>© {year} Crypto Coffee. All rights reserved.</p>
                            <p className="mt-2 text-sm flex gap-2 items-center justify-center">Made with ☕ and <Heart className="h-4 w-4 text-red-600 fill-red-500"/></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
