import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";
import { CustomError } from "@/src/utils/customError";
import { IPatchStatistics, IStatistic } from "@/src/interfaces/interface";

const TAG = "REPOSITORY(PATCH): statistics ";

export async function updateGoalsAchieved(userId: ObjectId) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users"); 
    try {
        const response = await collection.aggregate([
            { $match: { _id: userId }},
            { $unwind: "$books" },
            {
                $group: {
                    _id: "$_id",
                    totalGoals: { $sum: "$books.goalsAchieved" }
                }
            }
        ]).toArray();
        const total = response[0].totalGoals;
        const updatedGoalsAchieved = await collection.updateOne(
            { _id: userId },
            { $set: {"statistics.goalsAchieved": total } }
        );
        console.log("goalsAchieved: ", updatedGoalsAchieved);
        return updatedGoalsAchieved;
       
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}

export async function updateBooksRead(userId: ObjectId) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users"); 
    try {
        const response = await collection.aggregate([
            { $match: { _id: userId } },
            {
                $addFields: {
                    booksRead: {
                        $reduce: {
                            input: "$books",
                            initialValue: 0,
                            in: {
                                $cond: [
                                    { $eq: ["$$this.pagesRead", "$$this.totalPages"] },
                                    { $add: ["$$value", 1] },
                                    "$$value"
                                ]
                            }
                        }
                    }
                }
            }
        ]).toArray();
        console.log("books read: ", response[0].booksRead);
        const booksRead = response[0].booksRead;
        const updatedReadStatistics = await collection.updateOne(
            {_id: userId},
            { $set: { "statistics.booksRead": booksRead } }
        );
        console.log(updatedReadStatistics);
        return updatedReadStatistics;
    } catch (error: any){
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}

export async function updateReadingTime(userId: ObjectId, readingTime: number) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const updatedReadingTime = await collection.updateOne(
            {_id : userId},
            { $inc: { "statistics.readingTime": readingTime } }
        );
        console.log("reading time: ", updatedReadingTime);
        return updatedReadingTime;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
