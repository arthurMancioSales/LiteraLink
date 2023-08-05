import { CustomError } from "../../utils/customError";
import { loginRepository } from "@/src/repository/user/loginRepository";
// import bcrypt from 'bcrypt';

const TAG = "SERVICE(POST): USER ";

export async function login (email: string, password: string ) {
    try {
        const user = await loginRepository(email);
        if (user) {
            // const isPasswordValid = bcrypt.compareSync(
            //     password,
            //     user.password
            //   );
            if (user.password === password) {
                return {id: user._id, name: user.name};
            }
            throw new CustomError("Senha incorreta!", 401);
        }
        throw new CustomError("O usuário não existe!", 404);
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}
