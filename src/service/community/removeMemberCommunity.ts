import { checkIsAdminCommunity } from "@/src/repository/community/checkers/checkIsAdminCommunityRepo";
import { isMember } from "@/src/repository/community/checkers/isMember";
import { removeMemberCommunityRepo } from "@/src/repository/community/removeMemberCommunityRepo";
import { CustomError } from "@/src/utils/customError";
import { userFormattedResponse } from "@/src/utils/formattedResponse";

const TAG = "SERVICE(DELETE-Member): community ";

export async function removeMemberFromCommunity(user:{id:string, name:string}, community_name:string) {
    try {
        const is_member = await isMember(user.name, community_name);
        if (!is_member){
            throw new CustomError("Esse usuário não faz parte dessa comunidade", 403);
        }
        const is_admin = await checkIsAdminCommunity(user.id, community_name);
        if (is_admin) {
            throw new CustomError("O usuário é administrador da comunidade", 403);
        }
        const responseDB = await removeMemberCommunityRepo(user, community_name);
        if (!responseDB) {
            throw new CustomError("Erro ao procurar o membro", 500);
        }
        return userFormattedResponse(responseDB);  
    } catch (error: any) {
        console.log(TAG, error);
        if (!error.status) {
            error.status = 500;
        }
        throw error;
    }
}
