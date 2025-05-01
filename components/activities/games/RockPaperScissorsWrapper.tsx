'use client'

import React, {FC, useState} from 'react';
import {motion} from "framer-motion";
import {AlertCircle, Coffee, Hand, Trophy, Zap, FileText, Scissors} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {cn} from "@/utils/utils";
import {Progress} from "@/components/ui/progress";
import GameHeader from "@/components/activities/games/rock-paper-scissors/GameHeader";
import ChooseChain from "@/components/re-usable/ChooseChain";
import GameRules from "@/components/activities/games/rock-paper-scissors/GameRules";
import {IProject} from "@/types";
import CreativeGameButton from "@/components/activities/games/rock-paper-scissors/CreateGameButton";
import {toast} from "sonner";
import {CHAIN_CONFIG} from "@/constants";
import {useAccount} from "wagmi";

// Bet amount options
const betAmounts = [
    {value: 0.045, label: "$0.045"},
    {value: 0.1, label: "$0.1"},
    {value: 0.5, label: "$0.5"},
    {value: 1, label: "$1"},
    {value: 2, label: "$2"},
]

// Game choices
const choices = [
    {id: "rock", name: "Rock", icon: Hand, beats: "scissors"},
    {id: "paper", name: "Paper", icon: FileText, beats: "rock"},
    {id: "scissors", name: "Scissors", icon: Scissors, beats: "paper"},
]

interface IProps {
    projects: IProject[]
}


const RockPaperScissorsWrapper: FC<IProps> = ({projects}) => {
    const {address: userAddress, chainId, chain} = useAccount();

    // Game state
    const [selectedBet, setSelectedBet] = useState(betAmounts[0])
    const [userChoice, setUserChoice] = useState<string | null>(null)
    const [opponentChoice, setOpponentChoice] = useState<string | null>(null)
    const [roundResult, setRoundResult] = useState<"win" | "lose" | "draw" | null>(null)
    const [currentRound, setCurrentRound] = useState(1)
    const [scores, setScores] = useState({user: 0, opponent: 0})
    const [gameStatus, setGameStatus] = useState<'waiting' | "choosing" | "revealing" | "roundEnd" | "gameEnd">("waiting")
    const [gameResult, setGameResult] = useState<"win" | "lose" | "draw" | null>(null)
    const [xpEarned, setXpEarned] = useState(0)
    const [streakBonus, setStreakBonus] = useState(0)

    const startGame = () => {
        if (!Object.keys(selectedBet).length) {
            return toast.error(`Please select bet amount`)
        }

        if (chain?.testnet) {
            return toast.error(`Ready to play? Please make sure you've selected chains on Mainnet to continue.`)
        }

        setGameStatus('choosing')
    }

    // Handle user choice
    const handleChoiceSelect = (choice: string) => {
        if (gameStatus !== "choosing") return

        setUserChoice(choice)
        const randomChoice = choices[Math.floor(Math.random() * choices.length)].id
        setOpponentChoice(randomChoice)
        setGameStatus("revealing")

        // Reveal after a short delay
        setTimeout(() => {
            determineRoundWinner(choice, randomChoice)
        }, 1500)
    }

    // Determine round winner
    const determineRoundWinner = (userChoice: string, opponentChoice: string) => {
        let result: "win" | "lose" | "draw" = "draw"

        if (userChoice === opponentChoice) {
            result = "draw"
        } else {
            const userChoiceObj = choices.find((c) => c.id === userChoice)
            result = userChoiceObj?.beats === opponentChoice ? "win" : "lose"
        }

        setRoundResult(result)
        setScores((prev) => ({
            user: prev.user + (result === "win" ? 1 : 0),
            opponent: prev.opponent + (result === "lose" ? 1 : 0),
        }))

        setGameStatus("roundEnd")
    }

    // Start next round
    const handleNextRound = () => {
        if (currentRound >= 3 || Math.max(scores.user, scores.opponent) >= 2) {
            // Game over
            const finalResult = scores.user > scores.opponent ? "win" : scores.user < scores.opponent ? "lose" : "draw"
            setGameResult(finalResult)
            setGameStatus("gameEnd")

            if (finalResult === "win") {
                // Calculate rewards
                setXpEarned(25)
                setStreakBonus(5)
            }
        } else {
            // Next round
            setCurrentRound((prev) => prev + 1)
            setUserChoice(null)
            setOpponentChoice(null)
            setRoundResult(null)
            setGameStatus("choosing")
        }
    }

    // Reset game
    const resetGame = () => {
        setCurrentRound(1)
        setUserChoice(null)
        setOpponentChoice(null)
        setRoundResult(null)
        setScores({user: 0, opponent: 0})
        setGameStatus("waiting")
        setGameResult(null)
        setXpEarned(0)
        setStreakBonus(0)
    }

    // Get choice icon
    const getChoiceIcon = (choiceId: string | null) => {
        if (!choiceId) return null
        const choice = choices.find((c) => c.id === choiceId)
        return choice ? <choice.icon className="h-12 w-12"/> : null
    }

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-6">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="relative"
                >
                    <GameHeader title={"Rock Paper Scissors"} type={'rock-paper-scissors'}/>

                    <div
                        className="bg-card rounded-xl p-6 shadow-md border border-coffee-200 dark:border-coffee-600/50 mt-8">
                        <div className="pb-2 relative mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-coffee-900 flex items-center gap-2">
                                        Rock Paper Scissors
                                    </h2>
                                    <p className="text-coffee-600 mt-1">
                                        Challenge the blockchain to a game of Rock Paper Scissors and win rewards!
                                    </p>
                                </div>
                                <Badge variant="outline"
                                       className="bg-coffee-100 text-coffee-800 border-coffee-300 px-3 py-1.5">
                                    <Trophy className="h-4 w-4 mr-1"/> Daily Activity
                                </Badge>
                            </div>
                        </div>

                        <div className="">
                            {/* Game setup section */}
                            <div
                                className="mb-6 bg-coffee-100/50 p-4 rounded-lg border border-coffee-200 dark:border-coffee-600/50">
                                <h3 className="text-coffee-800 font-medium mb-3">Game Setup</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Bet amount selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-coffee-700 mb-2">Bet
                                            Amount</label>
                                        <div className="flex flex-wrap gap-2">
                                            {betAmounts.map((amount) => (
                                                <div
                                                    key={amount.value}
                                                    className={cn(
                                                        "flex items-center gap-1 cursor-pointer border border-coffee-200 dark:border-coffee-600/50 rounded-md px-4 py-2",
                                                        selectedBet.value === amount.value
                                                            ? "bg-coffee-800 dark:bg-coffee-50/50 text-white"
                                                            : "bg-white dark:bg-coffee-100/50 hover:bg-coffee-100 dark:hover:bg-coffee-50/40",
                                                    )}
                                                    onClick={() => setSelectedBet(amount)}
                                                >
                                                    <span className="text-sm ">{amount.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Game board */}
                            <div
                                className="bg-gradient-to-b from-coffee-100/50 to-coffee-200/30 rounded-lg border border-coffee-200 dark:border-coffee-600/50 p-4 mb-6">
                                {/* Round indicator */}
                                {
                                    gameStatus !== 'waiting' && <div className="flex justify-between items-center mb-4">
                                      <div className="flex items-center gap-2">
                                        <span className="text-coffee-800 font-medium">Round {currentRound}/3</span>
                                        <Progress value={(currentRound / 3) * 100} className="w-24 h-2 bg-coffee-200"/>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <span className="text-coffee-800 font-medium">Score:</span>
                                        <span className="text-coffee-900 font-bold">{scores.user}</span>
                                        <span className="text-coffee-600">-</span>
                                        <span className="text-coffee-900 font-bold">{scores.opponent}</span>
                                      </div>
                                    </div>
                                }


                                {/* Game area */}
                                <div className="grid grid-cols-3 gap-4">
                                    {/* User side */}
                                    <div className="col-span-1">
                                        <div className="text-center mb-2">
                                            <Badge className="bg-coffee-700 hover:bg-coffee-700">Your Choice</Badge>
                                        </div>
                                        <div
                                            className="bg-white dark:bg-coffee-100/50 rounded-lg border border-coffee-300 p-4 h-40 flex flex-col items-center justify-center">
                                            {userChoice ? (
                                                <motion.div initial={{scale: 0}} animate={{scale: 1}}
                                                            className="text-coffee-800">
                                                    {getChoiceIcon(userChoice)}
                                                    <p className="mt-2 font-medium">{userChoice.charAt(0).toUpperCase() + userChoice.slice(1)}</p>
                                                </motion.div>
                                            ) : (
                                                <div className="text-coffee-500 text-center">
                                                    <AlertCircle className="h-8 w-8 mx-auto mb-2"/>
                                                    <p>Make your choice below</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Middle section - VS */}
                                    <div className="col-span-1 flex flex-col items-center justify-center">
                                        <div
                                            className="relative w-16 h-16 rounded-full bg-coffee-100 border-2 border-coffee-300 flex items-center justify-center">
                                            <span className="text-coffee-800 font-bold text-lg">VS</span>
                                        </div>

                                        {/* Round result */}
                                        {roundResult && (
                                            <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}
                                                        className="mt-4">
                                                <Badge
                                                    className={cn(
                                                        "text-white px-3 py-1",
                                                        roundResult === "win"
                                                            ? "bg-green-500"
                                                            : roundResult === "lose"
                                                                ? "bg-red-500"
                                                                : "bg-amber-500",
                                                    )}
                                                >
                                                    {roundResult === "win" ? "You Win!" : roundResult === "lose" ? "You Lose!" : "Draw!"}
                                                </Badge>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Opponent side */}
                                    <div className="col-span-1">
                                        <div className="text-center mb-2">
                                            <Badge className="bg-coffee-500 hover:bg-coffee-500">Opponent</Badge>
                                        </div>
                                        <div
                                            className="bg-white dark:bg-coffee-100/50 rounded-lg border border-coffee-300 p-4 h-40 flex flex-col items-center justify-center">
                                            {gameStatus === "revealing" || gameStatus === "roundEnd" || gameStatus === "gameEnd" ? (
                                                <motion.div
                                                    initial={{scale: 0, rotateY: 180}}
                                                    animate={{scale: 1, rotateY: 0}}
                                                    transition={{delay: 0.5}}
                                                    className="text-coffee-800"
                                                >
                                                    {getChoiceIcon(opponentChoice)}
                                                    <p className="mt-2 font-medium">
                                                        {opponentChoice?.charAt(0).toUpperCase() + opponentChoice?.slice(1)}
                                                    </p>
                                                </motion.div>
                                            ) : (
                                                <div className="text-coffee-500 text-center">
                                                    <Coffee className="h-8 w-8 mx-auto mb-2"/>
                                                    <p>Waiting...</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>


                                {/* Start game */}
                                {gameStatus === 'waiting' && (
                                    <div className="mt-6">
                                        <div className="flex justify-center">
                                            <CreativeGameButton startNewGame={startGame}/>
                                        </div>
                                    </div>
                                )
                                }

                                {/* Choice selection */}
                                {gameStatus === "choosing" && (
                                    <div className="mt-6">
                                        <h3 className="text-coffee-800 font-medium mb-3 text-center">Make Your
                                            Choice</h3>
                                        <div className="flex justify-center gap-4">
                                            {choices.map((choice) => (
                                                <motion.button
                                                    key={choice.id}
                                                    whileHover={{scale: 1.05}}
                                                    whileTap={{scale: 0.95}}
                                                    className={cn(
                                                        "bg-white dark:bg-coffee-100/50 rounded-lg border-2 border-coffee-300 p-4 w-24 h-24",
                                                        "flex flex-col items-center justify-center transition-all",
                                                        "hover:border-coffee-500 hover:shadow-md",
                                                    )}
                                                    onClick={() => handleChoiceSelect(choice.id)}
                                                >
                                                    <choice.icon className="h-10 w-10 text-coffee-700 mb-2"/>
                                                    <span className="text-coffee-800 font-medium">{choice.name}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Round end actions */}
                                {gameStatus === "roundEnd" && (
                                    <div className="mt-6 text-center">
                                        <Button className="bg-coffee-700 hover:bg-coffee-800" onClick={handleNextRound}>
                                            {currentRound >= 3 || Math.max(scores.user, scores.opponent) >= 2
                                                ? "See Final Result"
                                                : "Next Round"}
                                        </Button>
                                    </div>
                                )}

                                {/* Game end result */}
                                {gameStatus === "gameEnd" && (
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        className="mt-6 bg-white dark:bg-coffee-100/50 rounded-lg border border-coffee-300 p-6 text-center"
                                    >
                                        <h3
                                            className={cn(
                                                "text-xl font-bold mb-2",
                                                gameResult === "win"
                                                    ? "text-green-600 dark:text-green-500"
                                                    : gameResult === "lose"
                                                        ? "text-red-600 dark:text-red-500"
                                                        : "text-amber-600 dark:text-amber-500",
                                            )}
                                        >
                                            {gameResult === "win"
                                                ? "Congratulations! You Won!"
                                                : gameResult === "lose"
                                                    ? "Better Luck Next Time!"
                                                    : "It's a Draw!"}
                                        </h3>

                                        <p className="text-coffee-700 mb-4 font-medium">
                                            Final Score: {scores.user} - {scores.opponent}
                                        </p>

                                        {gameResult === "win" && (
                                            <div className="bg-coffee-100 rounded-lg p-4 mb-4">
                                                <h4 className="font-medium text-coffee-800 mb-2">Rewards Earned:</h4>
                                                <div className="flex justify-center gap-4">
                                                    <div className="flex items-center">
                                                        <Zap className="h-5 w-5 text-amber-500 mr-1"/>
                                                        <span
                                                            className="text-coffee-800 font-medium">{xpEarned} XP</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Trophy className="h-5 w-5 text-coffee-600 mr-1"/>
                                                        <span
                                                            className="text-coffee-800 font-medium">+{streakBonus} Streak Bonus</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <Button className="bg-coffee-700 hover:bg-coffee-800" onClick={resetGame}>
                                            Play Again
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Game rules */}
                    <GameRules/>
                </motion.div>
            </div>
        </div>
    )
};

export default RockPaperScissorsWrapper;
