
import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";

const TAG = "SERVICE(GET-allBooksDays): book ";

export async function verifyGoalDaysOnBookRepo(
    userId : ObjectId
) {
    const dbConnect =  createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const booksWithDaysGoals = await collection.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$books" },
            { $match: { "books.goals.type": "days" } },
            { $group: { _id: "$_id", books: { $push: "$books" } } }
        ]).toArray();
        return booksWithDaysGoals;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}

