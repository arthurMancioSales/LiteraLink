import { users } from "../../repository/users";
import { CustomError } from "../../utils/customError";

export async function login (email: string, password: string ) {
    try {
        const user = users.find(_user => _user.email === email);
        if (user) {
            if (user.password === password) {
                return user._id;
            }
            throw new CustomError("Error: Senha incorreta!", 401);
        }
        throw new CustomError("Error: O usuário não existe!", 404);
    } catch (e: any) {
        return e

    }
}
