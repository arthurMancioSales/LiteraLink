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
import { handleUpload } from "@/src/utils/handleUpload";
import { createRedisClient } from "@/src/database/redis/redis";



export async function PATCH(req: NextRequest) {
    const redis = createRedisClient();
    const Response = createResponse();
    try {
        const user = await auth(req);
        const imagePath = await handleUpload(req);
        const request = await req.formData();
        
        if (imagePath) {
            request.set("image", imagePath);
        }
        
        if (Object.entries(request).length === 0) {
            throw new CustomError("Error: nenhum campo foi selecionado", 400);
        }
        const body = await formattedBody(request);
        console.log("depois", body);
        const userUpdate = await updateUser(user.id, body);
        const jwt_cookie: string = jwt.sign({ id: userUpdate._id, name: userUpdate.name }, JSON.stringify(process.env.secretKey));
        cookies().delete("Session");
        cookies().set("Session", jwt_cookie);
        await redis.del("user");
        Response.data = userFormattedResponse(userUpdate);
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        console.log(e);
        Response.message = "Error";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}

async function formattedBody(requestBody: IUserUpdate) {
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
    if (requestBody.image) {
        body.image = requestBody.image;
    }
    return body;
}

export const dynamic = "force-dynamic";
