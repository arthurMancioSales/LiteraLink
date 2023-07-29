import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/src/utils/response";
import { getAllCommunities } from "@/src/service/community/getAllCommunities";

export async function GET(req:NextRequest) {
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