import { pool } from "./pool";
import { IQuery } from "@/src/interfaces/interface";

async function executeQuery(query: IQuery) {
    const client = await pool.connect();
    const collection = client.db("desafio").collection("users");
    try {
        if (query.type === 'GET'){
            const response  = await collection.find({
                name: 'teste'
            });
            const formattedResponse = await response.toArray();
            console.log('response', formattedResponse);
            return formattedResponse;
        }

    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}


export { executeQuery }