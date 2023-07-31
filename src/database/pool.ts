import { MongoClient } from "mongodb";

const uri = `${process.env.ME_CONFIG_MONGODB_URL}`;
const pool = new MongoClient(uri);

export { pool };
