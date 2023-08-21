import { NextRequest, NextResponse } from "next/server";
import { deleteGoalsOfBook } from "@/src/service/book/goals/deleteGoalsOfBook";
import { goalDeleteFormattedResquest } from "@/src/utils/formattedRequest";
import { auth } from "@/src/utils/middlewares/auth";
import { createResponse } from "@/src/utils/response";
import { ObjectId } from "mongodb";
import { createRedisClient } from "@/src/database/redis/redis";

export async function POST(req: NextRequest) {
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        const { id, goals } = request;
        const requestGoals = goalDeleteFormattedResquest(goals);
        const responseDB = await deleteGoalsOfBook(
            new ObjectId(user.id),
            id,
            requestGoals
        );
        await redis.del(`userInfo:${user.id}`);
        Response.data = responseDB;
        return NextResponse.json(Response, {status:Response.status});
    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}