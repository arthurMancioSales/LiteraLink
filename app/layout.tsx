import Script from "next/script";
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
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <Script id="show-banner" strategy="beforeInteractive" dangerouslySetInnerHTML={{
                    __html: `
                        if (localStorage.mode === 'dark') {
                            document.children[0].dataset.mode = 'dark'
                        } else {
                            document.children[0].dataset.mode = 'false'
                        }
                    `
                }}/>
                {children}
            </body>
        </html>
    );
}
