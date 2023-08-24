import { ICreateCommunity } from "@/src/interfaces/interface";
import { postCommunity } from "@/src/service/community/postCommunity";
import { ObjectId } from "mongodb";

const TAG = 'TEST (CREATE-COOKIE): ';

export async function createCommunityForTest(
    user:{
        id: string,
        name: string
        email: string,
        image: string
    },
    communityName: string
) {
    try {
        const newCommunity: ICreateCommunity = {
            name: communityName,
            description: 'description',
            communityGenre: 'terror',
            is_admin: user.id
        }
        const communityTest = await postCommunity(user, newCommunity);
        return communityTest;
    } catch (e: any) {
        console.log(TAG, e);
    }
}
