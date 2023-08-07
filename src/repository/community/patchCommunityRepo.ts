import { createMongoConnection } from "@/src/database/pool";
import { IFormatedResquestCommunity } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";

const TAG = "REPOSITORY(PATCH): community ";

export async function patchCommunityRepo(community_name: string, body: IFormatedResquestCommunity) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collectionCommunity = client.db("literalink-dev").collection("community");
    const collectionUser = client.db("literalink-dev").collection("users");
    try {
        const collectionData = await collectionCommunity.findOne({"name": community_name});
        if  (!collectionData) {
            throw new CustomError("Comunidade não encontrada", 404);
        }
        if (body.is_admin) {
            const members: Array<{id:string, name: string}> = collectionData.members;
            const member = members.find(user => user.id === body.is_admin);
            if (!member) {
                throw new CustomError("Usuário não faz parte da comunidade", 403);
            }
        }
        await collectionCommunity.updateOne({"name": community_name}, { $set: body});
        const collectionUpdate = await collectionCommunity.findOne({_id: collectionData._id});
        if (body.name) {
            const users = await collectionUser.updateMany(
                { "communities.id": collectionData._id },
                { $set: { "communities.$.name": body.name } }
            );
            if (!users.acknowledged) {
                throw new CustomError("Erro na atualização do nome da comunidade", 500);
            }
        }
        return collectionUpdate;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
