/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", "[data-mode=dark]"],
    theme: {
        extend: {
            screens: {
                sm: "480px",
                md: "768px",
                lg: "976px",
                xl: "1440px",
            },
            fontSize: {
                title: "2rem",
                card: "1rem"
            },
            colors: {
                dark: "#FFFFFF",
                light: "#000000",
                secondaryLight: "#D4C8AE",
            },
            fontFamily: {
                sans: ["Graphik", "sans-serif"],
                serif: ["Merriweather", "serif"],
            },
            backgroundColor: {
                brand: "#8B5CF6",
                buttonHover: "#E5E5E5",
                primaryLight: "#FEF7E7",
                secondaryLight: "#D4C8AE",
                tertiaryLight: "#EDE4D1",
                primaryDark: "#150F1B",
                secondaryDark: "#413D46",
                tertiaryDark: "#2A2530",
                success: "#22C55E",
                warning: "#F59E0B",
                info: "#0EA5E9",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
