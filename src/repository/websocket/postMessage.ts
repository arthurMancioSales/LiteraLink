import { createMongoConnection } from "@/src/database/pool";
import { IChatContent, IWebsocketConnections } from "@/src/interfaces/interface";
import { PushOperator } from "mongodb";

const TAG = "REPOSITORY(POST): chatMessage ";

export async function postChatMessage(message: IChatContent, connection: IWebsocketConnections) {  
    const pool  = createMongoConnection();  
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("community");
    try{ 
        await collection.findOneAndUpdate(
            { name: decodeURI(connection.room) },
            {
                $push: { "chat": message } as PushOperator<Document>
            }
        );
        
    } catch (error) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}
