
import { CustomError } from "../../utils/customError";
import bcrypt from "bcrypt";
import { loginRepository } from "@/src/repository/user/loginRepository";

export async function login (email: string, password: string ) {
    try {
        const user = await loginRepository(email);
        if (user) {
            const isPasswordValid = bcrypt.compareSync(
                password,
                user.password
              );
            if (isPasswordValid) {
                return user._id;
            }
            throw new CustomError("Senha incorreta!", 401);
        }
        throw new CustomError("O usuário não existe!", 404);
    } catch (e: any) {
        console.log(e);
        throw e;
    }

}
