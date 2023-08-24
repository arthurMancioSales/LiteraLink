import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { getAllCommunities } from "@/src/service/community/getAllCommunities";
import { CustomError } from "@/src/utils/customError";

export async function GET(req:NextRequest) {
    const Response = createResponse();
    try {
        const dbResponse = await getAllCommunities();
        
        Response.data = dbResponse;
        return NextResponse.json(Response, {status: Response.status});
        
    } catch (error: any) {
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
export const dynamic = "force-dynamic";
