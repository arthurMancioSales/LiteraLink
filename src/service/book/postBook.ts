import { IBook } from "@/src/interfaces/interface";
import { insertBook } from "@/src/repository/book/insertBook";
import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { findUserById } from "@/src/repository/user/findUser";

const TAG = "SERVICE(POST): book ";

export async function postBook(id: ObjectId, requestBook : IBook) {
    try {
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
            return formattedResponse(insertedBook);
        }
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    }
}

function formattedResponse(updateUser: any) {
    const response = {
        name: updateUser.name,
        email: updateUser.email,
        image: updateUser.image,
        communities: updateUser.communities,
        books: updateUser.books,
        statistics: updateUser.statistics
    };
    return response;
}
