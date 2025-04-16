import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IState {
    totalAchievements: number;
}

const initialState: IState = {
    totalAchievements: 10
};

const achievementSlice = createSlice({
    name: 'achievement',
    initialState,
    reducers: {
        setTotalAchievements: (state, action: PayloadAction<number>) => {
            state.totalAchievements = action.payload;
        },
    },
});

export const {setTotalAchievements} = achievementSlice.actions;
export default achievementSlice.reducer;
