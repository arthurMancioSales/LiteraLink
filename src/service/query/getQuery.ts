import { CustomError } from "../../utils/customError";
import { getQueryRepo } from "@/src/repository/query/getQueryRepo";

const TAG = "SERVICE(GET): QUERY ";

export async function getQuery(query: string) {
    try {
        const response =  await getQueryRepo(query);
        return response;
    } catch (e: any) {
        console.log(TAG, e);
        if (!e.status) {
            e.status = 500;
        }
        throw e;
    }
}
