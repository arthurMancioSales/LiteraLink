import { IPatchBook } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";
import { updateBookRepo } from "@/src/repository/book/updateBookRepo";
import { userFormattedResponse } from "@/src/utils/formattedResponse";
import { bookFormattedRequestRepo } from "@/src/utils/formattedRequest";
import { CustomError } from "@/src/utils/customError";
import { findBookByUserIdRepo } from "@/src/repository/book/findBookByUserIdRepo";
import { patchGoalParcialProgress } from "./goals/patchGoalParcialProgress";

const TAG = "SERVICE(PATCH): book ";

export async function patchBook(id: string , body: IPatchBook) {
    try{
        const userObjectId = ObjectId.createFromHexString(id);
        const requestBodyRepo = bookFormattedRequestRepo(body);
        if ('pagesRead' in requestBodyRepo) {
            const oldBook = await findBookByUserIdRepo(userObjectId, body.id);
            if (!oldBook) {
                throw new CustomError("Livro não enccontrado.", 404);
            }
            if (requestBodyRepo.pagesRead! > 0) {
                requestBodyRepo.status = 'lendo';
            }
            requestBodyRepo.pagesRead += oldBook.pagesRead;
            if (requestBodyRepo.pagesRead! >= oldBook.totalPages) {
                requestBodyRepo.status = 'lido';
                requestBodyRepo.pagesRead = oldBook.totalPages;
            }
        }

        if (body.goals) {
            const updateGoals = await patchGoalParcialProgress(
                new ObjectId(id),
                body.id,
                body.goals
            );
            if (!updateGoals) {
                throw new CustomError("Erro na atualização da Meta", 500);
            }
        }
        const responseDB = await updateBookRepo(userObjectId, body.id, requestBodyRepo);
        return userFormattedResponse(responseDB);
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
