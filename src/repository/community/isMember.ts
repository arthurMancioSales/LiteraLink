import { createMongoConnection } from "@/src/database/pool";

const TAG = "REPOSITORY(isMember): community ";

export async function isMember(user_name:string, community_name: string) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collectionCommunity = client.db("literalink-dev").collection("community");
    try {
        const responseDB = await collectionCommunity.findOne({
            "name": community_name,
            "members": {
                "$elemMatch": {
                    "name": user_name
                }
            }
        });
        return responseDB;
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
