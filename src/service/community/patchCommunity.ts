import { IFormatedResquestCommunity, IPatchCommunity } from "@/src/interfaces/interface";
import { checkExistingCommunityName } from "@/src/repository/community/checkers/checkCommunityRepo";
import { checkIsAdminCommunity } from "@/src/repository/community/checkers/checkIsAdminCommunityRepo";
import { patchCommunityRepo } from "@/src/repository/community/patchCommunityRepo";
import { CustomError } from "@/src/utils/customError";

const TAG = "SERVICE(PATCH): community ";

export async function patchCommunity(user_id: string, body: IPatchCommunity) {
    try {
        if (body.name) {
            const verifyName = await checkExistingCommunityName(body.name);
            if (verifyName) {
                throw new CustomError("Esse nome de comunidade já está em uso", 400);
            }
        }

        const verify_isAdmin = await checkIsAdminCommunity(user_id, body.oldName);
        if (!verify_isAdmin) {
            throw new CustomError("Usuário não é administrado da comunidade", 403);
        }
        
        const request = formattedRequest(body);
        const responseDB = await patchCommunityRepo(body.oldName, request);
        if (!responseDB) {
            throw new CustomError("Ocorreu um erro na atualização da comunidade", 500);
        }
        return formattedResponse(responseDB);
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    }
}

function formattedRequest (request: any) {
    const formattedBody: IFormatedResquestCommunity = {};
    if (request.name) {
        formattedBody.name = request.name;
    }
    if (request.description) {
        formattedBody.description = request.description;
    }
    if (request.favoriteBook) {
        formattedBody.favoriteBook = request.favoriteBook;
    }
    if (request.image) {
        formattedBody.image = request.image;
    }

    if (request.is_admin) {
        formattedBody.is_admin = request.is_admin;
    }
    if (request.members) {
        formattedBody.members = request.members;
    }
    return formattedBody;
}

function formattedResponse (response: any) {
    const formattedBody = {
        name: response.name,
        description: response.description,
        favoriteBook: response.favoriteBook,
        image: response.image,
        is_admin: response.is_admin,
        members: response.members
    };
    return formattedBody;
}
