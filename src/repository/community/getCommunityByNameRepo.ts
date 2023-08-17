import { createMongoConnection } from "@/src/database/pool";

const TAG = "REPOSITORY(GET): community ";

export async function getCommunityByNameRepo(community_name : string) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("community"); 
    try {
        const returnedCommunity = await collection.findOne( {
            name: community_name
        }, { projection: {"_id": false, "members.id": false} });
        return returnedCommunity;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
