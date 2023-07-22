import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/src/utils/response";
import { IStatistic } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { auth } from "@/src/functions/middlewares/auth";
import { postStatics } from "@/src/service/user/postStatics";

export async function POST(req: NextRequest) {
    try {
        const id = await auth(req);
        const request = await req.json();
        if (Object.entries(request).length !== 5) {
            throw new CustomError("Error: Faltou um campo ser mandado na requisição", 400);
        }
        const body: IStatistic = {
            lastSequence: request.lastSequence,
            readingTime: request.readingTime,
            maxSequence: request.maxSequence,
            actualSequence: request.actualSequence,
            goalsAchieved: request.goalsAchieved
        };
        const userStatics = await postStatics(id, body);
        Response.data = userStatics;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
