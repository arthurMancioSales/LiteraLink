import { communities } from "@/src/repository/community";
import { CustomError } from "../../utils/customError";

export async function getCommunity(communityId: number | string) {
    // try {
    const findCommunity = communities.find(community => community._id == communityId);
    if (findCommunity) {
        return findCommunity;
    }
    throw new CustomError("Error: Comunidade não encontrada", 404);
    // } catch (e: any) {
    //     throw e;
    // }
}
