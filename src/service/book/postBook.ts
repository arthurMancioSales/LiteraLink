import { IBook } from "@/src/interfaces/interface";
import { insertBook } from "@/src/repository/book/insertBook";
import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { findUserByIdRepo } from "@/src/repository/user/findUserRepo";
import { userFormattedResponse } from "@/src/utils/formattedResponse";

const TAG = "SERVICE(POST): book ";

export async function postBook(id: string, requestBook : IBook) {
    try {
        const userObjectId = ObjectId.createFromHexString(id);
        const user = await findUserByIdRepo(userObjectId);
        if (!user) {
            throw new CustomError("Error: Usuário não encontrado!", 404);
        }
        else {
            // OBS: estamos decidindo como iremos pegar esse livro;
            // Por enquanto a requisição a API externa será feita pelo front e inserida no back;
            const book : IBook = {
                id: requestBook.id,
                title: requestBook.title,
                image: imageExists(requestBook.image),
                status: "ler",
                totalChapter: requestBook.totalChapter,
                chaptersRead: undefined,
                favorite: false,
                lastSequence: new Date,
                goalExpire: new Date,
                goals: [],
                goalsAchieved: 0,
            };
            const insertedBook = await insertBook(userObjectId, book);
            return userFormattedResponse(insertedBook);
        }
    } catch (error: any) {
        console.log(TAG, error);
        if (!error.status) {
            error.status = 500;
        }
        throw error;
    }
}

function imageExists(image:string) {
    if (image){
        return image;
    }
    return '';
}

