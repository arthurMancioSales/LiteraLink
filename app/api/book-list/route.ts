import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { CustomError } from "@/src/utils/customError";
import { auth } from "@/src/utils/middlewares/auth";
import { patchBook } from "@/src/service/book/patchBook";
import { postBook } from "@/src/service/book/postBook";
import { deleteBook } from "@/src/service/book/deleteBook";
import { bookFormattedRequest } from "@/src/utils/formattedRequest";
import { ObjectId } from "mongodb";
import { createRedisClient } from "@/src/database/redis/redis";
import { updateStatistics } from "@/src/service/user/updateStatistics";
import { verifyGoalsDaysOnBook } from "@/src/service/book/goals/verifyGoalsDaysOnBook";


export async function PATCH(req: NextRequest) {
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        if (Object.entries(request).length === 0) {
            throw new CustomError("Erro na requisição", 400);
        }
        const body = bookFormattedRequest(request);
        if ('pagesRead' in body) {
            if (body.pagesRead! > 0) {
                await verifyGoalsDaysOnBook(new ObjectId(user.id), body.id);
            }
        }
        const userBookUpdate = await patchBook(user.id, body);
        if(request.identifier === "statistics") {
            if(!request.goals[0]?.parcial)
                await updateStatistics(user.id, 0);
            else
                await updateStatistics(user.id, request.goals[0].parcial);
        }
        
        await redis.del(`userInfo:${user.id}`);
        Response.data = userBookUpdate;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        console.log(e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function POST(req: NextRequest) {
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        
        const postedBook = await postBook(user.id, request);

        await redis.del(`userInfo:${user.id}`);
        return NextResponse.json(Response, {status:Response.status});
    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function DELETE(req: NextRequest) { 
    const redis = createRedisClient();// Essa rota "funciona", porém o req com DELETE depois de alguma att. do Next não consegue ser parseado e retorna um erro;
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();

        const { id } =request;
        const newBookList = await deleteBook(new ObjectId(user.id), id);

        await redis.del(`userInfo:${user.id}`);
        return NextResponse.json(Response, {status: Response.status});
      
    } catch (error : any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export const dynamic = "force-dynamic";
