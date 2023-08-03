import { ObjectId } from "mongodb";
import { createMongoConnection } from "@/src/database/pool";

export async function checkIsAdminCommunity( user_id: string, community_name: string) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("community");
    try {
        const matchCommunityAdmin = await collection.findOne({
            name: community_name
        });
        if (matchCommunityAdmin) {
            const userID = ObjectId.createFromHexString(user_id);
            if(userID == matchCommunityAdmin.is_admin) {
                return true;
            }
            return false;
        }
        return false;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
