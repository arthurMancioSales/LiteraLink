import { NextRequest } from "next/server";
import { CustomError } from "@/src/utils/customError";
import jwt from "jsonwebtoken";

export async function auth(req: NextRequest) {
    // try {
    const userCookie = req.cookies.get("Session")?.value;
    if (!userCookie) {
        throw new CustomError("Error: usuário não está logado", 403);
    }
    const decodedJwt = jwt.verify(userCookie, JSON.stringify(process.env.secretKey));
    if (typeof decodedJwt === "string") {
        throw new CustomError("Error: Cookie inválido.", 500);
    }
    return decodedJwt.id;
    // } catch (e: any) {
    //     throw e;
    // }
}
