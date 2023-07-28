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
                
                dark: {
                    text: "#fff",
                    primary: "#150F1B",
                    secondary: "#413D46",
                    tertiary: "#2A2530",
                },
                light: {
                    text: "#000",
                    primary: "#FEF7E7",
                    secondary: "#D4C8AE",
                    tertiary: "#EDE4D1",
                },
                brand: "#8B5CF6",
                status: {
                    success: "#22C55E",
                    warning: "#F59E0B",
                    info: "#0EA5E9",
                    error: "#EF4444",
                },
            },
            fontFamily: {
                sans: ["Graphik", "sans-serif"],
                serif: ["Merriweather", "serif"],
            },
            backgroundColor: {
                buttonHover: "#E5E5E5",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            keyframes: {
                slideDownAccordionContainer: {
                    from: { height: "var(--accordionHeight)" },
                    to: { height: "calc(100% - var(--doubleAccordionHeight))" },
                },
                slideUpAccordionContainer: {
                    from: { height: "calc(100% - var(--doubleAccordionHeight))" },
                    to: { height: "var(--accordionHeight)" },
                },
                slideDown: {
                    from: { height: 0 },
                    to: { height: "calc(100% - var(--accordionHeight))" },
                },
                slideUp: {
                    from: { height: "calc(100% - var(--accordionHeight))" },
                    to: { height: 0 },
                },
                jumpingAnimation: {
                    "0": { transform: "translate3d(0, 0, 0)" },
                    "50%": { transform: "translate3d(0, 15px, 0)" },
                    "100%": { transform: "translate3d(0, 0, 0)" }
                },
            },
            animation: {
                slideDownAccordionContainer: "slideDownAccordionContainer 300ms cubic-bezier(0.87, 0, 0.13, 1)",
                slideUpAccordionContainer: "slideUpAccordionContainer 300ms cubic-bezier(0.87, 0, 0.13, 1)",
                slideDown: "slideDown 200ms cubic-bezier(0.87, 0, 0.13, 1)",
                slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
                jumpingAnimation1: "jumpingAnimation 800ms 0.1s ease-in infinite",
                jumpingAnimation2: "jumpingAnimation 800ms 0.2s ease-in infinite",
                jumpingAnimation3: "jumpingAnimation 800ms 0.3s ease-in infinite",
            },
        },
    },
    plugins: [],
};
