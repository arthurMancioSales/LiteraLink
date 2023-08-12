import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(DELETE): book ";

export async function deleteBookFromUser(userId: ObjectId, bookId: string) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const deletedBook = await collection.updateOne(
            { _id: userId },
            {
                $pull: { books: { id: bookId } }
            }
        );
        return deletedBook;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
