// hooks/useRockPaperScissorsContract.ts
'use client'

import {useState, useEffect} from 'react'
import {parseEther} from 'viem'
import {writeContract} from '@wagmi/core'
import {config} from "@/lib/wagmi"
import {useAccount, useWaitForTransactionReceipt} from 'wagmi'
import {toast} from 'sonner'
import {WriteContractData} from "@wagmi/core/query"
import useEthPrice from "@/hooks/useEthPrice";
import {RPS_CONTRACT_ABI} from "@/abi";
import {GameResult, IProject} from "@/types";
import {createActivityTransaction, updateActivityTransaction} from "@/lib/transaction-service";
import {useAppSelector} from "@/store/hook";
import {checkAndUpdateAchievements} from "@/lib/acheivements-service";
import {saveReferrerEarnings} from "@/lib/referral-service";

type TransactionType = 'startGame' | 'submitResult' | 'claimReward' | 'none';
type GameType = 'waiting' | "choosing" | "revealing" | "roundEnd" | "gameEnd";

interface ItxTempData {
    amount: string,
    usd_value: number,
    networkName: string
    hash?: string
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const useRockPaperScissorsContract = (callbackFn?: (status: GameType) => void, projects: IProject[]) => {
    const authUser = useAppSelector(state => state.user.user);
    const {ethPrice, fetchEthPrice} = useEthPrice()
    const {isConnected, chainId} = useAccount()
    const contractAddress = chainId === 10 ? process.env.NEXT_PUBLIC_RPS_CONTRACT_OP : process.env.NEXT_PUBLIC_RPS_CONTRACT_ARB as `0x${string}`

    const [currentTxType, setCurrentTxType] = useState<TransactionType>('none');
    const [isClaimed, setIsClaimed] = useState(false)
    const [currentGameId, setCurrentGameId] = useState<number | null>(null)
    const [hash, setHash] = useState<`0x${string}` | ''>('') // Use the same pattern as in BuyButton
    const [isPendingTransaction, setIsPendingTransaction] = useState(false)
    const [claimableAmount, setClaimableAmount] = useState<number>(0)

    const [txTempData, setTxTempData] = useState<ItxTempData>({
        amount: '0',
        usd_value: 0,
        networkName: '',
        hash: ''
    })
    const [currentTxId, setCurrentTxId] = useState<number | null>(null)

    // Use the same wait pattern as in BuyButton
    const {data: receipt, isLoading: isConfirming} = useWaitForTransactionReceipt({
        hash: hash as `0x${string}`,
        query: {enabled: !!hash},
    })

    useEffect(() => {
        if (receipt) {
            if (receipt.status === 'reverted') {
                toast.error('Transaction was mined but reverted.')
                setIsPendingTransaction(false)
                return
            }

            switch (currentTxType) {
                case 'startGame':
                    if (receipt.logs && receipt.logs.length > 0) {
                        const gameCreatedLog = receipt.logs[0];

                        if (gameCreatedLog && gameCreatedLog.topics && gameCreatedLog.topics.length > 1) {
                            const gameIdHex = gameCreatedLog.topics[1];
                            const gameId = parseInt(gameIdHex as string, 16);

                            setCurrentGameId(gameId);
                            localStorage.setItem('currentRpsGameId', gameId.toString());

                            if (callbackFn) callbackFn('choosing')
                            // #${gameId}
                            toast.success(`Game started successfully!`);

                            createTransactionHandler()

                            if (authUser.referred_by) {
                                //get 5% of each tx from referred user
                                const earningAmount = Number((claimableAmount * 0.05).toFixed(6));
                                saveReferrerEarnings(authUser, earningAmount)
                            }
                        }
                    }
                    break;

                case 'submitResult':
                    if (callbackFn) callbackFn('gameEnd')
                    updateTransactionHandler()
                    toast.success('Game result submitted successfully!');

                    checkAndUpdateAchievements(authUser.id, [
                        {type: 'rps_played', value: 1},
                    ]);

                    break;

                case 'claimReward':
                    setIsClaimed(true)
                    toast.success('Reward claimed successfully!');
                    break;
            }

            setIsPendingTransaction(false);
            setCurrentTxType('none');
        }
    }, [receipt]);


    const createTransactionHandler = async () => {
        try {
            const projectId = projects.find((item) => item.blockchain_networks[0].chain_id === chainId)?.id

            const resp = await createActivityTransaction(authUser.id, projectId, txTempData.networkName, hash, txTempData.amount, txTempData.usd_value, 'activity', 'pending')
            setCurrentTxId(resp?.id || 0)

        } catch (error: unknown) {
            console.log(error, 'error')
            console.error(error, 'error')
        }
    }
    const updateTransactionHandler = async () => {
        try {
            const updateData = {
                status: 'completed'
            }
            await updateActivityTransaction(currentTxId || 0, updateData)
        } catch (error: unknown) {
            console.log(error, 'error')
            console.error(error, 'error')
        }
    }

    /** startGame */
    async function handleStartGame(betAmount: number) {
        if (!isConnected) {
            toast.error('Please connect your wallet')
            return false
        }

        setIsClaimed(false)
        setCurrentTxType('startGame');
        setIsPendingTransaction(true)

        // Store the bet amount for calculating rewards later
        setClaimableAmount(betAmount) // 2x reward for winning

        const finalEthPrice = await fetchEthPrice() || ethPrice
        const amount = (betAmount / finalEthPrice).toFixed(6)

        try {
            // Use the same writeContract pattern that works in BuyButton
            const result = await writeContract(config, {
                address: contractAddress as WriteContractData,
                abi: RPS_CONTRACT_ABI,
                functionName: 'startGame',
                args: [],
                value: parseEther(amount),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                gas: 100000n, // Lower gas limit
                maxFeePerGas: undefined, // Let MetaMask determine this
                maxPriorityFeePerGas: undefined, // Let MetaMask determine this
            })

            // Store the transaction hash
            if (result && typeof result === 'string' && result.length === 66) {
                setTxTempData({
                    amount: amount.toString(),
                    usd_value: betAmount,
                    networkName: projects.find((item) => item.blockchain_networks[0].chain_id === chainId)?.network_name || ''
                })
                setHash(result as `0x${string}`)
                return true
            } else {
                toast.error('Invalid transaction hash returned')
                setCurrentTxType('none'); // Reset if something goes wrong
                setIsPendingTransaction(false)
                return false
            }
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const name = error?.name
            let log = ''

            if (name === 'ContractFunctionExecutionError') {
                log = 'Transaction reverted on chain. No token was spent.'
            } else if (name === 'UserRejectedRequestError') {
                log = 'You rejected the transaction.'
            } else {
                log = `Something went wrong. Try again later.`
            }

            toast.error(log)
            setCurrentTxType('none'); // Reset if something goes wrong
            setIsPendingTransaction(false)
            return false
        }
    }

    /** submit outcome */
    async function submitGameOutcome(result: GameResult) {
        if (!currentGameId) {
            toast.error('No game in progress')
            return false
        }

        setIsPendingTransaction(true)
        setCurrentTxType('submitResult');

        try {
            const txHash = await writeContract(config, {
                address: contractAddress as WriteContractData,
                abi: RPS_CONTRACT_ABI,
                functionName: 'playerSubmitResult',
                args: [BigInt(currentGameId), result],
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                gas: 100000n, // Lower gas limit
                maxFeePerGas: undefined, // Let MetaMask determine this
                maxPriorityFeePerGas: undefined, // Let MetaMask determine this
            })

            if (txHash && typeof txHash === 'string') {
                setHash(txHash as `0x${string}`)
                return true
            } else {
                toast.error('Invalid transaction hash returned')
                setIsPendingTransaction(false)
                return false
            }
        } catch (error: unknown) {
            console.log("Error submitting result:", error)

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const name = error?.name
            let log = ''

            if (name === 'ContractFunctionExecutionError') {
                log = 'Transaction reverted on chain.'
            } else if (name === 'UserRejectedRequestError') {
                log = 'You rejected the transaction.'
            } else {
                log = `Something went wrong. Try again later.`
            }

            toast.error(log)
            setIsPendingTransaction(false)
            setCurrentTxType('none'); // Reset if there's an error
            return false
        }
    }

    /** claim reward */
    async function handleClaimReward() {
        if (!currentGameId) {
            toast.error('Nothing to claim')
            return false
        }

        setIsPendingTransaction(true)
        setCurrentTxType('claimReward');

        try {
            const txHash = await writeContract(config, {
                address: contractAddress as WriteContractData,
                abi: RPS_CONTRACT_ABI,
                functionName: 'claimReward',
                args: [BigInt(currentGameId)],
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                gas: 100000n, // Lower gas limit
                maxFeePerGas: undefined, // Let MetaMask determine this
                maxPriorityFeePerGas: undefined, // Let MetaMask determine this
            })

            if (txHash && typeof txHash === 'string') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setTxTempData({
                    usd_value: claimableAmount,
                    hash: txHash,
                    amount: txTempData.amount,
                    networkName: projects.find((item) => item.blockchain_networks[0].chain_id === chainId)?.network_name || ''
                })
                setHash(txHash as `0x${string}`)
                return true
            } else {
                toast.error('Invalid transaction hash returned')
                setIsPendingTransaction(false)
                return false
            }
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const name = error?.name
            let log = ''

            if (name === 'ContractFunctionExecutionError') {
                log = 'Transaction reverted on chain.'
            } else if (name === 'UserRejectedRequestError') {
                log = 'You rejected the transaction.'
            } else {
                log = `Something went wrong. Try again later.`
            }

            toast.error(log)
            setCurrentTxType('none'); // Reset if there's an error
            setIsPendingTransaction(false)
            return false
        }
    }

    /** reset local state */
    function resetContractState() {
        setCurrentGameId(null)
        setHash('')
        setIsPendingTransaction(false)
        setClaimableAmount(0)
    }

    return {
        txTempData,
        isClaimed,
        currentGameId,
        isPendingTransaction,
        claimableAmount,
        isLoading: isPendingTransaction || isConfirming,
        handleStartGame,
        submitGameOutcome,
        handleClaimReward,
        resetContractState,
    }
}

export default useRockPaperScissorsContract
