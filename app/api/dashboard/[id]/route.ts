import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/src/service/customError";
import { Response } from "@/src/utils/response";
import { getUser } from "@/src/service/user/getUser";

export async function GET(req:NextRequest, {params}: {params: { id: string | number}}) {
    try {
        const id = params.id;
        if (id) {
            const user =  await getUser(id);
            Response.data = user;
            NextResponse.json(Response, {status: Response.status});
        }
        throw new CustomError("Error: id não existente", 404);

    } catch (e: any) {
        console.log(e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
