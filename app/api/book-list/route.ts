import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { CustomError } from "@/src/utils/customError";
import { auth } from "@/src/utils/middlewares/auth";
import { patchBook } from "@/src/service/book/patchBook";
import { IPatchBook } from "@/src/interfaces/interface";
import { postBook } from "@/src/service/book/postBook";
import { deleteBook } from "@/src/service/book/deleteBook";
import { NumberValidator } from "@/src/utils/validators/validator";

export async function PATCH(req: NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        if (Object.entries(request).length === 0) {
            throw new CustomError("Erro na requisição", 500);
        }
        // preciso escrever um validator para garantir que o ID do livro existe;
        // Além disso, se o cliente está tentando alterar pelo menos 1 campo;
        const body = formattedBody(request);
        const userBookUpdate = await patchBook(user.id, body);
        Response.data = userBookUpdate;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        console.log(e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function POST(req: NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        console.log(request);
        
        const postedBook = await postBook(user.id, request);
        console.log("Livro adicionado: ", postedBook);

        return NextResponse.json(Response, {status:Response.status});
    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function DELETE(req: NextRequest) { // Essa rota "funciona", porém o req com DELETE depois de alguma att. do Next não consegue ser parseado e retorna um erro;
    const Response = createResponse();
    try {
        const user = await auth(req);
        const id = await req.json();
                
        console.log("Request: ", req);
        
        const newBookList = await deleteBook(user.id, id);
        console.log("book list: ", newBookList);

        return NextResponse.json(Response, {status: Response.status});
    } catch (error : any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}


function formattedBody(requestBody: IPatchBook) {
    const body: IPatchBook = {
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
    if (requestBody.goalExpire) {
        body.goalExpire = requestBody.goalExpire;
    }
    if (requestBody.goalsAchieved) {
        body.goalsAchieved = requestBody.goalsAchieved;
    }
    return body;
}
