// hooks/useAdmin.ts
import {useAccount} from 'wagmi';

// Define admin wallet address
const ADMIN_WALLET = '0xCEE870Bd19008D5C3A230C2803c0A94E92803a34'.toLowerCase();

export function useAdmin() {
    const {address} = useAccount();

    // Check if the current address is the admin address
    const isAdmin = address ? address.toLowerCase() === ADMIN_WALLET : false;

    return {isAdmin};
}
