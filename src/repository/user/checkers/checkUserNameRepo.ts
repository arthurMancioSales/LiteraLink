import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(CHECK): user ";

export async function checkUserNameRepo(userObjectId: ObjectId, _name: string) {
    const dbConnect  = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const matchName = await collection.findOne({"name": _name });
        if (matchName) {
            if (matchName._id.equals(userObjectId)) {
                return null;
            }
        }
        return matchName;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
