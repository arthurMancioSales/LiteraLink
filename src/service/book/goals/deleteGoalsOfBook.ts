import { CustomError } from "../../../utils/customError";
import { ObjectId } from "mongodb";
import { IGoals, IGoalsType } from "@/src/interfaces/interface";
import { findBookByUserIdRepo } from "@/src/repository/book/findBookByUserIdRepo";
import { userFormattedResponse } from "@/src/utils/formattedResponse";
import { deleteGoalOfBookRepo } from "@/src/repository/book/goals/deleteGoalOfBookRepo";
import { findUserByIdRepo } from "@/src/repository/user/findUserByIdRepo";

const TAG = "SERVICE(DALETE-goals): book ";

export async function deleteGoalsOfBook(
    id: ObjectId,
    bookId: string,
    requestBody: {type: IGoalsType}[]
) {
    try{
        const oldBook = await findBookByUserIdRepo(id, bookId);
        if (!oldBook) {
            throw new CustomError("Livro não encontrado", 404);
        }
        for (const element of requestBody){
            const oldGoal = oldBook.goals.find((goal: IGoals) => goal.type === element.type);
            if (!oldGoal) {
                throw new CustomError(
                    `Não existe essa meta para ser excluída, meta do tipo ${element.type}`,
                    400
                );      
            }
            await deleteGoalOfBookRepo(id, bookId, element.type);
        }
        const responseDB = await findUserByIdRepo(id);
        return userFormattedResponse(responseDB);
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
