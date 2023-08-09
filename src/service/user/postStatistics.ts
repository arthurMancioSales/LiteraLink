import { IStatistic } from "@/src/interfaces/interface";
import { users } from "@/src/repository/users";
import { CustomError } from "../../utils/customError";

const TAG = "SERVICE(POST): USER ";

export async function postStatistics(id: number | string, body: IStatistic) {
    try {
        const user = users.find(userFind => userFind._id == id);
        if (!user) {
            throw new CustomError("Error: Usuário não encontrado", 404);
        }
        const index = users.indexOf(user);
        const statistics = user.statistics;
        Object.assign(statistics, body);
        users[index].statistics = statistics;
        return users[index].statistics;
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    } 
}
