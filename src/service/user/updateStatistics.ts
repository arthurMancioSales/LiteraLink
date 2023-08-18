import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { findBookByUserIdRepo } from "@/src/repository/book/findBookByUserIdRepo";
import { createResponse } from "@/src/utils/response";
import { NextRequest, NextResponse } from "next/server";
import { updateBooksRead, updateGoalsAchieved, updateReadingTime} from "@/src/repository/user/goals/updateGoalsRepo";

const TAG = "SERVICE(PATCH-GoalsAchieved): statistics ";

export async function updateStatistics(userId: ObjectId, readingTime: number) {
    const Response = createResponse();
    try { // Necessário fazer algumas validações e tratamentos de erro ainda;
        userId = new ObjectId(userId);
        const updatedGoalsAchieved= await updateGoalsAchieved(userId);
        const totalBooks = await updateBooksRead(userId);
        const totalReadingTime = await updateReadingTime(userId, readingTime);
        return updatedGoalsAchieved;

    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
