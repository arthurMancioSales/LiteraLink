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
            booksRead: request.booksRead, // calcular baseado no status de "lido"
            readingTime: request.readingTime, //passado pelo front
            maxSequence: request.maxSequence, // maior numero de dias logados
            actualSequence: request.actualSequence, // sequencia atual de dias logados
            goalsAchieved: request.goalsAchieved // total de metas (de livros) cumpridas [todos os goalsAchieved de todos os livros]
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
export const dynamic = "force-dynamic";
