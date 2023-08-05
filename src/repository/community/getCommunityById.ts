import { createMongoConnection } from "@/src/database/pool";
import { ObjectId } from "mongodb";

export async function getCommunityById(communityId : ObjectId) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("community"); 

    try {
        const returnedCommunity = collection.findOne( {
            _id: communityId
        });

        return returnedCommunity;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
