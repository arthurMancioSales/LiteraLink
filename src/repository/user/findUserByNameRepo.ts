import { createMongoConnection } from "@/src/database/pool";

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
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
