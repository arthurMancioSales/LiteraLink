import { getallCommunityRepo } from "@/src/repository/community/getallCommunityRepo";
import { CustomError } from "@/src/utils/customError";

const TAG = "SERVICE(GET_all): community ";

export async function getAllCommunities() {
    try {
        const response = await getallCommunityRepo();
        if (!response || response.length === 0) {
            throw new CustomError("Não há comunidades cadastradas", 404);
        }
        return response;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }

}
