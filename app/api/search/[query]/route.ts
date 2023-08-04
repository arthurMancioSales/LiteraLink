import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";
import { getQuery } from "@/src/service/query/getQuery";

export async function GET(req: NextRequest, {params}: {params: { query: string}}) {
    const Response = createResponse();
    try {
        const query = params.query;
        const queryResponse = await getQuery(query);
        Response.data = queryResponse;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        Response.message = "Error on sign up.";
        Response.status = e.status;
        Response.error = e.message;
        return NextResponse.json(Response, {status: Response.status});
    }
}
