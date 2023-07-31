import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { getCommunityById } from "@/src/repository/community/getCommunityById";

export async function getCommunity(communityId: ObjectId) {
    // try {
    const findCommunity = await getCommunityById(communityId);
    if (findCommunity) {
        return findCommunity;
    }
    throw new CustomError("Error: Comunidade não encontrada", 404);
    // } catch (e: any) {
    //     throw e;
    // }
}
