import { createMongoConnection } from "@/src/database/pool";


export async function loginRepository(email: string) {
    const pool  = createMongoConnection();
    const client = await pool.connect();
    try {
        const collection = client.db("literalink-dev").collection("users");
        const response  = await collection.findOne({
            email: email
        });

        const formattedResponse = await response.toArray();
        return formattedResponse[0];

        return response;

    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }

}


