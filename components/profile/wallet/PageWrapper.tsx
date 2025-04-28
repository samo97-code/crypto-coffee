'use client'
import React, {useEffect, useState} from "react"
import {walletService} from "@/lib/wallet-service";
import WalletHeader from "@/components/profile/wallet/WalletHeader";
import ConnectedWalletCard from "@/components/profile/wallet/ConnectedWalletCard";
import WalletStatsCards from "@/components/profile/wallet/WalletStats-Cards";
import WalletSecurityCard from "@/components/profile/wallet/WalletSecurityCard";
import TransactionHistoryTable from "@/components/profile/wallet/TransactionHistoryTable";
import {IHistoryTransaction, IPaginationInfo, ITransactionStats, INetwork} from "@/types";
import {useAppSelector} from "@/store/hook";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";

const PageWrapper = () => {
    const authUser = useAppSelector(state => state.user.user);
    const [loading, setLoading] = useState(true);
    const [allNetworks, setAllNetworks] = useState<INetwork[]>([]);
    const [states, setStates] = useState<ITransactionStats>({
        transaction_count: 0,
        networks_used: 0,
        most_active_network: ''
    });
    const [transactions, setTransactions] = useState<IHistoryTransaction[]>([]);
    const [pagination, setPagination] = useState<IPaginationInfo>({
        total: 0,
        page: 1,
        pageSize: 7,
        totalPages: 0
    });

    const network = 'all'
    const period = '30'

    useEffect(() => {
        if (authUser.id) fetchData()
    }, [authUser.id]);

    const fetchData = async () => {
        try {
            setLoading(true)
            const data = await walletService.getWalletPageData(authUser.id, network, period, pagination.page, pagination.pageSize)

            setAllNetworks(data.allNetworks)
            setStates(data.stats)
            setTransactions(data.transactions)
            setPagination(data.pagination)
        } catch (error) {
            console.error('Error in getWalletData action:', error)
            return {success: false, error: 'Failed to fetch wallet data'}
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <CoffeeLoader/>

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-6">
                <WalletHeader/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-10">
                        <ConnectedWalletCard/>
                        <WalletStatsCards allStats={states}/>
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

export default PageWrapper
