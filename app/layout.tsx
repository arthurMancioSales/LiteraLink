import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "LiteraLink",
    description: "decrição",
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    let value;
    if (typeof window !== "undefined") {
        value = window.localStorage.getItem("mode");
    }

    return (
        <html lang="pt-br" data-mode={value}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
