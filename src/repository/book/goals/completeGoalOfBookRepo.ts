import { createMongoConnection } from "@/src/database/pool";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(DELETE-goal): book ";

export async function completeGoalOfBookRepo(
    userId : ObjectId, 
    bookId : string, 
    type: string
) {
    const dbConnect =  createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const update = await collection.updateOne(
            { _id: userId, "books.id": bookId },
            {
                $pull: { "books.$[book].goals": { "type": type } },
                $inc: { "books.$[book].goalsAchieved": 1 }
            },
            {
                arrayFilters: [
                    { "book.id": bookId }
                ]
            }
        );
        
        if (!update.acknowledged) {
            throw new CustomError('Erro na atualização da meta', 500);
        }
        return;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}