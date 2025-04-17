"use client"

import {Lightbulb, Wallet, CreditCard, Heart, Users, ArrowRight} from "lucide-react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";

export default function HowItWorksPage() {
    const router = useRouter()

    return (
        <main className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-coffee-200 rounded-full">
                    <Lightbulb className="h-6 w-6 text-amber-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">How It Works</h1>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-coffee-500 to-coffee-700 rounded-xl p-8 text-white mb-12">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Fueling Blockchain Innovation, One Coffee at a Time</h2>
                    <p className="text-lg opacity-90 mb-6">
                        Crypto Coffee creates a sustainable funding model for blockchain projects through small, regular
                        contributions—similar to buying a coffee. It’s a simple, meaningful way to contribute regularly
                        and help build a stronger, more connected crypto ecosystem.
                    </p>
                    <Button className="bg-white text-coffee-700 hover:bg-coffee-100 transition-all"
                            onClick={() => router.prefetch('/')}>Get Started Now</Button>
                </div>
            </div>

            {/* Step by Step Process */}
            <div className="mb-16">
                <h2 className="text-2xl font-semibold text-coffee-900 mb-8 text-center">The Crypto Coffee Process</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-coffee-200 relative">
                        <div
                            className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-coffee-500 to-coffee-700 flex items-center justify-center text-white font-bold text-xl">
                            1
                        </div>
                        <div className="pt-6">
                            <div className="p-3 bg-coffee-200 rounded-full w-fit mb-4">
                                <Wallet className="h-6 w-6 text-coffee-700"/>
                            </div>
                            <h3 className="text-xl font-semibold text-coffee-900 mb-2">Connect Your Wallet</h3>
                            <p className="text-coffee-700">
                                Start by connecting your cryptocurrency wallet to the Crypto Coffee platform. We support
                                various
                                wallets including MetaMask, WalletConnect, and more.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-coffee-200 relative">
                        <div
                            className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-coffee-500 to-coffee-700 flex items-center justify-center text-white font-bold text-xl">
                            2
                        </div>
                        <div className="pt-6">
                            <div className="p-3 bg-coffee-200 rounded-full w-fit mb-4">
                                <CreditCard className="h-6 w-6 text-coffee-700"/>
                            </div>
                            <h3 className="text-xl font-semibold text-coffee-900 mb-2">Choose Chain</h3>
                            <p className="text-coffee-700">
                                Browse through our curated list of blockchain projects and select the ones you&#39;d
                                like to
                                support. Each
                                &#34;coffee&#34; costs a small fixed amount (currently $0.045).
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-coffee-200 relative">
                        <div
                            className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-coffee-500 to-coffee-700 flex items-center justify-center text-white font-bold text-xl">
                            3
                        </div>
                        <div className="pt-6">
                            <div className="p-3 bg-coffee-200 rounded-full w-fit mb-4">
                                <Heart className="h-6 w-6 text-coffee-700"/>
                            </div>
                            <h3 className="text-xl font-semibold text-coffee-900 mb-2">Buy Coffee & Start Your Day</h3>
                            <p className="text-coffee-700">
                                Click the &#34;Buy Coffee&#34; button on a project card, confirm the transaction in your
                                wallet,
                                and you&#39;ve
                                successfully bought!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200 max-w-lg">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-coffee-200 rounded-full">
                                <Users className="h-6 w-6 text-coffee-700"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-coffee-900 mb-2">Join the Community</h3>
                                <p className="text-coffee-700">
                                    Beyond financial support, Crypto Coffee is about building a community. Participate
                                    in daily
                                    activities, earn rewards, and connect with like-minded supporters and project
                                    creators.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-16">
                <h2 className="text-2xl font-semibold text-coffee-900 mb-8 text-center">Benefits of Crypto Coffee</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-coffee-200">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-coffee-900 mb-4">For Supporters</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <div className="p-1 bg-green-100 rounded-full mt-1">
                                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <span className="text-coffee-700">
                      Support projects you believe in with minimal financial commitment
                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="p-1 bg-green-100 rounded-full mt-1">
                                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <span
                                        className="text-coffee-700">Discover new and innovative blockchain projects</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="p-1 bg-green-100 rounded-full mt-1">
                                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <span className="text-coffee-700">
                      Earn rewards, badges, and special NFTs through daily activities
                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="p-1 bg-green-100 rounded-full mt-1">
                                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <span className="text-coffee-700">Connect with a community of like-minded crypto enthusiasts</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-coffee-200">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-coffee-900 mb-4">For Projects</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <div className="p-1 bg-green-100 rounded-full mt-1">
                                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <span className="text-coffee-700">Receive sustainable, recurring funding from supporters</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="p-1 bg-green-100 rounded-full mt-1">
                                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <span
                                        className="text-coffee-700">Build a community of engaged users and supporters</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="p-1 bg-green-100 rounded-full mt-1">
                                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <span
                                        className="text-coffee-700">Gain visibility within the Crypto Coffee ecosystem</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="p-1 bg-green-100 rounded-full mt-1">
                                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <span className="text-coffee-700">Access analytics and insights about your supporter base</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
                <h2 className="text-2xl font-semibold text-coffee-900 mb-8 text-center">Frequently Asked Questions</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-coffee-200">
                        <h3 className="text-lg font-semibold text-coffee-900 mb-2">How much does a coffee cost?</h3>
                        <p className="text-coffee-700">
                            Each coffee costs a small fixed amount (currently $0.045 equivalent) in the native currency
                            of the
                            blockchain you&#39;re using. The exact amount may vary slightly due to gas fees and currency
                            fluctuations.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-coffee-200">
                        <h3 className="text-lg font-semibold text-coffee-900 mb-2">Who can use Crypto Coffee?</h3>
                        <p className="text-coffee-700">
                            Anyone with a compatible cryptocurrency wallet can use Crypto Coffee to support projects.
                            Project creators must apply and meet certain criteria to be listed on the platform. We
                            welcome users and projects from around the world, though some features may be restricted in
                            certain jurisdictions due to regulatory requirements.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-coffee-200">
                        <h3 className="text-lg font-semibold text-coffee-900 mb-2">Can I buy coffee on any
                            blockchain?</h3>
                        <p className="text-coffee-700">
                            Crypto Coffee currently supports multiple blockchains including Ethereum, Optimism,
                            Arbitrum, Base, and
                            Polygon. We&#39;re continuously adding support for more networks based on community demand.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-coffee-200">
                        <h3 className="text-lg font-semibold text-coffee-900 mb-2">Is my wallet information secure?</h3>
                        <p className="text-coffee-700">
                            Crypto Coffee never stores your private keys or seed phrases. We only interact with your
                            wallet through standard Web3 connection methods. Always verify you&#39;re on the correct website
                            (cryptocoffee.com) before connecting your wallet and be cautious of phishing attempts.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/faq">
                        <Button variant="outline" className="gap-2 border-coffee-400 hover:bg-coffee-100 transition-all">
                            <span className="text-coffee-800">View All FAQs</span>
                            <ArrowRight className="h-4 w-4 text-coffee-800"/>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-coffee-500 to-coffee-700 rounded-xl p-8 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Buy Coffee?</h2>
                    <p className="text-lg opacity-90 mb-6">
                        Join thousands of users who are helping blockchain projects thrive through small, regular
                        contributions. It&#39;s as simple as buying a coffee!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-white text-coffee-700 hover:bg-coffee-100">Connect Wallet</Button>
                        <Link href="/documentation">
                            <Button variant="outline" className="border-white text-white hover:bg-white/20">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

