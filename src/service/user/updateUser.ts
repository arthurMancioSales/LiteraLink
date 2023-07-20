import { IUserUpdate } from "@/src/interfaces/interface";
import { users } from "../../repository/users";
import { CustomError } from "../customError";

export async function updateUser (id: number | string, body: IUserUpdate) {
    try {
        const user = users.find(_user => _user.id === id);
        if (user) {
            const index =  users.indexOf(user);
            Object.assign(user, body);
            users[index] = user;
            return user.id;
        }
        throw new CustomError("Error: Usuário não encontrado!", 404);
    } catch (e: any) {
        console.log(e);
        
    }
}
