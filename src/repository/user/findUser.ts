import { dbConnect } from "@/src/database/mongodb";
import { ObjectId } from "mongodb";

export async function findUserById(userId: ObjectId) {
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const returnedUser = await collection.findOne(
            { _id: userId }
        );
        if(returnedUser)
            return returnedUser;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
