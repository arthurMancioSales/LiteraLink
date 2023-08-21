import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { findBookByUserIdRepo } from "@/src/repository/book/findBookByUserIdRepo";
import { createResponse } from "@/src/utils/response";
import { NextRequest, NextResponse } from "next/server";
import { updateBooksRead, updateGoalsAchieved, updateReadingTime, updateSequences} from "@/src/repository/user/updateStatisticsRepo";

const TAG = "SERVICE(PATCH-GoalsAchieved): statistics ";

export async function updateStatistics(userId: ObjectId, readingTime: number) {
    const Response = createResponse();
    try { // Necessário fazer algumas validações e tratamentos de erro ainda;
        userId = new ObjectId(userId);
        if(readingTime) {
            const totalReadingTime = await updateReadingTime(userId, readingTime);
            if(!totalReadingTime.acknowledged)
                throw new CustomError("Falha ao atualizar o número total de leitura", 500);  
        }

        const updatedGoalsAchieved = await updateGoalsAchieved(userId);
        if(!updatedGoalsAchieved.acknowledged)
            throw new CustomError("Falha ao atualizar o número total de Goals.", 500);

        const totalBooks = await updateBooksRead(userId);
        if(!totalBooks.acknowledged)
            throw new CustomError("Falha ao atualizar o número total de livros lidos.", 500);
        
        const updatedSequences = await updateSequences(userId);
        if(!updatedSequences?.acknowledged)
            throw new CustomError("Falha ao atualizar as sequências do usuário.", 500);
        
    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
