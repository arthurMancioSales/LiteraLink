import { IPatchBook } from "@/src/interfaces/interface";
import { ObjectId } from "mongodb";
import { updateBookRepo } from "@/src/repository/book/updateBookRepo";
import { userFormattedResponse } from "@/src/utils/formattedResponse";
import { bookFormattedRequestRepo } from "@/src/utils/formattedRequest";

const TAG = "SERVICE(PATCH): book ";

export async function patchBook(id: string , body: IPatchBook) {
    try{
        const userObjectId = ObjectId.createFromHexString(id);
        const requestBodyRepo = bookFormattedRequestRepo(body);
        const responseDB = await updateBookRepo(userObjectId, body.id, requestBodyRepo);
        return userFormattedResponse(responseDB);
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
