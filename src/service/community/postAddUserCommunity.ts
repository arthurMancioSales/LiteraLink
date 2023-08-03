import { isMember } from "@/src/repository/community/isMember";
import { postAddRepo } from "@/src/repository/community/postAddRepo";
import { CustomError } from "@/src/utils/customError";
import { ObjectId } from "mongodb";

const TAG = "SERVICE(POST-ADD): community ";

export async function postAddUserCommunity(user:{id:string, name: string }, community_name: string) {
    try {
        const is_member = await isMember(user.name, community_name)
        if (is_member){
            throw new CustomError('Esse usuário já faz parte dessa comunidade', 403);
        }

        const responseDB = await postAddRepo(user, community_name);
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