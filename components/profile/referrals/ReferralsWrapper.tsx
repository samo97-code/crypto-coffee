"use client"

import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {Copy, Check, Trophy} from "lucide-react"
import {Button} from "@/components/ui/button"
import ReferralHeader from "@/components/profile/referrals/ReferralHeader";
import ReferralTips from "@/components/profile/referrals/ReferralTips";
import ReferralMilestones from "@/components/profile/referrals/ReferralMilestones";
import {useAppSelector} from "@/store/hook";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";
import {getTopReferrers, getCurrentUserReferrers} from "@/lib/referral-service";
import {shortAddress} from "@/utils/utils";

interface ITopReferrers {
    id: string,
    wallet_address: string,
    total_referrals: number
}

const ReferralsWrapper = () => {
    const authUser = useAppSelector(state => state.user.user);
    const referralLink = `http://localhost:3000?ref=${authUser.referral_code}`
    const [loading, setLoading] = useState(true)
    const [copied, setCopied] = useState(false)
    const [topReferrers, setTopReferrers] = useState<ITopReferrers[]>([])
    const [currentUserReferrers, setCurrentUserReferrers] = useState<ITopReferrers>()

    useEffect(() => {
        if (authUser.id) {
            fetchData()
        }
    }, [authUser])

    const fetchData = async () => {
        try {

            const data = await getTopReferrers()
            setTopReferrers(data)
            // console.log(topReferrers, 'topReferrers')

            const currentUserReferrers = await getCurrentUserReferrers(authUser.wallet_address)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setCurrentUserReferrers(currentUserReferrers)

        } catch (error) {
            console.error('Error in getWalletData action:', error)
            return {success: false, error: 'Failed to fetch wallet data'}
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (loading) return <CoffeeLoader/>

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-6">
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
                    <ReferralHeader/>

                    <div
                        className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mt-8">
                        <div
                            className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-coffee-500 via-coffee-600 to-coffee-700"></div>
                        <div className="pb-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-coffee-900">Refer new users to Crypto Coffee and
                                    earn rewards!</h2>
                            </div>
                        </div>
                        <div>
                            <p className="text-coffee-700 mb-4">Share your unique referral link with friends to get
                                started.</p>

                            {/* Referral Link Section */}
                            <div className="flex items-center gap-2 mb-8">
                                <div
                                    className="flex-1 bg-white dark:bg-coffee-100/50 border border-coffee-200 rounded-lg h-10 px-4 py-2 text-coffee-800 overflow-hidden text-ellipsis">
                                    {referralLink}
                                </div>
                                <Button onClick={handleCopy}
                                        className="bg-coffee-600 dark:bg-coffee-50/40 hover:bg-coffee-700 dark:hover:bg-coffee-50/60 h-10 text-white">
                                    {copied ? <Check className="h-4 w-4 mr-1"/> : <Copy className="h-4 w-4 mr-1"/>}
                                    {copied ? "Copied" : "Copy"}
                                </Button>
                            </div>

                            {/* Earnings Section */}
                            <div
                                className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mb-8">
                                <div className="">
                                    <h3 className="text-coffee-700 font-medium mb-1">Your Earnings</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-coffee-900">$0.00</span>
                                    </div>
                                    <p className="text-sm text-coffee-600 mb-4">Minimum withdrawal: $5.00</p>
                                    <Button
                                        className="w-full bg-coffee-600 dark:bg-coffee-50/40 hover:bg-coffee-700 dark:hover:bg-coffee-50/60 transition-colors text-white">Withdraw</Button>
                                </div>
                            </div>

                            {/* Two Column Section */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Referral Milestones */}
                                <ReferralMilestones referralsCount={currentUserReferrers?.total_referrals || 0}/>

                                {/* Top Referrers */}
                                <div
                                    className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50">
                                    <h3 className="pb-2">
                                        <div className="flex items-center gap-2">
                                            <Trophy className="h-5 w-5 text-coffee-700"/>
                                            <h4 className="text-lg font-semibold text-coffee-800">Top Referrers of
                                                the Month</h4>
                                        </div>
                                    </h3>
                                    <div>
                                        <ul className="space-y-2">
                                            {topReferrers.map((item, index) => (
                                                <li
                                                    key={item.id}
                                                    className="flex items-center justify-between py-1 border-b border-coffee-100 last:border-0"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${index + 1 <= 3 ? "bg-coffee-600 text-white dark:text-coffee-50/80" : "bg-coffee-200 text-coffee-700 dark:text-coffee-100"}`}
                                                        >
                                                            {index + 1}
                                                        </div>
                                                        <span
                                                            className="text-coffee-800">{shortAddress(item.wallet_address)}</span>
                                                    </div>
                                                    <span
                                                        className="text-coffee-700  font-medium">{item.total_referrals} refs</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Referral Tips */}
                    <ReferralTips/>
                </motion.div>
            </div>
        </div>
    )
}

export default ReferralsWrapper
