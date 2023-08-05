import { dbConnect } from "@/src/database/mongodb";
import { ObjectId } from "mongodb";

export async function findBook(userId : ObjectId, bookId : ObjectId) {
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
