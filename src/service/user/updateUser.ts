import { IUserUpdate } from "@/src/interfaces/interface";
import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { updateUserRepo } from "@/src/repository/user/updateUserRepo";

const TAG = "SERVICE(PATCH): USER ";

export async function updateUser (id: string, body: IUserUpdate) {
    try {
        const userObjectId = ObjectId.createFromHexString(id);
        const responseDB = await updateUserRepo(userObjectId, body);
        if (!responseDB) {
            throw new CustomError('Erro na busca dos dados do usuário', 500);
        }
        return responseDB;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}
