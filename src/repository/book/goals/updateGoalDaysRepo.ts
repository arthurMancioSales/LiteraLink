import { createMongoConnection } from "@/src/database/pool";
import { IGoalsType } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "SERVICE(PATCH-goal_partial): book ";

export async function updateGoalDaysRepo(
    userId : ObjectId, 
    bookId : string, 
    goal: {
        type: IGoalsType,
        partial: number,
        total?: number,
        createDate?: Date,
        lastVisitDate?: Date
    }
) {
    const dbConnect =  createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const update = await collection.updateOne(
            { _id: userId, "books.id": bookId },
            { $set: { "books.$[book].goals.$[goal]": goal } },
            {
                arrayFilters: [
                    { "book.id": bookId },
                    { "goal.type": goal.type }
                ]
            }
        );
        if (!update.acknowledged) {
            throw new CustomError("Erro na atualização da meta", 500);
        }
        return;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
