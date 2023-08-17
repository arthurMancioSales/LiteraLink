import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { auth } from "@/src/utils/middlewares/auth";
import { postCommunity } from "@/src/service/community/postCommunity";
import { IPatchCommunity } from "@/src/interfaces/interface";
import { patchCommunity } from "@/src/service/community/patchCommunity";
import { NameCommunityValidator } from "@/src/utils/validators/validator";
import { createRedisClient } from "@/src/database/redis/redis";
import { handleUpload } from "@/src/utils/handleUpload";
import { CustomError } from "@/src/utils/customError";

export async function POST(req:NextRequest) {
    const Response = createResponse();
    const redis = createRedisClient();
    try {
        const user = await auth(req);
        const request = await handleUpload(req);
        if (Object.entries(request).length == 0) {
            throw new CustomError("Error: nenhum campo foi selecionado", 400);
        }

        const {name , description, image, communityGenre} = request;
        new NameCommunityValidator(name);
        const body:{
            name:string, 
            description: string,
            communityGenre:string,
            is_admin: string,
            image?: string
        } = {
            name: name,
            description: description,
            communityGenre: communityGenre,
            is_admin: user.id,
            image: image,
        };
        const community = await postCommunity(user, body);
        await redis.del("cachedAllCommunities");
        await redis.del(`userInfo:${user.id}`);
        console.log(community);
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
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const user =  await auth(req);
        const request = await req.json();
        const body = formattedBody(request);
        const updateCommunity = await patchCommunity(user.id, body);
        await redis.del("cachedAllCommunities");
        await redis.del(`userInfo:${user.id}`);
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
export const dynamic = "force-dynamic";

