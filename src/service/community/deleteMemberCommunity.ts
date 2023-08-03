import { checkIsAdminCommunity } from "@/src/repository/community/checkIsAdminCommunityRepo";
import { isMember } from "@/src/repository/community/isMember";
import { removeMemberCommunityRepo } from "@/src/repository/community/removeMemberCommunityRepo";
import { CustomError } from "@/src/utils/customError";

const TAG = "SERVICE(DELETE-Member): community ";


export async function removeCommunity(user:{id:string, name:string}, community_name:string) {
    try {
        const is_member = await isMember(user.name, community_name)
        if (!is_member){
            throw new CustomError('Esse usuário não faz parte dessa comunidade', 403);
        }
        const is_admin = await checkIsAdminCommunity(user.id, community_name);
        if (is_admin) {
            throw new CustomError('O usuário é administrador da comunidade', 403)
        }
        const responseDB = await removeMemberCommunityRepo(user, community_name);
        if (!responseDB) {
            throw new CustomError('Erro ao procurar o membro', 500);
        }
        return formattedResponse(responseDB);  
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    }
}

function formattedResponse(responseDB: any){
    const response = {
        name: responseDB.name,
        email: responseDB.email,
        image: responseDB.image,
        communities: responseDB.communities,
        books: responseDB.books,
        statistics: responseDB.statistics 
    }
    return response;
}