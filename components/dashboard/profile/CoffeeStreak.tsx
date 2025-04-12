import React from 'react';
import {Coffee, Sparkles} from "lucide-react";

const CoffeeStreak = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-coffee-200">
            <h3 className="font-semibold text-coffee-900 mb-4 flex items-center">
                <Coffee className="h-5 w-5 mr-2"/>
                Coffee Streak
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
                {Array.from({length: 14}).map((_, i) => (
                    <div
                        key={i}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            i < 10
                                ? "bg-gradient-to-br from-coffee-500 to-coffee-700 text-white"
                                : "bg-coffee-100 text-coffee-300"
                        }`}
                    >
                        {i < 10 ? <Coffee className="h-5 w-5"/> :
                            <span className="text-lg font-medium">{i + 1}</span>}
                    </div>
                ))}
            </div>

            <div className="bg-coffee-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-coffee-100 rounded-full">
                        <Sparkles className="h-5 w-5 text-coffee-700"/>
                    </div>
                    <div>
                        <div className="font-medium text-coffee-900">10-Day Streak Bonus!</div>
                        <p className="text-sm text-coffee-700">
                            You&#39;ve supported projects for 10 days in a row. Keep it up to earn
                            special rewards!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStreak;
