import { dbConnect } from "@/src/database/mongodb";
import { ObjectId } from "mongodb";

export async function findUserById(userId: ObjectId) {
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const returnedUser = await collection.find(
            { _id: userId }
        );
        return returnedUser;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
