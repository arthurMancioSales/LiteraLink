import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/src/utils/customError";
import { createResponse } from "@/src/utils/response";
import { auth } from "@/src/utils/middlewares/auth";
import { getUserById } from "@/src/service/user/getUserById";

export async function GET(req:NextRequest) {
    const Response = createResponse();
    try {
        const userCookie = await auth(req);
        const user = await getUserById(userCookie.id);
        if (!user) {
            throw new CustomError("Error: Usuário não encontrado!", 404);
        }
        Response.data = user;
        return NextResponse.json(Response, {status: 200});
    } catch (e: any) {
        console.log(e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
