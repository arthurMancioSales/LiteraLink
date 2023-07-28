import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/src/utils/customError";
import { Response } from "@/src/utils/response";
import { getUser } from "@/src/service/user/getUser";

export async function GET(req:NextRequest, {params}: {params: { username: string}}) {
    try {
        const username = params.username;
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
