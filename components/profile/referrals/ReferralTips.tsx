import React from 'react';
import {Coffee} from "lucide-react";

const ReferralTips = () => {
    return (
        <div
            className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mt-8">
            <h3 className="pb-2">
                <div className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-coffee-700"/>
                    <h4 className="text-lg font-semibold text-coffee-800">Referral Tips</h4>
                </div>
            </h3>
            <div>
                <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                        <div
                            className="mt-0.5 h-5 w-5 rounded-full bg-coffee-200 flex items-center justify-center flex-shrink-0 text-coffee-700 dark:text-coffee-100 text-xs font-bold">
                            1
                        </div>
                        <p className="text-coffee-700">
                            Share your link on social media platforms where crypto enthusiasts gather
                        </p>
                    </li>
                    <li className="flex items-start gap-2">
                        <div
                            className="mt-0.5 h-5 w-5 rounded-full bg-coffee-200 flex items-center justify-center flex-shrink-0 text-coffee-700 dark:text-coffee-100 text-xs font-bold">
                            2
                        </div>
                        <p className="text-coffee-700">Explain the benefits of Crypto Coffee to your
                            friends</p>
                    </li>
                    <li className="flex items-start gap-2">
                        <div
                            className="mt-0.5 h-5 w-5 rounded-full bg-coffee-200 flex items-center justify-center flex-shrink-0 text-coffee-700 dark:text-coffee-100 text-xs font-bold">
                            3
                        </div>
                        <p className="text-coffee-700">Create content about your experience with Crypto
                            Coffee</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ReferralTips;
