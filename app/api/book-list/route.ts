import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/src/utils/response";
import { CustomError } from "@/src/service/customError";
import { auth } from "@/src/functions/middlewares/auth";
import { patchBook } from "@/src/service/book/patchBook";

export async function PATCH(req: NextRequest) {
    try {
        const id = await auth(req);
        const request = await req.json();
        if (Object.entries(request).length === 0) {
            throw new CustomError('Erro na requisição', 500);
        }
        const userBookUpdate = await patchBook(id, request);
        Response.data = userBookUpdate;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        console.log(e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
};
