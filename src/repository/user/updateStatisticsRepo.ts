import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";
import { dateNow } from "@/src/utils/dateCorrect";

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
            {
                $match: { _id: new ObjectId(userId) }
            },
            {
                $project: {
                    booksReadCount: {
                        $size: {
                            $filter: {
                                input: "$books",
                                as: "book",
                                cond: { $eq: ["$$book.status", "lido"] }
                            }
                        }
                    }
                }
            }
        ]).toArray();
        const booksRead = response[0].booksReadCount;
        const updatedReadStatistics = await collection.updateOne(
            {_id: userId},
            { $set: { "statistics.booksRead": booksRead } }
        );
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
        return updatedReadingTime;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}

export async function updateSequences(userId: ObjectId) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    const date = dateNow();
    const dateToday = date.getTime();
    const twentyFourHours = 24*60*60*1000;
    try {
        const user = await collection.findOne(
            {_id: userId}
        );
        const lastSequence = new Date(user?.statistics.lastSequence).getTime();
        const actualSequence = user?.statistics.actualSequence;
        const maxSequence = user?.statistics.maxSequence;
        if(dateToday - lastSequence < twentyFourHours ) {
            return null;

        } else if(dateToday - lastSequence > 2*twentyFourHours) {
            const updatedSequence = await collection.updateOne (
                { _id: userId },
                { $set: { "statistics.lastSequence": date, "statistics.actualSequence": 1 } }
            );         
            return updatedSequence;
        } else if (dateToday - lastSequence < 2*twentyFourHours && dateToday - lastSequence > twentyFourHours) {
            const updatedSequence = await collection.updateOne(
                { _id: userId },
                {
                    $inc: { "statistics.actualSequence": 1 } ,
                    $set: { "statistics.lastSequence": date } 
                });
            
            console.log("retorno: ", updatedSequence);
            if(actualSequence >= maxSequence) {
                await collection.updateOne(
                    { _id: userId },
                    { $set: { "statistics.maxSequence": actualSequence + 1 } }
                );
            }
            return updatedSequence;
        }
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
