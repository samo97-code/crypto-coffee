import React, {FC, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button"
import {useWaitForTransactionReceipt} from "wagmi";
import {supabase} from "@/lib/supabase";
import {useAppSelector} from "@/store/hook";
import {getReferralEarnings} from "@/lib/referral-service";
import {useAccount} from "wagmi";
import {IProject} from "@/types";
import {toast} from "sonner";
import ChooseChain from "@/components/re-usable/ChooseChain";
import {CHAIN_CONFIG} from "@/constants";

interface IProps {
    projects: IProject[];
}

const WithdrawButton: FC<IProps> = ({projects}) => {
    const authUser = useAppSelector(state => state.user.user);
    const {address: userAddress, chainId, chain} = useAccount();
    const [totalEarned, setTotalEarned] = useState(0)
    const [hash, setHash] = useState('');
    const [isSending, setIsSending] = useState(false);
    const minWithdrawal = 3

    useEffect(() => {
        fetchUserEarnings()
    }, []);

    const fetchUserEarnings = async () => {
        try {
            const earnings = await getReferralEarnings(authUser.id)
            setTotalEarned(earnings || 0)
        } catch (e) {
            console.log(e, 'e')
        }
    }

    const createWithdrawalRequest = async (): Promise<boolean> => {
        if (totalEarned < minWithdrawal) {
            toast.error(`Minimum withdrawal is $${minWithdrawal}`)
            return false;
        }

        // Get array of chain IDs
        const chainIds = Object.values(CHAIN_CONFIG).map(config => config.chainId);
        if (!chainIds.includes(chainId as number)) {
            toast.error(`Please select one of the suggested chains`)
            return false;
        }

        const {error} = await supabase
            .from("withdrawals")
            .insert({user_id: authUser.id, amount: totalEarned, status: "pending"});

        if (error) {
            console.error("Error creating withdrawal:", error);
            return false;
        }
        return true;
    }

    const withdrawHandler = async () => {
        setIsSending(true)
        try {
            const status = await createWithdrawalRequest()
            if (!status) return

            const response = await fetch('/api/withdraw-usdt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chain: chain?.name,
                    userAddress: userAddress,
                    amount: totalEarned
                }),
            });

            const data = await response.json();

            if (!data.success) {
                toast.error(data.error || 'Something went wrong')
            }

            setHash(data.txHash);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSending(false)
        }
    }

    const {data: receipt, isLoading: isConfirming, error: waitError,} = useWaitForTransactionReceipt({
        hash: hash as `0x${string}`,
        query: {enabled: !!hash},
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(() => {
        if (receipt) {
            if (receipt.status === 'reverted') {
                return toast.error('Transaction was mined but reverted')
            }

            txFinishedSuccessfully()
        }
        if (waitError) {
            toast.error('Something went wrong. Try again later.')
        }
    }, [receipt, waitError]);


    const txFinishedSuccessfully = async () => {
        try {
            await supabase
                .from("referral_earnings")
                .update({amount_earned: 0})
                .eq("referrer_id", authUser.id);

            await supabase
                .from("withdrawals")
                .update({
                    chain: chain?.name,
                    tx_hash: hash,
                    status: "completed",
                    processed_at: new Date()
                })
                .eq("user_id", authUser.id)

            await fetchUserEarnings()
            toast.success('Successfully Withdrawn');
        } catch (e) {
            console.log(e, 'e')
        }
    }

    return (
        <div className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mb-8">
            <h3 className="text-coffee-700 font-medium mb-1">Your Earnings</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-coffee-900">${Math.round(totalEarned * 10000) / 10000}</span>
            </div>
            <p className="text-sm text-coffee-600 mb-4">Minimum withdrawal: $3.00</p>

            {
                totalEarned >= minWithdrawal && <ChooseChain projects={projects} />
            }

            <Button
                onClick={() => withdrawHandler()}
                disabled={totalEarned < minWithdrawal || isSending || isConfirming}
                className="w-full bg-coffee-600 dark:bg-coffee-50/40 hover:bg-coffee-700 dark:hover:bg-coffee-50/60 transition-colors text-white">
                {isSending || isConfirming ? 'Sending...' : 'Withdraw'}
            </Button>
        </div>
    )
};

export default WithdrawButton;
