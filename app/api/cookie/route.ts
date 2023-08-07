import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { auth } from "@/src/utils/middlewares/auth";

export async function GET(req: NextRequest) {
    const Response  = createResponse();
    try {
        const userDecodedCookie = await auth(req);

        Response.data = userDecodedCookie;
        return NextResponse.json(Response, {status: Response.status});
    
    } catch (error : any) {
        console.log(error);
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
