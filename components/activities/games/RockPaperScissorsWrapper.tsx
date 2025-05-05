'use client'

import React, {FC, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {AlertCircle, Coffee, Hand, Trophy, Zap, FileText, Scissors} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {cn} from "@/utils/utils";
import {Progress} from "@/components/ui/progress";
import GameHeader from "@/components/activities/games/rock-paper-scissors/GameHeader";
import ChooseChain from "@/components/re-usable/ChooseChain";
import GameRules from "@/components/activities/games/rock-paper-scissors/GameRules";
import {IProject, GameResult} from "@/types";
import CreativeGameButton from "@/components/activities/games/rock-paper-scissors/CreateGameButton";
import {toast} from "sonner";
import {useAccount} from "wagmi";
import useRockPaperScissorsContract from "@/hooks/useRockPaperScissorsContract";
import {CHAIN_CONFIG, betAmounts, gameTxXp} from "@/constants";
import CircleLoader from "@/components/re-usable/CircleLoader";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";
import {createActivityTransaction} from "@/lib/transaction-service";
import {useAppSelector} from "@/store/hook";
import {addXpForTransaction, checkAndUpdateAchievements} from "@/lib/acheivements-service";


// Game choices
const choices = [
    {id: "rock", name: "Rock", icon: Hand, beats: "scissors"},
    {id: "paper", name: "Paper", icon: FileText, beats: "rock"},
    {id: "scissors", name: "Scissors", icon: Scissors, beats: "paper"},
]

interface IProps {
    projects: IProject[]
}


type GameType = 'waiting' | "choosing" | "revealing" | "roundEnd" | "gameEnd";
type GameResults = "win" | "lose" | "draw" | null;

const RockPaperScissorsWrapper: FC<IProps> = ({projects}) => {
    const authUser = useAppSelector(state => state.user.user);
    const {address: userAddress, chainId, chain, isConnected} = useAccount();

    // Game state
    const [gameStatus, setGameStatus] = useState<GameType>("waiting")
    const [selectedBet, setSelectedBet] = useState(betAmounts[0])
    const [userChoice, setUserChoice] = useState<string | null>(null)
    const [opponentChoice, setOpponentChoice] = useState<string | null>(null)
    const [roundResult, setRoundResult] = useState<GameResults>(null)
    const [currentRound, setCurrentRound] = useState(1)
    const [scores, setScores] = useState({user: 0, opponent: 0})
    const [gameResult, setGameResult] = useState<GameResults>(null)
    const [xpEarned, setXpEarned] = useState(0)

    const {
        txTempData,
        isClaimed,
        isPendingTransaction,
        isLoading,
        claimableAmount,
        handleStartGame,
        handleClaimReward,
        submitGameOutcome,
        resetContractState,
    } = useRockPaperScissorsContract(setGameStatus, projects)


    useEffect(() => {
        if (isClaimed) {
            createClaimTransactionHandler()
            resetGame()
        }
    }, [isClaimed])

    const createClaimTransactionHandler = async () => {
        try {
            const usdValue = gameResult === 'win' ? txTempData.usd_value * 2 : txTempData.usd_value
            const amount = gameResult === 'win' ? +txTempData.amount * 2 : txTempData.amount
            const projectId = projects.find((item) => item.blockchain_networks[0].chain_id === chainId)?.id

            await createActivityTransaction(authUser.id, projectId, txTempData.networkName, txTempData.hash || '', amount.toString(), usdValue, 'claim_reward', 'Claim Rewards', 'completed')

            if (gameResult === 'win') {
                addXpForTransaction(authUser, gameTxXp)

                // Trigger achievements
                await checkAndUpdateAchievements(authUser.id, [
                    {type: 'rps_3_wins', value: 1},
                    {type: 'rps_10_wins', value: 1},
                ]);
            }

        } catch (error: unknown) {
            console.log(error, 'error')
            console.error(error, 'error')
        }
    }

    const startGame = async () => {
        // Get array of chain IDs
        const chainIds = Object.values(CHAIN_CONFIG).map(config => config.chainId);
        if (!chainIds.includes(chainId as number)) {
            toast.error(`Please select one of the suggested chains`)
            return false;
        }

        if (!selectedBet) return toast.error('Please select a bet amount')
        if (!userAddress) return toast.error('Connect your wallet first')

        await handleStartGame(selectedBet.value)
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
        let result: GameResults

        if (userChoice === opponentChoice) {
            result = "draw"
        } else {
            const userChoiceObj = choices.find((c) => c.id === userChoice)
            result = userChoiceObj?.beats === opponentChoice ? "win" : "lose"
        }

        // const result = 'win'
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

            if (finalResult === "win") {
                setXpEarned(15)
            }

            let contractResult: GameResult;
            if (finalResult === "win") {
                contractResult = GameResult.PlayerWin;
            } else if (finalResult === "lose") {
                contractResult = GameResult.ComputerWin;
            } else {
                contractResult = GameResult.Tie;
            }

            submitGameOutcome(contractResult);
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
        resetContractState()
    }

    // Get choice icon
    const getChoiceIcon = (choiceId: string | null) => {
        if (!choiceId) return null
        const choice = choices.find((c) => c.id === choiceId)
        return choice ? <choice.icon className="h-12 w-12"/> : null
    }

    if (!isConnected) return <CoffeeLoader/>

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
                                    <ChooseChain projects={projects} isGame={true}/>

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
                                <div className="flex flex-col sm:grid grid-cols-3 gap-4">
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
                                                        {opponentChoice ? opponentChoice?.charAt(0).toUpperCase() + opponentChoice?.slice(1) : ''}
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
                                            <CreativeGameButton startNewGame={startGame} isLoading={isLoading}/>
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
                                        <Button className="bg-coffee-700 hover:bg-coffee-800" onClick={handleNextRound}
                                                disabled={isLoading}>
                                            {isLoading && (currentRound >= 3 || Math.max(scores.user, scores.opponent) >= 2) ?
                                                <CircleLoader/> : ''}

                                            {currentRound >= 3 || Math.max(scores.user, scores.opponent) >= 2
                                                ? isLoading ? "Loading Results..." : "See Final Result"
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

                                        {(gameResult === "win" || gameResult === "draw") && (
                                            <div className="bg-coffee-100 rounded-lg p-4 mb-4">
                                                <h4 className="font-medium text-coffee-800 mb-2">Rewards Earned:</h4>
                                                <div className="flex justify-center gap-4">
                                                    <div className="flex items-center">
                                                        <Zap className="h-5 w-5 text-amber-500 mr-1"/>
                                                        <span
                                                            className="text-coffee-800 font-medium">{xpEarned} XP</span>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <Button
                                                        onClick={handleClaimReward}
                                                        disabled={!chain || isPendingTransaction}
                                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <svg
                                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12"
                                                                            r="10" stroke="currentColor"
                                                                            strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor"
                                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Claiming...
                                                            </>
                                                        ) : (
                                                            <>
                                                                {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                                                                {/*@ts-ignore*/}
                                                                Claim {gameResult === "win" ? 2 * claimableAmount : claimableAmount} USDT
                                                            </>
                                                        )}
                                                    </Button>
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
