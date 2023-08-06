import { CustomError } from "../../utils/customError";
import { getQueryRepo } from "@/src/repository/query/getQueryRepo";

const TAG = "SERVICE(GET): QUERY ";

export async function getQuery(query: string) {
    try {
        const response =  await getQueryRepo(query);
        if (!response) {
            throw new CustomError("Erro na consulta", 500);
        }
        return response;
    } catch (e: any) {
        console.log(TAG, e);
        throw e;
    }
}
