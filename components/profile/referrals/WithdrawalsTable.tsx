import React, {FC, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import SmallLoader from "@/components/re-usable/SmallLoader";
import {Clock, ExternalLink} from "lucide-react";
import {Button} from "@/components/ui/button";
import Pagination from "@/components/re-usable/Pagination";
import {getUserWithdrawals} from "@/lib/referral-service";
import {useAppSelector} from "@/store/hook";
import {IPaginationInfo, IProject, IWithdrawals} from "@/types";
import {formatDateTime} from "@/utils/utils";

interface IProps {
    projects: IProject[]
}

const WithdrawalsTable: FC<IProps> = ({projects}) => {
    const authUser = useAppSelector(state => state.user.user);
    const [loadingTable, setLoadingTable] = useState(true)
    const [withdrawals, setWithdrawals] = useState<IWithdrawals[]>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState<IPaginationInfo>({
        total: 0,
        page: 1,
        pageSize: 7,
        totalPages: 0
    });

    const itemsPerPage = pagination.pageSize
    const totalPages = pagination.totalPages

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async (pageNumber: number = 1) => {
        try {
            setLoadingTable(true)
            const data = await getUserWithdrawals(authUser.id, pageNumber, pagination.pageSize)
            setWithdrawals(data.withdrawals)
            setPagination(data.pagination)
        } catch (error) {
            console.error('Error in getWalletData action:', error)
            return {success: false, error: 'Failed to fetch wallet data'}
        } finally {
            setLoadingTable(false)
        }
    }

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            "completed": "text-green-600 dark:text-green-500",
            "pending": "text-amber-600 dark:text-amber-500",
            "failed": "text-red-600 dark:text-red-500",
        }
        return statusColors[status.toLowerCase()] || "text-gray-600"
    }

    const activeProject = (chain: string) => {
        return projects.find((item) => item.chain === chain)
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.5}}
            className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mt-8"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-coffee-900">Withdrawals History</h2>
            </div>

            <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-coffee-200 dark:border-coffee-600/50">
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Network</th>
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Date</th>
                        <th className="text-right py-3 px-4 text-coffee-700 text-sm font-medium">Explorer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loadingTable ?
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-coffee-600">
                                <SmallLoader/>
                            </td>
                        </tr>
                        : withdrawals.length > 0 ? (
                            withdrawals.map((tx, index) => (
                                <motion.tr
                                    key={tx.id}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6 + index * 0.1}}
                                    className="border-b border-coffee-100 dark:border-coffee-200/30 hover:bg-coffee-50 dark:hover:bg-coffee-50/30 transition-colors"
                                >
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <span className="text-coffee-800 text-sm">${tx.amount}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1.5">
                                            <img src={activeProject(tx.chain)?.icon_url || "/placeholder.svg"}
                                                 alt={tx.chain}
                                                 width={24}
                                                 height={24}
                                                 className="rounded-full max-h-6 max-w-6 h-6"/>
                                            <span
                                                className="text-coffee-800 text-sm">{activeProject(tx.chain)?.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                    <span
                                        className={`text-sm capitalize ${getStatusColor(tx.status)}`}>{tx.status}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="bg-coffee-100 p-1 rounded-full mr-2">
                                                <Clock className="h-3 w-3 text-coffee-600"/>
                                            </div>
                                            <div>
                                                <div
                                                    className="text-coffee-900 text-sm">{formatDateTime(tx.requested_at)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-7 w-7"
                                                onClick={() => window.open(`${activeProject(tx.chain)?.blockchain_networks[0].explorer_url}tx/${tx.tx_hash}`)}>
                                            <ExternalLink className="h-3.5 w-3.5 text-coffee-600"/>
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-8 text-center text-coffee-600">
                                    No transactions found for the selected filters
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {withdrawals.length > 0 && (
                <Pagination
                    dataLength={withdrawals.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    total={pagination.total}
                    setCurrentPage={setCurrentPage}
                    fetchData={fetchData}
                />
            )}
        </motion.div>
    );
};

export default WithdrawalsTable;
