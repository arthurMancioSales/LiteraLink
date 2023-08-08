import { CustomError } from "../../utils/customError";
import { getCommunityByNameRepo } from "@/src/repository/community/getCommunityByNameRepo";

const TAG = "SERVICE(GET): community ";

export async function getCommunity(communityId: string) {
    try {
    const findCommunity = await getCommunityByNameRepo(communityId);
    if (findCommunity) {
        return findCommunity;
    }
    throw new CustomError("Error: Comunidade não encontrada", 404);
    } catch (error: any) {
        console.log(TAG, error);
        if (!error.status) {
            error.status = 500;
        }
        throw error;
    }
}
