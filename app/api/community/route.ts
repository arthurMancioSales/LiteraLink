import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { auth } from "@/src/utils/middlewares/auth";
import { postCommunity } from "@/src/service/community/postCommunity";
import { IPatchCommunity } from "@/src/interfaces/interface";
import { patchCommunity } from "@/src/service/community/patchCommunity";
import { NameValidator } from "@/src/utils/validators/validator";

export async function POST(req:NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        // validator aqui, que garanta não falta nenhum campo
        const {name , description} = request;
        new NameValidator(name);
        const body:{
            name:string, 
            description: string,
            favoriteBook:string,
            is_admin: string
        } = {
            name: name,
            description: description,
            favoriteBook: '',
            is_admin: user.id
        }
        const community = await postCommunity(user, body);
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
    const Response = createResponse();
    try {
        const user =  await auth(req);
        const request = await req.json();
        const body = formattedBody(request);
        const updateCommunity = await patchCommunity(user.id, body);
        Response.data = updateCommunity;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function DELETE(req:NextRequest) {
    const Response = createResponse();
    try {
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

function formattedBody(req: IPatchCommunity) {
    const body: IPatchCommunity = {
        oldName: req.oldName
    };
    if (req.name) {
        body.name = req.name;
    }
    if (req.description) {
        body.description = req.description;
    }
    if (req.favoriteBook) {
        body.favoriteBook = req.favoriteBook;
    }
    if (req.image) {
        body.image = req.image;
    }

    if (req.is_admin) {
        body.is_admin = req.is_admin;
    }
    return body;
}
