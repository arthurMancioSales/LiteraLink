import { createMongoConnection } from "@/src/database/pool";

const TAG = "REPOSITORY(CHECK-NAME): community ";

export async function checkExistingCommunityName( _name: string) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("community");
    try {
        const matchCommunityName = await collection.findOne({
            name: _name
        });
        return matchCommunityName;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
