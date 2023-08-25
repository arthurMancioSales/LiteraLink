import jwt from "jsonwebtoken";

const TAG = 'TEST (CREATE-COOKIE): ';

export async function createCookie(
    user:{
        id: string,
        name: string,
        email?: string,
        image?: string
    }
) {
    try {
        const jwt_cookie: string = jwt.sign({
            id: user.id,
            name: user.name,
            image: user.image!
        }, JSON.stringify(process.env.secretKey));
        return jwt_cookie;
    } catch (e: any) {
        console.log(TAG, e);
    }
}