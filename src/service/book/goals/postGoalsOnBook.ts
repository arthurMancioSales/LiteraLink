import { CustomError } from "../../../utils/customError";
import { ObjectId } from "mongodb";
import { IGoals } from "@/src/interfaces/interface";
import { findBookByUserIdRepo } from "@/src/repository/book/findBookByUserIdRepo";
import { addGoalToBookRepo } from "@/src/repository/book/goals/addGoalToBookRepo";
import { userFormattedResponse } from "@/src/utils/formattedResponse";

const TAG = "SERVICE(POST-goals): book ";

export async function postGoalsOnBook(
    id: ObjectId,
    bookId: string,
    requestBody: IGoals[]
) {
    try{
        const oldBook = await findBookByUserIdRepo(id, bookId);
        if (!oldBook) {
            throw new CustomError('Livro não encontrado', 404);
        }
        if (oldBook.goals.length > 0) {
            requestBody = hasSameTypeObject(oldBook.goals, requestBody);
        }
        if (requestBody.length === 0) {
            throw new CustomError(
                `Só pode haver 2 tipos de metas, 
                'Semanal' e 'Minutos', as metas 2 já foram definidas para esse livro`,
                400
            );
        }
        const responseDB = await addGoalToBookRepo(id, bookId, requestBody);
        return userFormattedResponse(responseDB);
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}


function hasSameTypeObject(oldArray: IGoals[], requestArray: IGoals[]) {
    const hasSameType = requestArray.some(item2 => oldArray.some(item1 => item1.type === item2.type));
  
    if (hasSameType) {
        return requestArray.filter(item2 => !oldArray.some(item1 => item1.type === item2.type));
    }

    return requestArray;
}