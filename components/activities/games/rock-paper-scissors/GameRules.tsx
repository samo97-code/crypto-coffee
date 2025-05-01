import React from 'react';

const GameRules = () => {
    return (
        <div className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mt-8">
            <h3 className="text-coffee-800 font-medium mb-2">Game Rules</h3>
            <ul className="text-coffee-700 text-sm space-y-1 list-disc pl-5">
                <li>Select your chain and bet amount</li>
                <li>Choose rock, paper, or scissors each round</li>
                <li>Rock beats scissors, scissors beats paper, paper beats rock</li>
                <li>Best of 3 rounds wins</li>
                <li>Win to earn XP and USDT</li>
                <li>Please dont refresh page when you start game</li>
            </ul>
        </div>
    );
};

export default GameRules;
