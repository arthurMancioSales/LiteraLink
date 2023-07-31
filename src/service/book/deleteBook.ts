import { deleteBookFromUser } from "@/src/repository/book/deleteBook";
import { findUserById } from "@/src/repository/user/findUser";
import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { findBook } from "./findBook";


export async function deleteBook(id: ObjectId, bookId: ObjectId) {
    const user = await findUserById(id);
    if (!user) {
        throw new CustomError("Error: Usuário não encontrado!", 404);
    }
    const book = await findBook(id, bookId);
    if (!book) {
        throw new CustomError("Error: Livro não encontrado!", 404);
    }
    const deletedBook =  deleteBookFromUser(id, bookId);
    return deletedBook;
    
}
