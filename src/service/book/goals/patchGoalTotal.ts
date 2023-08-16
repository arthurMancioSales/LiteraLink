import { CustomError } from "../../../utils/customError";
import { ObjectId } from "mongodb";
import { IGoals, IGoalsType } from "@/src/interfaces/interface";
import { findBookByUserIdRepo } from "@/src/repository/book/findBookByUserIdRepo";
import { userFormattedResponse } from "@/src/utils/formattedResponse";
import { findUserByIdRepo } from "@/src/repository/user/findUserByIdRepo";
import { updateTotalGoalOfBookRepo } from "@/src/repository/book/goals/updateTotalGoalOfBookRepo";
import { dateNow } from "@/src/utils/dateCorrect";

const TAG = "SERVICE(POST-goals): book ";

export async function patchGoalTotal(
    id: ObjectId,
    bookId: string,
    requestBody: {
        type: IGoalsType,
        partial?: number,
        createDate?: Date,
        lastVisitDate?: Date
        total: number
    }
) {
    try{
        const oldBook = await findBookByUserIdRepo(id, bookId);
        if (!oldBook) {
            throw new CustomError('Livro não encontrado', 404);
        }
        if (oldBook.goals.length === 0) {
            throw new CustomError('Não existe metas para atulizar', 400);            
        }

        const oldGoal = oldBook.goals.find((goal: IGoals) => goal.type === requestBody.type);
        if (!oldGoal) {
            throw new CustomError('Não existe essa meta para atulizar', 400);      
        }
        requestBody = {
            ...oldGoal,
            total: requestBody.total,
            lastVisitDate: dateNow()
        }
        if (requestBody.total <= requestBody.partial!) {
            throw new CustomError(
                'Não é permitido colocar a meta total menor que a parcial',
                400
            );
        }
        await updateTotalGoalOfBookRepo(id, bookId, requestBody)
        const finalResponse = await findUserByIdRepo(id);
        if (!finalResponse) {
            throw new CustomError('Usuário não encontrado', 404);
        }
        return userFormattedResponse(finalResponse);
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
