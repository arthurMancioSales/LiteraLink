import { createUser } from "@/src/repository/user/createUser";
import { CustomError } from "../../utils/customError";
import { INewUser } from "@/src/interfaces/interface";
// import bcrypt from "bcrypt";
import { checkExistingCredentials } from "@/src/repository/user/checkUserCredentials";

export async function registerUser( requestUser: INewUser ) {
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
        // const hashedPassword = await bcrypt.hash(requestUser.password, 10);
        const newUser : INewUser = {
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
        const res = await createUser(newUser);
        return res; 
    }
}
