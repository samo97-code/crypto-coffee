// app/api/withdraw-usdt/route.ts
import { NextResponse } from 'next/server';
import { createPublicClient, http, createWalletClient, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import {CHAIN_CONFIG} from "@/constants";

// USDT token ABI
const usdtAbi = [
    {
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
    },
];


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { chain, userAddress, amount } = body;

        // Validate input
        if (!chain || !userAddress || !amount) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Setup project wallet for blockchain interaction
        const account = privateKeyToAccount(process.env.PROJECT_WALLET_PRIVATE_KEY as `0x${string}`);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const chainFinal = CHAIN_CONFIG[chain]

        // Create clients for the specified chain
        const publicClient = createPublicClient({
            chain: chainFinal.chain,
            transport: http()
        });

        const walletClient = createWalletClient({
            chain: chainFinal.chain,
            transport: http(),
            account
        });

        // Get token decimals
        const decimals = await publicClient.readContract({
            address: chainFinal.usdtAddress,
            abi: usdtAbi,
            functionName: 'decimals'
        });

        // Convert amount to token units
        const amountInTokenUnits = parseUnits(
            amount.toString(),
            Number(decimals)
        );

        // Check project wallet balance
        const projectBalance = await publicClient.readContract({
            address: chainFinal.usdtAddress,
            abi: usdtAbi,
            functionName: 'balanceOf',
            args: [account.address]
        }) as number

        if (projectBalance < amountInTokenUnits) {
            return NextResponse.json({
                success: false,
                error: 'Insufficient funds in project wallet'
            }, { status: 400 });
        }

        // Execute the USDT transfer
        const hash = await walletClient.writeContract({
            address: chainFinal.usdtAddress,
            abi: usdtAbi,
            functionName: 'transfer',
            args: [userAddress, amountInTokenUnits]
        });

        // Wait for transaction receipt
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        if (receipt.status !== 'success') {
            throw new Error('Transaction failed');
        }

        return NextResponse.json({
            success: true,
            txHash: hash
        });

    } catch (error) {
        console.error('Withdrawal error:', error);

        return NextResponse.json({
            success: false,
            error: 'Withdrawal failed: ' + (error as Error).message
        }, { status: 500 });
    }
}
