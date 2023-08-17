import { createUserRepo } from "@/src/repository/user/createUserRepo";
import { CustomError } from "../../utils/customError";
import { INewUser } from "@/src/interfaces/interface";
import { checkExistingCredentials } from "@/src/repository/user/checkers/checkUserCredentials";
import { ObjectId } from "mongodb";
import { hashPassword } from "@/src/utils/hashPassword";
import imageUserDefault from "@/public/images/user/default_user_image.jpg";
import { dateNow } from "@/src/utils/dateCorrect";

const TAG = "SERVICE(POST): USER ";

export async function registerUser( requestUser: INewUser ) {
    try {
        Object.entries(requestUser).forEach(([key, value]) => {
            if (value === undefined || value === "")
                switch (key) {
                    case "email":
                        throw new CustomError("Error: email missing.", 400);
                    case "password":
                        throw new CustomError("Error: password missing.", 400);
                    case "name":
                        throw new CustomError("Error: name missing.", 400);
                }
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
                image: "/images/user/default_user_image.jpg",
                communities: [],
                books: [],
                statistics: {
                    lastSequence: dateNow(),
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
