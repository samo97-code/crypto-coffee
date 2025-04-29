// app/metadata.ts (server component)
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        template: '%s | Crypto Coffee',
        default: 'Crypto Coffee',
    },
    description: 'Crypto Coffee is a multi-chain platform to micro-donate to your favorite crypto projects, earn achievements & XP, level up, play fun blockchain games, and unlock referral rewards',
    metadataBase: new URL('https://yourwebsite.com'),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US',
            'es-ES': '/es-ES',
        },
    },
    openGraph: {
        title: 'Crypto Coffee',
        description: 'Crypto Coffee is a multi-chain platform to micro-donate to your favorite crypto projects, earn achievements & XP, level up, play fun blockchain games, and unlock referral rewards',
        url: 'https://yourwebsite.com',
        siteName: 'Crypto Coffee',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Crypto Coffee',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Crypto Coffee',
        description: 'Crypto Coffee is a multi-chain platform to micro-donate to your favorite crypto projects, earn achievements & XP, level up, play fun blockchain games, and unlock referral rewards',
        creator: '@yourtwitter',
        images: ['/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}
