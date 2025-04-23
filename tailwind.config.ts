import type {Config} from "tailwindcss"

const config: Config = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    safelist: [
        "bg-[url('/crypto-coffee-bg.jpg')]",
        "bg-[url('/abstract-coffee-crypto-bg.jpg')]",
        'bg-coffee-800',
        'bg-coffee-700',
        'text-coffee-900',
        'text-coffee-100',
    ],
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                foreground: "hsl(var(--foreground))",
                background: "hsl(var(--background))",
                newbg: "hsl(var(--newbg))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Coffee theme colors
                coffee: {
                    50: "hsl(var(--coffee-50))",
                    100: "hsl(var(--coffee-100))",
                    200: "hsl(var(--coffee-200))",
                    300: "hsl(var(--coffee-300))",
                    400: "hsl(var(--coffee-400))",
                    500: "hsl(var(--coffee-500))",
                    600: "hsl(var(--coffee-600))",
                    700: "hsl(var(--coffee-700))",
                    800: "hsl(var(--coffee-800))",
                    900: "hsl(var(--coffee-900))",
                }
                // coffee: {
                //     50: "#FDF8F3", // Lightest background
                //     100: "#FDF1E7", // Light background
                //     200: "#E6D5C7", // Borders
                //     300: "#D4B8A5", // Light accents
                //     400: "#C4A99A", // Medium accents
                //     500: "#B87E5F", // Medium text
                //     600: "#A27D6D", // Secondary text
                //     700: "#8B4513", // Primary accent
                //     800: "#6F4E37", // Dark accent
                //     900: "#3A2820", // Darkest text
                // },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
                pulse: {
                    '0%, 100%': {opacity: '1'},
                    '50%': {opacity: '0.5'},
                },
                shine: {
                    from: {transform: "translateX(-100%)"},
                    to: {transform: "translateX(100%)"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                'pulse-slow': 'pulse 2s ease-in-out infinite',
                shine: "shine 3s infinite",
            },
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwindcss-animate")],
}
export default config

