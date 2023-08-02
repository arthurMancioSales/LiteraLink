import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/functions/middlewares/auth";
import { Response } from "@/src/utils/response";

export async function GET(req: NextRequest) {
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
