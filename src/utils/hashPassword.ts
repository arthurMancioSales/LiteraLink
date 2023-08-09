import { scrypt } from "crypto";

export async function hashPassword(password:string, salt:string) {
    return new Promise((resolve, reject) => {
        scrypt(password, salt, 64, (err: any, derivedKey: any) => {
            if (err) reject(err);
            resolve(derivedKey.toString("hex"));
        });
    });
}
