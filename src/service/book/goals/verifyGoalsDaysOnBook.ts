import { ObjectId } from "mongodb";
import { verifyGoalDaysOnBookRepo } from "@/src/repository/book/goals/verifyGoalDaysOnBookRepo";
import { IBook, IGoals } from "@/src/interfaces/interface";
import { updateGoalDaysRepo } from "@/src/repository/book/goals/updateGoalDaysRepo";
import { dateNow } from "@/src/utils/dateCorrect";

const TAG = "SERVICE(VerifyDays-goals): book ";

const one_DayInMilisseconds = 24 * 60 * 60 * 1000;
const two_DayInMilisseconds = one_DayInMilisseconds*2;
const date_now = dateNow();

export async function verifyGoalsDaysOnBook(
    id: ObjectId,
    bookID:string
) {
    try{
        const booksGoalsDays = await verifyGoalDaysOnBookRepo(id);
        if (booksGoalsDays.length !== 0) {
            const books = booksGoalsDays[0].books;
            const book = books.find((iten:IBook) => iten.id === bookID);
            if (book) {
                const goal = book.goals.find((goal: IGoals) => goal.type === "days");
                const lastVisit:Date = new Date(goal.lastVisitDate);
                const operation = Math.abs(date_now.getTime() - lastVisit.getTime());

                await verifyOPGoalDays(
                    id,
                    goal,
                    book.id,
                    operation
                );
            }
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


async function verifyOPGoalDays(
    id: ObjectId,
    goal: IGoals,
    bookId: string,
    op: number,
) {

    if (op < one_DayInMilisseconds) {
        if (goal.partial === 0) {
            const requestBody: IGoals = {
                ...goal,
                lastVisitDate: dateNow(),
                partial: goal.partial+1
            };
            await updateGoalDaysRepo(
                id,
                bookId,
                requestBody
            );
        }
        return;
    }
    if (
        op > one_DayInMilisseconds && 
        op < two_DayInMilisseconds
    ) {
        const requestBody: IGoals = {
            ...goal,
            lastVisitDate: dateNow(),
            partial: goal.partial+1
        };
        await updateGoalDaysRepo(
            id,
            bookId,
            requestBody
        );
        return;
    }
    if (op > two_DayInMilisseconds) {
        const requestBody: IGoals = {
            ...goal,
            lastVisitDate: dateNow(),
            partial: 0
        };
        await updateGoalDaysRepo(
            id,
            bookId,
            requestBody
        );
    }
    return;
}