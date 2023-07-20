import { IStatistic } from "@/src/interfaces/interface";
import { users } from "@/src/repository/users";
import { CustomError } from "../customError";

export async function postStatics(id: number | string, body: IStatistic) {
    try {
        const user = users.find(userFind => userFind._id == id);
        if (!user) {
            throw new CustomError('Error: Usuário não encontrado', 404);
        }
        const index = users.indexOf(user);
        const statistics = user.statistics;
        Object.assign(statistics, body);
        users[index].statistics = statistics;
        return users[index].statistics;
    } catch (e: any) {
        throw e;
    } 
};
