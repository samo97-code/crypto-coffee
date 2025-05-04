import {useEffect, useState} from "react";
import {useAccount, usePublicClient} from "wagmi";
import {formatEther} from "viem";

const RPS_CONTRACT_ABI = [
    {
        inputs: [],
        name: "getFeesBalance",
        outputs: [{internalType: "uint256", name: "", type: "uint256"}],
        stateMutability: "view",
        type: "function",
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

export function useFeesBalances(chains: ChainInfo[]): ChainBalance[] {
    const {chainId} = useAccount()
    const publicClient = usePublicClient();
    const [balances, setBalances] = useState<ChainBalance[]>(
        chains.map(c => ({...c, balance: "0.000000"}))
    );

    useEffect(() => {
        if (!chains.length || !publicClient) return;

        fetchData();
    }, [chainId]);

    const fetchData = async() => {
        try {
            // Filter out chains with undefined addresses and log all addresses for debugging
            const validChains = chains.filter(chain => {
                return typeof chain.address === 'string' && chain.address.startsWith('0x');
            });

            if (validChains.length === 0) {
                console.error("No valid chain addresses found");
                return;
            }

            console.log(validChains, 'validChains')
            // Instead of using readContract, let's try using the publicClient directly
            const results = await Promise.all(
                validChains.map(async (chain) => {
                    try {
                        // Using publicClient for more direct control
                        const data = await publicClient?.readContract({
                            address: chain.address,
                            abi: RPS_CONTRACT_ABI,
                            functionName: "getFeesBalance",
                        });

                        return {
                            success: true,
                            result: data,
                            chain: chain,
                            error: undefined
                        };
                    } catch (error) {
                        console.error(`Error reading contract for ${chain.name}:`, error);
                        return {
                            success: false,
                            result: BigInt(0),
                            chain: chain,
                            error: error instanceof Error ? error.message : 'Unknown error'
                        };
                    }
                })
            );

            // Format results
            const newBalances = results.map((item) => {
                const formattedBalance = item.success
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    ? Number(formatEther(item.result)).toLocaleString(undefined, {
                        minimumFractionDigits: 6,
                        maximumFractionDigits: 6,
                    })
                    : "0.000000";

                return {
                    ...item.chain,
                    balance: formattedBalance,
                    error: item.error
                };
            });

            setBalances(newBalances);
        } catch (e) {
            console.error("❌ Error fetching fee balances:", e);
        }
    }

    return balances;
}
