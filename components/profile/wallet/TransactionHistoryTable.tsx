"use client"

import React, {FC, useState, useRef, useEffect} from "react"
import {motion} from "framer-motion"
import {Clock, ExternalLink} from "lucide-react"
import {Button} from "@/components/ui/button"
import {IHistoryTransaction, IPaginationInfo} from "@/types";
import {walletService} from "@/lib/wallet-service";
import {useAppSelector} from "@/store/hook";
import ReactSelect from 'react-select'
import {filterDays} from "@/constants";
import SmallLoader from "@/components/re-usable/SmallLoader";
import Pagination from "@/components/re-usable/Pagination";


interface INetwork {
    label: string
    value: string
}

interface IProps {
    allNetworks: INetwork[]
    pagination: IPaginationInfo
    transactions: IHistoryTransaction[]
}

const TransactionHistoryTable: FC<IProps> = ({allNetworks, pagination, transactions}) => {
    const hasLoaded = useRef(false);
    const {user} = useAppSelector(state => state.user);

    const [allTransactions, setAllTransactions] = useState(transactions)
    const [selectedOption, setSelectedOption] = useState({label: 'All networks', value: 'all'})
    const [selectedNetwork, setSelectedNetwork] = useState("all")
    const [selectedOptionPeriod, setSelectedOptionPeriod] = useState({label: "Last 30 days", value: '30'},)
    const [selectedPeriod, setSelectedPeriod] = useState("30")
    const [currentPage, setCurrentPage] = useState(pagination.page)
    const [loadingTable, setLoadingTable] = useState(false)

    const itemsPerPage = pagination.pageSize
    const totalPages = pagination.totalPages

    useEffect(() => {
        if (!hasLoaded.current) {
            hasLoaded.current = true;
            return
        }
        fetchData(currentPage)
    }, [selectedNetwork, selectedPeriod])


    const fetchData = async (pageNumber: number) => {
        try {
            setLoadingTable(true)
            const data = await walletService.getTransactionHistory(user.id, selectedNetwork, selectedPeriod, pageNumber, itemsPerPage)
            setAllTransactions(data.transactions)
            setCurrentPage(data.pagination.page)
        } catch (e) {
            console.log(e, 'e')
        } finally {
            setLoadingTable(false)
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const changeHandler = (e: any | never, type: string) => {
        if (type === 'network') {
            setSelectedOption(e)
            setSelectedNetwork(e?.value)
            return
        }

        setSelectedOptionPeriod(e)
        setSelectedPeriod(e.value)

    }

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            "completed": "text-green-600",
            "pending": "text-amber-600",
            "failed": "text-red-600",
        }
        return statusColors[status.toLowerCase()] || "text-gray-600"
    }

    // Format date from ISO string
    const formatDateTime = (input: string): string => {
        const date = new Date(input);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        return date.toLocaleString('en-US', options).replace(',', '');
    }

    const customStyles = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        control: (base) => ({
            ...base,
            backgroundColor: 'white',
            minWidth: 150,
            fontSize: 12,
            borderColor: '#c7a17a', // coffee border
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#c7a17a',
            },
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#a47148' // coffee brown
                : state.isFocused
                    ? '#FDF1E7' // green hover
                    : 'white',
            color: state.isSelected ? 'white' : '#4b2e2e',
            fontSize: 13,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected ? '#a47148' : '#FDF1E7', // green hover soft
            },
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        menu: (base) => ({
            ...base,
            borderRadius: 6,
            padding: 2,
        }),
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.5}}
            className="bg-white rounded-xl p-6 shadow-md border border-coffee-200 mt-8"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-coffee-900">Transaction History</h2>

                <div className="flex space-x-2">
                    <ReactSelect
                        options={allNetworks}
                        value={selectedOption}
                        onChange={(e) => changeHandler(e, 'network')}
                        isSearchable
                        placeholder="All Networks"
                        styles={customStyles}
                    />

                    <ReactSelect
                        options={filterDays}
                        value={selectedOptionPeriod}
                        onChange={(e) => changeHandler(e, 'day')}
                        isSearchable
                        placeholder="Last 30 days"
                        styles={customStyles}
                    />
                </div>
            </div>

            <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-coffee-200">
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Network</th>
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-coffee-700 text-sm font-medium">Date</th>
                        <th className="text-right py-3 px-4 text-coffee-700 text-sm font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loadingTable ?
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-coffee-600">
                                <SmallLoader/>
                            </td>
                        </tr>
                        : allTransactions.length > 0 ? (
                            allTransactions.map((tx, index) => (
                                <motion.tr
                                    key={tx.id}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6 + index * 0.1}}
                                    className="border-b border-coffee-100 hover:bg-coffee-50 transition-colors"
                                >
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1.5">
                                            <img src={tx.icon_url || "/placeholder.svg"} alt={tx.project_name}
                                                 width={24}
                                                 height={24}
                                                 className="rounded-full max-h-6 max-w-6 h-6"/>
                                            <span className="text-coffee-800 text-sm">{tx.project_name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <span className="text-coffee-800 text-sm">{tx.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="text-coffee-800 text-sm">{tx.amount} {tx.chain_key}</span>
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
                                                    className="text-coffee-900 text-sm">{formatDateTime(tx.created_at)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-7 w-7"
                                                onClick={() => window.open(tx.explorer_url)}>
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
            {allTransactions.length > 0 && (
                <Pagination
                    dataLength={allTransactions.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    total={pagination.total}
                    setCurrentPage={setCurrentPage}
                    fetchData={fetchData}
                />
            )}
        </motion.div>
    )
}

export default TransactionHistoryTable
