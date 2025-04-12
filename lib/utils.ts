import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortenAddress = (address: `0x${string}` | undefined, chars = 4) => {
  return `${address?.substring(0, chars + 2)}...${address?.substring(address.length - chars)}`;
}
