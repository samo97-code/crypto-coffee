"use client"

import { Coffee, Shield, Lock} from "lucide-react"
import Link from "next/link"
import {Button} from "@/components/ui/button"

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-coffee-200 rounded-full">
                    <Shield className="h-6 w-6 text-amber-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">Privacy Policy</h1>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-coffee-200">
                <div className="prose prose-amber max-w-none">
                    <p className="text-amber-800 font-medium">Last Updated: April 3, 2025</p>

                    <p className="mt-6">
                        At Crypto Coffee, we take your privacy seriously. This Privacy Policy explains how we collect,
                        use,
                        disclose, and safeguard your information when you use our platform, website, and services
                        (collectively,
                        the &#34;Service&#34;).
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">1. Information We Collect</h2>

                    <h3 className="text-lg font-medium text-coffee-800 mt-6">1.1 Personal Information</h3>
                    <p>We may collect personal information that you voluntarily provide when using our Service,
                        including:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Email address (if you subscribe to our newsletter or create an account)</li>
                        <li>Blockchain wallet addresses</li>
                        <li>Transaction history on our platform</li>
                        <li>Communication preferences</li>
                    </ul>

                    <h3 className="text-lg font-medium text-coffee-800 mt-6">1.2 Automatically Collected Information</h3>
                    <p>When you access our Service, we may automatically collect certain information, including:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Device information (browser type, operating system, IP address)</li>
                        <li>Usage data (pages visited, time spent on the Service)</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">2. How We Use Your Information</h2>
                    <p>We use the information we collect for various purposes, including:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Providing, maintaining, and improving our Service</li>
                        <li>Processing transactions and sending transaction confirmations</li>
                        <li>Communicating with you about updates, support, and promotional offers</li>
                        <li>Analyzing usage patterns to enhance user experience</li>
                        <li>Protecting against fraudulent or unauthorized transactions</li>
                        <li>Complying with legal obligations</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">3. Blockchain Data</h2>
                    <p>
                        Please note that blockchain transactions are public by nature. When you make a transaction
                        through our
                        Service, information such as your wallet address and transaction details will be recorded on the
                        blockchain and visible to anyone. We do not control and cannot remove this information once it
                        is on the
                        blockchain.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">4. Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies and similar tracking technologies to track activity on our Service and hold
                        certain
                        information. You can instruct your browser to refuse all cookies or to indicate when a cookie is
                        being
                        sent. However, if you do not accept cookies, you may not be able to use some portions of our
                        Service.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">5. Data Sharing and Disclosure</h2>
                    <p>We may share your information in the following situations:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>With service providers who perform services on our behalf</li>
                        <li>To comply with legal obligations</li>
                        <li>To protect and defend our rights and property</li>
                        <li>With your consent or at your direction</li>
                    </ul>
                    <p className="mt-4">We do not sell your personal information to third parties.</p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">6. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect the security of your
                        personal
                        information. However, please be aware that no method of transmission over the internet or
                        electronic
                        storage is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">7. Your Privacy Rights</h2>
                    <p>Depending on your location, you may have certain rights regarding your personal information, such
                        as:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>The right to access the personal information we have about you</li>
                        <li>The right to request correction or deletion of your personal information</li>
                        <li>The right to restrict or object to our processing of your personal information</li>
                        <li>The right to data portability</li>
                    </ul>
                    <p className="mt-4">To exercise these rights, please contact us using the information provided
                        below.</p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">8. Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                        the new
                        Privacy Policy on this page and updating the &#34;Last Updated&#34; date. You are advised to review this
                        Privacy
                        Policy periodically for any changes.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">9. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <p className="mt-2">
                        <a href="mailto:privacy@cryptocoffee.com"
                           className="text-coffee-700 hover:text-coffee-900 underline">
                            privacy@cryptocoffee.com
                        </a>
                    </p>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <Link href="/terms-of-service">
                    <Button variant="outline" className="gap-2 border-coffee-400 hover:bg-coffee-100 transition-all">
                        <Lock className="h-4 w-4 text-coffee-800"/>
                        <span className="text-coffee-800">Terms of Service</span>
                    </Button>
                </Link>

                <Link href="/">
                    <Button
                        className="gap-2 bg-gradient-to-br from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white">
                        <Coffee className="h-4 w-4"/>
                        <span>Back to Buy Coffee</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

