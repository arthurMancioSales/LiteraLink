import { NextResponse, NextRequest } from "next/server";
import { registerUser } from "@/src/service/user/createUser";
import { ApiResponse } from "@/src/interfaces/interface";

export async function POST(req: NextRequest, res: NextResponse) {
    const apiResponse : ApiResponse = {
        message: "Success",
        status: 201,
        data: null,
        error: null
    };
    try {
        const user = await req.json();
        const { id, name, email, password } = user;

        const result = await registerUser(user);


        return NextResponse.json(apiResponse, { status: apiResponse.status });

    } catch (error: any) {
        apiResponse.message = "Error on sign up.";
        apiResponse.status = error.status;
        apiResponse.error = error.message;
        return NextResponse.json(apiResponse, {status: apiResponse.status});
    }
}
