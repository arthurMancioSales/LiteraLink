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

        // const insertedUser ={
        //     id: userID,
        //     name: user.name,
        //     email: user.email,
        //     image: user.image
        // }
        const newCommunity: ICreateCommunity = {
            name: communityName,
            description: 'description',
            communityGenre: 'Terror',
            is_admin: user.id,
            image: '/imagem/comunidade'
        }
        const communityTest = await postCommunity(user, newCommunity);
        console.log(communityTest, 'comunidade');
        return communityTest;
    } catch (e: any) {
        console.log(TAG, e);
    }
}
