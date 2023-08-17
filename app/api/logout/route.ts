import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";
import { createResponse } from "@/src/utils/response";
import { auth } from "@/src/utils/middlewares/auth";
import { CustomError } from "@/src/utils/customError";
import { createRedisClient } from "@/src/database/redis/redis";

export async function POST(req: NextRequest) {
    const Response = createResponse();
    const redis = createRedisClient();
    try{
        const user = await auth(req);
        if (user) {
            cookies().delete("Session");
            await redis.del(`user:${user.id}`);
            await redis.del(`userInfo:${user.id}`);
            return NextResponse.json(Response, {status: Response.status});
        }
        throw new CustomError("Erro interno do servidor", 500);
    }
    catch(error: any) {
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
export const dynamic = "force-dynamic";
