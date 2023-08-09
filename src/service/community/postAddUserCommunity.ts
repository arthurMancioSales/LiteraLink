import { isMember } from "@/src/repository/community/checkers/isMember";
import { addUserToCommunityRepo } from "@/src/repository/community/postAddRepo";
import { CustomError } from "@/src/utils/customError";
import { userFormattedResponse } from "@/src/utils/formattedResponse";

const TAG = "SERVICE(POST-ADD): community ";

export async function postAddUserCommunity(user:{id:string, name: string }, community_name: string) {
    try {
        const is_member = await isMember(user.name, community_name);
        if (is_member){
            throw new CustomError("Esse usuário já faz parte dessa comunidade", 403);
        }

        const responseDB = await addUserToCommunityRepo(user, community_name);
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
