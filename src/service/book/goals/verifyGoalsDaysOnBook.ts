import { ObjectId } from "mongodb";
import { verifyGoalDaysOnBookRepo } from "@/src/repository/book/goals/verifyGoalDaysOnBookRepo";
import { IGoals } from "@/src/interfaces/interface";
import { updateGoalDaysRepo } from "@/src/repository/book/goals/updateGoalDaysRepo";
import { dateNow } from "@/src/utils/dateCorrect";

const TAG = "SERVICE(POST-goals): book ";

const one_DayInMilisseconds = 24 * 60 * 60 * 1000;
const two_DayInMilisseconds = one_DayInMilisseconds*2;
const date_now = dateNow();
// const date_now = new Date('2023-08-16T23:59:00.000Z');

export async function verifyGoalsDaysOnBook(
    id: ObjectId,
) {
    try{
        const booksGoalsDays = await verifyGoalDaysOnBookRepo(id);
        if (booksGoalsDays.length !== 0) {
            let num = 1;

            for(const book of booksGoalsDays[0].books) {
                num += 1;
                const goal = book.goals.find((goal: IGoals) => goal.type === 'days')
                const lastVisit:Date = new Date(goal.lastVisitDate)
                const operation = Math.abs(date_now.getTime() - lastVisit.getTime()); 
                if (operation < one_DayInMilisseconds) {
                    continue;
                }
                if (
                    operation > one_DayInMilisseconds && 
                    operation < two_DayInMilisseconds
                ) {
                    const requestBody: IGoals = {
                        ...goal,
                        lastVisitDate: dateNow(),
                        partial: goal.partial+1
                    }
                    await updateGoalDaysRepo(
                        id,
                        book.id,
                        requestBody
                    );
                    continue;
                }
                if (operation > one_DayInMilisseconds*2) {
                    const requestBody: IGoals = {
                        ...goal,
                        lastVisitDate: dateNow(),
                        partial: 0
                    }
                    await updateGoalDaysRepo(
                        id,
                        book.id,
                        requestBody
                    );
                }
            };
        }
        return;
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}