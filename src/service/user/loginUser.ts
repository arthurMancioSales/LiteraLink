import { loginRepo } from "@/src/repository/user/loginRepo";
import { CustomError } from "../../utils/customError";
import { verifyPassword } from "@/src/utils/verifyPassword";

const TAG = "SERVICE(POST): USER ";

export async function login (email: string, password: string ) {
    try {
        const user = await loginRepo(email);

        if (user) {
            const verifyHash = await verifyPassword(password, process.env.SALT!, user.password,);
            if (verifyHash) {
                return {id: user._id, name: user.name, image: user.image};
            }
            throw new CustomError("Senha ou Email incorreto!", 401);
        }
        throw new CustomError("O usuário não existe!", 404);
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
