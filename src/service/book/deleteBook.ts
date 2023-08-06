import { deleteBookFromUser } from "@/src/repository/book/deleteBook";
import { findUserByIdRepo } from "@/src/repository/user/findUserRepo";
import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { findBook } from "./findBook";

const TAG = "SERVICE(DELETE): book ";

export async function deleteBook(id: ObjectId, bookId: ObjectId) {
    try{
        const user = await findUserByIdRepo(id);
        if (!user) {
            throw new CustomError("Error: Usuário não encontrado!", 404);
        }
        const book = await findBook(id, bookId);
        if (!book) {
            throw new CustomError("Error: Livro não encontrado!", 404);
        }
        const deletedBook =  deleteBookFromUser(id, bookId);
        return deletedBook;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}
