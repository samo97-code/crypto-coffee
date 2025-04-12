"use client"

import {useState} from "react"
import {
    Wallet,
    ArrowLeft,
    Copy,
    ExternalLink,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Shield,
    AlertTriangle,
    Check,
    RefreshCw,
} from "lucide-react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"

const WalletPage = () => {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText("0x4A...cD9e")
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (

        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/profile" className="inline-flex items-center text-coffee-700 hover:text-coffee-900">
                    <ArrowLeft className="h-4 w-4 mr-1"/>
                    Back to Profile
                </Link>
            </div>

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-coffee-100 rounded-full">
                    <Wallet className="h-6 w-6 text-coffee-800"/>
                </div>
                <h1 className="text-3xl font-bold text-coffee-900">Wallet & Payments</h1>
            </div>

            {/* Wallet Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Connected Wallet */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                    <h2 className="text-xl font-semibold text-coffee-900 mb-6">Connected Wallet</h2>

                    <div
                        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-coffee-50 rounded-lg border border-coffee-200">
                        <div className="p-3 bg-coffee-100 rounded-full">
                            <Wallet className="h-6 w-6 text-coffee-700"/>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-green-100 text-green-800 border-none">Connected</Badge>
                                <span className="text-sm text-coffee-700">via MetaMask</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-coffee-900">0x4A...cD9e</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                                    {isCopied ? <Check className="h-4 w-4 text-green-600"/> :
                                        <Copy className="h-4 w-4"/>}
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ExternalLink className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>

                        <Button variant="outline" className="border-coffee-200 whitespace-nowrap">
                            <RefreshCw className="h-4 w-4 mr-2"/>
                            Reconnect
                        </Button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-coffee-50 p-4 rounded-lg border border-coffee-200">
                            <div className="text-sm text-coffee-700 mb-1">Total Supported</div>
                            <div className="text-2xl font-bold text-coffee-900">$1,234.56</div>
                            <div className="text-xs text-coffee-600 mt-1">Across all networks</div>
                        </div>

                        <div className="bg-coffee-50 p-4 rounded-lg border border-coffee-200">
                            <div className="text-sm text-coffee-700 mb-1">Transactions</div>
                            <div className="text-2xl font-bold text-coffee-900">87</div>
                            <div className="text-xs text-coffee-600 mt-1">Last 30 days</div>
                        </div>

                        <div className="bg-coffee-50 p-4 rounded-lg border border-coffee-200">
                            <div className="text-sm text-coffee-700 mb-1">Networks Used</div>
                            <div className="text-2xl font-bold text-coffee-900">6</div>
                            <div className="text-xs text-coffee-600 mt-1">Most active: Optimism</div>
                        </div>
                    </div>
                </div>

                {/* Wallet Security */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
                    <h2 className="text-xl font-semibold text-coffee-900 mb-6">Wallet Security</h2>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                            <Shield className="h-5 w-5 text-green-600 mt-0.5"/>
                            <div>
                                <h3 className="font-medium text-green-800">Secure Connection</h3>
                                <p className="text-sm text-green-700">Your wallet is securely connected via encrypted
                                    channels.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-coffee-50 rounded-lg border border-coffee-200">
                            <AlertTriangle className="h-5 w-5 text-coffee-600 mt-0.5"/>
                            <div>
                                <h3 className="font-medium text-coffee-800">Security Tips</h3>
                                <ul className="text-sm text-coffee-700 list-disc pl-4 mt-1 space-y-1">
                                    <li>Never share your seed phrase</li>
                                    <li>Verify all transaction details</li>
                                    <li>Use hardware wallets for large amounts</li>
                                </ul>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-gradient-to-r from-coffee-500 to-coffee-700 hover:from-coffee-600 hover:to-coffee-800 text-white">
                            <Shield className="h-4 w-4 mr-2"/>
                            Security Settings
                        </Button>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-coffee-900">Transaction History</h2>

                    <div className="flex gap-2">
                        <select className="px-3 py-1 border border-coffee-200 rounded-md text-coffee-900 text-sm">
                            <option>All Networks</option>
                            <option>Ethereum</option>
                            <option>Optimism</option>
                            <option>Arbitrum</option>
                            <option>Base</option>
                        </select>

                        <select className="px-3 py-1 border border-coffee-200 rounded-md text-coffee-900 text-sm">
                            <option>Last 30 days</option>
                            <option>Last 7 days</option>
                            <option>Last 90 days</option>
                            <option>All time</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-coffee-100">
                            <th className="text-left py-3 px-4 text-coffee-800 font-medium">Date</th>
                            <th className="text-left py-3 px-4 text-coffee-800 font-medium">Type</th>
                            <th className="text-left py-3 px-4 text-coffee-800 font-medium">Project</th>
                            <th className="text-left py-3 px-4 text-coffee-800 font-medium">Network</th>
                            <th className="text-right py-3 px-4 text-coffee-800 font-medium">Amount</th>
                            <th className="text-center py-3 px-4 text-coffee-800 font-medium">Status</th>
                            <th className="text-right py-3 px-4 text-coffee-800 font-medium">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((tx, index) => (
                            <tr key={index} className="border-b border-coffee-50 hover:bg-coffee-50/50">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-coffee-600"/>
                                        <div>
                                            <div className="font-medium text-coffee-900">{tx.date}</div>
                                            <div className="text-xs text-coffee-600">{tx.time}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {tx.type === "support" ? (
                                            <ArrowUpRight className="h-4 w-4 text-coffee-600"/>
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4 text-green-600"/>
                                        )}
                                        <span className={tx.type === "support" ? "text-coffee-900" : "text-green-700"}>
                          {tx.type === "support" ? "Support" : "Reward"}
                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="font-medium text-coffee-900">{tx.project}</div>
                                </td>
                                <td className="py-3 px-4">
                                    <Badge className={`${tx.networkColor} border-none`}>{tx.network}</Badge>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="font-medium text-coffee-900">{tx.amount}</div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex justify-center">
                                        <Badge
                                            className={`${
                                                tx.status === "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : tx.status === "Pending"
                                                        ? "bg-coffee-100 text-coffee-800"
                                                        : "bg-red-100 text-red-800"
                                            } border-none`}
                                        >
                                            {tx.status}
                                        </Badge>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <ExternalLink className="h-4 w-4"/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-center">
                    <Button variant="outline" className="border-coffee-200">
                        Load More Transactions
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Sample data for the wallet page
const transactions = [
    {
        date: "Apr 12, 2025",
        time: "14:32 UTC",
        type: "support",
        project: "Uniswap",
        network: "Optimism",
        networkColor: "bg-red-100 text-red-800",
        amount: "$0.045",
        status: "Completed",
    },
    {
        date: "Apr 11, 2025",
        time: "09:15 UTC",
        type: "support",
        project: "Base",
        network: "Ethereum",
        networkColor: "bg-blue-100 text-blue-800",
        amount: "$0.045",
        status: "Completed",
    },
    {
        date: "Apr 10, 2025",
        time: "18:45 UTC",
        type: "reward",
        project: "Gas Fee Lottery",
        network: "Arbitrum",
        networkColor: "bg-blue-100 text-blue-800",
        amount: "$1.25",
        status: "Completed",
    },
    {
        date: "Apr 10, 2025",
        time: "12:22 UTC",
        type: "support",
        project: "Arbitrum",
        network: "Ethereum",
        networkColor: "bg-blue-100 text-blue-800",
        amount: "$0.045",
        status: "Completed",
    },
    {
        date: "Apr 09, 2025",
        time: "10:18 UTC",
        type: "support",
        project: "Optimism",
        network: "Ethereum",
        networkColor: "bg-blue-100 text-blue-800",
        amount: "$0.045",
        status: "Completed",
    },
    {
        date: "Apr 08, 2025",
        time: "16:05 UTC",
        type: "support",
        project: "Monad",
        network: "Monad",
        networkColor: "bg-purple-100 text-purple-800",
        amount: "$0.045",
        status: "Pending",
    },
    {
        date: "Apr 07, 2025",
        time: "08:30 UTC",
        type: "support",
        project: "zkSync",
        network: "Ethereum",
        networkColor: "bg-blue-100 text-blue-800",
        amount: "$0.045",
        status: "Failed",
    },
]

export default WalletPage
