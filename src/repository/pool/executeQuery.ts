import { ICommunity } from "@/src/interfaces/interface";
import { pool } from "./pool";

async function executeQuery(query: ICommunity) {
    const client = await pool.connect();
    const collection = client.db("desafio").collection("users");
    try {
        const response  = await collection.find({
            name: "teste"
        });
        const formattedResponse = await response.toArray();
        console.log("response", formattedResponse);
        return formattedResponse;

    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}


export { executeQuery };
