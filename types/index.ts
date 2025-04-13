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

// types/db.ts

export interface User {
    id: string;
    username?: string;
    display_name?: string;
    email?: string;
    bio?: string;
    avatar_url?: string;
    wallet_address: string;
    timezone?: string;
    website_url?: string;
    twitter_username?: string;
    current_streak_days: number;
    longest_streak_days: number;
    total_supported_amount: number;
    level_id?: number;
    experience_points: number;
    created_at: string;
    updated_at: string;
}

export interface IProject {
    id: number;
    name: string;
    chain: string;
    network_name: string;
    icon_url?: string;
    description?: string;
    status: string;
    button_text?: string;
    button_color?: string;
    is_new: boolean;
    is_featured: boolean;
    total_supporters: number;
    total_support_amount: number;
    created_at: string;
    updated_at: string;
    blockchain_networks: BlockchainNetwork[]
    filter(param: (item: IProject) => boolean): IProject;
    map(element: (project: IProject) => React.JSX.Element): any;
}

export interface BlockchainNetwork {
    id: number;
    project_id: number;
    chain_key: string;
    chain_id: number;
    explorer_url: string;
    type: 'mainnet' | 'testnet';
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    user_id: string;
    project_id: number;
    network_name: string;
    transaction_hash?: string;
    amount: number;
    type: 'support' | 'reward';
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
    updated_at: string;
}

export interface Achievement {
    id: number;
    name: string;
    description: string;
    icon_name: string;
    icon_bg: string;
    icon_color: string;
    requirement_type: string;
    requirement_value: number;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserAchievement {
    id: number;
    user_id: string;
    achievement_id: number;
    progress: number;
    is_unlocked: boolean;
    unlocked_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Level {
    id: number;
    level_number: number;
    name: string;
    requirements: string;
    experience_required: number;
    created_at: string;
    updated_at: string;
}

export interface LevelReward {
    id: number;
    level_id: number;
    reward_description: string;
    created_at: string;
    updated_at: string;
}

export interface DailyActivity {
    id: number;
    name: string;
    description: string;
    icon_name: string;
    icon_bg: string;
    icon_color: string;
    fee: number;
    reward: string;
    category: 'games' | 'fun' | 'rewards';
    action_text: string;
    completed_text: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ActivityCompletion {
    id: number;
    user_id: string;
    activity_id: number;
    completion_date: string;
    completed_at: string;
}

export interface CoffeeBrew {
    id: number;
    user_id: string;
    name: string;
    apy: string;
    duration: string;
    beans_staked: number;
    progress: number;
    start_time: string;
    end_time?: string;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserStreak {
    id: number;
    user_id: string;
    streak_date: string;
    created_at: string;
}

