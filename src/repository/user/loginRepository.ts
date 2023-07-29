import { pool } from "../pool/pool";

export async function loginRepository(email: string) {
    const client = await pool.connect();
    try {
        const collection = client.db("desafio").collection("users");
        const response  = await collection.findOne({
            name: email
        });
        const formattedResponse = await response.toArray();
        return formattedResponse[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
