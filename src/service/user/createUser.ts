import { createUserRepo } from "@/src/repository/user/createUserRepo";
import { CustomError } from "../../utils/customError";
import { INewUser } from "@/src/interfaces/interface";
// import bcrypt from "bcrypt";
import { checkExistingCredentials } from "@/src/repository/user/checkers/checkUserCredentials";
import { ObjectId } from "mongodb";
// import { ObjectId } from "mongodb";

const TAG = "SERVICE(POST): USER ";

export async function registerUser( requestUser: INewUser ) {
    try {
        Object.entries(requestUser).forEach(([key, value]) => {
            if (value === undefined || value === "")
                throw new CustomError("Error: missing information.", 400);
        }); 
        const matchingCredentials = await checkExistingCredentials(requestUser.email, requestUser.name);
    
        if(matchingCredentials === "Email") {
            throw new CustomError("Error: email already taken", 409);
        }
        else if (matchingCredentials === "Username") {
            throw new CustomError("Error: username already taken", 409);
        } else {
            // const hashedPassword = await bcrypt.hash(requestUser.password, 10);
            const newUser : INewUser = {
                _id: new ObjectId(),
                name: requestUser.name,
                email: requestUser.email,
                password: requestUser.password,
                image: "",
                communities: [],
                books: [],
                statistics: {
                    lastSequence: new Date,
                    readingTime: 0,
                    maxSequence: 0,
                    booksRead: 0,
                    actualSequence: 0,
                    goalsAchieved: 0,
                },
            };
            const res = await createUserRepo(newUser);
            return res; 
        }
    } catch (e : any) {
        console.log(TAG, e);
        throw e;
    }
}
