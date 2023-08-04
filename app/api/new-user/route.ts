import { NextResponse, NextRequest } from "next/server";
import { registerUser } from "@/src/service/user/createUser";
import { createResponse } from "@/src/utils/response";

export async function POST(req: NextRequest) {
    const Response = createResponse();
    try {
        const user = await req.json();
         //const { name, email, password } = user;

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
