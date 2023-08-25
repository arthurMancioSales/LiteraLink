import { createMongoConnection } from "@/src/database/pool";

export async function eraseDatabase() {
    const connect = createMongoConnection();
    const client = await connect.connect();
    client.db("literalink-dev").collection("community").drop();
    client.db("literalink-dev").collection("users").drop();
}