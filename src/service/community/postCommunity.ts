import { ICreateCommunity } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";
import { createCommunity } from "@/src/repository/community/createCommunityRepo";
import { CustomError } from "@/src/utils/customError";

export async function postCommunity(user: {id: string, name: string}, request: ICreateCommunity) {
    // try {
    const body = {
        _id: new ObjectId(),
        name: request.name,
        description: request.description,
        favoriteBook: "",
        image: "",
        is_admin: user.id,
        members: [
            {
                id: user.id,
                name: user.name
            }
        ]
    };
    const response = await createCommunity(body);
    if (!response) {
        throw new CustomError("Erro na criação da comunidade", 500);
    }
    delete response._id;
    return response;
    // } catch (e: any) {
    //     throw e;
    // }
}
