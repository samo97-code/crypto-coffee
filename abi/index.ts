export const RPS_CONTRACT_ABI = [
    {
        inputs: [],
        name: 'startGame',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'gameId', type: 'uint256' },
            { internalType: 'uint8', name: 'result', type: 'uint8' },
        ],
        name: 'playerSubmitResult',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'gameId', type: 'uint256' }],
        name: 'claimReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'gameId', type: 'uint256' },
            { indexed: true, internalType: 'address', name: 'player', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'betAmount', type: 'uint256' }
        ],
        name: 'GameCreated',
        type: 'event'
    }
]
