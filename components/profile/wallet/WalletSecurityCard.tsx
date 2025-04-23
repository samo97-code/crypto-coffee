"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle } from "lucide-react"

const WalletSecurityCard =()=> {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 h-full"
        >
            <h2 className="text-lg font-semibold text-coffee-900 mb-4">Wallet Security</h2>

            <div className="space-y-4">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-green-50 dark:bg-green-100 border border-green-200 dark:border-green-300 rounded-lg p-4 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 h-16 w-16 -mr-8 -mt-8 opacity-10">
                        <div className="h-full w-full rounded-full bg-green-500"></div>
                    </div>

                    <div className="flex items-start relative z-10">
                        <div className="bg-green-100 p-1.5 rounded-full mr-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-green-800">Secure Connection</h3>
                            <p className="text-xs text-green-700 mt-1">Your wallet is securely connected via encrypted channels.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-amber-50 dark:bg-amber-100/80 border border-amber-200 dark:border-amber-200 rounded-lg p-4"
                >
                    <div className="flex items-start">
                        <div className="bg-amber-100 p-1.5 rounded-full mr-3">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-amber-800">Security Tips</h3>
                            <ul className="text-xs text-amber-700 mt-1 space-y-1.5 list-disc list-inside">
                                <li>Never share your seed phrase</li>
                                <li>Verify all transaction details</li>
                                <li>Use hardware wallets for large amounts</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default WalletSecurityCard
