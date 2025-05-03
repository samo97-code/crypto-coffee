import React, {FC} from 'react';
import "./globals.css"
import '@rainbow-me/rainbowkit/styles.css';
import ClientLayout from "@/components/app/ClientLayout";
import {IChildren} from "@/types";
import {metadata} from "@/components/app/metadata";

export { metadata } // Export the metadata here

const RootLayout: FC<IChildren> = ({children}) => {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        </head>

        <body>
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}

export default RootLayout;
