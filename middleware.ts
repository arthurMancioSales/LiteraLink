import { NextResponse, NextRequest } from "next/server";
import { CustomError } from "./src/service/customError";
import { Response } from "./src/utils/response";

export async function middleware(req: NextRequest) {
    try {
        const userCookie = req.cookies.get('Session')?.value;
        if (!userCookie) {
            throw new CustomError('Error: usuário não está logado', 403);
        }
        return NextResponse.next();
    } catch (e: any) {
        console.log(e);
        Response.message = 'Error';
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
};

export const config = {
    matcher: [
        "/api/dashboard/:path*",
        "/api/update-user",
        "/api/book-lists",
        "/api/logout",
    ]
};