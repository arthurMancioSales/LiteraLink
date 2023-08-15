import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";
import jwt from "jsonwebtoken";
import { IUserUpdate } from "@/src/interfaces/interface";
import { CustomError } from "@/src/utils/customError";
import { createResponse } from "@/src/utils/response";
import { auth } from "../../../src/utils/middlewares/auth";
import { updateUser } from "@/src/service/user/updateUser";
import { EmailValidator, NameValidator, PasswordValidator } from "@/src/utils/validators/validator";
import { userFormattedResponse } from "@/src/utils/formattedResponse";
import { createRedisClient } from "@/src/database/redis/redis";

export async function PATCH(req: NextRequest) {
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const user = await auth(req);
        const request = await req.json();
        if (Object.entries(request).length === 0) {
            throw new CustomError("Error: nenhum campo foi selecionado", 400);
        }
        const body = formattedBody(request);
        const userUpdate = await updateUser(user.id, body);
        const jwt_cookie: string = jwt.sign({ id: userUpdate._id, name: userUpdate.name }, JSON.stringify(process.env.secretKey));
        cookies().delete("Session");
        cookies().set("Session", jwt_cookie);
        await redis.del(`userInfo:${user.id}`);
        await redis.del(`user:${user.id}`);
        Response.data = userFormattedResponse(userUpdate);
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

function formattedBody(requestBody: IUserUpdate) {
    const body: IUserUpdate = {};
    if (requestBody.name) {
        new NameValidator(requestBody.name);
        body.name = requestBody.name;
    }
    if (requestBody.email) {
        new EmailValidator(requestBody.email);
        body.email = requestBody.email;
    }
    if (requestBody.password) {
        new PasswordValidator(requestBody.password);
        body.password = requestBody.password;
    }
    return body;
}
export const dynamic = "force-dynamic";
