import {configureStore} from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import userReducer from './slices/userSlice';
import acheivementReducer from './slices/acheivementSlice';


export const store = configureStore({
    reducer: {
        project: projectReducer,
        user: userReducer,
        acheivement: acheivementReducer,
        // Add more slices here as needed
    },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
