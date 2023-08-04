import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/src/utils/customError";
import { createResponse } from "@/src/utils/response";
import { getUser } from "@/src/service/user/getUser";
import { NameValidator } from "@/src/utils/validators/validator";

export async function GET(req:NextRequest, {params}: {params: { username: string}}) {
    const Response = createResponse();
    try {
        const username = params.username;
        new NameValidator(username);
        if (username) {
            const user =  await getUser(username);
            
            Response.data = user;
            NextResponse.json(Response, {status: Response.status});
        }
        throw new CustomError("Error: username não existente", 404);

    } catch (e: any) {
        console.log(e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
