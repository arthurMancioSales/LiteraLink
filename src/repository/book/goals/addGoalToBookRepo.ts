import { createMongoConnection } from "@/src/database/pool";
import { IGoals } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "SERVICE(POST-goal): book ";

export async function addGoalToBookRepo(
    userId : ObjectId, 
    bookId : string, 
    goals: IGoals[]
) {
    const dbConnect =  createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        for (const goal of goals) {
            const update = await collection.updateOne(
                { _id: userId, "books.id": bookId },
                { $push: { "books.$.goals": goal } }
            );
            if (!update.acknowledged) {
                throw new CustomError('Erro na atualização da meta', 500);
            }
        }
        const foundBook = await collection.findOne({_id: userId})
        if(!foundBook){
            throw new CustomError('Usuário não encontrado', 404);
        }
        return foundBook;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}