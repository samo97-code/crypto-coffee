'use client';

import React, {FC} from 'react';
import "./globals.css"
import '@rainbow-me/rainbowkit/styles.css';
import {Provider} from 'react-redux';
import {store} from '@/store';
import {WagmiProvider} from 'wagmi';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {config} from "@/lib/wagmi";
import {Toaster} from "@/components/ui/sonner"
import {ThemeProvider} from "@/components/re-usable/ThemeProvider";
import {IChildren} from "@/types";
import Header from "@/components/app/Header";
import {CreativeFooter} from "@/components/app/CreativeFooter";
import RainbowKit from "@/components/re-usable/RainbowKit";

const queryClient = new QueryClient();

const RootLayout: FC<IChildren> = ({children}) => {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <RainbowKit>
                        <Provider store={store}>
                            <div className={`min-h-screen`}>
                                {/* Header */}
                                <Header/>
                                {children}
                                {/*<Footer/>*/}
                                <CreativeFooter/>

                                <Toaster
                                    position="top-right"
                                />
                            </div>
                        </Provider>
                    </RainbowKit>
                </ThemeProvider>
            </QueryClientProvider>
        </WagmiProvider>
        </body>
        </html>
    );
}

export default RootLayout;
