import React from "react";

export interface IChildren {
    children: React.ReactNode
}

export enum GameResult {
    Pending = 0,
    PlayerWin = 1,
    ComputerWin = 2,
    Tie = 3,
}

export interface ICurrentBuyedCoffee {
    hash: string,
}

export interface INetworkCard {
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

export interface IUser {
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
    transaction_count: number;
    discount_percentage : number;
    activity_discount : number;
    referral_code: string;
    referred_by: string;
}

export interface ISupportedProject {
    id: number
    name: string
    description: string
    network: string
    support_amount: string
    transaction_count: number
    icon: string
    badge_bg: string
    badge_color: string
}

export interface IWithdrawals {
    id: string
    user_id: string
    amount: string
    chain: string
    tx_hash: string
    status: string
    requested_at: string
    processed_at: string
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
    map(element: (project: IProject) => React.JSX.Element): never;
    find(param: (item: IProject) => boolean): IProject;
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

export interface ITransaction {
    usd_value: number;
    id: number;
    user_id: string;
    project_id: number;
    network_name: string;
    transaction_hash?: string;
    amount: number;
    type: 'support' | 'activity' | 'claim_reward';
    activity_type: string;
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
    updated_at: string;
    projects?: IProject
}

// Achievement interface
export interface IAchievement {
    id: number;
    name: string;
    description: string;
    icon_name: string;
    icon_bg: string;
    icon_color: string;
    requirement_type: string;
    requirement_value: number;
    xp_reward?: number;
    is_featured: boolean;
    created_at?: string;
    updated_at?: string;
}


export interface IDailyActivity {
    id: number
    type: string
    title: string
    description: string
    icon: string
    icon_bg: string
    icon_color: string
    hash?: string
    amount?: number
    chain_key?: string
    explorer_url?: string
    timestamp: string
    project_id?: number
    project_name?: string
    project_chain?: string
    project_icon?: string
}

export interface IActivity {
    id: number
    type: string
    title: string
    description: string
    icon: string
    icon_bg: string
    icon_color: string
    hash?: string
    amount?: number
    chain_key?: string
    explorer_url?: string
    timestamp: string
    project_id?: number
    project_name?: string
    project_chain?: string
    project_icon?: string
}

export interface IActivityCompletion {
    id: number
    user_id: string
    activity_id: number
    completion_date?: string
    completed_at: string
    activity?: DailyActivity
}

export interface IProfileStates {
    boughtCoffee: number,
    achievementsCount: number,
    totalAchievements: number,
    levelProgress: IUserLevelProgress,
}

export interface ILevelDetail {
    id: number;
    level_number: number;
    name: string;
    requirements: string;
    experience_required: number;
    icon?: string;
}

/**
 * Interface for user level progress
 */
export interface IUserLevelProgress {
    currentLevel: number;
    currentLevelName: string;
    nextLevel: number;
    nextLevelName: string;
    progressPercent: number;
    currentXP: number;
    requiredXP: number;
    allLevels: ILevelDetail[];
    completedLevels: number[];
}


export interface IUserAchievement {
    id: number
    user_id: string
    achievement_id: number
    progress: number
    is_unlocked: boolean
    unlocked_at: string | null
    achievement: IAchievement

    slice(number: number, number2: number): any;

    map(element: (achievement: IUserAchievement, index: number) => React.JSX.Element): any;
}

export interface IUserAchievementsStats {
    userId: string;
    username?: string;
    level: {
        id: number;
        name: string;
        current_xp: number;
        required_xp: number;
        nextLevel_xp: number;
        progress: number;
    };
    achievements: {
        total: number;
        unlocked: number;
        progress: number;
        percent_complete: number;
        recently_unlocked: IUserAchievement[];
    };
}

export interface IBadge {
    id: string
    name: string
    description: string
    icon: string
    bg_color: string
    text_color: string
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

export interface IStreakInfo {
    current_streak: number
    longest_streak: number
    last_activity_date: string | null
    streak_dates: string[]
}

export interface IWalletData {
    id: string;
    wallet_address: string;
    username: string;
    display_name: string;
    total_supported_amount: number;
}

export interface IHistoryTransaction {
    projects: never;
    id: number;
    created_at: string;
    type: string;
    activity_type: string;
    project_name: string;
    icon_url: string;
    network_name: string;
    chain_key: string;
    explorer_url: string;
    amount: number;
    status: string;
    transaction_hash: string;
}

export interface ITransactionStats {
    transaction_count: number;
    networks_used: number;
    most_active_network: string;
}

export interface IPaginationInfo {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface INetwork {
    label: string
    value: string
}

export interface IWalletPageData {
    allNetworks: INetwork[];
    stats: ITransactionStats;
    transactions: IHistoryTransaction[];
    pagination: IPaginationInfo;
}

