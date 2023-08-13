import { createMongoConnection } from "@/src/database/pool";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "SERVICE(GET): book ";

export async function findBookByUserIdRepo(userId : ObjectId, bookId : string) {
    const dbConnect =  createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const foundBook  = await collection.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$books" },
            { $match: { "books.id": bookId } },
            { $replaceRoot: { newRoot: "$books" } },
        ]).toArray();
        if(!foundBook){
            throw new CustomError('Livro não encontrado', 404);
        }
        return foundBook[0];
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}