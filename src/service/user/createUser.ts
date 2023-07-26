import { users } from "../../repository/users";
import { insertUser } from "../../repository/users";
import { CustomError } from "../../utils/customError";
import { INewUser, IUser } from "@/src/interfaces/interface";

export async function registerUser( requestUser: IUser ) {
    // refatorar, ta errado!   
    const user = users.find(_user => _user.email === requestUser.email);
    const id = users.find(_user => _user._id === requestUser.id); // temporario
    if(user) {
        throw new CustomError("Error: email já cadastrado.", 401);
    }
    if(id) {
        throw new CustomError("Error: id já está em uso.", 400);
    }
    if(requestUser.name === undefined || requestUser.email === undefined || requestUser.password === undefined) {
        throw new CustomError("Error: missing information.", 400);
    }
    else {
        // const newUser : INewUser = {
        //     name: requestUser.name,
        //     email: requestUser.email,
        //     password: requestUser.password,
        //     image: "",
        //     communities: [],
        //     books: [],
        //     statistics: {
        //         lastSequence: new Date,
        //         readingTime: 0,
        //         maxSequence: 0,
        //         actualSequence: 0,
        //         goalsAchieved: 0,
        //     },
        // };

        const insertedUser = insertUser(requestUser);
        console.log(insertedUser);
    }
   
}
