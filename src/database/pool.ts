import { MongoClient } from "mongodb";

export function createMongoConnection() {
    const uri = `${process.env.ME_CONFIG_MONGODB_URL}`;
    const connection = new MongoClient(uri);
    return connection;
}
