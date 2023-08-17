import { NextRequest } from "next/server";
import { CustomError } from "@/src/utils/customError";
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";

export async function auth(req: NextRequest | IncomingMessage) {
    let userCookie; 
    
    if (req instanceof IncomingMessage) {
        const cookiesArray = req.headers.cookie?.split("; ");
        
        const sessionCookie = cookiesArray?.find(cookie => cookie.startsWith("Session="));
        
        userCookie = sessionCookie?.split("=")[1];
    } else {
        userCookie = req.cookies.get("Session")?.value;
        if(userCookie?.trim() === "") {
            throw new CustomError("Error: Cookie inválido.", 500);
        }
    }

    if (!userCookie) {
        throw new CustomError("Error: usuário não está logado", 403);
    }
    const decodedJwt = jwt.verify(userCookie, JSON.stringify(process.env.secretKey));
    if (typeof decodedJwt === "string") {
        throw new CustomError("Error: Cookie inválido.", 500);
    }
    return {id: decodedJwt.id, name: decodedJwt.name};
}
