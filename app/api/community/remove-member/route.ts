import { removeCommunity } from "@/src/service/community/deleteMemberCommunity";
import { auth } from "@/src/utils/middlewares/auth";
import { createResponse } from "@/src/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        const { name } = request;
        //escrever o validador para esse request, ele irá recer o nome da comunidade;
        const responseDB = await removeCommunity(user, name);
        Response.data = responseDB;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}