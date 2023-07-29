import { getallCommunity } from "@/src/repository/community/getallCommunityRepo";
import { CustomError } from "@/src/utils/customError";

export async function getAllCommunities() {
    const response = await getallCommunity();
    if (!response || response.length === 0) {
        throw new CustomError("Não há comunidades cadastradas", 404);
    }
    return response;
}
