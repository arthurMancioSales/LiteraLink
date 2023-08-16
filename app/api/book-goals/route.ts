import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/utils/middlewares/auth";
import { createResponse } from "@/src/utils/response";
import { goalDeleteFormattedResquest, goalFormattedResquest } from "@/src/utils/formattedRequest";
import { ObjectId } from "mongodb";
import { postGoalsOnBook } from "@/src/service/book/goals/postGoalsOnBook";
import { patchGoalParcialProgress } from "@/src/service/book/goals/patchGoalParcialProgress";
import { CustomError } from "@/src/utils/customError";
import { patchGoalTotal } from "@/src/service/book/goals/patchGoalTotal";
import { deleteGoalsOfBook } from "@/src/service/book/goals/deleteGoalsOfBook";

export async function POST(req: NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        const { id, goals } = request;
        const requestGoals = goalFormattedResquest(goals);
        const responseDB = await postGoalsOnBook(
            new ObjectId(user.id),
            id,
            requestGoals
        );
        Response.data = responseDB;
        return NextResponse.json(Response, {status:Response.status});
    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function PATCH(req: NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        const { id, goals } = request;
        if ('partial' in goals[0]) {
            const reponseParcial = await patchGoalParcialProgress(
                new ObjectId(user.id),
                id,
                goals
            );
            Response.data = reponseParcial;
        }
        if ('total' in goals[0]) {
            const reponseTotal = await patchGoalTotal(
                new ObjectId(user.id),
                id,
                goals[0]
            );
            Response.data = reponseTotal;
        }
        if(!Response.data) {
            throw new CustomError(
                'Não foi enviado o partial ou total para ser feita uma atualização',
                400
            );
        }
        return NextResponse.json(Response, {status:Response.status});
    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

export async function DELETE(req: NextRequest) {
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        const { id, goals } = request;
        const requestGoals = goalDeleteFormattedResquest(goals);
        const responseDB = await deleteGoalsOfBook(
            new ObjectId(user.id),
            id,
            requestGoals
        );
        Response.data = responseDB;
        return NextResponse.json(Response, {status:Response.status});
    } catch (error: any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}