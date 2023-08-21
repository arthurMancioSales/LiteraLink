import { createMongoConnection } from "@/src/database/pool";
import { IGoalsType } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "SERVICE(PATCH-goal_partial): book ";

export async function updateParcialGoalOfBookRepo(
    userId : ObjectId, 
    bookId : string, 
    goals: {
        type: IGoalsType,
        partial: number,
        total?: number,
        createDate?: Date,
        lastVisitDate?: Date
    }[],
    status: string | null
) {
    const dbConnect =  createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        for (const goal of goals) {
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
            if (status) {
                const updateStatus = await collection.updateOne(
                    { _id: userId, "books.id": bookId },
                    { $set: { "books.$.status": status } }
                )
                if (!updateStatus.acknowledged) {
                    throw new CustomError("Erro na atualização da meta", 500);
                }
            }
        }
        return;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
