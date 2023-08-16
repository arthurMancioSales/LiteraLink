import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import { extname, join } from "path";
import { IUploadBody } from "../interfaces/interface";

export async function handleUpload(req: NextRequest) {
    try {
        const body: IUploadBody = {};
        const request = await req.formData();
        
        const image = request.get("image") as File;
        
        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const imageId = nanoid();
    
            const path = join("/app/public/images/uploads", `${imageId}${extname(image.name)}`);
            await writeFile(path, buffer);
            const imagePath = path.replace("/app/public", "");
            body.image = imagePath;
        }
        
        
        for (const pair of request.entries()) {
            if (typeof(pair[1]) == "string") {
                body[`${pair[0]}`] = pair[1];
            }
        }

        return body;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
