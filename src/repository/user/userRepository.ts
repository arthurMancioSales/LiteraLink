import { dbConnect } from "@/src/database/mongodb";
import { IUser } from "@/src/interfaces/interface";


export async function createUser(user: IUser) {
    const client = await dbConnect.connect();
    try{ 
        const registeredUser = await client.db("literalink-dev").collection("users").insertOne(user);
        console.log("Documento inserido em users: ", user);
    
        return registeredUser;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
