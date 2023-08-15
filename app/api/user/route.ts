import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/src/utils/customError";
import { createResponse } from "@/src/utils/response";
import { auth } from "@/src/utils/middlewares/auth";
import { getUserById } from "@/src/service/user/getUserById";
import { createRedisClient } from "@/src/database/redis/redis";

export async function GET(req:NextRequest) {
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const userCookie = await auth(req);
        const cachedUser = await redis.get("userInfo");
        if(cachedUser) {
            Response.data = JSON.parse(cachedUser);
            return NextResponse.json(Response, {status: 200});
        } else {
            const user = await getUserById(userCookie.id);
            if (!user) {
                throw new CustomError("Error: Usuário não encontrado!", 404);
            }
            await redis.set("userInfo", JSON.stringify(user), "EX", 86400); //24h (retorna todo o documento de usuário exceto _id);
            Response.data = user;
            return NextResponse.json(Response, {status: 200});
        }
    } catch (e: any) {
        console.log(e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export const dynamic = "force-dynamic";
