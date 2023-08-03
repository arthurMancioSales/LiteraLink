import { communities } from "@/src/repository/community";
import { CustomError } from "../../utils/customError";

export async function getCommunity(communityName: string | number) {
    // try {
    const findCommunity = communities.find(community => community.name == communityName);
    if (findCommunity) {
        return findCommunity;
    }
    throw new CustomError("Error: Comunidade não encontrada", 404);
}
