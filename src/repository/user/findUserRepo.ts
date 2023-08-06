import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";


export async function findUserByIdRepo(userId: ObjectId) {
    const dbConnect = createMongoConnection();
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
