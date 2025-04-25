'use client'

import React, {useEffect, useState, FC} from "react";
import {useAccount, useWaitForTransactionReceipt, useWriteContract, useSwitchChain} from "wagmi";
import {WriteContractData} from "@wagmi/core/query";
import {writeContract} from '@wagmi/core';
import {config} from "@/lib/wagmi";
import {parseEther} from "viem";
import {ArrowRight, Coffee} from "lucide-react"
import {IProject} from "@/types";
import CustomWalletTrigger from "@/components/dashboard/CustomWalletTrigger";
import {createSupportTransaction, updateTxTotalAmount} from "@/lib/transaction-service";
import {useSelector} from "react-redux";
import {motion} from "framer-motion";
import {cn} from "@/utils/utils";
import type {AnimationControls} from 'framer-motion';
import {toast} from "sonner"
import {handlePostTransactionUpdate} from "@/lib/transaction-service";
import {addXpForTransaction} from "@/lib/acheivements-service";

interface IProps {
    isHovering: boolean,
    buttonControls: AnimationControls,
    ethPrice: number,
    project: IProject,
    setShowSuccessModal: (b: boolean) => void,
    setCurrentBuyedCoffee: (b: { explorerUrl: string; name: string; amount: string, hash: WriteContractData }) => void,
}

const abi = [
    {
        inputs: [{type: 'string', name: '_chain'}],
        name: 'buyCoffee',
        type: 'function',
        stateMutability: 'payable',
    },
];

const BuyButton: FC<IProps> = ({
                                   ethPrice,
                                   project,
                                   setShowSuccessModal,
                                   setCurrentBuyedCoffee,
                                   isHovering,
                                   buttonControls
                               }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {user} = useSelector(state => state.user)
    const {isConnected, chainId} = useAccount();
    const {switchChain} = useSwitchChain();
    const [hash, setHash] = useState('');
    const [amount, setAmount] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const {writeContractAsync} = useWriteContract();

    const actionHandler = async () => {
        if (chainId === project.blockchain_networks[0].chain_id) return await coffeeSent()

        switchChain({chainId: project.blockchain_networks[0].chain_id});
    }

    const checkAmount = () => {
        // Real
        const myEthAmount = 0.045
        // const myMonadAmount = '0.03'

        //For test
        // const myEthAmount = 0.001
        const myMonadAmount = '0.000001'

        let amount = '';

        // console.log((myEthAmount / ethPrice),'111111111')
        // console.log((myEthAmount / ethPrice).toFixed(6),'2222222222')

        if (project.blockchain_networks[0].chain_key === 'Eth') amount = (myEthAmount / ethPrice).toFixed(6)
        if (project.blockchain_networks[0].chain_key === 'Mon') amount = myMonadAmount

        return amount
    }

    //Buy Coffee
    const coffeeSent = async () => {
        if (!isConnected || !writeContractAsync) {
            console.error('Wallet or writeContractAsync not ready');
            return;
        }

        setIsSending(true)
        const amount = checkAmount()

        try {
            const hash = await writeContract(config, {
                address: process.env.NEXT_PUBLIC_BUY_COFFEE_CONTRACT as WriteContractData,
                abi: abi,
                functionName: 'buyCoffee',
                args: [`Coffee on ${project.chain}`],
                value: parseEther(amount),
            });

            //For testing error parts
            // const hash = await writeContract(config, {
            //     address: process.env.NEXT_PUBLIC_BUY_COFFEE_CONTRACT as WriteContractData,
            //     abi,
            //     functionName: 'buyCoffee',
            //     args: [''], // invalid input to force revert
            //     value: parseEther('0'), // too low
            // });

            console.log(hash, 'hash')
            console.log(hash.length, 'length')

            if (hash.length === 66) {
                setHash(hash);
                setAmount(+amount)
                setCurrentBuyedCoffee({
                    hash: hash,
                    name: project.name,
                    amount: `${amount} ${project.blockchain_networks[0].chain_key}`,
                    explorerUrl: project.blockchain_networks[0].explorer_url
                })
            }
        } catch (error) {
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
        } finally {
            setIsSending(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {data: receipt, isLoading: isConfirming, error: waitError,} = useWaitForTransactionReceipt({
        hash: hash as `0x${string}`,
        query: {enabled: !!hash},
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(() => {
        if (receipt) {
            if (receipt.status === 'reverted') {
                return toast.error('Transaction was mined but reverted.')
            }

            txFinishedSuccessfully()
        }
        if (waitError) {
            toast.error('Something went wrong. Try again later.')
        }
    }, [receipt, waitError]);

    const txFinishedSuccessfully = async () => {
       try {
           setShowSuccessModal(true)
           const transaction =  await createSupportTransaction(user.id, project.id, project.network_name, hash, amount.toString())

           if (transaction) {
               await Promise.all([addXpForTransaction(user), handlePostTransactionUpdate(user.id, transaction), await updateTxTotalAmount(user.id)])
           }
       }catch (error) {
           console.error('Supabase Error:', error);
       }finally {
           setHash('');
           setAmount(0)
       }
    }

    return (
        <>
            {
                isConnected ? <motion.button
                    onClick={() => actionHandler()}
                    disabled={isSending || isConfirming}
                    className={`${project.button_color} min-h-10 text-white relative w-full overflow-hidden group/button`}
                    animate={buttonControls}
                    whileTap={{scale: 0.98}}
                >
                    {/* Button background layers */}
                    <div
                        className="absolute -inset-x-full top-0 bottom-0 h-full w-[400%] bg-gradient-to-r from-coffee-600 via-amber-600 to-coffee-600 opacity-0 group-hover/button:opacity-100 animate-shine"/>

                    {/* Button content */}
                    <div className="relative px-6 py-3 rounded-xl flex items-center justify-center">
                        <Coffee className="w-5 h-5 mr-2 text-coffee-100 dark:text-coffee-800"/>
                        <span
                            className="text-coffee-100 dark:text-coffee-800 font-bold truncate">{isSending || isConfirming ? 'Sending...' : `Buy Coffee on ${project.chain}`}</span>
                        <motion.div
                            className="absolute right-4 opacity-0 group-hover/button:opacity-100 group-hover/button:translate-x-0 translate-x-2"
                            transition={{duration: 0.2}}
                        >
                            <ArrowRight className="w-5 h-5 text-coffee-100 dark:text-coffee-800"/>
                        </motion.div>
                    </div>

                    {/* Button glow effect */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-xl transition-opacity duration-300",
                            isHovering ? "opacity-100" : "opacity-0",
                        )}
                        style={{
                            background: "radial-gradient(circle at center, rgba(162, 125, 109, 0.4) 0%, transparent 70%)",
                        }}
                    />
                </motion.button> : <CustomWalletTrigger color={project?.button_color || ''}/>
            }
        </>
    );
};

export default BuyButton
