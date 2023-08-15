import { deleteBookFromUser } from "@/src/repository/book/deleteBook";
import { findUserByIdRepo } from "@/src/repository/user/findUserByIdRepo";
import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { findBook } from "../../repository/book/findBook";

const TAG = "SERVICE(DELETE): book ";

export async function deleteBook(id: ObjectId, bookId: string) {
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
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
