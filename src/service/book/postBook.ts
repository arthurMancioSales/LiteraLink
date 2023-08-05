import { IBook } from "@/src/interfaces/interface";
import { insertBook } from "@/src/repository/book/insertBook";
import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { findUserById } from "@/src/repository/user/findUser";


export async function postBook(id: ObjectId, requestBook : IBook) {
    const user = await findUserById(id);
    if (!user) {
        throw new CustomError("Error: Usuário não encontrado!", 404);
    }
    else {
        const indexUser = user.id as unknown as ObjectId;

        const book : IBook = {
            id: new ObjectId(),
            title: requestBook.title,
            image: "",
            status: "ler",
            totalChapter: requestBook.totalChapter,
            chaptersRead: undefined,
            favorite: false,
            lastSequence: new Date,
            goalExpire: new Date,
            goals: [],
            goalsAchieved: 0,
        };
        const insertedBook = await insertBook(indexUser, book);
        return insertedBook;
    }
const TAG = "SERVICE(POST): book ";

// export async function postBook(id: string | number, body : IBook) {
//     try{
//         const user = users.find(userBook => userBook._id == id);
//         if (!user) {
//             throw new CustomError("Error: Usuário não encontrado!", 404);
//         }
//         const indexUser = users.indexOf(user);
//         const insertedBook = insertBook(indexUser, body);
//         return insertedBook;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }

}
