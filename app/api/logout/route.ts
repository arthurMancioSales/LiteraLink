import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";
import { Response } from "@/src/utils/response";
import { auth } from "@/src/functions/middlewares/auth";

export async function POST(req: NextRequest) {
    try{
        const id = await auth(req);
        if (id) {
            cookies().delete("Session");
            return NextResponse.json(Response, {status: Response.status});
        }
    }
    catch(error: any) {
        Response.message = "Error";
        Response.status = error.status;
        Response.error = error.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
