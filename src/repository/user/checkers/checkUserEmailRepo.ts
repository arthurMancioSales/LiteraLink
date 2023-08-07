import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(CHECK): user ";

export async function checkUserEmailRepo(userObjectId: ObjectId, _email: string) {
    const dbConnect  = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const matchEmail = await collection.findOne({"email": _email });
        if (matchEmail) {
            if (matchEmail._id.equals(userObjectId)) {
                return null;
            }
        }
        return matchEmail;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}