import { users } from "@/src/repository/users";
import { CustomError } from "../customError";

export async function getUser(id: number | string) {
    // try {
    const findUser = users.find(user => user.id == id);
    if (findUser) {
        return findUser;
    }
    throw new CustomError("Error: Usuário não encontrado", 404);
    // } catch (e: any) {
    //     throw e;
    // }
}
