import { NextResponse, NextRequest } from "next/server";
import { registerUser } from "@/src/service/user/createUser";
import { createResponse } from "@/src/utils/response";
import { EmailValidator, NameValidator, PasswordValidator } from "@/src/utils/validators/validator";
import { INewUser } from "@/src/interfaces/interface";

export async function POST(req: NextRequest) {
    const Response = createResponse();
    try {
        const request = await req.json();
        const { name, email, password } = request;
        new NameValidator(name);
        new EmailValidator(email);
        new PasswordValidator(password);

        const user: INewUser = {
            name: name,
            email: email,
            password: password
        };
        const result = await registerUser(user);
        console.log(result);

        return NextResponse.json(Response, { status: Response.status });
    } catch (error: any) {
        Response.message = "Error on sign up.";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
