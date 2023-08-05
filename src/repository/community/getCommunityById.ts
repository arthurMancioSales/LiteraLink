import { createMongoConnection } from "@/src/database/pool";

export async function getCommunityById(community_name : string) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("community"); 
    try {
        const returnedCommunity = await collection.findOne( {
            name: community_name
        });
        return returnedCommunity;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
