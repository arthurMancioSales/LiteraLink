import { createMongoConnection } from "@/src/database/pool";
import { IStatistic } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(POST): statistics ";

export async function updateStatistics(userId: ObjectId, updateStatistics: IStatistic) {
    const dbConnect =  createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const updatedStatistics = collection.updateOne(
            { _id: userId },
            {
                $set: { statistics : updateStatistics },
                returnNewDocument: true
            }
        );
        return updatedStatistics;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
