import { CustomError } from "../../../utils/customError";
import { ObjectId } from "mongodb";
import { IGoals, IGoalsType } from "@/src/interfaces/interface";
import { findBookByUserIdRepo } from "@/src/repository/book/findBookByUserIdRepo";
import { userFormattedResponse } from "@/src/utils/formattedResponse";
import { updateParcialGoalOfBookRepo } from "@/src/repository/book/goals/updateParcialGoalOfBookRepo";
import { deleteGoalOfBookRepo } from "@/src/repository/book/deleteGoalOfBookRepo";
import { findUserByIdRepo } from "@/src/repository/user/findUserByIdRepo";
import { dateNow } from "@/src/utils/dateCorrect";

const TAG = "SERVICE(POST-goals): book ";

export async function patchGoalParcialProgress(
    id: ObjectId,
    bookId: string,
    requestBody: {
        type: IGoalsType,
        partial: number,
        createDate?: Date,
        lastVisitDate?: Date
        total?: number
    }[]
) {
    try{
        const oldBook = await findBookByUserIdRepo(id, bookId);
        if (!oldBook) {
            throw new CustomError('Livro não encontrado', 404);
        }
        if (oldBook.goals.length === 0) {
            throw new CustomError('Não existe metas para atulizar', 400);            
        }
        requestBody = requestBody.filter(element => element.type !== 'days');
        requestBody.forEach((element, index) => {
            const oldGoal = oldBook.goals.find((goal: IGoals) => goal.type === element.type);
            if (!oldGoal) {
                throw new CustomError(
                    `Não existe essa meta para atulizar do tipo ${element.type}`,
                    400
                );      
            }
            requestBody[index] = {
                ...oldGoal,
                partial: oldGoal.partial + element.partial,
                lastVisitDate: dateNow()
            }
        });

        await updateParcialGoalOfBookRepo(id, bookId, requestBody);
        const newBook = await findBookByUserIdRepo(id, bookId);
        await verifyCompleteGoals(id, bookId, newBook.goals)

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

async function verifyCompleteGoals(
    id: ObjectId,
    bookId: string,
    goals: IGoals[]
) {
    for (const element of goals) {
        if (element.partial >= element.total) {
            await deleteGoalOfBookRepo(id, bookId, element.type);
        }
    }
}