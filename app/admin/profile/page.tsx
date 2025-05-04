'use client'

import {useState, useEffect, SetStateAction} from 'react';
import {useAccount, useWaitForTransactionReceipt} from 'wagmi';
import {useFeesBalances} from "@/hooks/useAllFeesBalances";
import {writeContract} from '@wagmi/core';
import {config} from "@/lib/wagmi"
import {toast} from "sonner";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";

// Define the ABI for the withdrawFeesPercent function
const WITHDRAW_FEES_ABI = [
    {
        inputs: [
            {internalType: 'address', name: 'to', type: 'address'},
            {internalType: 'uint256', name: 'percent', type: 'uint256'},
        ],
        name: 'withdrawFeesPercent',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

export interface ChainInfo {
    id: number;
    name: string;
    address: `0x${string}`;
}

export interface ChainBalance extends ChainInfo {
    balance: string; // formatted ETH string, e.g. "0.1234"
    error?: string;  // Optional error message
}

export default function FeesWithdrawDashboard() {
    const {address, isConnected} = useAccount();
    const [selectedChain, setSelectedChain] = useState(null);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [percent, setPercent] = useState(100);
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Chain configuration
    const CHAINS = [
        {id: 10, name: "Optimism", address: process.env.NEXT_PUBLIC_RPS_CONTRACT_OP},
        {id: 42161, name: "Arbitrum", address: process.env.NEXT_PUBLIC_RPS_CONTRACT_ARB},
    ];

    // Get fee balances from the blockchain
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const feeData = useFeesBalances(CHAINS as ChainInfo);

    // Use the same wait pattern as in BuyButton
    const {data: receipt} = useWaitForTransactionReceipt({
        hash: txHash as `0x${string}`,
        query: {enabled: !!txHash},
    })

    useEffect(()=>{
        if (address === '0xCEE870Bd19008D5C3A230C2803c0A94E92803a34'){
            setLoading(false)
        }
    },[address])

    useEffect(() => {
        if (receipt) {
            if (receipt.status === 'reverted') {
                toast.error('Transaction was mined but reverted.')
                return
            }

            console.log(receipt, 'receipt')
        }
    }, [receipt]);


    // Handle chain selection change
    const handleChainChange = (e: { target: { value: string; }; }) => {
        const chainId = parseInt(e.target.value);
        const chain = CHAINS.find(c => c.id === chainId);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSelectedChain(chain || null);
    };

    // Handle recipient address change
    const handleRecipientChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setRecipientAddress(e.target.value);
    };

    // Handle percentage slider change
    const handlePercentChange = (e: { target: { value: string; }; }) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            setPercent(value);
        }
    };

    // Handle withdraw button click
    const handleWithdraw = async () => {
        if (!isConnected) {
            setError('Please connect your wallet');
            return;
        }

        if (!selectedChain) {
            setError('Please select a chain');
            return;
        }

        const recipient = recipientAddress.trim() || address;

        if (!recipient || !recipient.startsWith('0x')) {
            setError('Please enter a valid recipient address');
            return;
        }

        setIsWithdrawing(true);
        setError('');
        // setTxHash('');

        try {
            console.log(selectedChain, 'selectedChain')

            const result = await writeContract(config, {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                address: selectedChain?.address,
                abi: WITHDRAW_FEES_ABI,
                functionName: 'withdrawFeesPercent',
                args: [recipient, BigInt(percent)], // Convert percent to BigInt
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                chainId: selectedChain?.id,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                gas: 100000n, // Lower gas limit
                maxFeePerGas: undefined, // Let MetaMask determine this
                maxPriorityFeePerGas: undefined, // Let MetaMask determine this
            });

            console.log('Withdraw result:', result);
            setTxHash(result);

        } catch (err) {
            console.error('Failed to withdraw fees:', err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError(err.message || 'Failed to withdraw fees');
        } finally {
            setIsWithdrawing(false);
        }
    };

    // When the dashboard loads, select the first chain by default
    useEffect(() => {
        if (CHAINS.length > 0 && !selectedChain) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSelectedChain(CHAINS[0]);
        }
    }, [CHAINS]);


    if (loading) return <CoffeeLoader />

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Fee Management</h1>

            {/* Fee Balances Card */}
            <div className="bg-[#3c3434] p-6 rounded-lg shadow text-white mb-6">
                <h2 className="text-xl font-bold mb-4">Collected Fees by Chain</h2>
                <div className="space-y-4">
                    {feeData.map(({id, name, balance}) => (
                        <div key={id} className="flex justify-between items-center border-b border-gray-700 pb-3">
                            <span className="font-medium">{name}</span>
                            <div className="text-right">
                                <strong className="text-xl">{balance} ETH</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Withdraw Fees Card */}
            <div className="bg-[#3c3434] p-6 rounded-lg shadow text-white">
                <h2 className="text-xl font-bold mb-4">Withdraw Fees</h2>

                <div className="space-y-4">
                    {/* Chain Selection */}
                    <div>
                        <label className="block text-sm mb-1">Select Chain</label>
                        <select
                            className="w-full p-2 bg-[#2a2424] border border-gray-700 rounded text-white"
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            value={selectedChain?.id || ''}
                            onChange={handleChainChange}
                        >
                            {CHAINS.map(chain => (
                                <option key={chain.id} value={chain.id}>
                                    {chain.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Percentage Slider */}
                    <div>
                        <label className="block text-sm mb-1">Withdrawal Percentage: {percent}%</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={percent}
                            onChange={handlePercentChange}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* Recipient Address */}
                    <div>
                        <label className="block text-sm mb-1">
                            Recipient Address (defaults to your address)
                        </label>
                        <input
                            type="text"
                            placeholder={address || "0x..."}
                            value={recipientAddress}
                            onChange={handleRecipientChange}
                            className="w-full p-2 bg-[#2a2424] border border-gray-700 rounded text-white"
                        />
                    </div>

                    {/* Withdraw Button */}
                    <button
                        onClick={handleWithdraw}
                        disabled={isWithdrawing || !isConnected || !selectedChain}
                        className={`w-full py-3 px-4 rounded font-medium mt-2 ${
                            isWithdrawing || !isConnected || !selectedChain
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-green-700 hover:bg-green-600'
                        }`}
                    >
                        {isWithdrawing ? 'Processing...' : `Withdraw ${percent}% of Fees`}
                    </button>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="mt-2 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {txHash && (
                        <div className="mt-2 text-green-400 text-sm">
                            Transaction submitted!
                            Hash: {txHash.substring(0, 8)}...{txHash.substring(txHash.length - 6)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
