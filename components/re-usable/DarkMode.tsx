'use client'

import React from 'react';
import {Moon, Sun} from 'lucide-react';
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {useDispatch} from "react-redux";
import {setPageTheme} from "@/store/slices/projectSlice";

const DarkMode = () => {
    const dispatch = useDispatch();
    const {setTheme, theme} = useTheme();

    const setNewTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
        dispatch(setPageTheme(theme === "light" ? "dark" : "light"))
    }

    return (
        <Button
            className={"rounded-full bg-gradient-to-r from-coffee-100 to-coffee-200 dark:from-coffee-500 dark:to-coffee-700 hover:from-coffee-200 hover:to-coffee-300 dark:hover:from-coffee-600 dark:hover:to-coffee-700 shadow-md transition-colors duration-300"}
            size="icon"
            onClick={() => setNewTheme()}
        >
            <Sun
                className="h-5 w-5 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-coffee-700 dark:text-coffee-100 group-hover:text-coffee-800 transition-colors"/>
            <Moon
                className="absolute h-5 w-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-coffee-700 dark:text-coffee-100 group-hover:text-coffee-800 transition-colors"/>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};

export default DarkMode;
