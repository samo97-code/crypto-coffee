"use client"

import {HelpCircle, Search} from "lucide-react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function FAQPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 rounded-full">
                    <HelpCircle className="h-6 w-6 text-amber-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">Frequently Asked Questions</h1>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-coffee-700"/>
                    <Input
                        placeholder="Search for answers..."
                        className="pl-10 py-6 border-amber-200 focus:border-amber-500 bg-white"
                    />
                </div>
            </div>

            {/* FAQ Categories */}
            <Tabs defaultValue="general" className="mb-12">
                <TabsList className="bg-white border border-amber-200 p-1 mb-8">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="wallet">Wallet & Payments</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="activities">Daily Activities</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">What is Crypto Coffee?</h3>
                            <p className="text-coffee-700">
                                Crypto Coffee is a platform that allows users to support blockchain projects through
                                small, regular
                                contributions—similar to buying a coffee. It&#39;s designed to create sustainable funding
                                for projects
                                while building a community of engaged supporters.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">How does Crypto Coffee work?</h3>
                            <p className="text-coffee-700">
                                Users connect their cryptocurrency wallets to the platform, browse through listed
                                blockchain projects,
                                and support them by &#34;buying coffee&#34; (making small contributions). Projects receive these
                                contributions
                                directly to their designated wallet addresses. Users can also participate in daily
                                activities to earn
                                rewards and engage with the community.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">Is Crypto Coffee free to use?</h3>
                            <p className="text-coffee-700">
                                Creating an account and browsing projects on Crypto Coffee is completely free. When you
                                support a
                                project, Crypto Coffee takes a small fee (5%) from each contribution to maintain the
                                platform and
                                develop new features. You&#39;ll also need to pay network gas fees for blockchain
                                transactions.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">
                                How is Crypto Coffee different from other funding platforms?
                            </h3>
                            <p className="text-coffee-700">
                                Crypto Coffee focuses on small, regular contributions rather than one-time large
                                donations. This
                                creates a more sustainable funding model for projects. We also integrate blockchain
                                technology for
                                transparent, direct transactions and offer daily activities to build community
                                engagement beyond just
                                financial support.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">Who can use Crypto Coffee?</h3>
                            <p className="text-coffee-700">
                                Anyone with a compatible cryptocurrency wallet can use Crypto Coffee to support
                                projects. Project
                                creators must apply and meet certain criteria to be listed on the platform. We welcome
                                users and
                                projects from around the world, though some features may be restricted in certain
                                jurisdictions due to
                                regulatory requirements.
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="wallet">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">Which wallets are supported?</h3>
                            <p className="text-coffee-700">
                                Crypto Coffee supports most major Ethereum-compatible wallets, including MetaMask,
                                WalletConnect,
                                Coinbase Wallet, and Trust Wallet. We&#39;re continuously adding support for more wallets
                                based on user
                                demand.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">How much does a &#34;coffee&#34;
                                cost?</h3>
                            <p className="text-coffee-700">
                                Each coffee costs a small fixed amount (currently $0.045 equivalent) in the native
                                currency of the
                                blockchain you&#39;re using. The exact amount may vary slightly due to gas fees and currency
                                fluctuations.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">
                                What cryptocurrencies can I use to support projects?
                            </h3>
                            <p className="text-coffee-700">
                                You can use the native currency of the blockchain network you&#39;re on (e.g., ETH on
                                Ethereum, MATIC on
                                Polygon). We&#39;re working on adding support for stablecoins and other tokens in the
                                future.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">How are gas fees handled?</h3>
                            <p className="text-coffee-700">
                                Gas fees are paid by the user making the transaction. We recommend using Layer 2
                                solutions like
                                Optimism, Arbitrum, or Base for lower gas fees. We&#39;re also exploring options to optimize
                                transactions
                                and reduce gas costs.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">Is my wallet information
                                secure?</h3>
                            <p className="text-coffee-700">
                                Crypto Coffee never stores your private keys or seed phrases. We only interact with your
                                wallet
                                through standard Web3 connection methods. Always verify you&#39;re on the correct website
                                (cryptocoffee.com) before connecting your wallet and be cautious of phishing attempts.
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="projects">
                    {/* Project-related FAQs would go here */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">How do projects receive the
                                funds?</h3>
                            <p className="text-coffee-700">
                                When you support a project, the funds are sent directly to the project&#39;s designated
                                wallet address.
                                Crypto Coffee takes a small fee (5%) to maintain the platform and develop new features.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">
                                How do I list my project on Crypto Coffee?
                            </h3>
                            <p className="text-coffee-700">
                                To list your project, visit the &#34;Add Project&#34; page and fill out the application form.
                                Our team will
                                review your submission and get back to you within 48 hours. Projects must meet certain
                                criteria
                                regarding transparency, community engagement, and code quality.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-coffee-900 mb-2">What types of projects are
                                eligible?</h3>
                            <p className="text-coffee-700">
                                We welcome a wide range of blockchain projects, including protocols, dApps, tools,
                                educational
                                resources, and community initiatives. Projects must be blockchain-related, have a clear
                                purpose, and
                                demonstrate commitment to their goals. We do not accept projects that promote harmful,
                                illegal, or
                                fraudulent activities.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">Can I support multiple
                                projects?</h3>
                            <p className="text-coffee-700">
                                Yes! You can support as many projects as you like. Many users support multiple projects
                                they believe
                                in, spreading their contributions across different initiatives in the blockchain
                                ecosystem.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">
                                How can projects engage with their supporters?
                            </h3>
                            <p className="text-coffee-700">
                                Projects can post updates, share milestones, and interact with supporters through their
                                project page.
                                We also provide analytics and insights to help projects understand their supporter base
                                better. In the
                                future, we plan to add more features for project-supporter engagement.
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="activities">
                    {/* Daily activities FAQs would go here */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">What are daily activities?</h3>
                            <p className="text-coffee-700">
                                Daily activities are fun, interactive features on Crypto Coffee that users can
                                participate in each
                                day. These include Gas Fee Lottery, Crypto Trivia, Daily Joke, Blockchain Bingo, and
                                Crypto Pet. Each
                                activity costs a small fee (the same as buying a coffee) and offers various rewards.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">How does the Gas Fee Lottery
                                work?</h3>
                            <p className="text-coffee-700">
                                The Gas Fee Lottery allows users to pay a small fixed fee for a chance to win
                                accumulated rewards or a
                                special NFT. The more people participate, the bigger the prize pool grows. Winners are
                                randomly
                                selected daily at midnight UTC, and prizes are automatically sent to the winner&#39;s
                                wallet.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">
                                What rewards can I earn from daily activities?
                            </h3>
                            <p className="text-coffee-700">
                                Rewards vary by activity but include tokens, special NFTs, badges, and points. Some
                                activities also
                                offer weekly and monthly prizes for consistent participation. These rewards showcase
                                your engagement
                                and support for the blockchain ecosystem.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">
                                Do I have to participate in daily activities?
                            </h3>
                            <p className="text-coffee-700">
                                No, daily activities are completely optional. You can use Crypto Coffee solely to
                                support projects if
                                you prefer. Activities are designed to add fun and engagement to the platform, but
                                they&#39;re not
                                required.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">How do I care for my Crypto
                                Pet?</h3>
                            <p className="text-coffee-700">
                                Your Crypto Pet needs daily feeding to maintain its happiness and energy levels. Simply
                                visit the
                                Crypto Pet page, pay the small fee to feed your pet, and watch it grow over time. As
                                your pet levels
                                up, you&#39;ll unlock special items and collectibles.
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="technical">
                    {/* Technical FAQs would go here */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">Which blockchain networks are
                                supported?</h3>
                            <p className="text-coffee-700">
                                Crypto Coffee currently supports Ethereum, Optimism, Arbitrum, Base, Polygon, and
                                several other
                                EVM-compatible networks. We&#39;re continuously adding support for more networks based on
                                community
                                demand.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">Is Crypto Coffee open source?</h3>
                            <p className="text-coffee-700">
                                Yes, parts of the Crypto Coffee platform are open source. You can find our repositories
                                on GitHub,
                                where we welcome contributions from the community. Some components remain proprietary
                                for security and
                                business reasons.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">Does Crypto Coffee have an
                                API?</h3>
                            <p className="text-coffee-700">
                                Yes, we provide a public API for developers to integrate with our platform. The API
                                allows you to
                                retrieve project information, get support statistics, and view user activity (with
                                proper
                                authentication). For detailed documentation, visit our Developer Portal.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">How are transactions
                                verified?</h3>
                            <p className="text-coffee-700">
                                All transactions on Crypto Coffee are verified on the respective blockchain networks. We
                                use standard
                                Web3 methods to interact with the blockchain and ensure transaction integrity. You can
                                verify any
                                transaction using a blockchain explorer.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">What happens if a transaction
                                fails?</h3>
                            <p className="text-coffee-700">
                                If a transaction fails due to network issues or insufficient gas, you may still be
                                charged gas fees by
                                the network, but no funds will be transferred to the project. You can try again with a
                                higher gas
                                limit or wait for network conditions to improve. If you encounter persistent issues,
                                please contact
                                our support team.
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Still Have Questions */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-amber-100 text-center">
                <h2 className="text-2xl font-semibold text-amber-900 mb-4">Still Have Questions?</h2>
                <p className="text-coffee-700 max-w-2xl mx-auto mb-6">
                    If you couldn&#39;t find the answer you were looking for, our support team is here to help. Reach out to
                    us
                    through any of the channels below.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/support">
                        <Button
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                            Contact Support
                        </Button>
                    </Link>
                    <Link href="/documentation">
                        <Button variant="outline" className="border-amber-200">
                            View Documentation
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

