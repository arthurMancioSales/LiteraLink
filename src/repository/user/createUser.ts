import { dbConnect } from "@/src/database/mongodb";
import { INewUser, IUser } from "@/src/interfaces/interface";


export async function createUser(user: INewUser) {    
    const client = await dbConnect.connect();
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
