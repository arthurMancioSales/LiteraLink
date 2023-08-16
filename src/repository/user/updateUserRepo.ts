import { createMongoConnection } from "@/src/database/pool";
import { IUserUpdate } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(PATCH): user ";

export async function updateUserRepo(userId: ObjectId, body: IUserUpdate) {
    const dbConnect = createMongoConnection();
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const returnedUser = await collection.updateOne({_id: userId}, {$set: body});

        if (!returnedUser.acknowledged) {
            throw new CustomError("Erro na atualização dos dados do usuário", 500);
        }
        const response = await collection.findOne(userId);
        return response;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
