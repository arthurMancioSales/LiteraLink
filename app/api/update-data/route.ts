import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { IStatistic } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { auth } from "@/src/utils/middlewares/auth";
import { postStatistics } from "@/src/service/user/postStatistics";
import { createRedisClient } from "@/src/database/redis/redis";

export async function POST(req: NextRequest) {
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        if (Object.entries(request).length !== 5) {
            throw new CustomError("Error: Faltou um campo ser mandado na requisição", 400);
        }
        const body: IStatistic = {
            lastSequence: request.lastSequence,
            booksRead: request.booksRead,
            readingTime: request.readingTime,
            maxSequence: request.maxSequence,
            actualSequence: request.actualSequence,
            goalsAchieved: request.goalsAchieved
        };
        await redis.del(`userInfo:${user.id}`);
        const userStatics = await postStatistics(user.id, body);
        Response.data = userStatics;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
