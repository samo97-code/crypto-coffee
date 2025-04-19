import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProject} from "@/types";


const initialState = {
    searchedProject: '',
    projects: [],
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.projects = action.payload as IProject[];
        },
        setSearchedProject: (state, action: PayloadAction<string>) => {
            state.searchedProject = action.payload;
        },
    },
});

export const {setProjects, setSearchedProject} = projectSlice.actions;
export default projectSlice.reducer;
