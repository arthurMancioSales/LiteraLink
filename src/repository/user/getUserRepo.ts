import { pool } from "@/src/database/pool";
import { ObjectId } from "mongodb";

const TAG = "REPOSITORY(GET_user): community ";

async function getUserRepo(id: ObjectId) {
    const client = await pool.connect();
    const collection = client.db("literalink-dev").collection("users");
    try {
        const response = await collection.findOne({ _id: id});
        console.log("User", response);
        return response;
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    } finally {
        client.close();
    }
}

export { getUserRepo };
