import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {avatars} from "@/constants";
import {
    Award,
    Coffee,
    Droplets,
    Zap,
    Globe,
    Calendar,
    Share,
    Brain,
    Trophy,
    Banknote,
    BookOpenCheck,
    Bot,
    Bolt,
    Flame,
    Gem,
    Sparkles,
    TicketCheck,
    BookCheck,
    Laugh,
    Grid3x3,
    Grid2x2,
    Gamepad,
    Hand,
    HandMetal
} from "lucide-react";
import React from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const shortenAddress = (address: `0x${string}` | undefined, chars = 4) => {
    return `${address?.substring(0, chars + 2)}...${address?.substring(address.length - chars)}`;
}

export const randomAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 13) + 1;
    const findAvatar = avatars.find((item) => item.id === randomNumber)
    return findAvatar?.path
}

export const randomRefCode = (length = 8): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const shortAddress = (address: string) => {
    return `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`
}


function isObject(value: any) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function convertKeysToSnake<T>(obj: T): any {
    if (Array.isArray(obj)) {
        return obj.map(convertKeysToSnake);
    }
    if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj as Record<string, any>).map(([key, value]) => [
                camelToSnake(key),
                convertKeysToSnake(value),
            ])
        );
    }
    // primitives (string, number, boolean, null, etc.)
    return obj;
}

export function camelToSnake(str: string): string {
    return str
        .replace(/([A-Z])/g, "_$1")  // prepend an underscore before each uppercase letter
        .toLowerCase();
}

export function snakeToCamel(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamel);
    }

    if (!isObject(obj)) return obj;

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
            snakeToCamel(value),
        ])
    );
}

export const formatDateTime = (input: string): string => {
    const date = new Date(input);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    return date.toLocaleString('en-US', options).replace(',', '');
}


export const achievementIconMap: Record<string, React.ElementType> = {
    Award,
    Coffee,
    Droplets,
    Zap,
    Globe,
    Calendar,
    Share,
    Brain,
    Trophy,
    Banknote,
    BookOpenCheck,
    Bot,
    Bolt,
    Flame,
    Gem,
    Sparkles,
    TicketCheck,
    BookCheck,
    Laugh,
    Grid3x3,
    Grid2x2,
    Gamepad,
    Hand,
    HandMetal
};

