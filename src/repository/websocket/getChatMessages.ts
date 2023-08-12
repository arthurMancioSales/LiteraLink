import { createMongoConnection } from "@/src/database/pool";

const TAG = "REPOSITORY(GET): getChatMessages ";

export async function getChatMessages(room: string) {
    const pool  = createMongoConnection();  
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("community");
    try{ 
        const community = await collection.findOne({ name: decodeURI(room) }   );
        return community;
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
