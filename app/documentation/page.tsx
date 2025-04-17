"use client"

import {BookOpen} from "lucide-react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function DocumentationPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-amber-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">Documentation</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 sticky top-24">
                        <h3 className="font-semibold text-coffee-900 mb-4">Contents</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#introduction"
                                   className="text-coffee-700 hover:text-coffee-900 hover:underline block py-1">
                                    Introduction
                                </a>
                            </li>
                            <li>
                                <a href="#getting-started"
                                   className="text-coffee-700 hover:text-coffee-900 hover:underline block py-1">
                                    Getting Started
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#connecting-wallet"
                                    className="text-coffee-700 hover:text-coffee-900 hover:underline block py-1"
                                >
                                    Connecting Your Wallet
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#supporting-projects"
                                    className="text-coffee-700 hover:text-coffee-900 hover:underline block py-1"
                                >
                                    Supporting Projects
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#daily-activities"
                                    className="text-coffee-700 hover:text-coffee-900 hover:underline block py-1"
                                >
                                    Daily Activities
                                </a>
                            </li>
                            <li>
                                <a href="#api-reference"
                                   className="text-coffee-700 hover:text-coffee-900 hover:underline block py-1">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#faq"
                                   className="text-coffee-700 hover:text-coffee-900 hover:underline block py-1">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-amber-100">
                        <div className="prose prose-amber max-w-none">
                            <section id="introduction">
                                <h2 className="text-2xl font-semibold text-coffee-900">Introduction to Crypto Coffee</h2>
                                <p>
                                    Crypto Coffee is a platform that enables users to support blockchain projects
                                    through small, regular
                                    contributions—similar to buying a coffee. Our mission is to create a sustainable
                                    funding model for
                                    blockchain projects while building a community of engaged supporters.
                                </p>
                                <p>
                                    This documentation will guide you through using the Crypto Coffee platform, from
                                    connecting your
                                    wallet to supporting projects and participating in daily activities.
                                </p>
                            </section>

                            <section id="getting-started" className="mt-12">
                                <h2 className="text-2xl font-semibold text-coffee-900">Getting Started</h2>
                                <p>To get started with Crypto Coffee, you&#39;ll need:</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>A compatible cryptocurrency wallet (MetaMask, WalletConnect, etc.)</li>
                                    <li>Some cryptocurrency for transactions (ETH, MATIC, etc. depending on the
                                        network)
                                    </li>
                                    <li>A web browser (Chrome, Firefox, Brave, etc.)</li>
                                </ul>

                                <h3 className="text-xl font-medium text-amber-800 mt-6">Supported Networks</h3>
                                <p>Crypto Coffee currently supports the following blockchain networks:</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Ethereum Mainnet</li>
                                    <li>Optimism</li>
                                    <li>Arbitrum</li>
                                    <li>Base</li>
                                    <li>Polygon</li>
                                    <li>And more...</li>
                                </ul>
                            </section>

                            <section id="connecting-wallet" className="mt-12">
                                <h2 className="text-2xl font-semibold text-coffee-900">Connecting Your Wallet</h2>
                                <p>To use Crypto Coffee, you&#39;ll need to connect your cryptocurrency wallet:</p>
                                <ol className="list-decimal pl-6 mt-2 space-y-2">
                                    <li>Click the &#34;Connect Wallet&#34; button in the top right corner of the
                                        homepage
                                    </li>
                                    <li>Select your preferred wallet provider from the list</li>
                                    <li>Follow the prompts in your wallet to approve the connection</li>
                                    <li>Once connected, you&#39;ll see your wallet address displayed in the header</li>
                                </ol>

                                <div className="bg-amber-50 p-4 rounded-lg mt-4 border border-amber-200">
                                    <h4 className="font-medium text-amber-800">Security Note</h4>
                                    <p className="text-sm mt-1">
                                        Always verify you&#39;re on the correct website (cryptocoffee.com) before
                                        connecting
                                        your wallet. We
                                        will never ask for your private keys or seed phrase.
                                    </p>
                                </div>
                            </section>

                            <section id="supporting-projects" className="mt-12">
                                <h2 className="text-2xl font-semibold text-coffee-900">Supporting Projects</h2>
                                <p>Supporting projects on Crypto Coffee is simple:</p>
                                <ol className="list-decimal pl-6 mt-2 space-y-2">
                                    <li>Browse the projects on the homepage or use the search/filter functions</li>
                                    <li>Click on a project card to view more details</li>
                                    <li>Click the &#34;Buy Coffee&#34; button on the project you want to support</li>
                                    <li>Confirm the transaction in your wallet</li>
                                    <li>Once confirmed, you&#39;ll receive a confirmation and the project will be
                                        notified
                                    </li>
                                </ol>

                                <h3 className="text-xl font-medium text-amber-800 mt-6">Coffee Pricing</h3>
                                <p>
                                    Each &#34;coffee&#34; costs a small fixed amount (currently $0.045 equivalent) in
                                    the native
                                    currency of the
                                    blockchain you&#39;re using. The exact amount may vary slightly due to gas fees and
                                    currency
                                    fluctuations.
                                </p>
                            </section>

                            <section id="daily-activities" className="mt-12">
                                <h2 className="text-2xl font-semibold text-coffee-900">Daily Activities</h2>
                                <p>Crypto Coffee offers various daily activities to engage with the platform:</p>

                                <Tabs defaultValue="lottery" className="mt-4">
                                    <TabsList className="bg-amber-50 border border-amber-200">
                                        <TabsTrigger value="lottery">Gas Lottery</TabsTrigger>
                                        <TabsTrigger value="trivia">Crypto Trivia</TabsTrigger>
                                        <TabsTrigger value="joke">Daily Joke</TabsTrigger>
                                        <TabsTrigger value="bingo">Blockchain Bingo</TabsTrigger>
                                        <TabsTrigger value="pet">Crypto Pet</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="lottery" className="mt-4">
                                        <h3 className="text-lg font-medium text-amber-800">Gas Fee Lottery</h3>
                                        <p>
                                            Pay a small fixed fee for a chance to win accumulated rewards or a special
                                            NFT. The more people
                                            participate, the bigger the prize pool grows!
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2">
                                            <li>Daily draws happen at midnight UTC</li>
                                            <li>Winners are selected randomly from all participants</li>
                                            <li>Prizes are automatically sent to the winner&#39;s wallet</li>
                                        </ul>
                                    </TabsContent>

                                    <TabsContent value="trivia" className="mt-4">
                                        <h3 className="text-lg font-medium text-amber-800">Crypto Trivia</h3>
                                        <p>
                                            Test your crypto knowledge with daily questions. Answer correctly to earn
                                            badges and points!
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2">
                                            <li>New questions are available daily</li>
                                            <li>Earn badges for correct answers and streaks</li>
                                            <li>Compete on the leaderboard with other users</li>
                                        </ul>
                                    </TabsContent>

                                    <TabsContent value="joke" className="mt-4">
                                        <h3 className="text-lg font-medium text-amber-800">Daily Joke</h3>
                                        <p>
                                            Start your day with a laugh! Reveal a daily crypto-themed joke that you can
                                            share on social
                                            media.
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2">
                                            <li>New jokes every day</li>
                                            <li>Share directly to Twitter or copy to clipboard</li>
                                            <li>Submit your own jokes for consideration</li>
                                        </ul>
                                    </TabsContent>

                                    <TabsContent value="bingo" className="mt-4">
                                        <h3 className="text-lg font-medium text-amber-800">Blockchain Bingo</h3>
                                        <p>
                                            Play daily bingo for a chance to win weekly and monthly rewards. Mark your
                                            card and match
                                            today&#39;s numbers!
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2">
                                            <li>Daily numbers are derived from blockchain data</li>
                                            <li>Complete rows for daily rewards</li>
                                            <li>Participate regularly for weekly and monthly prize draws</li>
                                        </ul>
                                    </TabsContent>

                                    <TabsContent value="pet" className="mt-4">
                                        <h3 className="text-lg font-medium text-amber-800">Crypto Pet</h3>
                                        <p>Feed your virtual Crypto Cat daily and watch it grow and evolve as you
                                            nurture it!</p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2">
                                            <li>Feed your pet daily to increase happiness and energy</li>
                                            <li>Level up your pet over time</li>
                                            <li>Earn special NFTs and collectibles as your pet evolves</li>
                                        </ul>
                                    </TabsContent>
                                </Tabs>
                            </section>

                            <section id="api-reference" className="mt-12">
                                <h2 className="text-2xl font-semibold text-coffee-900">API Reference</h2>
                                <p>
                                    Crypto Coffee provides a public API for developers to integrate with our platform.
                                    The API allows
                                    you to:
                                </p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Retrieve project information</li>
                                    <li>Get support statistics</li>
                                    <li>View user activity (with proper authentication)</li>
                                </ul>

                                <p className="mt-4">
                                    For detailed API documentation, including endpoints, parameters, and response
                                    formats, please visit
                                    our
                                    <a href="#" className="text-coffee-700 hover:text-coffee-900 underline">
                                        {" "}
                                        Developer Portal
                                    </a>
                                    .
                                </p>

                                <div className="bg-gray-800 text-gray-200 p-4 rounded-lg mt-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code>
                        {`// Example API request using JavaScript
const response = await fetch('https://api.cryptocoffee.com/v1/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const projects = await response.json();
console.log(projects);`}
                      </code>
                    </pre>
                                </div>
                            </section>

                            <section id="faq" className="mt-12">
                                <h2 className="text-2xl font-semibold text-coffee-900">Frequently Asked Questions</h2>

                                <div className="mt-4 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-amber-800">What is Crypto Coffee?</h3>
                                        <p className="mt-1">
                                            Crypto Coffee is a platform that allows users to support blockchain projects
                                            through small,
                                            regular contributions—similar to buying a coffee. It&#39;s designed to
                                            create
                                            sustainable funding
                                            for projects while building a community of engaged supporters.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-amber-800">How much does
                                            a &#34;coffee&#34;
                                            cost?</h3>
                                        <p className="mt-1">
                                            Each coffee costs a small fixed amount (currently $0.045 equivalent) in the
                                            native currency of
                                            the blockchain you&#39;re using. The exact amount may vary slightly due to
                                            gas
                                            fees and currency
                                            fluctuations.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-amber-800">How do projects receive the
                                            funds?</h3>
                                        <p className="mt-1">
                                            When you support a project, the funds are sent directly to the project&#39;s
                                            designated wallet
                                            address. Crypto Coffee takes a small fee (5%) to maintain the platform and
                                            develop new features.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-amber-800">Can I support projects on any
                                            blockchain?</h3>
                                        <p className="mt-1">
                                            Crypto Coffee currently supports multiple blockchains including Ethereum,
                                            Optimism, Arbitrum,
                                            Base, and Polygon. We&#39;re continuously adding support for more networks
                                            based
                                            on community
                                            demand.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-amber-800">How do I list my project on
                                            Crypto Coffee?</h3>
                                        <p className="mt-1">
                                            To list your project, visit the &#34;Add Project&#34; page and fill out the
                                            application form. Our team
                                            will review your submission and get back to you within 48 hours. Projects
                                            must meet certain
                                            criteria regarding transparency, community engagement, and code quality.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

