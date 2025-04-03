"use client"

import React, {FC, useState, useEffect} from "react"
import {Check, Copy, ExternalLink, Coffee, Sparkles} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import confetti from "canvas-confetti"

interface IProps {
    isOpen: boolean
    onClose: () => void
    projectName: string
    amount: string
    txHash: string
    explorerUrl: string
}

const CoffeeSuccessModal: FC<IProps> = ({isOpen, onClose, projectName, amount, txHash, explorerUrl}) => {
    const [isCopied, setIsCopied] = useState(false)

    // Trigger confetti when modal opens
    useEffect(() => {
        if (isOpen) {
            const duration = 2 * 1000
            const animationEnd = Date.now() + duration
            const colors = ["#8B4513", "#A27D6D", "#E6D5C7"]

            const randomInRange = (min: number, max: number) => {
                return Math.random() * (max - min) + min
            }

            const confettiAnimation = () => {
                const timeLeft = animationEnd - Date.now()

                if (timeLeft <= 0) return

                const particleCount = 50 * (timeLeft / duration)

                // Since they are falling down, start a bit higher than random
                confetti({
                    particleCount,
                    origin: {x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.4)},
                    colors,
                    shapes: ["circle", "square"],
                    gravity: 0.8,
                    scalar: 1.5,
                    disableForReducedMotion: true,
                })

                requestAnimationFrame(confettiAnimation)
            }

            requestAnimationFrame(confettiAnimation)
        }
    }, [isOpen])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(txHash)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const shortenTxHash = (hash: string) => {
        return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <Check className="h-8 w-8 text-green-600"/>
                    </div>
                    <DialogTitle className="text-center text-xl">Successful!</DialogTitle>
                    <DialogDescription className="text-center">
                        Thank you for supporting {projectName} with your daily coffee!
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 bg-coffee-100/50 rounded-lg border border-coffee-200 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Coffee className="h-5 w-5 text-amber-900"/>
                            <span className="font-medium text-amber-900">Coffee Bought</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-none">Completed</Badge>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-coffee-700">Amount:</span>
                            <span className="font-medium text-amber-900">{amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-coffee-700">Project:</span>
                            <span className="font-medium text-amber-900">{projectName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-coffee-700">Time:</span>
                            <span className="font-medium text-amber-900">{new Date().toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-coffee-100 rounded-full">
                            <Sparkles className="h-4 w-4 text-amber-700"/>
                        </div>
                        <span className="text-amber-900 font-medium">Transaction Details</span>
                    </div>

                    <div
                        className="flex items-center justify-between p-3 bg-gray-100 rounded-md border border-coffee-300">
                        <div className="text-sm text-gray-600 truncate">{shortenTxHash(txHash)}</div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={copyToClipboard}>
                                {isCopied ? <Check className="h-4 w-4 text-green-600"/> :
                                    <Copy className="h-4 w-4 text-coffee-700"/>}
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 w-full border-coffee-200 hover:bg-coffee-200"
                        onClick={() => window.open(explorerUrl, "_blank")}
                    >
                        <ExternalLink className="mr-2 h-4 w-4"/>
                        View on Explorer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CoffeeSuccessModal

