import { CustomError } from "../../utils/customError";
import { getCommunityByIdRepo } from "@/src/repository/community/getCommunityByIdRepo";

const TAG = "SERVICE(GET): community ";

export async function getCommunity(communityId: string) {
    try {
    const findCommunity = await getCommunityByIdRepo(communityId);

    // export async function getCommunity(communityName: string) {
    //     // try {
    //     const findCommunity = communities.find(community => community.name == communityName);

    if (findCommunity) {
        return findCommunity;
    }
    throw new CustomError("Error: Comunidade não encontrada", 404);
    } catch (error: any) {
        console.log(TAG, error);
        throw error;
    }
}
