import { createMongoConnection } from "@/src/database/pool";
import { IBook } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(POST): book ";

export async function insertBook(userId: ObjectId, book : IBook) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users"); 

    try {
        await collection.updateOne(
            { _id: userId, },
            {
                $push: { books: book }
            }
        );
        const responseDB = await collection.findOne({_id: userId});
        if (!responseDB){
            throw new CustomError("Erro ao adicionar um livro", 500);
        }
        return responseDB;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
