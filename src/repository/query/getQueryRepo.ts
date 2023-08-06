import { createMongoConnection } from "@/src/database/pool";

const TAG = "REPOSITORY(GET_query): community ";

export async function getQueryRepo(query:string) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collectionCommunity = client.db("literalink-dev").collection("community");
    const collectionUser = client.db("literalink-dev").collection("users");
    try {
        const regex = new RegExp(query, "i");
        const responseCommunity = await collectionCommunity.find({ "name": { $regex: regex } });
        const responseUser = await collectionUser.find({ "name": { $regex: regex } });
        const allCommunities = await responseCommunity.toArray();
        const allUsers = await responseUser.toArray();
        return {community: allCommunities, users: allUsers};
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
