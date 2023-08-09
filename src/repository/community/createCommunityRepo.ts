import { createMongoConnection } from "@/src/database/pool";
import { ICreateCommunity } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(POST): community ";

async function createCommunityRepo(id: ObjectId, community: ICreateCommunity) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collectionCommunity = client.db("literalink-dev").collection("community");
    const collectionUser= client.db("literalink-dev").collection("users");
    try {
        
        const response  = await collectionCommunity.insertOne(community);
        const responseComplete = await collectionCommunity.findOne({ _id: response.insertedId});
        if (!responseComplete) {
            throw new CustomError("Erro ao encontrar a comunidade inserida", 404);
        }
        const newCommunity =  {
            id: responseComplete._id,
            name: responseComplete.name
        };
        await collectionUser.updateOne({_id: id}, {$push: { communities: newCommunity } });
        return responseComplete;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}

export { createCommunityRepo };
