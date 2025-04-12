import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
    walletAddress: string | null;
    coffeeChainsUsed: number[]; // chain IDs
};

const initialState: UserState = {
    walletAddress: null,
    coffeeChainsUsed: [],
};

const userSlice = createSlice({
    name: 'coffee',
    initialState,
    reducers: {
        setWalletAddress: (state, action: PayloadAction<string>) => {
            state.walletAddress = action.payload;
        },
        setCoffeeChainsUsed: (state, action: PayloadAction<number[]>) => {
            state.coffeeChainsUsed = action.payload;
        },
    },
});

export const { setWalletAddress, setCoffeeChainsUsed } = userSlice.actions;
export default userSlice.reducer;
