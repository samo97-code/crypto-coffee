import React, {FC} from 'react';
import {Users} from "lucide-react";
import {Progress} from "@/components/ui/progress";

interface IProps {
    referralsCount: number
}

const ReferralMilestones:FC<IProps> = ({referralsCount}) => {
    const milestones = [
        {required: 3, rewardXp: 250, bonus: ""},
        {required: 5, rewardXp: 500, bonus: ""},
        {required: 10, rewardXp: 750, bonus: ""},
        {required: 20, rewardXp: 1000, bonus: "+3% cheaper tx"},
        {required: 30, rewardXp: 1500, bonus: "+5% cheaper tx"}
    ];

    const getReferralMilestoneProgress = (totalReferrals: number) => {
        // Find the next milestone to achieve
        const nextMilestone = milestones.find(milestone => totalReferrals < milestone.required);

        // If user passed all milestones
        if (!nextMilestone) {
            return {
                nextRequired: 3,
                progressPercent: 100,
                milestoneReached: true
            };
        }

        const previousMilestone = milestones
            .slice()
            .reverse()
            .find(milestone => totalReferrals >= milestone.required) || {required: 0};

        const referralsSinceLast = totalReferrals - previousMilestone.required;
        const referralsNeeded = nextMilestone.required - previousMilestone.required;
        const progressPercent = Math.min(100, (referralsSinceLast / referralsNeeded) * 100);

        return {
            nextRequired: nextMilestone.required,
            progressPercent,
            milestoneReached: false
        };
    }

    const { nextRequired, progressPercent, milestoneReached } = getReferralMilestoneProgress(referralsCount);

    return (
        <div
            className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50">
            <h3 className="pb-2">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-coffee-700"/>
                    <h4 className="text-lg font-semibold text-coffee-800">Referral
                        Milestones</h4>
                </div>
            </h3>
            {/*console.log(nextRequired);    // 10*/}
            {/*console.log(progressPercent); // 40% toward 10 referrals*/}
            {/*console.log(milestoneReached); // false*/}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-coffee-700 font-medium">{referralsCount} / {nextRequired} friends referred</span>
                    <span className="text-xs text-coffee-500">{progressPercent.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercent} className="h-2 mb-6"/>

                <ul className="space-y-4">
                    {
                        milestones.map((milestone, index) => {
                            return <li key={index} className="flex items-start gap-2">
                                <div
                                    className={`${milestone.required < nextRequired ? 'border-green-500' : 'border-coffee-300'} mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0`}>
                                    <div className={`${milestone.required < nextRequired ? 'bg-green-500' : 'bg-coffee-300'} h-2 w-2 rounded-full`}></div>
                                </div>
                                <div>
                                    <p className="font-medium text-coffee-800">Bring {milestone.required} friends</p>
                                    <p className="text-sm text-coffee-600">Receive {milestone.rewardXp} XP</p>
                                    {milestone.bonus &&
                                        <p className="text-sm text-coffee-600">{milestone.bonus}</p>}
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default ReferralMilestones;
