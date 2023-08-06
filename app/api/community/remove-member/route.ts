import { removeCommunity } from "@/src/service/community/deleteMemberCommunity";
import { auth } from "@/src/utils/middlewares/auth";
import { createResponse } from "@/src/utils/response";
import { NameCommunityValidator } from "@/src/utils/validators/validator";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        const { name } = request;
        new NameCommunityValidator(name);
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
