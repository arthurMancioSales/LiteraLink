import { createMongoConnection } from "@/src/database/pool";

<<<<<<< HEAD:src/repository/community/getCommunityByIdRepo.ts
const TAG = "REPOSITORY(GET): community ";

export async function getCommunityByIdRepo(community_name : string) {
=======
export async function getCommunityByNameRepo(community_name : string) {
>>>>>>> b341426de36d5cd52c22c49dadce392e2c3c9f32:src/repository/community/getCommunityByNameRepo.ts
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("community"); 
    try {
        const returnedCommunity = await collection.findOne( {
            name: community_name
        });
        return returnedCommunity;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
