import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/src/utils/customError";
import { createResponse } from "@/src/utils/response";
import { getCommunity } from "@/src/service/community/getCommunity";
import { NameCommunityValidator } from "@/src/utils/validators/validator";

export async function GET(req:NextRequest, {params}: {params: { comunidade: string }}) {
    const Response = createResponse();
    try {
        const communityName = params.comunidade;
        new NameCommunityValidator(communityName);
        const community =  await getCommunity(communityName);
        if(!community) {
            throw new CustomError("Comunidade não existente", 404);
        }
        Response.data = community;
        return NextResponse.json(Response, {status: Response.status});
    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
