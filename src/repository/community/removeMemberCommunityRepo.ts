import { createMongoConnection } from "@/src/database/pool";
import { CustomError } from "@/src/utils/customError";

const TAG = "REPOSITORY(POST): community ";

export async function removeMemberCommunityRepo(user:{id:string, name:string}, community_name: string) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collectionCommunity = client.db("literalink-dev").collection("community");
    const collectionUser = client.db("literalink-dev").collection("users");
    try {
        const community = await collectionCommunity.findOne({"name": community_name});
        if (!community) {
            throw new CustomError('Comunidade não encontrada', 404);
        }
        const updateUser = await collectionUser.updateOne({"name": user.name}, {$pull: { communities: {id: community._id, name: community.name}}});
        if (!updateUser.acknowledged) {
            throw new CustomError('Erro ao adicionar um novo membro', 500);
        }
        const updateCommunity = await collectionCommunity.updateOne({"name": community_name}, {$pull: {members: {id: user.id, name: user.name}}});
        if (!updateCommunity.acknowledged) {
            throw new CustomError('Erro ao adicionar um novo membro', 500);
        }
        const responseDB = await collectionUser.findOne({"name": user.name});
        return responseDB;
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}