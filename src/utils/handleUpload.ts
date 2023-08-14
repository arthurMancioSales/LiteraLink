import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import { extname, join } from "path";

interface IUpload {
    [paramName: string]: string | File;
}

export async function handleUpdate(req: NextRequest) {
    try {
        const request = await req.formData();
        const body: IUpload = {};
        
        for (const pair of request.entries()) {
            if (pair[1]) {
                body[`${pair[0]}`] = pair[1];
            }
        }
        
        if (body.image) {
            const bytes = await body.image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const imageId = nanoid();
    
            const path = join("/app/public/images/uploads", `${imageId}${extname(body.image.name)}`);
            await writeFile(path, buffer);
            console.log(path);
            body.image = path.replace("/app/public", "");
        }
        console.log(body);
        
        return body;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
