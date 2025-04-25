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

function isObject(value: any) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function camelToSnake(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(camelToSnake);
    }

    if (!isObject(obj)) return obj;

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`),
            camelToSnake(value),
        ])
    );
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
};

