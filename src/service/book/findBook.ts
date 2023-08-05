import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";

export async function findBook(userId : ObjectId, bookId : ObjectId) {
    const dbConnect =  createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const foundBook = await collection.findOne(
            { _id: userId, "books._id" : bookId }   
        );
        if(foundBook)
            return foundBook;

        else 
            return;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
