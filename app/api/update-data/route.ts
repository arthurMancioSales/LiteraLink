import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { IPatchStatistics } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { auth } from "@/src/utils/middlewares/auth";
import { createRedisClient } from "@/src/database/redis/redis";
import { updateStatistics } from "@/src/service/user/updateStatistics";

export async function PATCH(req: NextRequest) { 
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        const body: IPatchStatistics = {
            pagesRead: request.pagesRead,
            readingTime: request.readingTime,
        };
        // const userStatistics = await updateStatistics(user.id);
        await redis.del(`userInfo:${user.id}`);
        // Response.data = userStatistics;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
export const dynamic = "force-dynamic";
