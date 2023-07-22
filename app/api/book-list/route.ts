import { NextRequest, NextResponse } from "next/server";
import { Response } from "@/src/utils/response";
import { CustomError } from "@/src/service/customError";
import { auth } from "@/src/functions/middlewares/auth";
import { patchBook } from "@/src/service/book/patchBook";
import { IBook } from "@/src/interfaces/interface";

export async function PATCH(req: NextRequest) {
    try {
        const id = await auth(req);
        const request = await req.json();
        if (Object.entries(request).length === 0) {
            throw new CustomError('Erro na requisição', 500);
        }
        // preciso escrever um validator para garantir que o ID do livro existe;
        // Além disso, se o cliente está tentando alterar pelo menos 1 campo;
        const body = formattedBody(request);
        const userBookUpdate = await patchBook(id, body);
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

function formattedBody(requestBody: IBook) {
    const body: IBook = {
        id: requestBody.id,
    };
    if (requestBody.status) {
        body.status = requestBody.status;
    }
    if (requestBody.chaptersRead) {
        body.chaptersRead = requestBody.chaptersRead;
    }
    if (requestBody.favorite) {
        body.favorite = requestBody.favorite;
    }
    if (requestBody.lastSequence) {
        body.lastSequence = requestBody.lastSequence;
    }
    if (requestBody.goals) {
        body.goals = requestBody.goals;
    }
    return body;
};
