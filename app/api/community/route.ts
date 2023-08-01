import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/src/utils/response";
import { auth } from "@/src/functions/middlewares/auth";
import { postCommunity } from "@/src/service/community/postCommunity";

export async function POST(req:NextRequest) {
    try {
        const user = await auth(req);
        const request = await req.json();
        // validator aqui, que garanta não falta nenhum campo
        const community = await postCommunity(user, request);
        Response.data = community;
        Response.status = 201;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function PATCH(req:NextRequest) {
    try {
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function DELETE(req:NextRequest) {
    try {
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
