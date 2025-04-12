import { configureStore } from '@reduxjs/toolkit';
import coffeeReducer from './slices/coffeeSlice';

export const store = configureStore({
    reducer: {
        coffee: coffeeReducer,
        // Add more slices here as needed
    },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
