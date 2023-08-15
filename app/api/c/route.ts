import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { getAllCommunities } from "@/src/service/community/getAllCommunities";
import { createRedisClient } from "@/src/database/redis/redis";

export async function GET(req:NextRequest) {
    const Response = createResponse();
    const redis = createRedisClient();
    try {
        const cachedAllCommunities = await redis.get("cachedAllCommunities");
        if(cachedAllCommunities) {
            Response.data = JSON.parse(cachedAllCommunities);
            return NextResponse.json(Response, {status: Response.status});
        } else {
            const dbResponse = await getAllCommunities();
            await redis.set("cachedAllCommunities", JSON.stringify(dbResponse), "EX", 86400);
            Response.data = dbResponse;
            return NextResponse.json(Response, {status: Response.status});
        }
    } catch (error: any) {
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
