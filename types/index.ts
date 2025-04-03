import React from "react";

export interface IChildren {
    children: React.ReactNode
}

export interface ICurrentBuyedCoffee {
    hash: string,
}

export interface INetworkCard{
    name: string
    chain: string
    chainKey: string
    chainId: number
    icon: string
    isNew?: boolean
    type: string
    status: string
    buttonText: string
    buttonColor: string
    description?: string
    explorerUrl: string
}
