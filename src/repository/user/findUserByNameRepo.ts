import { createMongoConnection } from "@/src/database/pool";

const TAG = "REPOSITORY(GET): user ";

export async function findUserByNameRepo(user_name: string) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const returnedUser = await collection.findOne(
            { "name": user_name }
        );
        return returnedUser;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
