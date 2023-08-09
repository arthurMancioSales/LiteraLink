import { createUserRepo } from "@/src/repository/user/createUserRepo";
import { CustomError } from "../../utils/customError";
import { INewUser } from "@/src/interfaces/interface";
import { checkExistingCredentials } from "@/src/repository/user/checkers/checkUserCredentials";
import { ObjectId } from "mongodb";
import { hashPassword } from "@/src/utils/hashPassword";
import imageUserDefault from "/public/images/user/default_user_image.jpg";

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
            const hashedPassword = await hashPassword(requestUser.password, process.env.SALT!);
            if (typeof(hashedPassword) !== "string") {
                throw new CustomError("Erro no hash da Senha", 500);
            }

            const newUser : INewUser = {
                _id: new ObjectId(),
                name: requestUser.name,
                email: requestUser.email,
                password: hashedPassword,
                image: imageUserDefault,
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
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
