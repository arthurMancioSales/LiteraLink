import { deleteBookById, users } from "@/src/repository/users";
import { CustomError } from "../../utils/customError";


export async function deleteBook(id: string | number, bookId: number | string) {
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
    
}
