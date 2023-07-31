import { dbConnect } from "@/src/database/mongodb";
import { IBook } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";

export async function insertBook(userId: ObjectId, book : IBook) {
    const client = await dbConnect.connect();
    const collection = client.db("literalink-dev").collection("users"); 

    try {
        await collection.updateOne(
            { id: userId, },
            {
                $push: { books: book }
            }
        );
        
        console.log("Novo livro inserido em usuário", book);
        return;
        
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.close();
    }
}
