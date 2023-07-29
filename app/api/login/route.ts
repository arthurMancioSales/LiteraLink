import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";
import { login } from "@/src/service/user/loginUser";
import jwt from "jsonwebtoken";

import { Response } from "@/src/utils/response";

export async function POST(req: NextRequest) {
    try {
        const request = await req.json();
        const {email, password} = request;
        const user = await login(email, password);
        console.log(user);
        const jwt_cookie: string = jwt.sign({
            id: user.id,
            name: user.name
        }, JSON.stringify(process.env.secretKey));
        cookies().set("Session", jwt_cookie);
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
