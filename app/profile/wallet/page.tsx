export const dynamic = 'force-dynamic';
import {walletService} from "@/lib/wallet-service";
import {cookies} from 'next/headers'
import WalletHeader from "@/components/profile/wallet/WalletHeader";
import ConnectedWalletCard from "@/components/profile/wallet/ConnectedWalletCard";
import WalletStatsCards from "@/components/profile/wallet/WalletStats-Cards";
import WalletSecurityCard from "@/components/profile/wallet/WalletSecurityCard";
import TransactionHistoryTable from "@/components/profile/wallet/TransactionHistoryTable";
import {IWalletPageData} from "@/types";

const WalletPage = async () => {
    const {
        stats,
        allNetworks,
        pagination,
        transactions
    } = await getWalletData() as unknown as IWalletPageData;

    return (
        <div className="container mx-auto py-8 px-4 bg-coffee-50 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-6">
                <WalletHeader/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-10">
                        <ConnectedWalletCard/>
                        <WalletStatsCards allStats={stats}/>
                    </div>
                    <div className="md:col-span-1">
                        <WalletSecurityCard/>
                    </div>
                </div>

                <TransactionHistoryTable
                    allNetworks={allNetworks}
                    pagination={pagination}
                    transactions={transactions}
                />
            </div>
        </div>
    )
}

async function getWalletData(
    network: string = 'all',
    period: string = '30',
    page: number = 1
) {
    try {
        const cookieStore = await cookies()
        const userIdCookie = cookieStore.get('userId')
        const userId = userIdCookie?.value || '00000000-0000-0000-0000-000000000001' // Fallback to sample user

        const data = await walletService.getWalletPageData(userId, network, period, page, 10)
        return {
            stats: data.stats,
            allNetworks: data.allNetworks,
            transactions: data.transactions,
            pagination: data.pagination,
        }
    } catch (error) {
        console.error('Error in getWalletData action:', error)
        return {success: false, error: 'Failed to fetch wallet data'}
    }
}

export default WalletPage
