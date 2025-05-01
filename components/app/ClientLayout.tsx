'use client'

import React, {FC, Suspense} from 'react';
import {config} from "@/lib/wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "@/components/re-usable/ThemeProvider";
import RainbowKit from "@/components/re-usable/RainbowKit";
import {Provider} from "react-redux";
import {store} from "@/store";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CoffeeLoader from "@/components/dashboard/CoffeeLoader";
import Header from "@/components/app/Header";
import {CreativeFooter} from "@/components/app/CreativeFooter";
import {Toaster} from "@/components/ui/sonner";
import {WagmiProvider} from "wagmi";
import {IChildren} from "@/types";

const queryClient = new QueryClient();

const ClientLayout: FC<IChildren> = ({children}) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <RainbowKit>
                        <Provider store={store}>
                            <ProtectedRoute>
                                <Suspense fallback={<CoffeeLoader/>}>
                                    <div className={`min-h-screen`}>
                                        {/* Header */}
                                        <Header/>
                                        {children}
                                        {/*<Footer/>*/}
                                        <CreativeFooter/>

                                        <Toaster position="top-right"/>
                                    </div>
                                </Suspense>

                            </ProtectedRoute>
                        </Provider>
                    </RainbowKit>
                </ThemeProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default ClientLayout;
