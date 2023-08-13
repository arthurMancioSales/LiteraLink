import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/utils/middlewares/auth";
import { createResponse } from "@/src/utils/response";
import { goalFormattedResquest } from "@/src/utils/formattedRequest";
import { ObjectId } from "mongodb";
import { postGoalsOnUser } from "@/src/service/book/postGoalsOnUser";

export async function POST(req: NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        const { id, goals } = request;
        const requestGoals = goalFormattedResquest(goals);
        const responseDB = await postGoalsOnUser(
            new ObjectId(user.id),
            id,
            requestGoals
        );
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