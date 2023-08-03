import { IUserUpdate } from "@/src/interfaces/interface";
import { users } from "../../repository/users.js";
import { CustomError } from "../../utils/customError";

export async function updateUser (id: number | string, body: IUserUpdate) {
    try {
        const user = users.find(_user => _user._id === id);
        if (!user) {
            throw new CustomError("Usuário não encontrado!", 404);
        }
        const index =  users.indexOf(user);
        Object.assign(user, body);
        users[index] = user;
        return users[index];
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}
