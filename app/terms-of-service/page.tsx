"use client"

import {Coffee, FileText, Shield} from "lucide-react"
import Link from "next/link"
import {Button} from "@/components/ui/button"

export default function TermsOfServicePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-coffee-200 rounded-full">
                    <FileText className="h-6 w-6 text-amber-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">Terms of Service</h1>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-sm border border-coffee-200">
                <div className="prose prose-amber max-w-none">
                    <p className="text-amber-800 font-medium">Last Updated: April 3, 2025</p>

                    <p className="mt-6">
                        Welcome to Crypto Coffee. These Terms of Service (&#34;Terms&#34;) govern your use of the Crypto
                        Coffee platform,
                        website, and services (collectively, the &#34;Service&#34;). By accessing or using the Service, you
                        agree to be
                        bound by these Terms.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using our Service, you agree to be bound by these Terms. If you disagree
                        with any part of
                        the Terms, you may not access the Service.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">2. Description of Service</h2>
                    <p>
                        Crypto Coffee is a platform that allows users to support blockchain projects through small,
                        regular
                        contributions (similar to buying a coffee). The Service facilitates these transactions and
                        provides
                        related features such as tracking contributions, participating in daily activities, and
                        connecting with
                        projects.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">3. User Accounts</h2>
                    <p>
                        To use certain features of the Service, you may need to create an account and connect a
                        cryptocurrency
                        wallet. You are responsible for maintaining the security of your account and wallet. You
                        agree to provide
                        accurate information and to update it as necessary.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">4. Blockchain Transactions</h2>
                    <p>
                        The Service facilitates cryptocurrency transactions on various blockchain networks. You
                        acknowledge that:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Blockchain transactions are irreversible once confirmed</li>
                        <li>We do not control blockchain networks or guarantee transaction times</li>
                        <li>You are responsible for paying any associated network fees</li>
                        <li>Market volatility may affect the value of your contributions</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">5. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are owned by Crypto Coffee
                        and are
                        protected by international copyright, trademark, patent, trade secret, and other
                        intellectual property
                        laws.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">6. User Conduct</h2>
                    <p>You agree not to use the Service:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>In any way that violates any applicable laws or regulations</li>
                        <li>To engage in any activity that interferes with or disrupts the Service</li>
                        <li>To attempt to gain unauthorized access to any part of the Service</li>
                        <li>To harass, abuse, or harm another person or entity</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">7. Limitation of Liability</h2>
                    <p>
                        In no event shall Crypto Coffee, its directors, employees, partners, agents, suppliers, or
                        affiliates be
                        liable for any indirect, incidental, special, consequential, or punitive damages, including
                        without
                        limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from
                        your access
                        to or use of or inability to access or use the Service.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">8. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify or replace these Terms at any time. If a revision is
                        material, we will
                        provide at least 30 days&#39; notice prior to any new terms taking effect. What constitutes a
                        material change
                        will be determined at our sole discretion.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">9. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of the
                        jurisdiction in which
                        Crypto Coffee is established, without regard to its conflict of law provisions.
                    </p>

                    <h2 className="text-xl font-semibold text-coffee-900 mt-8">10. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p className="mt-2">
                        <a href="mailto:support@cryptocoffee.com"
                           className="text-coffee-700 hover:text-coffee-900 underline">
                            support@cryptocoffee.com
                        </a>
                    </p>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <Link href="/privacy-policy">
                    <Button variant="outline" className="gap-2 border-coffee-400 hover:bg-coffee-100 transition-all">
                        <Shield className="h-4 w-4 text-coffee-800"/>
                        <span className="text-coffee-800">Privacy Policy</span>
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

