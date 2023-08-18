import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";
import { CustomError } from "@/src/utils/customError";
import { IStatistic } from "@/src/interfaces/interface";

const TAG = "REPOSITORY(POST): statistics ";

export async function updateUserStatistics( userId: ObjectId, body: IStatistic) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users"); 
    try {
        await collection.updateOne(
            { id: userId },
            {  } 
        );
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
    