import { createMongoConnection } from "@/src/database/pool";
import { INewUser } from "@/src/interfaces/interface";

export async function createUser(user: INewUser) {  
    const pool  = createMongoConnection();  
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("users");
    try{ 
        const registeredUser = await collection.insertOne(user);
        console.log("Documento inserido em users: ", user);
    
        return registeredUser;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
