import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";
import jwt from "jsonwebtoken";
import { IUserUpdate } from "@/src/interfaces/interface";
import { CustomError } from "@/src/service/customError";
import { Response } from "@/src/utils/response";
import { auth } from "../../../src/functions/middlewares/auth";
import { updateUser } from "@/src/service/user/updateUser";

export async function PATCH(req: NextRequest) {
    try {
        const id = await auth(req);
        const request = await req.json();
        if (Object.entries(request).length === 0) {
            throw new CustomError("Error: nenhum campo foi selecionado", 500);
        }
        // preciso escrever os validators para validar os campos de name, email, password;
        const body: IUserUpdate = {};
        if (request.name) {
            body.name = request.name;
        }
        if (request.email) {
            body.email = request.email;
        }
        if (request.password) {
            body.password = request.password;
        }
        const userUpdate = await updateUser(id, body);
        const jwt_cookie: string = jwt.sign({ id: userUpdate._id }, JSON.stringify(process.env.secretKey));
        cookies().delete("Session");
        cookies().set("Session", jwt_cookie);
        Response.data = userUpdate;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
