import { ObjectId } from "mongodb";
import { CustomError } from "../../utils/customError";
import { findUserByIdRepo } from "@/src/repository/user/findUserRepo";

const TAG = "SERVICE(GET): USER ";

export async function getUserById(user_id: string) {
    try {
        const userObjectId = ObjectId.createFromHexString(user_id);
        const responseDB = await findUserByIdRepo(userObjectId);
        if (!responseDB) {
            throw new CustomError("Error: Usuário não encontrado", 404);
        }
        return responseDB;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}