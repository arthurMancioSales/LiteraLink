import { createMongoConnection } from "@/src/database/pool";
import { IUserUpdate } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(PATCH): user in community ";

export async function updateUserInCommunity(userId: ObjectId, user: IUserUpdate) {
    const objectString = userId.toString();
    const dbConnect  = createMongoConnection();
    const client = await dbConnect.connect();
    const collectionCommunity = client.db("literalink-dev").collection("community");
    try {      
        if(user.name !== undefined && user.image !== undefined ) {
            const updatedCommunities = await collectionCommunity.updateMany(
                { "members.id": objectString }, 
                { 
                    $set: {"members.$.name": user.name, "members.$.image": user.image }
                } 
            );
            return updatedCommunities;
        } else if (user.name === undefined && user.image !== undefined) {
            const updatedCommunities = await collectionCommunity.updateMany(
                { "members.id": objectString }, 
                {
                    $set: {"members.$.image": user.image }
                }
            );
            return updatedCommunities;
        } else if (user.name !== undefined && user.image === undefined) {
            const updatedCommunities = await collectionCommunity.updateMany(
                { "members.id": objectString }, 
                {
                    $set: { "members.$.name": user.name }
                }
            );
            return updatedCommunities;
        }        
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
