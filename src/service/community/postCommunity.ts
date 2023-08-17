import { ICreateCommunity } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";
import { createCommunityRepo } from "@/src/repository/community/createCommunityRepo";
import { CustomError } from "@/src/utils/customError";
import { checkExistingCommunityName } from "@/src/repository/community/checkers/checkCommunityRepo";
import { findUserByIdRepo } from "@/src/repository/user/findUserByIdRepo";
import { communityFormattedResponse } from "@/src/utils/formattedResponse";

const TAG = "SERVICE(POST): community ";

const avaliableGenres = ["Ficcao", "Fantasia", "Terror", "Romance", "Drama", "Aventura", "Historico", "Biografia", "Autoajuda", "Poesia"];

export async function postCommunity(user: {id: string, name: string, image: string}, request: ICreateCommunity) {
    try {
        const userObjectId = ObjectId.createFromHexString(user.id);
        const userDB = await findUserByIdRepo(userObjectId);
        if (!userDB) {
            throw new CustomError("Usuário não encontrado", 404);
        }
        const checkCommunityName = await checkExistingCommunityName(request.name);
        if (checkCommunityName) {
            throw new CustomError("Nome da comunidade já está em uso", 403);
        }
        if (!(avaliableGenres.includes(request.communityGenre))) {
            throw new CustomError("Gênero literário inválido", 403);
        }
        const body = {
            _id: new ObjectId(),
            name: request.name,
            description: request.description,
            communityGenre: request.communityGenre,
            image: request.image,
            is_admin: user.id,
            members: [
                {
                    id: user.id,
                    name: user.name,
                    image: user.image
                }
            ]
        };
        const response = await createCommunityRepo(userObjectId, body);
        if (!response) {
            throw new CustomError("Erro na criação da comunidade", 500);
        }
        return communityFormattedResponse(response);
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
