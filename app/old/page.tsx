'use client';

import {useWriteContract, useWaitForTransactionReceipt, useAccount} from 'wagmi';
import {parseEther} from 'viem';
import {useEffect, useState} from 'react';

const contractAddresses = {
    ETH: '0xf6dd3b857bD1772bf81391F2f4a90E9FD46B7dc7',
};

const abi = [
    {
        inputs: [{type: 'string', name: '_chain'}],
        name: 'buyCoffee',
        type: 'function',
        stateMutability: 'payable',
    },
];

const GMButton = ({chain, contractAddress, onSuccess}) => {
    const {isConnected} = useAccount();
    const [hash, setHash] = useState(null);
    const {writeContractAsync, isPending, error} = useWriteContract();

    const coffeeSent = async () => {
        if (!isConnected || !writeContractAsync) {
            console.error('Wallet or writeContractAsync not ready');
            return;
        }

        const ethAmount = (0.045 / 3000).toFixed(6);
        try {
            const hash = await writeContractAsync({
                address: contractAddress,
                abi: abi,
                functionName: 'buyCoffee',
                args: [`Coffee on ${chain}`],
                value: parseEther(ethAmount),
            });
            onSuccess(hash); // pass hash back to Home
            setHash(hash)
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    // Wait for the transaction receipt
    const {data: receipt, isLoading: isConfirming} = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (receipt) {
            // console.log('Transaction confirmed!', receipt);
            setSuccess(true);
            setHash(null);
        }
    }, [receipt]);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (error) console.error('useWriteContract error:', error);
    }, [error]);

    return (
        <button onClick={coffeeSent} disabled={isPending || isConfirming}>
            {isPending ? 'Sending...' : `Crypto Coffee ☕️ ${chain}`}
        </button>
    );
};

export default function Home() {

    const [hash, setHash] = useState(null);
    const {data: receipt, isLoading: isConfirming} = useWaitForTransactionReceipt({hash});


    const handleSuccess = (txHash) => {
        setHash(txHash);
    };

    useEffect(() => {
        if (receipt) {
            console.log('🎉 Transaction receipt:', receipt);
        }
    }, [receipt]);

    return (
        <div>
            {Object.entries(contractAddresses).map(([chain, address]) => (
                <GMButton
                    key={chain}
                    chain={chain}
                    contractAddress={address}
                    onSuccess={handleSuccess}
                />
            ))}

            {isConfirming && <p>Transaction is confirming...</p>}

            {receipt && (
                <div>
                    🎉 Transaction Successful! TxHash: {receipt.transactionHash}
                </div>
            )}

        </div>
    );
};

