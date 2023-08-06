import { CustomError } from "../../utils/customError";
import { findUserByNameRepo } from "@/src/repository/user/findUserByNameRepo";

const TAG = "SERVICE(GET): USER ";

export async function getUserByName(user_name: string) {
    try {
        const responseDB = await findUserByNameRepo(user_name);
        if (!responseDB) {
            throw new CustomError("Error: Usuário não encontrado", 404);
        }
        return responseDB;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}
