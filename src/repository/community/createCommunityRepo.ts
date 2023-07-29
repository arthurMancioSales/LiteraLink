import { pool } from "../pool/pool";
import { ICreateCommunity } from "@/src/interfaces/interface";

async function createCommunity(query: ICreateCommunity) {
    const client = await pool.connect();
    const collection = client.db("desafio").collection("community");
    try {
        const response  = await collection.insertOne(query);
        const responseComplete = await collection.findOne({ _id: response.insertedId});
        return responseComplete;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}

export { createCommunity };
