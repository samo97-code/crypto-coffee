"use client";

import * as React from "react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {type ThemeProviderProps} from "next-themes";

function ThemeProvider({children}: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class" // ✅ adds "dark" to html automatically
                            defaultTheme="light"
                            enableSystem={true}>
            {children}
        </NextThemesProvider>
    );
}

export {ThemeProvider};
