'use client'

import {useEffect, useState, FC} from "react";
import {useAccount, useWaitForTransactionReceipt, useWriteContract, useSwitchChain} from "wagmi";
import {WriteContractData} from "@wagmi/core/query";
import {parseEther} from "viem";
import {Button} from "@/components/ui/button"
import {Coffee} from "lucide-react"
import {IProject} from "@/types";
import CustomWalletTrigger from "@/components/dashboard/CustomWalletTrigger";


interface IProps {
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

const BuyButton: FC<IProps> = ({ethPrice, project, setShowSuccessModal, setCurrentBuyedCoffee}) => {
    const {isConnected, chainId} = useAccount();
    const {switchChain} = useSwitchChain();

    const [hash, setHash] = useState('');
    const {writeContractAsync, isPending, error} = useWriteContract();

    const actionHandler = async () => {
        if (!isConnected) return connectWallet()

        if (chainId === project.blockchain_networks[0].chain_id) return await coffeeSent()

        switchChain({chainId: project.blockchain_networks[0].chain_id});
    }

    const connectWallet = ()=>{
        console.log(project, 'connectWallet')
    }
    const checkAmount = () => {
        // Real
        // const myEthAmount = 0.045
        // const myMonadAmount = '0.03'

        //For test
        const myEthAmount = 0.0001
        const myMonadAmount = '0.0001'

        let amount = '';

        if (project.blockchain_networks[0].chain_key === 'Eth') amount = (myEthAmount / ethPrice).toFixed(6)
        if (project.blockchain_networks[0].chain_key === 'Mon') amount = myMonadAmount

        return amount
    }


    const coffeeSent = async () => {
        if (!isConnected || !writeContractAsync) {
            console.error('Wallet or writeContractAsync not ready');
            return;
        }

        const amount = checkAmount()
        try {
            const hash = await writeContractAsync({
                address: process.env.NEXT_PUBLIC_BUY_COFFEE_CONTRACT as WriteContractData,
                abi: abi,
                functionName: 'buyCoffee',
                args: [`Coffee on ${project.chain}`],
                value: parseEther(amount),
            });
            setCurrentBuyedCoffee({
                hash: hash,
                name: project.name,
                amount: `${amount} ${project.blockchain_networks[0].chain_key}`,
                explorerUrl: project.blockchain_networks[0].explorer_url
            })
            setShowSuccessModal(true)
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {data: receipt, isLoading: isConfirming} = useWaitForTransactionReceipt({hash});

    useEffect(() => {
        if (receipt) {
            // console.log('Transaction confirmed!', receipt);
            setHash('');
        }
    }, [receipt]);

    useEffect(() => {
        if (error) console.error('useWriteContract error:', error);
    }, [error]);

    return (
        <>
            {
                isConnected ? <Button onClick={() => actionHandler()} disabled={isPending || isConfirming}
                                      className={`min-h-10 w-full text-white ${project.button_color} `}>

                    <Coffee className="h-4 w-4"/>
                    {isPending ? 'Sending...' : `Buy Coffee on ${project.chain}`}
                </Button> : <CustomWalletTrigger color={project?.button_color || ''}/>
            }

        </>
    );
};

export default BuyButton
