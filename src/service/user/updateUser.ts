import { IUserUpdate } from "@/src/interfaces/interface";
import { users } from "../../repository/users";
import { CustomError } from "../customError";

export async function updateUser (id: number | string, body: IUserUpdate) {
    try {
        const user = users.find(_user => _user.id === id);
        

    } catch (e: any) {
        console.log(e);
        
    }
}
