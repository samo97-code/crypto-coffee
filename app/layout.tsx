import React, {FC} from 'react';
import "./globals.css"
import '@rainbow-me/rainbowkit/styles.css';
import ClientLayout from "@/components/app/ClientLayout";
import {IChildren} from "@/types";
// import {metadata} from "@/components/app/metadata";

// export { metadata } // Export the metadata here

const RootLayout: FC<IChildren> = ({children}) => {
    return (
        <html lang="en" suppressHydrationWarning>
        {/*<head>*/}
        {/*    <link rel="icon" href="/favicon.ico" sizes="any"/>*/}
        {/*    <link*/}
        {/*        rel="apple-touch-icon"*/}
        {/*        href="/apple-touch-icon.png"*/}
        {/*        type="image/png"*/}
        {/*        sizes="180x180"*/}
        {/*    />*/}
        {/*    /!* Custom fonts or other static resources *!/*/}
        {/*    <link*/}
        {/*        rel="preload"*/}
        {/*        href="/fonts/custom-font.woff2"*/}
        {/*        as="font"*/}
        {/*        type="font/woff2"*/}
        {/*        crossOrigin="anonymous"*/}
        {/*    />*/}
        {/*</head>*/}

        <body>
        <ClientLayout>
            {children}
        </ClientLayout>
        </body>
        </html>
    );
}

export default RootLayout;
