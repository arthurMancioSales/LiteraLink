import { IUserUpdate } from "@/src/interfaces/interface";
import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { updateUserRepo } from "@/src/repository/user/updateUserRepo";
import { hashPassword } from "@/src/utils/hashPassword";
import { checkUserNameRepo } from "@/src/repository/user/checkers/checkUserNameRepo";
import { checkUserEmailRepo } from "@/src/repository/user/checkers/checkUserEmailRepo";

const TAG = "SERVICE(PATCH): USER ";

export async function updateUser (user_id: string, body: IUserUpdate) {
    try {
        const userObjectId = ObjectId.createFromHexString(user_id);
        if (body.name) {
            const verifyName = await checkUserNameRepo(userObjectId, body.name);
            if (verifyName) {
                throw new CustomError("Esse Apelido já está em uso", 403);
            }
        }
        if (body.email) {
            const verifyEmail = await checkUserEmailRepo(userObjectId, body.email);
            if (verifyEmail) {
                throw new CustomError("Esse Email já está em uso", 403);
            }
        }
        if (body.password) {
            const hashNewPassword = await hashPassword(body.password, process.env.SALT!);
            if (typeof(hashNewPassword) !== "string") {
                throw new CustomError("Erro ao fazer o hash da nova senha", 500);
            }
            body.password = hashNewPassword;
        }
        const responseDB = await updateUserRepo(userObjectId, body);
        if (!responseDB) {
            throw new CustomError("Erro na busca dos dados do usuário", 500);
        }
        return responseDB;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}
