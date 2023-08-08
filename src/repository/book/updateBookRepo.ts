import { createMongoConnection } from "@/src/database/pool";
import { IPatchBookRepo } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(POST): book ";

export async function updateBookRepo(userId: ObjectId, book_id: string, book: IPatchBookRepo) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users"); 
    try {
        if (book.favorite) {
            await collection.updateOne(
                { _id: userId, "books.favorite": true },
                { $set: { "books.$.favorite": false } }
            );
        }
        const request = bookFormattedMongo(book);
        await collection.updateOne(
            { _id: userId },
            {$set: request},
            {
              arrayFilters: [{ "element.id": book_id }]
            }
        );
        const responseDB = await collection.findOne({_id: userId});
        if (!responseDB){
            throw new CustomError("Erro ao atulizar o livro", 500);
        }
        return responseDB;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}

function bookFormattedMongo(requestBody: IPatchBookRepo) {
    const body: any = {};
    for (const prop in requestBody) {
        if (requestBody.hasOwnProperty(prop)) {
            const propValue = (requestBody as any)[prop];
            if (propValue !== undefined) {
                body[`books.$[element].${prop}`] = propValue;
            }
        }
    }

    return body;
}
