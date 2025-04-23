'use client'

import React, {FC} from 'react';
import {RainbowKitProvider, darkTheme, lightTheme,} from '@rainbow-me/rainbowkit';
import {useTheme} from "next-themes";
import {IChildren} from "@/types";

const RainbowKit: FC<IChildren> = ({children}) => {
    const {theme} = useTheme();

    const light = lightTheme({
        borderRadius: 'medium',
    });


    const dark = darkTheme({
        accentColor: '#3d2d26',
        borderRadius: 'medium',
    });
    dark.colors.modalBackground = '#6F4E37'; // red background
    dark.colors.connectButtonBackground = '#1f1f1f';        // button background
    dark.colors.connectButtonText = '#ffffff';              // text color

    return (
        <RainbowKitProvider
            showRecentTransactions={true}
            coolMode={true}
            modalSize="compact"
            theme={theme === 'dark' ? dark : light}>
            {children}
        </RainbowKitProvider>
    );
};

export default RainbowKit;
