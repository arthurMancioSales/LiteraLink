import { pool } from "../pool/pool";

async function getallCommunity() {
    const client = await pool.connect();
    const collection = client.db("desafio").collection("community");
    try {
        const response  = await collection.find();
        const allCommunities = await response.toArray();
        return allCommunities;
    } catch (error: any) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}

export { getallCommunity };
