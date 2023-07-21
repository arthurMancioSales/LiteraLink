import { users } from "../../repository/users";
import { CustomError } from "../customError";
import { IUser } from "@/src/interfaces/interface";

export async function registerUser( requestUser: IUser ) {
    try {
        const user = users.find(_user => _user.email === requestUser.email);
        const id = users.find(_user => _user.id === requestUser.id); // temporario
        if(user) {
            throw new CustomError("Error: email já cadastrado.", 401);
        }
        if(id) {
            throw new CustomError("Error: id já está em uso.", 400);
        }
        console.log(requestUser);

    } catch (error: any) {
        console.log(error);

    }
}
