import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";
import { login } from "@/src/service/user/loginUser";
import jwt from "jsonwebtoken";
import { createRedisClient } from "@/src/database/redis/redis";
import { createResponse } from "@/src/utils/response"; //
import { EmailValidator, PasswordValidator } from "@/src/utils/validators/validator";

export async function POST(req: NextRequest) {
    const Response = createResponse();
    const redis = createRedisClient();
    try {
        const request = await req.json();
        const {email, password} = request;
        new EmailValidator(email);
        new PasswordValidator(password);
        const user = await login(email, password);
        const jwt_cookie: string = jwt.sign({
            id: user.id,
            name: user.name
        }, JSON.stringify(process.env.secretKey));
        cookies().set("Session", jwt_cookie);
        if(user) {                                                      
            await redis.set("user", JSON.stringify(user), "EX", 86400);
        }                                                              

        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
