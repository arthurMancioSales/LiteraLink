import { createMongoConnection } from "@/src/database/pool";
import { INewUser } from "@/src/interfaces/interface";

const TAG = "REPOSITORY(POST): user ";

export async function createUserRepo(user: INewUser) {  
    const pool  = createMongoConnection();  
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("users");
    try{ 
        const registeredUser = await collection.insertOne(user);
        return registeredUser;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
