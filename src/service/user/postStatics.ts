import { IStatistic } from "@/src/interfaces/interface";
import { CustomError } from "../../utils/customError";
import { findUserByIdRepo } from "@/src/repository/user/findUserRepo";
import { ObjectId } from "mongodb";
import { updateStatistics } from "@/src/repository/user/updateStatisticsRepo";

const TAG = "SERVICE(POST): USER ";

export async function postStatics(userId: ObjectId , body: IStatistic) {
    try {
        const user = await findUserByIdRepo(userId);
        if (!user) {
            throw new CustomError("Error: Usuário não encontrado", 404);
        }
        
        const updatedStatistics = await updateStatistics(user._id, body);
        return updatedStatistics;

    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    } 
}
