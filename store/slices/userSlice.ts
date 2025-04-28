import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from "@/types";

interface IState{
    user: IUser;
}

const initialState:IState = {
    user: {
        id: '',
        username: '',
        display_name: '',
        email: '',
        bio: '',
        avatar_url: '',
        wallet_address: '',
        timezone: '',
        website_url: '',
        twitter_username: '',
        current_streak_days: 0,
        longest_streak_days: 0,
        total_supported_amount: 0,
        level_id: 1,
        experience_points: 0,
        created_at: '',
        updated_at: '',
        transaction_count: 0,
        referral_code: '',
        discount_percentage: 0,
        activity_discount: 0,
        referred_by: ''
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export const {setAuthUser} = userSlice.actions;
export default userSlice.reducer;
