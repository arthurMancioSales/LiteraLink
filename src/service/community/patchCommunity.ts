import { IPatchCommunity } from "@/src/interfaces/interface";
import { checkExistingCommunityName } from "@/src/repository/community/checkers/checkCommunityRepo";
import { checkIsAdminCommunity } from "@/src/repository/community/checkers/checkIsAdminCommunityRepo";
import { patchCommunityRepo } from "@/src/repository/community/patchCommunityRepo";
import { CustomError } from "@/src/utils/customError";
import { CommunityFormattedRequest } from "@/src/utils/formattedRequest";
import { communityFormattedResponse } from "@/src/utils/formattedResponse";

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
        
        const request = CommunityFormattedRequest(body);
        const responseDB = await patchCommunityRepo(body.oldName, request);
        if (!responseDB) {
            throw new CustomError("Ocorreu um erro na atualização da comunidade", 500);
        }
        return communityFormattedResponse(responseDB);
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    }
}