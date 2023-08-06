import { createMongoConnection } from "@/src/database/pool";

const TAG = "REPOSITORY(POST): user ";

export async function loginRepo(email: string) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    try {
        const collection = client.db("literalink-dev").collection("users");
        const response  = await collection.findOne({
            email: email
        });
        return response;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
