"use client";

import "./globals.css";

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    const darkMode = false;
    return (
        <html lang="pt-br" data-mode={darkMode}>
            <body>
                {children}
            </body>
        </html>
    );
}
