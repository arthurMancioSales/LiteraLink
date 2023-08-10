import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/src/utils/response";

export interface IBookApi {
    id: string;
    title: string;
    image: string;
    pages: number;
}

const secretKeyApiExternal = process.env.SECRET_KEY_API_EXTERNAL;

export async function GET(req: NextRequest, {params}: {params: { apiExternal: string }}) {
    const Response = createResponse();
    try {
        const request = params.apiExternal;

        const requestApiExternal = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${request}&key=${secretKeyApiExternal}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        const responseApi = await requestApiExternal.json();
    
        const booksList: IBookApi[] = [];

        const booksApi: any[] = responseApi.items;

        booksApi.forEach(element => {
            if (element.volumeInfo.readingModes.image) {
                const book: IBookApi = {
                    id: element.id,
                    title: element.volumeInfo.title,
                    image: element.volumeInfo.imageLinks.thumbnail,
                    pages: element.volumeInfo.pageCount,
                };
            
                booksList.push(book);
            }
        });

        Response.data = booksList;
        return NextResponse.json(Response, {status: Response.status});
    } catch (e: any) {
        console.error(e);
    }
}
