"use client";

import { usePathname } from "next/navigation";
import { config } from "dotenv";

import "./globals.css";
import { checkIsPublicRoute } from "@/src/functions/checkIsPublicRoute";
config();

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();

    const isPublicPage = checkIsPublicRoute(pathname!);
    return (
        <html lang="pt-br">
            <body>{children}</body>
        </html>
    );
}
