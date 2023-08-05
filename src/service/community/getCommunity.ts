import { CustomError } from "../../utils/customError";
import { ObjectId } from "mongodb";
import { getCommunityById } from "@/src/repository/community/getCommunityById";


export async function getCommunity(communityId: ObjectId) {
    // try {
    const findCommunity = await getCommunityById(communityId);

    // export async function getCommunity(communityName: string) {
    //     // try {
    //     const findCommunity = communities.find(community => community.name == communityName);

    if (findCommunity) {
        return findCommunity;
    }
    throw new CustomError("Error: Comunidade não encontrada", 404);
}
