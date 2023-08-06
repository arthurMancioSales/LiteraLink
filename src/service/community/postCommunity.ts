import { ICreateCommunity } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";
import { createCommunityRepo } from "@/src/repository/community/createCommunityRepo";
import { CustomError } from "@/src/utils/customError";
import { getUserRepo } from "@/src/repository/user/getUserRepo";
import { checkExistingCommunityName } from "@/src/repository/community/checkers/checkCommunityRepo";


const TAG = "SERVICE(POST): community ";

export async function postCommunity(user: {id: string, name: string}, request: ICreateCommunity) {
    try {
        const userObjectId = ObjectId.createFromHexString(user.id);
        const userDB = await getUserRepo(userObjectId);
        if (!userDB) {
            throw new CustomError("Usuário não encontrado", 404);
        }
        const checkCommunityName = await checkExistingCommunityName(request.name);
        if (checkCommunityName) {
            throw new CustomError("Nome da comunidade já está em uso", 403);
        }
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
        const response = await createCommunityRepo(userObjectId, body);
        if (!response) {
            throw new CustomError("Erro na criação da comunidade", 500);
        }
        return reponseCommunity(response);
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
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
