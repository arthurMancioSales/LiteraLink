import { users } from "@/src/repository/users";
import { communities } from "@/src/repository/community";
import { CustomError } from "../../utils/customError";

const TAG = "SERVICE(GET): QUERY ";

export async function getQuery(query: string) {
    try {
        const User = users.filter(item => item.name.includes(query));
        const Community = communities.filter(item => item.name.includes(query));
        if ((User.length === 0) && (Community.length === 0)) {
            throw new CustomError("Nada foi encontrado", 404);
        }
        const response = {
            users: User,
            comunity: Community
        };
        return response;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}
