import { IBook } from "@/src/interfaces/interface";
import { insertBook, users } from "@/src/repository/users";
import { CustomError } from "../../utils/customError";

export async function postBook(id: string | number, body : IBook) {
    const user = users.find(userBook => userBook._id == id);
    if (!user) {
        throw new CustomError("Error: Usuário não encontrado!", 404);
    }
    const indexUser = users.indexOf(user);
    const insertedBook = insertBook(indexUser, body);
    return insertedBook;

}
