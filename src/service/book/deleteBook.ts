import { deleteBookById, users } from "@/src/repository/users";
import { CustomError } from "../../utils/customError";

const TAG = "SERVICE(DELETE): book ";

export async function deleteBook(id: string | number, bookId: number | string) {
    try {
        const user = users.find(userBook => userBook._id == id);
        if (!user) {
            throw new CustomError("Error: Usuário não encontrado!", 404);
        }
        const indexUser = users.indexOf(user);
        const userBooks = user.books;
        const book = userBooks.find(item => item.id == bookId);
        if (!book) {
            throw new CustomError("Error: Livro não encontrado!", 404);
        }
        const deletedBook =  deleteBookById(indexUser, book);
        return deletedBook;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}
