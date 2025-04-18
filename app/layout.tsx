'use client';

import React, {FC} from 'react';
import "./globals.css"
import '@rainbow-me/rainbowkit/styles.css';
import {Provider} from 'react-redux';
import {store} from '@/store';
import {RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {WagmiProvider} from 'wagmi';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {config} from "@/lib/wagmi";
import {Toaster} from "@/components/ui/sonner"


import {IChildren} from "@/types";
import Header from "@/components/app/Header";
import Footer from "@/components/app/Footer";

const queryClient = new QueryClient();


const RootLayout: FC<IChildren> = ({children}) => {
    return (
        <html lang="en">
        <body>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <Provider store={store}>
                        <div className="min-h-screen bg-coffee-50">
                            {/* Header */}
                            <Header/>
                            {children}
                            <Footer/>

                            <Toaster
                                position="top-right"
                            />
                        </div>
                    </Provider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
        </body>
        </html>
    );
}

export default RootLayout;
