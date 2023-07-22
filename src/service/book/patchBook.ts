import { IBook } from "@/src/interfaces/interface";
import { users } from "@/src/repository/users";
import { CustomError } from "../../utils/customError";


export async function patchBook(id: string | number, body: IBook) {
    try{
        const user = users.find(userBook => userBook._id == id);
        if (!user) {
            throw new CustomError('Error: Usuário não encontrado!', 404);
        }
        const indexUser = users.indexOf(user);
        const userBooks = user.books;
        const book = userBooks.find(item => item.id == body.id);
        if (!book) {
            throw new CustomError('Error: Livro não encontrado!', 404);
        }
        const indexBook = userBooks.indexOf(book);
        Object.assign(book, body);
        userBooks[indexBook] = book;
        user.books = userBooks;
        users[indexUser] = user;
        return users[indexUser];
    } catch (e: any) {
        throw e;
    }
}