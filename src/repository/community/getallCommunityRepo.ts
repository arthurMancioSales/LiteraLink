import { createMongoConnection } from "@/src/database/pool";

const TAG = "REPOSITORY(GET_all): community ";

async function getallCommunity() {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("community");
    try {
        const response = await collection.find();
        const allCommunities = await response.toArray();
        return allCommunities;
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}

export { getallCommunity };
