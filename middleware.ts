import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const cookie = req.cookies.get("Session");

    if (!cookie) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/search/:path*",
        "/community/:path*"
    ]
};
