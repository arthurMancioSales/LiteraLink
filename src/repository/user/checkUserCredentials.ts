import { createMongoConnection } from "@/src/database/pool";

export async function checkExistingCredentials(_email: string, _name: string) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const matchEmail = await collection.find({
            email: `${_email}` 
        }).toArray();
        const matchUsername = await collection.find({
            name: `${_name}`
        }).toArray();
        if(matchEmail.length > 0)
            return "Email"; 
        else if(matchUsername.length > 0) 
            return "Username";
        else
            return "";
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
