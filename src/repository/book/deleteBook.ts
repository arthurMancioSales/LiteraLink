import { dbConnect } from "@/src/database/mongodb";
import { ObjectId } from "mongodb";

export async function deleteBookFromUser(userId: ObjectId, bookId: ObjectId) {
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const deletedBook = await collection.updateOne(
            { _id: userId },
            {
                $pull: { books: { _id: bookId } }
            }
        );
        console.log("Book removed from user: ", userId);
        return deletedBook;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
