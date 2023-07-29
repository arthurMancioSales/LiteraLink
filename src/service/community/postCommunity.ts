import { ICreateCommunity } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";
import { createCommunity } from "@/src/repository/community/createCommunityRepo";
import { CustomError } from "@/src/utils/customError";

export async function postCommunity(user: {id: string, name: string}, request: ICreateCommunity) {
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
    return reponseCommunity(response);
}

function reponseCommunity(community: any) {
    const response = {
        name: community.name,
        description: community.description,
        favoriteBook: community.favoriteBook,
        image: community.image,
        is_admin: community.is_admin,
        members: community.members
    };
    return response;
}
