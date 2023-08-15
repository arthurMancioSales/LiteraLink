import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import { extname, join } from "path";

export async function handleUpdate(req: NextRequest) {
    try {
        const request = await req.formData();
        
        const image: File | string | null = request.get("file");
        
        if (!image || !(image instanceof File)) {
            return undefined;
        }
        
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const imageId = nanoid();

        const path = join("/app/public/images/uploads", `${imageId}${extname(image.name)}`);
        await writeFile(path, buffer);
        console.log(path);
        const imagePath = path.replace("/app/public", "");
        
        return imagePath;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
